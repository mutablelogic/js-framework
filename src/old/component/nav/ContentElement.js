import { LitElement, html, css } from 'lit';

/**
* ContentElement
* This class is used as a content container within a canvas element
*/
// eslint-disable-next-line import/prefer-default-export
export class ContentElement extends LitElement {
  static get localName() {
    return 'wc-content';
  }

  static get properties() {
    return {
      /**
       * Width of the content element. If empty, the content will take up the remaining space
       * and if to zero, no content will be displayed
       *
       * @type {String}
       * @default ''
       * @memberof ContentElement
       */
      width: { type: String },
    };
  }

  static get styles() {
    return css`
    div {
      overflow: scroll;
      align-self: stretch;
    }
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <div><slot></slot></div>
    `;
  }
}
