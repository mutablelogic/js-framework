import {
  LitElement, html, css,
} from 'lit';

/**
 * @class NavSpacerElement
 *
 * This class provides a space between navigation items.
 *
 * @example
 * <js-nav>
 *   <js-navitem>Left</js-navitem>
 *   <js-navspacer></js-navspacer>
 *   <js-navitem>Right</js-navitem>
 * </js-nav>
 */
export class NavSpacerElement extends LitElement {
  static get localName() {
    return 'js-navspacer';
  }

  static get properties() {
    return {};
  }

  static get styles() {
    return css`
      :host {
        flex: 1;
      }
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <li class="disabled"></li>
    `;
  }
}
