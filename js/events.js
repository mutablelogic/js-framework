// Emitter class

export default class Emitter {
  constructor() {
    this.$listeners = new Map();
  }

  addEventListener(type, fn) {
    if (!this.$listeners.has(type)) {
      this.$listeners.set(type, []);
    }
    this.$listeners.get(type).push(fn);
  }

  dispatchEvent(type, ...args) {
    const listeners = this.$listeners.get(type);
    if (listeners) {
      listeners.forEach((fn) => {
        fn(...args);
      });
    }
  }
}
