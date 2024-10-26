import { html, css, nothing } from 'lit';
import { CanvasSectionElement } from './CanvasSectionElement';

/**
 * @class CanvasNavbarElement
 *
 * This class is a navigaton used to contain content boxes which are stacked
 * vertically or horizontally within the canvas.
 *
 * @property {Boolean} hidden - Whether the navigation is hidden, default false
 *
 * @example
 * <wc-canvas vertical>
 *  <wc-canvas-navbar>....</wc-canvas-navbar>
 *  <wc-canvas-section>....</wc-canvas-section>
 *  <wc-canvas-navbar>....</wc-canvas-navbar>
 * </wc-canvas>
 */
export class CanvasNavbarElement extends CanvasSectionElement {
  static get localName() {
    return 'wc-canvas-navbar';
  }

  constructor() {
    super();
    this.hidden = false;
  }

  static get properties() {
    return {
      hidden: { type: Boolean },
    };
  }

  static get styles() {
    return css`
    /* Navbars are flexed to fill the available space */
    div {
      display: flex;
      align-items: start;
      flex: 1;
    }
    `;
  }

  render() {
    return html`
      <div class=${this.classes.join(' ') || nothing}>
        <slot></slot>
      </div>
    `;
  }

  get classes() {
    const classes = [];
    if (this.hidden) {
      classes.push('hidden');
    }
    return classes;
  }
}
