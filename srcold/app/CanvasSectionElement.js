import { LitElement, html, css, nothing } from 'lit';

/**
 * @class CanvasSectionElement
 *
 * This class is used for content boxes which are stacked
 * vertically or horizontally within a canvas. The content
 * boxes can be flexed to fill the available space.
 *
 * @property {Boolean} flex - Flex the element to fill the available space, default false
 *
 * @example
 * <wc-canvas vertical>
 *  <wc-canvas-section>....</wc-canvas-section>
 *  <wc-canvas-section>....</wc-canvas-section>
 *  <wc-canvas-section>....</wc-canvas-section>
 * </wc-canvas>
 */
export class CanvasSectionElement extends LitElement {
  static get localName() {
    return 'wc-canvas-section';
  }

  static get properties() {
    return {
      flex: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      .flex {
        flex: 999 0;
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
