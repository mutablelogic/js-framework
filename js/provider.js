// Provider class to be subclassed by an actual provider

import Error from './error';
import Emitter from './emitter';

// ////////////////////////////////////////////////////////////////////////////
// CONSTANTS

const EVENT_ROOT = 'mvc.provider';
const EVENT_STARTED = `${EVENT_ROOT}.started`;
const EVENT_COMPLETED = `${EVENT_ROOT}.completed`;
const EVENT_ERROR = `${EVENT_ROOT}.error`;
const EVENT_ADDED = `${EVENT_ROOT}.added`;
const EVENT_CHANGED = `${EVENT_ROOT}.changed`;
const EVENT_DELETED = `${EVENT_ROOT}.deleted`;

// ////////////////////////////////////////////////////////////////////////////
// PROVIDER CLASS

/**
 * Provider requests data from a remote endpoint.
 * @class
*/
export default class Provider extends Emitter {
  constructor(constructor, origin) {
    super();
    this.$origin = origin || '';
    this.$constructor = constructor || Object;
    this.$objs = new Map();
    this.$timer = null;
  }

  request(url, req, interval) {
    this.cancel();
    if (!this.$timer) {
      this.$fetch(url, req);
    }
    if (interval) {
      this.$timer = setInterval(this.$fetch.bind(this, url, req), interval);
    }
  }

  cancel() {
    if (this.$timer) {
      clearTimeout(this.$timer);
      this.$timer = null;
    }
  }

  $fetch(url, req) {
    let status;
    let changed = false;
    this.dispatchEvent(EVENT_STARTED, this, this.$origin + url);
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
        } else {
          const result = this.$object(data);
          if (result[1]) {
            changed = true;
          }
        }
      })
      .then(() => {
        this.dispatchEvent(EVENT_COMPLETED, this, changed);
      })
      .catch((error) => {
        if (error instanceof Error) {
          this.dispatchEvent(EVENT_ERROR, this, error);
        } else {
          throw error;
        }
      });
  }

  static $key(obj) {
    return typeof obj === 'object' ? obj.key : null;
  }

  static $equals(a, b) {
    return a.$equals ? a.$equals(b) : a === b;
  }

  $object(data) {
    const obj = new this.$constructor(data);
    const key = this.constructor.$key(obj);
    let changed = true;
    if (key && this.$objs.has(key)) {
      const existing = this.$objs.get(key);
      this.$objs.set(key, obj);
      if (this.constructor.$equals(obj, existing) === false) {
        this.dispatchEvent(EVENT_CHANGED, this, obj, existing);
      } else {
        changed = false;
      }
    } else {
      if (key) {
        this.$objs.set(key, obj);
      }
      this.dispatchEvent(EVENT_ADDED, this, obj);
    }
    return [key, changed];
  }

  $array(data) {
    let changed = false;
    const mark = new Map();

    // Mark existing objects
    this.$objs.forEach((_, key) => {
      mark.set(key, true);
    });

    // Add and change objects
    data.forEach((elem) => {
      const result = this.$object(elem);
      if (result[0]) {
        mark.delete(result[0]);
      }
      if (result[1]) {
        changed = true;
      }
    });

    // Delete objects which are still marked
    this.$objs.forEach((elem, key) => {
      if (mark.get(key)) {
        changed = true;
        this.dispatchEvent(EVENT_DELETED, this, elem);
        this.$objs.delete(key);
      }
    });

    // Return true if the items were changed
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

  // clear removes all objects from the provider
  clear() {
    this.$objs.clear();
  }
}
