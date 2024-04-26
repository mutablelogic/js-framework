import { LitElement, html, css, nothing } from 'lit';

/**
 * @class CanvasElement
 *
 * This class is used to contain  content boxes which are stacked
 * vertically or horizontally within the canvas.
 *
 * @example
 * <w2-canvas vertical>
 *  <w2-canvas-content>....</w2-canvas-content>
 *  <w2-canvas-content>....</w2-canvas-content>
 *  <w2-canvas-content>....</w2-canvas-content>
 * </w2-canvas>
 */
export class CanvasElement extends LitElement {
  static get localName() {
    return 'w2-canvas';
  }

  constructor() {
    super();
    this.backgroundColor = 'light';
  }

  static get properties() {
    return {
      /**
       * @property {Boolean} vertical - Fill the canvas vertically rather than horizontally
       */
      vertical: { type: Boolean },

      /**
       * @property {String} backgroundColor - Background color of the canvas
       * @default 'light'
       */
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

      /* Any canvas section is in flexbox mode */
      ::slotted(w2-canvas-section),::slotted(w2-canvas-navbar) {
        display: flex;
        flex: 0 0;
        justify-content: center;
        border-style: none;
      }

      /* The first section in vertical mode gets a border below */
      div.vertical > ::slotted(w2-canvas-navbar:first-child),div.vertical > ::slotted(w2-canvas-section:first-child) {
        min-height: 40px;
        border-bottom-style: solid;
      }
      /* The first section in horizontal mode gets a border right */
      div:not(.vertical) > ::slotted(w2-canvas-navbar:first-child), div:not(.vertical) > ::slotted(w2-canvas-section:first-child) {
        min-width: 60px;
        border-right-style: solid;
      }
      /* The last section in vertical mode gets a border above */
      div.vertical > ::slotted(w2-canvas-navbar:last-child),div.vertical > ::slotted(w2-canvas-section:last-child) {
        min-height: 30px;
        border-top-style: solid;
      }
      /* The last section in horizonal mode gets a border left */
      div:not(.vertical) > ::slotted(w2-canvas-navbar:last-child),div:not(.vertical) > ::slotted(w2-canvas-section:last-child) {
        min-width: 60px;
        border-left-style: solid;
      }

      /* Flex containers stretch */
      ::slotted(w2-canvas-section[flex]) {
        flex: 999 0;
        overflow: auto;
      }

      /* Light theme setting colours and border widths */
      div.bg-color-light ::slotted(w2-canvas-navbar) {
        background-color: var(--light-color);
        color: var(--dark-color);
        border-color: var(--grey-20-color);
        border-width: 1px;
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
