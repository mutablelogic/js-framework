import { LitElement, html, nothing } from 'lit';

/**
 * @class NavItemElement
 *
 * This class is used as a navigation item within a group of navigational items
 *
 * @property {String} name - The name of the navigational item
 * @property {Boolean} selected - Whether the item is selected
 * @property {Boolean} disabled - Whether the item is disabled
 *
 * @example
 * <wc-nav-group name="group" vertical>
 *  <wc-nav-item name="item-top">....</wc-nav-item>
 *  <wc-nav-spacer></wc-nav-spacer>
 *  <wc-nav-item name="item-bottom">....</wc-nav-item>
 * </wc-nav-group>
 */
export class NavItemElement extends LitElement {
  static get localName() {
    return 'wc-nav-item';
  }

  constructor() {
    super();

    // Default properties
    this.name = '';
    this.selected = false;
    this.disabled = false;
  }

  static get properties() {
    return {
      name: { type: String },
      selected: { type: Boolean },
      disabled: { type: Boolean },
    };
  }

  render() {
    return html`
      <li class=${this.classes.join(' ') || nothing}>
        <slot></slot>
      </li>
    `;
  }

  get classes() {
    const classes = [];
    if (this.selected) {
      classes.push('selected');
    }
    if (this.disabled) {
      classes.push('disabled');
    }
    return classes;
  }
}
