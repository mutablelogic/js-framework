// Provider class to be subclassed by an actual provider

import Error from './error';
import Emitter from './events';

// ////////////////////////////////////////////////////////////////////////////
// CONSTANTS

const EVENT_ROOT = 'mvc.provider';
const EVENT_COMPLETED = `${EVENT_ROOT}.completed`;
const EVENT_ERROR = `${EVENT_ROOT}.error`;

// ////////////////////////////////////////////////////////////////////////////
// PROVIDER CLASS

export default class Provider extends Emitter {
  constructor(root) {
    super();
    this.$root = root || '';
  }

  fetch(url, req, userInfo) {
    let status;
    fetch(this.$root + url, req)
      .then((response) => {
        status = response;
        const contentType = response.headers ? response.headers.get('Content-Type') || '' : '';
        switch (contentType.split(';')[0]) {
          case 'application/json':
          case 'text/json':
            return response.json();
          case 'text/plain':
            return response.text();
          default:
            return response.blob();
        }
      })
      .then((data) => {
        if (!status.ok) {
          if (typeof (data) === 'object' && data.reason) {
            throw new Error(data.reason, data.code);
          } else {
            throw new Error(status.statusText, status.status);
          }
        } else if (typeof (data) === 'object' && Array.isArray(data)) {
          this.$array(data);
        } else {
          this.$object(data);
        }
      })
      .then(() => {
        this.dispatchEvent(EVENT_COMPLETED, this, userInfo);
      })
      .catch((error) => {
        if (error instanceof Error) {
          this.dispatchEvent(EVENT_ERROR, this, error, userInfo);
        } else {
          throw error;
        }
      });
  }
}
