// View class to be subclassed by an actual view

import Emitter from './events';
import Error from './error';

/* eslint no-param-reassign: ["error", { "props": false }] */

export default class View extends Emitter {
  constructor(node) {
    super();
    this.$node = node;

    if (!this.$node) {
      throw new Error('Invalid view');
    }
  }

  query(selector) {
    return this.$node.querySelector(selector);
  }

  queryAll(selector) {
    return this.$node.querySelectorAll(selector);
  }

  append(node) {
    return this.$node.appendChild(node);
  }

  preprend(node) {
    return this.$node.insertBefore(node, this.$node.firstChild);
  }

  replace(selector, ...args) {
    const node = this.query(selector);
    if (!node) {
      throw new Error(`View: Invalid selector ${selector}`);
    }
    return node.replaceChildren(...args);
  }

  $show() {
    this.$node.style.visibility = 'visible';
  }

  $hide() {
    this.$node.style.visibility = 'hidden';
  }
}
