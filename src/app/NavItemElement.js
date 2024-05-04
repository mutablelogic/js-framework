import { LitElement, html, css, nothing } from 'lit';

/**
 * @class NavItemElement
 *
 * This class is used as a navigation item within a group of navigational items
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

  render() {
    return html`
      <li class=${this.classes.join(' ') || nothing}>
        <slot></slot>
      </li>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  get classes() {
    const classes = [];
    return classes;
  }
}
