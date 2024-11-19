import {
  LitElement, html, css, nothing,
} from 'lit';

/**
 * @class ContentElement
 *
 * This class provides a content container
 *
 * @example
 * <js-content>OK</js-content>
 */
export class ContentElement extends LitElement {
  static get localName() {
    return 'js-content';
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

  render() {
    return html`
        <slot></slot>
      `;
  }
}
