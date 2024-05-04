import { LitElement, html, css, nothing } from 'lit';

/**
 * @class NavSpacerElement
 *
 * This class is used as a spacer to separate navigation items to push siblings apart
 *
 * @example
 * <wc-nav-group name="group" vertical>
 *  <wc-nav-item name="item-top">....</wc-nav-item>
 *  <wc-nav-spacer></wc-nav-spacer>
 *  <wc-nav-item name="item-bottom">....</wc-nav-item>
 * </wc-nav-group>
 */
export class NavSpacerElement extends LitElement {
  static get localName() {
    return 'wc-nav-spacer';
  }

  static get styles() {
    return css``;
  }

  render() {
    return html`
      <li class=${this.classes.join(' ') || nothing}></li>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  get classes() {
    const classes = [];
    classes.push('spacer');
    return classes;
  }
}
