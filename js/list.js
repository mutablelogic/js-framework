// List class

import View from './view';
import Error from './error';

// ////////////////////////////////////////////////////////////////////////////
// CONSTANTS

const EVENT_ROOT = 'list';

/**
 * List row click event
 *
 * @event List#list:click
 * @arg {Nav} sender - The provider that emitted the event.
 * @arg {Node} target - The target element clicked.
 */
const EVENT_CLICK = `${EVENT_ROOT}:click`;

// ////////////////////////////////////////////////////////////////////////////

/**
 * List provides a way to dynamically create an ordered list of elements in a
 * view.
 * @class
 * @implements {View}
 * @classdesc A list is a view which uses a 'row' template to added and remove
 *  rows from a view.
 *
 * @arg {Node} node - The node to attach the view to. Throws an error if the node
 *   is not provided.
 * @arg {string} classTemplate - class name of the template within the view which is
 *   cloned for each row.
 * @throws Error
 */
export default class List extends View {
  constructor(node, classTemplate) {
    super(node);
    this.$className = classTemplate;
    const template = node.querySelector(`.${classTemplate}`);
    if (!template) {
      throw new Error(`Invalid List template with name ${classTemplate}`);
    }

    // Hide the template
    template.classList.add('d-none');

    // Create a prototype row
    this.$prototype = template.cloneNode(true);
    this.$prototype.classList.remove(this.$className);
  }

  /**
  * Add or update an existing row. When adding a row, it is cloned from the template
  * and added to the end of the view element.
  * @param {string} key - A unique identifier for the row.
  * @returns View - The view added or to be updated in the list
  * @fires List#list:click
  */
  set(key) {
    let row = this.getForKey(key);

    // Clone a row
    if (!row) {
      row = this.$prototype.cloneNode(true);
      row.addEventListener('click', (evt) => {
        this.dispatchEvent(EVENT_CLICK, this, evt.target, key);
      });
      super.append(row);
    }

    // Set row key
    if (key) {
      row.id = key;
    }

    // Show the row
    row.classList.remove('d-none');

    // Return the row
    return new View(row);
  }

  /**
   * Return a Node representing a row.
   * @param {string} key - A unique identifier for the row.
   * @returns Node - The view representing the row
   */
  getForKey(key) {
    // TODO return a view object?
    return key ? this.query(`#${key}`) : undefined;
  }

  /**
   * Remove a row from the view.
   * @param {string} key - A unique identifier for the row.
   */
  deleteForKey(key) {
    const row = this.getForKey(key);
    if (row) {
      row.remove();
    }
  }

  /**
   * Update the list by adding a class name to a row identified by key,
   * and remove the class name from all other rows.
   * @param {string} key - A unique identifier for the row.
   * @param {string} className - The class name to use.
   */
  setClassForKey(key, className) {
    super.queryAll(`.${className}`).forEach((node) => {
      node.classList.remove(className);
    });
    const selectedNode = super.query(`#${key}`);
    if (selectedNode) {
      selectedNode.classList.add(className);
    }
    return selectedNode;
  }

  /**
   * Sort rows in order according the the keys provided.
   * @param {string[]} keys - The ordered array of keys.
   */
  sortForKeys(keys) {
    for (let i = keys.length - 1; i >= 0; i -= 1) {
      const row = this.getForKey(keys[i]);
      if (row) {
        super.preprend(row);
      }
    }
  }

  /**
   * Clear all rows
   */
  clear() {
    while (this.$node.firstChild) {
      this.$node.removeChild(this.$node.firstChild);
    }
  }
}
