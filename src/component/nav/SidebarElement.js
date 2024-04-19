
import { LitElement, html, css } from 'lit';

/**
* SidebarElement
* This class is used to create a sidebar element that can be used to display a
* sidebar either on the left or right side of the screen. The sidebar can be used
* to display navigation links, icons, or any other content, and can be customized 
* to collapse or expand with animations.
*
* @example
* <wc-sidebar>
*   <h1>This is a sidebar</h1>
* </wc-sidebar>
*/
// eslint-disable-next-line import/prefer-default-export
export class SidebarElement extends LitElement {
  static get localName() {
    return 'wc-sidebar';
  }

  static get properties() {
    return {};
  }

  static get styles() {
    return css`
    div {            
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 250px;
      background-color: red;
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
