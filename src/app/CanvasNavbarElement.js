import { html, css, nothing } from 'lit';
import { CanvasSectionElement } from './CanvasSectionElement';

/**
 * @class CanvasNavbarElement
 *
 * This class is a navigaton used to contain content boxes which are stacked
 * vertically or horizontally within the canvas.
 *
 * @example
 * <w2-canvas vertical>
 *  <w2-canvas-navbar>....</w2-canvas-navbar>
 *  <w2-canvas-section>....</w2-canvas-section>
 *  <w2-canvas-navbar>....</w2-canvas-navbar>
 * </w2-canvas>
 */
export class CanvasElement extends CanvasSectionElement {
  static get localName() {
    return 'w2-canvas-navbar';
  }

  constructor() {
    super();
    this.hidden = false;
  }

  static get properties() {
    return {
      /**
       * @property {Boolean} hidden - Whether the navigation is hidden
       */
      hidden: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      .hidden {
        display: none;        
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

  // eslint-disable-next-line class-methods-use-this
  get className() {
    const classes = [];
    if (this.hidden) {
      classes.push('hidden');
    }
    return classes.join(' ');
  }
}
