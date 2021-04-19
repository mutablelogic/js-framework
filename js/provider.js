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
  /**
  * Create a provider, with a model constructor and optionally
  * a base URL for requests. If no model is provided then
  * Object types will be emitted. Add event listeners for
  * mvc.provider.{started,completed,added,changed,deleted} to
  * tap into the request lifecycle and mvc.provider.error to
  * deal with request errors.
  * @param {Model} constructor - The model used to create objects from data.
  * @param {string} origin - The base URL used for making requests.
  */
  constructor(constructor, origin) {
    super();
    this.$origin = origin || '';
    this.$constructor = constructor || Object;
    this.$objs = new Map();
    this.$timer = null;
  }

  /**
  * Request data from a remote source, either once or by interval.
  * Subsequent calls to this function will cancel any existing
  * timers.
  * @param {string} url - The endpoint of the data provider.
  * @param {Object} req - Request data. See the documentaton for fetch.
  * @param {number} interval - If provided, the number of milliseconds between each request.
  */
  request(url, req, interval) {
    this.cancel();
    if (!this.$timer) {
      this.$fetch(url, req);
    }
    if (interval) {
      this.$timer = setInterval(this.$fetch.bind(this, url, req), interval);
    }
  }

  /**
  * Perform a request without interrupting any existing request interval timer.
  * @param {string} url - The endpoint of the data provider.
  * @param {Object} req - Request data. See the documentaton for fetch.
  */
  do(url, req) {
    this.$fetch(url, req);
  }

  /**
  * Cancel any existing request interval timer.
  */
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

  /**
  * Return all objects which are registered with the provider.
  */
  get objects() {
    return Array.from(this.$objs.values());
  }

  /**
  * Return all object keys which are registered with the provider.
  */
  get keys() {
    return Array.from(this.$objs.keys());
  }

  /**
  * Return an object which is registered with a key.
  */
  objectForKey(key) {
    return this.$objs.get(key);
  }

  /**
  * Remove any registered objects.
  */
  clear() {
    this.$objs.clear();
  }
}
