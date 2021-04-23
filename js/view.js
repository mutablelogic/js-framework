// View class to be subclassed by an actual view

import Emitter from './emitter';
import Error from './error';

/* eslint no-param-reassign: ["error", { "props": false }] */

// ////////////////////////////////////////////////////////////////////////////

/**
 * View tracks a DOM node and aids manipulation,
 * @class
 * @implements {Emitter}
 * @classdesc This class is constructed with a DOM element and allows operations such
 *  as replace, query, show and hide on that element. Most likely this class is
 *  extended by other view classes.
 *
 * @arg {Node} node - The node to attach the view to. Throws an error if the node
 *   is not provided.
 */
export default class View extends Emitter {
  constructor(node) {
    super();
    this.$node = node;

    if (!this.$node) {
      throw new Error('Invalid view');
    }
  }

  /**
  * Query the view to return a single element within the node.
  * @param {string} selector - The query.
  * @returns {Element|undefined}
  */
  query(selector) {
    return this.$node.querySelector(selector);
  }

  /**
  * Query the view to return multiple elements within the node.
  * @param {string} selectors - The query.
  * @returns {NodeList}
  */
  queryAll(selectors) {
    return this.$node.querySelectorAll(selectors);
  }

  /**
  * Append a node to the view, as the last element.
  * @param {Node} node
  * @returns {View}
  */
  append(node) {
    this.$node.appendChild(node);
    return this;
  }

  /**
  * Prepend a node to the view, as the first element.
  * @param {Node} node
  * @returns {View}
  */
  preprend(node) {
    this.$node.insertBefore(node, this.$node.firstChild);
    return this;
  }

  /**
  * Replace the nodes of a view using selector. Throws an error if
  * the selector does not return any node.
  * @param {string} selector
  * @param {...Node|string} args - The nodes or text for replacement.
  * @returns {View}
  * @throws {Error}
  */
  replace(selector, ...args) {
    const node = selector ? this.query(selector) : this.$node;
    if (!node) {
      throw new Error(`View: Invalid selector ${selector}`);
    }
    node.replaceChildren(...args);
    return this;
  }

  /**
  * Set visibility so that view is rendered.
  * @returns {View}
  */
  $show() {
    this.$node.style.visibility = 'visible';
    return this;
  }

  /**
  * Set visibility so that view is not rendered.
  * @returns {View}
  */
  $hide() {
    this.$node.style.visibility = 'hidden';
    return this;
  }
}
