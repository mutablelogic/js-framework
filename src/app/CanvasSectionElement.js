import { LitElement, html, css, nothing } from 'lit';

/**
 * @class CanvasSectionElement
 *
 * This class is used for content boxes which are stacked
 * vertically or horizontally within a canvas. The content
 * boxes can be flexed to fill the available space.
 *
 * @example
 * <w2-canvas vertical>
 *  <w2-canvas-section>....</w2-canvas-section>
 *  <w2-canvas-section>....</w2-canvas-section>
 *  <w2-canvas-section>....</w2-canvas-section>
 * </w2-canvas>
 */
export class CanvasSectionElement extends LitElement {
  static get localName() {
    return 'w2-canvas-section';
  }

  static get properties() {
    return {
      /**
       * @property {Boolean} flex - Flex the element to fill the available space
       */
      flex: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {}
      div {
        left: 0;
        right: 0;
        border: 1px solid red;
      }
    `;
  }

  render() {
    return html`
      <div class=${this.className || nothing}>
        <slot></slot>
      </div>
    `;
  }

  get className() {
    const classes = [];
    if (this.flex) {
      classes.push('flex');
    }
    return classes.join(' ');
  }
}
