// List class

import View from './view';
import Error from './error';

// ////////////////////////////////////////////////////////////////////////////
// CONSTANTS

const EVENT_ROOT = 'mvc.list';
const EVENT_CLICK = `${EVENT_ROOT}.click`;

// ////////////////////////////////////////////////////////////////////////////
// LISTVIEW

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

  set(obj, key) {
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

  getForKey(key) {
    return key ? this.query(`#${key}`) : undefined;
  }

  deleteForKey(key) {
    const row = this.getForKey(key);
    if (row) {
      row.remove();
    }
  }

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

  sortForKeys(keys) {
    for (let i = keys.length - 1; i >= 0; i -= 1) {
      const row = this.getForKey(keys[i]);
      if (row) {
        super.preprend(row);
      }
    }
  }
}
