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
        div {
          display: block;
          padding: var(--content-padding);
        } 
      `;
  }

  render() {
    return html`
        <div class=${this.classes.join(' ') || nothing}><slot></slot></div>      
      `;
  }

  // eslint-disable-next-line class-methods-use-this
  get classes() {
    const classes = [];
    return classes;
  }
}
