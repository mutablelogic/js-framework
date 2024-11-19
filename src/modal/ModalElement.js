import {
  LitElement, html, css, nothing,
} from 'lit';

/**
 * @class ModalElement
 *
 * This class provides a modal content container which is initially hidden
 *
 * @example
 * <js-modal select="#button">OK</js-modal>
 */
export class ModalElement extends LitElement {
  static get localName() {
    return 'js-modal';
  }

  static get properties() {
    return {
      visible: { type: Boolean, reflect: true },
      select: { type: String, reflect: true },
    };
  }

  static get styles() {
    return css`
      div {
        position: fixed; 
        left: 0; 
        top: 0;
        right: 0;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
        transition: visibility var(--modal-fade-delay), opacity var(--modal-fade-delay); 
      }
      .visible {
          display: block;
          visibility: visible;
      }
      .canvas {
        background-color: var(--modal-background-color-canvas);
        opacity: 0;
        &.visible {
          opacity: var(--modal-opacity-canvas);
        }
      }
      .content {
        background-color: var(--modal-background-color);
        margin: var(--modal-margin);
        border: var(--modal-border);
        border-radius: var(--modal-border-radius);        
        display: flex;
        flex-direction: column;
      }
    `;
  }

  render() {
    return html`
      <div class=${this.canvasClasses.join(' ') || nothing}></div>
      <div class=${this.contentClasses.join(' ') || nothing}">
        <slot></slot>
      </div>
    `;
  }

  get canvasClasses() {
    const classes = [];
    classes.push('canvas');
    if (this.visible) {
      classes.push('visible');
    }
    return classes;
  }

  get contentClasses() {
    const classes = [];
    classes.push('content');
    if (this.visible) {
      classes.push('visible');
    }
    return classes;
  }
}
