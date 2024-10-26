import { LitElement, html } from 'lit';
import { EventType } from './EventType';

/**
 * @class ProviderElement
 *
 * This class is a "provider" of data from external sources.
 * 
 * @property {String} origin - The origin of the resource
 * @property {String} path - The path to the resource
 * @property {String} method - The method to use to fetch the resource
 * @property {Number} interval - The interval to fetch the resource in seconds. If undefined, only fetch once
 * @property {String} message - The status message to display
 *
 * @example
 * <js-provider origin="https://remote/" path="/path/to/resource" method="POST" interval="60"></js-provider>
 */
export class ProviderElement extends LitElement {
  #timer;

  static get localName() {
    return 'js-provider';
  }

  constructor() {
    super();

    // Default properties
    this.origin = null;
    this.path = null;
    this.method = 'GET';
    this.interval = 0;
    this.message = '';
  }

  static get properties() {
    return {
      origin: { type: String },
      message: { type: String },
      path: { type: String, reflect: true },
      method: { type: String, reflect: true },
      interval: { type: Number, reflect: true },
    };
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === 'path') {
      this.#pathChanged(newVal, oldVal);
    }
  }

  render() {
    return html`<div>${this.message}</div>`;
  }

  /**
   * Fetch data from a remote source
   * 
   * @param {String} path - The path to the resource. If NULL, use the path property.
   * @param {Object} request - The request object. If NULL, use the method property.
   * @param {Number} interval - The interval to fetch the data. If NULL, use the interval property.
   * 
   * @memberof ProviderElement
   */
  fetch(path, request, interval) {
    // Set default path and request
    if (!path) {
      path = this.path || "/";
    }
    if (!request) {
      request = this.#request;
    }
    if (!interval) {
      interval = this.interval;
    }

    // Create an absolute URL
    let url;
    try {
      url = new URL(path, this.#origin);
    }
    catch (error) {
      this.message = `${error}`;
      this.dispatchEvent(new ErrorEvent(EventType.ERROR, {
        error: error,
        message: this.message
      }));
      return;
    }

    // Cancel any existing requests
    this.cancel();

    // Fetch the data
    this.#fetch(url, request);

    // Set the interval for the next fetch
    if (interval) {
      this.#timer = setInterval(() => {
        this.#fetch(url, request);
      }, interval * 1000);
    }
  }

  /**
   * Cancel any existing request interval timer.
   * 
   * @memberof ProviderElement
   */
  cancel() {
    if (this.#timer) {
      clearTimeout(this.#timer);
      this.#timer = null;
    }
  }

  #pathChanged(newVal, oldVal) {
    if (newVal) {
      if(newVal !== oldVal) {
        console.log(`path changed: ${oldVal} => ${newVal}`);
        this.fetch(newVal);
      }
    } else {
      this.cancel();
    }
  }

  get #origin() {
    return this.origin || window.location.href;
  }

  get #request() {
    return {
      method: this.method || "GET",
      body: null,
      headers: {}
    };
  }

  #fetch(url, request) {
    this.message = `FETCH ${url}`;
    this.dispatchEvent(new CustomEvent(EventType.FETCH, {
      detail: url
    }));
    fetch(url, request).then((response) => {
      if (!response.ok) {
        throw new Error(`status: ${response.status}`);
      }
      const contentType = response.headers ? response.headers.get('Content-Type') || '' : '';
      return this.#fetchresponse(contentType.split(';')[0], response);
    }).then((data) => {
      this.#fetchdata(data);
    }).catch((error) => {
      this.message = `${error}`;
      this.dispatchEvent(new ErrorEvent(EventType.ERROR, {
        error: error,
        message: this.message
      }));
    }).finally(() => {
      this.message = `DONE ${url}`;
      this.dispatchEvent(new CustomEvent(EventType.DONE, {
        detail: url
      }));
    });
  }

  #fetchresponse(contentType, response) {
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
  }

  #fetchdata(data) {
    if (typeof data == "string") {
      this.#fetchtext(data);
    } else if (data instanceof Array) {
      data.forEach((item) => {
        this.#fetchobject(data);
      });      
    } else if (data instanceof Object) {
      this.#fetchobject(data);
    } else {
      this.#fetchblob(data);
    }
  }

  #fetchtext(data) {
    this.message = data;
    this.dispatchEvent(new CustomEvent(EventType.TEXT, {
      detail: data
    }));
  }

  #fetchobject(data) {
    this.message = data;
    this.dispatchEvent(new CustomEvent(EventType.OBJECT, {
      detail: data
    }));
  }

  #fetchblob(data) {
    this.message = data;
    this.dispatchEvent(new CustomEvent(EventType.BLOB, {
      detail: data
    }));
  }
}

