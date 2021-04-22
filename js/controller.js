/* eslint-disable class-methods-use-this */

import { Tooltip } from 'bootstrap';
import View from './view';
import Provider from './provider';
import CopyPaste from './copypaste';

/**
 * Controller which acts as business logic between models, views and
 * providers. In general, create a new controller using the New
 * static method and then define properties of the controller. Call
 * main to run the application.
 * @class
*/
export default class Controller {
  constructor() {
    this.$providers = new Map();
    this.$views = new Map();

    // Set up tooltips
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((node) => {
      // eslint-disable-next-line no-new
      new Tooltip(node);
    });

    // Set up copypaste
    document.querySelectorAll('.mvc-copypaste').forEach((node) => {
      const copypaste = new CopyPaste(node);
      copypaste.addEventListener('mvc.copypaste.click', (sender, target) => {
        copypaste.clipboard = target.innerText;
      });
      copypaste.addEventListener('mvc.copypaste.change', () => {
        console.log('TODO: copied');
      });
    });
  }

  /**
  * Define a view or provider for the controller. The object is then
  * accessible as a property of the controller.
  * @param {string} key - The name of the property
  * @param {Provider|View} object - The object
  */
  define(key, object) {
    if (!key || this.$providers.has(key) || this.$views.has(key)) {
      throw Error(`Controller: Duplicate or invalid key ${key}`);
    }
    // Set object
    if (object instanceof View) {
      this.$views.set(key, object);
    } else if (object instanceof Provider) {
      this.$providers.set(key, object);
    } else {
      throw new Error(`Controller: Invalid object added to controller with key ${key}`);
    }
    // Set property
    Object.defineProperty(this, key, {
      value: object,
      writable: false,
    });
  }

  /**
  * Create and return a new controller
  * @param {Controller} constructor - The constructor for the controller
  * @param {...any} args - The arguments for the constructor
  */
  static New(constructor, ...args) {
    const C = constructor || Controller;
    if (C.prototype instanceof Controller) {
      return new C(args);
    }
    throw new Error(`Controller: Class ${C.name} is not a controller`);
  }

  /**
  * Run your application. This function does nothing in the default implementation
  * and you are expected to subclass it.
  */
  main() {

  }
}
