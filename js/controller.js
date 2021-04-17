// Controller class to be subclassed by an actual controller

import { Tooltip } from 'bootstrap';
import View from './view';
import Provider from './provider';

export default class Controller {
  constructor() {
    this.$providers = new Map();
    this.$views = new Map();

    // Set up tooltips
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((node) => {
      // eslint-disable-next-line no-new
      new Tooltip(node);
    });
  }

  Add(key, object) {
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

  static New() {
    return new Controller();
  }
}
