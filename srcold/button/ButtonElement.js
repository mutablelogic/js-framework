import { LitElement, html, css, nothing } from 'lit';
import { EventType } from '../core/Event';

/**
 * @class ButtonElement
 *
 * This class is used as a button, either a control (close, help, etc), a form submission or
 * a normal button.
 *
 * @property {String} name - The name of the button
 * @property {String} type - The type of the button if not standard
 *                           (control, submit)
 * @property {String} textTransform - If the button text should be transformed
 *                                    (uppercase, lowercase, capitalize)
 * @property {Boolean} disabled - Whether the button is disabled
 * @property {String} popup - The associated popup to show when the button is clicked
 *
 * @example
 * <wc-button type="control">Close</wc-button>
 */
export class ButtonElement extends LitElement {
  static get localName() {
    return 'wc-button';
  }

  constructor() {
    super();

    // Default properties
    this.name = '';
    this.type = '';
    this.textTransform = '';
    this.disabled = false;
    this.popup = '';
  }

  static get properties() {
    return {
      name: { type: String },
      type: { type: String },
      textTransform: { type: String },
      disabled: { type: Boolean },
      popup: { type: String },
    };
  }

  static get styles() {
    return css`
      button {
        display: inline-block;
        position: relative;  
        margin: none;
        padding: var(--button-padding-y) var(--button-padding-x);
        color: var(--button-color); 
        background-color: var(--button-background-color); 
        cursor: pointer;
        user-select: none;
      }
      button.control {
        color: var(--button-control-color); 
        background: transparent;
        border: none;
        padding: var(--button-control-padding-y) var(--button-control-padding-x);

        &:hover {
          color: var(--button-control-color-hover);
        }
        &:active {
          color: var(--button-control-color-active);
        }
        &:disabled {
          color: var(--button-control-color-disabled);
          cursor: default;
        }
      }
    `;
  }

  get classes() {
    const classes = [];
    if (this.type) {
      classes.push(this.type.toLowerCase());
    }
    if (this.textTransform) {
      classes.push(`text-transform-${this.textTransform.toLowerCase()}`);
    }
    return classes;
  }

  get buttonTitle() {
    return this.textContent.trim();
  }

  get controlButtonIcon() {
    switch (this.buttonTitle.toLowerCase()) {
      case 'close':
        return 'x-square';
      case 'help':
        return 'question-square';
      case 'maximise':
        return 'fullscreen';
      case 'minimise':
        return 'fullscreen-exit';
      default:
        return '';
    }
  }

  firstUpdated() {
    if (this.popup) {
      // Attach the popover target element
      const buttonNode = this.shadowRoot.querySelector('button');
      const targetNode = document.getElementById(this.popup);
      if (buttonNode && targetNode) {
        buttonNode.popoverTargetElement = targetNode;
      }
    }
  }

  renderButton() {
    return html`
      <button class=${this.classes.join(' ') || nothing} 
        name=${this.name || nothing} value=${this.buttonTitle || nothing}       
        ?disabled=${this.disabled} 
        @click=${this.onClick}>
        <slot></slot>
      </button>
    `;
  }

  renderSubmit() {
    return html`
      <button class=${this.classes.join(' ') || nothing} 
        type="submit" ?disabled=${this.disabled} 
        name=${this.name || nothing} value=${this.buttonTitle || nothing} 
        ?disabled=${this.disabled} 
        @click=${this.onClick}>
        <slot></slot>
      </button>
    `;
  }

  renderControl() {
    const icon = this.controlButtonIcon;
    if (icon) {
      return html`
        <button class=${this.classes.join(' ') || nothing} 
          name=${this.name || nothing} value=${this.buttonTitle || nothing} 
          ?disabled=${this.disabled} 
          @click=${this.onClick}>
          <wc-icon name=${icon}></wc-icon>
        </button>
      `;
    }
    return this.renderButton();
  }

  render() {
    switch (this.type.toLowerCase()) {
      case 'control':
        return this.renderControl();
      case 'submit':
        return this.renderSubmit();
      default:
        return this.renderButton();
    }
  }

  // Change the selected state when the input is changed
  onClick() {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent(EventType.CLICK, {
        bubbles: true,
        composed: true,
        detail: this.name || this.buttonTitle,
      }));
    }
  }
}
