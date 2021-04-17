// Provider class to be subclassed by an actual provider

import Error from './error';
import Emitter from './events';

// ////////////////////////////////////////////////////////////////////////////
// CONSTANTS

const EVENT_ROOT = 'mvc.provider';
const EVENT_COMPLETED = `${EVENT_ROOT}.completed`;
const EVENT_ERROR = `${EVENT_ROOT}.error`;
const EVENT_ADDED = `${EVENT_ROOT}.added`;
const EVENT_CHANGED = `${EVENT_ROOT}.changed`;
const EVENT_DELETED = `${EVENT_ROOT}.deleted`;

// ////////////////////////////////////////////////////////////////////////////
// PROVIDER CLASS

export default class Provider extends Emitter {
  constructor(constructor, origin) {
    super();
    this.$origin = origin || '';
    this.$constructor = typeof constructor === 'function' ? constructor : Object;
    this.$objs = new Map();
    this.$timer = null;
  }

  request(url, req, userInfo, interval) {
    this.cancel();
    if (!this.$timer) {
      this.$fetch(url, req, userInfo);
    }
    if (interval) {
      this.$timer = setInterval(this.$fetch.bind(this, url, req, userInfo), interval);
    }
  }

  cancel() {
    if (this.$timer) {
      clearTimeout(this.$timer);
      this.$timer = null;
    }
  }

  $fetch(url, req, userInfo) {
    let status;
    let changed = false;
    fetch(this.$origin + url, req)
      .then((response) => {
        status = response;
        const contentType = response.headers ? response.headers.get('Content-Type') || '' : '';
        switch (contentType.split(';')[0]) {
          case 'application/json':
          case 'text/json':
            return response.json();
          case 'text/plain':
          case 'text/html':
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
          if (this.$array(data)) {
            changed = true;
          }
        } else if (this.$object(data)) {
          changed = true;
        }
      })
      .then(() => {
        this.dispatchEvent(EVENT_COMPLETED, this, changed, userInfo);
      })
      .catch((error) => {
        if (error instanceof Error) {
          this.dispatchEvent(EVENT_ERROR, this, error, userInfo);
        } else {
          throw error;
        }
      });
  }

  $object(data) {
    const obj = new this.$constructor(data);
    const key = typeof obj === 'object' ? obj.key : null;
    if (key) {
      if (this.$objs.has(key)) {
        const existing = this.$objs.get(key);
        this.$objs.set(key, obj);
        if (obj.$equals && obj.$equals(existing) === false) {
          this.dispatchEvent(EVENT_CHANGED, this, obj, existing);
        }
      } else {
        this.$objs.set(key, obj);
        this.dispatchEvent(EVENT_ADDED, this, obj);
      }
    } else {
      this.dispatchEvent(EVENT_ADDED, this, obj);
    }
    return key;
  }

  $array(data) {
    const changed = false;
    const mark = new Map();
    this.$objs.forEach((_, key) => {
      mark.set(key, true);
    });
    data.forEach((elem) => {
      const key = this.$object(elem);
      if (key) {
        mark.delete(key);
      }
    });
    this.$objs.forEach((elem, key) => {
      if (mark.get(key)) {
        this.dispatchEvent(EVENT_DELETED, this, elem);
        this.$objs.delete(key);
      }
    });
    return changed;
  }

  // objects property returns all objects loaded by provider
  get objects() {
    return Array.from(this.$objs.values());
  }

  // keys property returns all keys
  get keys() {
    return Array.from(this.$objs.keys());
  }

  // objectForKey returns an object for specific key
  objectForKey(key) {
    return this.$objs.get(key);
  }

  // removeAll resets the provider
  removeAll() {
    this.$objs.clear();
  }
}
