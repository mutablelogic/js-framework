// Controller class to be subclassed by an actual controller

import { Tooltip } from 'bootstrap';
import View from './view';
import Provider from './provider';
import CopyPaste from './copypaste';

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

  static New(constructor) {
    const C = constructor || Controller;
    if (C.prototype instanceof Controller) {
      return new C();
    }
    throw new Error(`Controller: Class ${C.name} is not a controller`);
  }
}
