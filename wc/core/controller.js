import HostController from './hostcontroller';
import Provider from './provider';

/**
 * Controller acts as business logic between components
 * and providers.
 * @class
*/
class Controller {
  constructor() {
    this.$providers = new Map();
  }

  /**
    * Define a data provider for the controller. The object is then
    * accessible as a property of the controller.
    * @param {string} key - The name of the property
    * @param {Provider} object - The object
    */
  define(key, object) {
    if (!key || this.$providers.has(key)) {
      throw Error(`Controller: Duplicate or invalid key ${key}`);
    }

    // Set object
    if (object instanceof Provider) {
      this.$providers.set(key, object);
    } else {
      throw new Error(`Controller: Invalid object added to controller with key ${key}`);
    }

    // Set property
    Object.defineProperty(this, key, {
      value: object,
      writable: false,
    });

    // Return object
    return object;
  }

  bind(key, host) {
    if (this.$providers.has(key)) {
      throw Error(`Controller: Invalid key ${key}`);
    }
    return new HostController(host, this.$providers.get(key));
  }
}

// Export global controller
export default (new Controller());
