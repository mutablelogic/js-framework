import { LitElement, html, css } from 'lit';

/**
* SidebarContentElement
* This class is used as a content container
*/
// eslint-disable-next-line import/prefer-default-export
export class SidebarContentElement extends LitElement {
  static get localName() {
    return 'wc-sidebar-content';
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
      <slot></slot>
    `;
  }
}
