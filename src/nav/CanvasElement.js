import { LitElement, html, css } from 'lit';

/**
* CanvasElement
* This class is used to create a sidebar left/right element that can be used to 
* display a sidebar either on the left or right side of the screen, with content
* in the middle. The sidebars can be used to display navigation links, icons, 
* or any other content, and can be customized to collapse or expand with animations.
*
* @example
* <wc-canvas>
*   <wc-sidebar>Left sidebar</wc-sidebar>
*   <wc-content>This is the content</wc-content>
*   <wc-sidebar>Right sidebar</wc-sidebar>
* </<wc-canvas>
*/
export class CanvasElement extends LitElement {
  static get localName() {
    return 'wc-canvas';
  }

  static get properties() {
    return {};
  }

  static get styles() {
    return css`
      div.canvas {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <div class="canvas">
        <slot></slot>
      </div>
    `;
  }
}
