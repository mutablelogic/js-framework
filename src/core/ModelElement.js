import { LitElement, html } from 'lit';
import { EventType } from './EventType';

/**
 * @class ModelElement
 *
 * This class is a data store for an object.
 * 
 * @property {String} provider - A connnected provider element id
 *
 * @example
 * <js-model provider="customprovider"></js-model>
 */
export class ModelElement extends LitElement {
  #provider;

  static get localName() {
    return 'js-model';
  }

  constructor(data) {
    super();

    // Default properties
    this.provider = null;
    this.data = null;
    if (data) {
      this._updateData(data);
    }
  }

  static get properties() {
    return {
      provider: { type: String },
      data: { type: Object, reflect: true },
    };
  }

  render() {
    return html`<div>${this.asJSON()}</div>`;
  }

  asJSON() {
    return JSON.stringify(this.data);
  }

  connectedCallback() {
    super.connectedCallback();
    this.#connect();
  }

  #connect() {
    if (this.provider) {
      this.#provider = document.getElementById(this.provider);
    } else {
      this.#provider = null;
    }
    if (this.#provider) {
      this.#provider.addEventListener(EventType.FETCH, (evt) => {
        // Object is being fetched from the provider
      });
      this.#provider.addEventListener(EventType.ERROR, (evt) => {
        // An error occurred in the provider
        console.log('Error event', evt.error);
      });
      this.#provider.addEventListener(EventType.DONE, (evt) => {
        // Object has been fetched from the provider
      });
      this.#provider.addEventListener(EventType.TEXT, (evt) => {
        this._updateData(evt.detail);
      });
      this.#provider.addEventListener(EventType.OBJECT, (evt) => {
        this._updateData(evt.detail);
      });
      this.#provider.addEventListener(EventType.BLOB, (evt) => {
        this._updateData(evt.detail);
      });
    }
  }

  _updateData(data) {
    // Scalar type
    if (ModelElement.#isScalar(data)) {
      this.data = data;
      return;
    }
    // Object type
    if (data instanceof Object || data instanceof ModelElement) {
      const newVal = this.#updateObject(data);
      if (newVal) {
        // Modified
        this.data = newVal;
      }
      return;
    }
    // Cannot handle this type yet
    throw new Error(`Cannot handle data type ${data.localName}`);
  }

  static #isScalar(value) {
    if (value === null) {
      return true;
    }
    if (value instanceof String || typeof value === 'string') {
      return true;
    }
    if (value instanceof Number || typeof value === 'number') {
      return true;
    }
    if (value instanceof Boolean || typeof value === 'boolean') {
      return true;
    }
    if (value instanceof Date) {
      return true;
    }
    return false;
  }

  #updateObject(data) {
    let obj = {};
    let newVal;
    let modified = false;
    const properties = this.constructor.properties;
    for (const key in data) {
      if (!properties[key]) {
        continue;
      } else if (properties[key].type === String) {
        newVal = this.#setString(key, data[key]);
        if (newVal !== undefined) {
          obj[key] = data[key];
          modified = true;
        }
      } else if (ModelElement.#isSubclassOf(properties[key].type, ModelElement)) {
        newVal = this.#setModel(key, data[key]);
        if (newVal !== undefined) {
          obj[key] = data[key];
          modified = true;
        }
      } else {
        throw new Error(`#updateObject: ${key}: Unknown type}`);
      }
    }
    return modified ? obj : null;
  }

  static #isSubclassOf(subClass, superClass) {
    let prototype = subClass.prototype;
    while (prototype) {
      if (prototype === superClass.prototype) {
        return true;
      }
      prototype = Object.getPrototypeOf(prototype);
    }
    return false;
  }

  #setString(key, value) {
    // Check if modified
    if (this[key] === value) {
      return undefined;
    }
    console.log('SetString:', key, 'Value:', value);
    this[key] = value;
    return value;
  }

  #setModel(key, value) {
    console.log('SetModel:', key, 'Value:', value);
  }
}
