// Provider class to be subclassed by an actual provider

import Error from './error';

// ////////////////////////////////////////////////////////////////////////////
// CONSTANTS

const EVENT_COMPLETED = "mvc.provider.completed";
const EVENT_ERROR = "mvc.provider.error";

// ////////////////////////////////////////////////////////////////////////////
// PROVIDER CLASS

export default class Provider {
  constructor(root) {
    this.$root = root;
  }
  
  $fetch(url, req, userInfo) {
    var status;
    window.fetch(this.$root + url, req).then(response => {
      status = response;
      switch (status.headers.get("Content-Type").split(";")[0]) {
        case "application/json":
        case "text/json":
          return response.json();
        case "text/plain":
          return response.text();
        default:
          return response.blob();
      }
    }).then(data => {
      if (!status.ok) {
        if (typeof (data) == "object" && data.reason) {
          throw new Error(data.reason, data.code);
        } else {
          throw new Error(status.statusText, status.status);
        }
      } else if (typeof (data) == "object" && Array.isArray(data)) {
        this.$array(data);
      } else {
        this.$object(data);
      }
    }).then(() => {
      document.dispatchEvent(new Event(EVENT_COMPLETED, {
        userInfo: userInfo,
      }));
    }).catch(error => {
      if (error instanceof Error) {
        document.dispatchEvent(new Event(EVENT_ERROR, {
          userInfo: userInfo,
          error: error,
        }));
      } else {
        throw error;
      }
    });
  }
}
