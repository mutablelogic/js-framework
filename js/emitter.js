/**
 * Class to emit events to listener callbacks
 * @class
*/
export default class Emitter {
  /**
  * Create an Emitter.
  */
  constructor() {
    this.$listeners = new Map();
  }

  /**
  * Add a listener for emitted events.
  * @param {string[]} types - An array or string of the events to listen for.
  * @param {function} fn - The callback when an event is emitted.
  */
  addEventListener(types, fn) {
    if (Array.isArray(types)) {
      types.forEach((type) => {
        this.addEventListener(type, fn);
      });
    } else {
      if (!this.$listeners.has(types)) {
        this.$listeners.set(types, []);
      }
      this.$listeners.get(types).push(fn);
    }
  }

  /**
  * Dispatch an event to listeners with arguments.
  * @param {string} type - The type of event to dispatch.
  * @param {...*} args - The arguments to pass to the listener callback.
  */
  dispatchEvent(type, ...args) {
    const listeners = this.$listeners.get(type);
    if (listeners) {
      listeners.forEach((fn) => {
        fn(...args);
      });
    }
  }
}
