import { LitElement, html, css, nothing } from 'lit';

/**
 * @class CanvasElement
 *
 * This class is used to contain  content boxes which are stacked
 * vertically or horizontally within the canvas.
 *
 * @property {Boolean} vertical - Fill the canvas vertically rather than horizontally, default false
 * @property {String} backgroundColor - Background color of the canvas, light or dark, default light
 *
 * @example
 * <wc-canvas vertical>
 *  <wc-canvas-content>....</wc-canvas-content>
 *  <wc-canvas-content>....</wc-canvas-content>
 *  <wc-canvas-content>....</wc-canvas-content>
 * </wc-canvas>
 */
export class CanvasElement extends LitElement {
  static get localName() {
    return 'wc-canvas';
  }

  constructor() {
    super();
    this.backgroundColor = 'light';
    this.vertical = false;
  }

  static get properties() {
    return {
      vertical: { type: Boolean },
      backgroundColor: { type: String },
    };
  }

  static get styles() {
    return css`
      div {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
      }

      div:not(.vertical) {
        flex-direction: row;
      }

      div.vertical {
        flex-direction: column;
      }

      /* Any canvas section is in flexbox mode with a fixed size */
      ::slotted(wc-canvas-section),::slotted(wc-canvas-navbar) {
        display: flex;
        justify-content: start;
        border-style: none;
      }

      /* The first section in vertical mode gets a border below */
      div.vertical > ::slotted(wc-canvas-navbar:first-child),div.vertical > ::slotted(wc-canvas-section:first-child) {
        min-height: 40px;
        border-bottom-style: solid;
      }

      /* The first section in horizontal mode gets a border right */
      div:not(.vertical) > ::slotted(wc-canvas-navbar:first-child), div:not(.vertical) > ::slotted(wc-canvas-section:first-child) {
        min-width: 60px;
        border-right-style: solid;
      }

      /* The last section in vertical mode gets a border above */
      div.vertical > ::slotted(wc-canvas-navbar:last-child),div.vertical > ::slotted(wc-canvas-section:last-child) {
        min-height: 30px;
        border-top-style: solid;
      }

      /* The last section in horizonal mode gets a border left */
      div:not(.vertical) > ::slotted(wc-canvas-navbar:last-child),div:not(.vertical) > ::slotted(wc-canvas-section:last-child) {
        min-width: 60px;
        border-left-style: solid;
      }

      /* Flex containers stretch */
      ::slotted(wc-canvas-section[flex]) {
        flex: 999 0;
        overflow: auto;
      }

      /* Light theme setting colours and border widths */
      div.bg-color-light {
        & ::slotted(wc-canvas-navbar), ::slotted(wc-canvas-section) {
          background-color: var(--light-color);
          color: var(--dark-color);
          border-color: var(--grey-20-color);
          border-width: 1px;
        }
      }

      /* Dark theme setting colours and border widths */
      div.bg-color-dark {
        & ::slotted(wc-canvas-navbar), ::slotted(wc-canvas-section) {
          background-color: var(--dark-color);
          color: var(--light-color);
          border-color: var(--grey-40-color);
          border-width: 1px;
        }
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
    if (this.backgroundColor) {
      classes.push(`bg-color-${this.backgroundColor}`);
    }
    if (this.vertical) {
      classes.push('vertical');
    }
    return classes.join(' ');
  }
}
