import { EventType } from './EventType';
import { ProviderElement } from './ProviderElement';

/**
 * @class Model
 *
 * This class is a model base class for storing data. It can store
 * scalar types and objects, and be subclassed to store more complex
 * data.
 * 
 * You can attach a provider to the model to fetch data from a remote
 * source, in which case EventType.CHANGE will be dispatched when the
 * data is updated.
 * 
 * @example
 * var model = new Model(data, provider);
 */
export class Model extends EventTarget {
  #provider;
  #data;

  static get localName() {
    return 'js-model';
  }

  constructor(provider) {
    super();

    // Listen for provider events
    this.#provider = provider instanceof ProviderElement ? provider : null;
    if (this.#provider) {
      this.#provider.addEventListener(EventType.FETCH, () => {
        // Data is being fetched from the provider
      });
      this.#provider.addEventListener(EventType.DONE, () => {
        // Data has been fetched from the provider
      });
      this.#provider.addEventListener(EventType.TEXT, (evt) => {
        this.data = evt.detail;
      });
      this.#provider.addEventListener(EventType.OBJECT, (evt) => {
        this.data = evt.detail;
      });
      this.#provider.addEventListener(EventType.BLOB, (evt) => {
        this.data = evt.detail;
      });
    }
  }

  static get properties() {
    return {};
  }

  get data() {
    return this.#data;
  }

  set data(data) {
    let modified = false;

    if (data === null || data === undefined) {
      // Null type
      modified = (this.data !== null);
      this.#data = null;
    } else if (Model.#isScalar(data)) {
      // Scalar type
      modified = (this.data === data);
      this.#data = data;
    } else if (data instanceof Model) {
      // Model type      
      console.log('TODO: Model');
    } else if (data instanceof Object) {
      var data = this.#newObject(data);
      modified = (this.data === data);
      this.#data = data;
    } else if (data instanceof Array) {
      // Array type
      console.log('TODO: Array');
    } else {
      // Cannot handle this type yet
      throw new Error(`Cannot handle data type ${data.localName}`);
    }

    // Emit a change event if the data was modified
    if (modified) {
      this.dispatchEvent(new CustomEvent(EventType.CHANGE, {
        detail: this
      }));
    }
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

  static #isScalarType(type) {
    if (this.#isSubclassOf(type, String)) {
      return true;
    }
    if (this.#isSubclassOf(type, Number)) {
      return true;
    }
    if (this.#isSubclassOf(type, Boolean)) {
      return true;
    }
    if (this.#isSubclassOf(type, Date)) {
      return true;
    }
    return false;
  }

  #newObject(data) {
    const properties = this.constructor.properties;

    // If the Model has no properties, return the data directly
    if (!properties || Object.keys(properties).length === 0) {
      return data;
    }

    // Iterate over the properties and set the data
    let obj = {};
    for (const key in properties) {
      let value = data[key];

      // 'data' is the only reserved property name
      if (value === undefined || key === 'data') {
        continue;
      }

      // Create a new value
      if (Model.#isSubclassOf(properties[key].type, String)) {
        if (value instanceof String) {
          // Do nothing
        } else if (typeof value === 'string') {
          value = new String(value);
        } else {
          console.error(`Invalid string value for ${key}`);
        }
      } else if (Model.#isSubclassOf(properties[key].type, Number)) {
        // Number type
        value = new Number(value);
      } else if (Model.#isSubclassOf(properties[key].type, Boolean)) {
        value = new Boolean(value);
      } else if (Model.#isSubclassOf(properties[key].type, Date)) {
        value = new Date(value);
      } else if (Model.#isSubclassOf(properties[key].type, Model)) {
        const model = new properties[key].type();
        model.data = value;
        value = model;
      } else if (Model.#isSubclassOf(properties[key].type, Array)) {
        // Array type
        const array = new(Array);
        console.log(`TODO: Create a new array value for ${key} ${value}`);
      }

      // Create a new object for the property
      obj[key] = value;
    }

    return obj;
  }

  toString() {
    return JSON.stringify(this);
  }
}
