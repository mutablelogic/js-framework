
import { LitElement, html, css } from 'lit';
import Event from '../../core/event';

export class ButtonElement extends LitElement {
  static get properties() {
    return {
      /**
       * Name of the button to use when firing the EVENT_CLICK event
       * @type {String}
       */
      name: { type: String },

      /**
       * Whether the button is disabled
       * @type {Boolean}
       */
      disabled: { type: Boolean },

      /**
       * Set to URL to render <a> element styled as button.
       * @type {String}
       */
      link: { type: String },

      /**
       * The text transform,  none, uppercase, lowercase,capitalize
       * @type {String}
       */
      transform: { type: String },      
    };
  }

  static get styles() {
    return css`
    button {
      display: inline-block;
      position: relative;
      color: var(--button-color); 
      background-color: var(--button-background-color); 
      font-weight:  var(--button-font-weight);
      font-size: var(--button-font-size);
      border: none;
      margin: none;
      padding: var(--button-padding-y) var(--button-padding-x);
      border-top-left-radius: var(--button-border-radius-left);
      border-bottom-left-radius: var(--button-border-radius-left);
      border-top-right-radius: var(--button-border-radius-right);
      border-bottom-right-radius: var(--button-border-radius-right);      
    }
    button:active button:focus {          
      top: var(--button-offset-active); 
      left: var(--button-offset-active); 
      color: var(--button-color-active); 
      background-color: var(--button-background-color-active); 
      font-weight: var(--button-font-weight-active);
    }
    button:hover {
      color: var(--button-color-hover); 
      background-color: var(--button-background-color-hover); 
      font-weight:  var(--button-font-weight-hover);
    }
    button:disabled {
      pointer-events: none;
      color: var(--button-color-disabled); 
      background-color: var(--button-background-color-disabled); 
      font-weight:  var(--button-font-weight-disabled);
    }
    .text-transform-capitalize {
      text-transform: capitalize;
    }
    .text-transform-uppercase {
      text-transform: uppercase;
    }
    .text-transform-lowercase {
      text-transform: lowercase;
    }
    .text-transform-none {
      text-transform: none;
    }        
    `;
  }

  render() {
    return html`
      ${this.link
        ? html`
            <a role="button" class="button ${this.transform ? `text-transform-${this.transform}` : ''}" href="${this.link}" ?disabled="${this.disabled}" @click=${this.onClick}>
              <slot></slot>
            </a>
          `
        : html`
            <button role="button" type="button" class="button ${this.transform ? `text-transform-${this.transform}` : ''}" ?disabled="${this.disabled}" @click=${this.onClick}>
              <slot></slot>
            </button>
          `}
    `;
  }

  constructor() {
    super();
    // Default properties
    this.disabled = false;
    this.name = '';
    this.link = '';
    this.transform = 'none';
  }

  onClick() {
    this.dispatchEvent(new CustomEvent(
      Event.EVENT_CLICK, { detail: this.name || this.textContent },
    ));
  }
}

window.customElements.define('js-button', ButtonElement);

