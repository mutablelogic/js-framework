import { LitElement, html, css } from 'lit';

/**
* SidebarNavElement
* This class is used to create a left or right hand sidebar.
*/
// eslint-disable-next-line import/prefer-default-export
export class SidebarNavElement extends LitElement {
  static get localName() {
    return 'wc-sidebar-nav';
  }

  static get properties() {
    return {};
  }

  static get styles() {
    return css`
    :host {
      color: var(--sidebar-color);
      background-color: var(--sidebar-background-color);
      padding: var(--sidebar-padding-y) var(--sidebar-padding-x);
    }
    :host(:first-child) {
      border-right: 1px solid var(--sidebar-border-edge-color);
    }
    :host(:last-child) {
      border-left: 1px solid var(--sidebar-border-edge-color);      
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <slot></slot>
    `;
  }
}
