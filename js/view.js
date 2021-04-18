// View class to be subclassed by an actual view

import Emitter from './emitter';
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
    this.$node.appendChild(node);
    return this;
  }

  preprend(node) {
    this.$node.insertBefore(node, this.$node.firstChild);
    return this;
  }

  replace(selector, ...args) {
    const node = this.query(selector);
    if (!node) {
      throw new Error(`View: Invalid selector ${selector}`);
    }
    node.replaceChildren(...args);
    return this;
  }

  $show() {
    this.$node.style.visibility = 'visible';
  }

  $hide() {
    this.$node.style.visibility = 'hidden';
  }
}
