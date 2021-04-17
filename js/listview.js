// View class to be subclassed by an actual view

import View from './view';
import Error from './error';

// ////////////////////////////////////////////////////////////////////////////
// CONSTANTS

const EVENT_ROOT = 'mvc.listview';
const EVENT_UPDATE = `${EVENT_ROOT}.update`;
const EVENT_CHANGE = `${EVENT_ROOT}.change`;
const EVENT_CLICK = `${EVENT_ROOT}.click`;

// ////////////////////////////////////////////////////////////////////////////
// LISTVIEW

export default class ListView extends View {
  constructor(node, classTemplate) {
    super(node);
    this.$className = classTemplate;
    const template = node.querySelector(`.${classTemplate}`);
    if (!template) {
      throw new Error(`Invalid ListView template with name ${classTemplate}`);
    }

    // Create a prototype row
    this.$prototype = template.cloneNode(true);
    this.$prototype.classList.remove(this.$className);

    // Hide the template
    View.$hide(template);
  }

  set(obj, key) {
    let row = this.getForKey(key);

    // Clone a row
    if (!row) {
      row = this.$prototype.cloneNode(true);
      row.addEventListener('change', (evt) => this.$change(evt, key));
      row.addEventListener('click', (evt) => this.$click(evt, key));
      super.append(row);
    }

    // Set row key
    if (key) {
      row.id = key;
    }

    // Emit changed event
    this.dispatchEvent(EVENT_UPDATE, this, obj, row);

    // Show the row
    View.$show(row);

    // Return the row
    return row;
  }

  getForKey(key) {
    return key ? this.queryNode(`#${key}`) : undefined;
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

  $change(evt, key) {
    this.dispatchEvent(EVENT_CHANGE, this, key, evt.target);
  }

  $click(evt, key) {
    this.dispatchEvent(EVENT_CLICK, this, key, evt.target);
  }
}
