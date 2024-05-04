import { LitElement, html, css, nothing } from 'lit';

/**
 * @class NavItemElement
 *
 * This class is used as a navigation item within a group of navigational items
 *
 * @property {Boolean} vertical - Fill the canvas vertically rather than horizontally, default false
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
    this.vertical = false;
  }

  static get properties() {
    return {
      vertical: { type: Boolean },
    };
  }

  static get styles() {
    return css``;
  }

  render() {
    return html`
      <li class=${this.className || nothing}>
        <slot></slot>
      </li>
    `;
  }

  get className() {
    const classes = [];
    if (this.vertical) {
      classes.push('vertical');
    }
    return classes.join(' ');
  }
}
