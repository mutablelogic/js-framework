import { LitElement, html, css } from 'lit';

/**
* SidebarElement
* This class is used to create a sidebar left/right element that can be used to 
* display a sidebar either on the left or right side of the screen, with content
* in the middle. The sidebars can be used to display navigation links, icons, 
* or any other content, and can be customized to collapse or expand with animations.
*
* @example
* <wc-sidebar>
*   <wc-sidebar-nav>Left sidebar</wc-sidebar-nav>
*   <wc-sidebar-content>This is the content</wc-sidebar-content>
*   <wc-sidebar-nav>Right sidebar</wc-sidebar-nav>
* </wc-sidebar>
*/
export class SidebarElement extends LitElement {
  static get localName() {
    return 'wc-sidebar';
  }

  static get properties() {
    return {};
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: stretch;
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
