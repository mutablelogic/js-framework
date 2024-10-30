import {
  LitElement, html, css, nothing,
} from 'lit';

/**
 * @class CanvasElement
 *
 * This class provides a canvas element for content elements. The content
 * can be displayed in a vertical or horizontal layout.
 *
 * @example
 * <js-canvas vertical>
 *   <js-content>OK</js-content>
 * </js-canvas>
 */
export class CanvasElement extends LitElement {
  static get localName() {
    return 'js-canvas';
  }

  static get properties() {
    return {
      vertical: { type: Boolean, reflect: true },
    };
  }

  static get styles() {
    return css`
        div {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          &.vertical {
            flex-direction: row;
          }
        }
        ::slotted(test) {
          border: 0.05rem solid red;
        }
      `;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <div class=${this.classes.join(' ') || nothing}><slot></slot></div>
    `;
  }

  get classes() {
    const classes = [];
    if (this.vertical) {
      classes.push('vertical');
    }
    return classes;
  }
}
