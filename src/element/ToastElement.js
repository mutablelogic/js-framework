import { LitElement, html, css, nothing } from 'lit';

/**
 * @class ToastElement
 *
 * This class provides a popup toast element
 *
 * @example
 * <js-toast>Error</js-toast>
 */
export class ToastElement extends LitElement {
  static get localName() {
    return 'js-toast';
  }

  static get properties() {
    return {
      color: { type: String, reflect: true },
      visible: { type: Boolean, reflect: true },
    };
  }

  static get styles() {
    return css`
      :host div {
        position: fixed;
        z-index: 1000;
        right: 0;
        bottom: 0;
        margin: var(--toast-margin);
        padding: var(--toast-padding);
        border: var(--toast-border);

        &.visible {
          display: block;
          animation: fadein 0.5s, fadeout 0.5s 2.5s;
        }

        &.hidden {
          display: none;
          animation: fadein 0.5s, fadeout 0.5s 2.5s;
        }
      }
      .color-primary {
        background-color: var(--toast-background-color-primary);
        color: var(--toast-color-primary);
        border-color: var(--toast-border-color-primary);
      }
      .color-secondary {
        background-color: var(--toast-background-color-secondary);
        color: var(--toast-color-secondary);
        border-color: var(--toast-border-color-secondary);
      }
      .color-success {
        background-color: var(--toast-background-color-success);
        color: var(--toast-color-success);
        border-color: var(--toast-border-color-success);
      }
      .color-warning {
        background-color: var(--toast-background-color-warning);
        color: var(--toast-color-warning);
        border-color: var(--toast-border-color-warning);
      }
      .color-error {
        background-color: var(--toast-background-color-error);
        color: var(--toast-color-error);
        border-color: var(--toast-border-color-error);
      }
      .color-light {
        background-color: var(--toast-background-color-light);
        color: var(--toast-color-light);
        border-color: var(--toast-border-color-light);
      }
      .color-dark {
        background-color: var(--toast-background-color-dark);
        color: var(--toast-color-dark);
        border-color: var(--toast-border-color-dark);
      }
      .color-white {
        background-color: var(--toast-background-color-white);
        color: var(--toast-color-white);
        border-color: var(--toast-border-color-white);
      }
      .color-black {
        background-color: var(--toast-background-color-black);
        color: var(--toast-color-black);
        border-color: var(--toast-border-color-black);
      }        
    `;
  }

  constructor() {
    super();
    this.color = 'error';
  }

  render() {
    return html`
      <div class=${this.classes.join(' ') || nothing}><slot></slot></div>      
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  get classes() {
    const classes = [];
    classes.push(`color-${this.color}`);
    if (this.visible) {
      classes.push('visible');
    } else {
      classes.push('hidden');
    }
    return classes;
  }
}
