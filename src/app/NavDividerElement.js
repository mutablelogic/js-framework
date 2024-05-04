import { LitElement, html, css, nothing } from 'lit';

/**
 * @class NavDividerElement
 *
 * This class is used as a visible divider between navigation items
 *
 * @example
 * <wc-nav-group name="group" vertical>
 *  <wc-nav-item name="item-top">....</wc-nav-item>
 *  <wc-nav-divider></wc-nav-divider>
 *  <wc-nav-item name="item-bottom">....</wc-nav-item>
 * </wc-nav-group>
 */
export class NavDividerElement extends LitElement {
  static get localName() {
    return 'wc-nav-divider';
  }

  render() {
    return html`
      <hr>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  get classes() {
    const classes = [];
    classes.push('divider');
    return classes;
  }
}
