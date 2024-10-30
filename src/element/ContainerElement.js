import {
  LitElement, html, css, nothing,
} from 'lit';

/**
 * @class ContainerElement
 *
 * This class provides a content container
 *
 * @example
 * <js-container>OK</js-container>
 */
export class ContainerElement extends LitElement {
  static get localName() {
    return 'js-container';
  }

  static get properties() {
    return {};
  }

  static get styles() {
    return css`
      div {
        display: block;
        padding: var(--container-padding);
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
