
import { LitElement, html, css } from 'lit';
import { Event } from '../../core/Event';

/**
 * A button element
 */
export class ButtonElement extends LitElement {
  #internals;

  constructor() {
    super();

    // Attach with the form
    this.#internals = this.attachInternals();

    // Default properties
    this.name = '';
    this.disabled = false;
    this.link = '';
    this.transform = 'none';
    this.submit = false;
    this.default = false;
  }
  static get formAssociated() {
    return true;
  }
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

      /**
       * The text transform,  none, uppercase, lowercase,capitalize
       * @type {Boolean}
      */
      submit: { type: Boolean },

      /**
       * Whether the button is the default button
       * @type {Boolean}
      */
      default: { type: Boolean },
    };
  }

  static get styles() {
    return css`
    .button {
      display: inline-block;
      position: relative;

      margin: none;
      padding: var(--button-padding-y) var(--button-padding-x);
      border: var(--button-border) solid var(--button-border-color);      
      border-top-left-radius: var(--button-border-radius-left);
      border-bottom-left-radius: var(--button-border-radius-left);
      border-top-right-radius: var(--button-border-radius-right);
      border-bottom-right-radius: var(--button-border-radius-right);    

      color: var(--button-color); 
      background-color: var(--button-background-color); 
      font-weight:  var(--button-font-weight);
      font-size: var(--button-font-size);

      cursor: pointer;
    }
    a {
      text-decoration: none;
    }
    .button:active {          
      top: var(--button-offset-active); 
      left: var(--button-offset-active); 
      color: var(--button-color-active); 
      background-color: var(--button-background-color-active)  !important; 
      font-weight: var(--button-font-weight-active);
    }
    .button:hover {
      color: var(--button-color-hover); 
      background-color: var(--button-background-color-hover); 
      font-weight:  var(--button-font-weight-hover);
    }
    .button:disabled {
      pointer-events: none;
      color: var(--button-color-disabled); 
      background-color: var(--button-background-color-disabled); 
      font-weight:  var(--button-font-weight-disabled);
    }
    .default {
      font-weight: var(--button-font-weight-default);
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
  buttonType() {
    return this.submit ? 'submit' : 'button';
  }
  render() {
    return html`
      ${this.link
        ? html`
            <a role="button" class="button ${this.transform ? `text-transform-${this.transform}` : ''} ${this.default ? 'default' : ''}" href="${this.link}" ?disabled="${this.disabled}" @click=${this.onClick}>
              <slot></slot>
            </a>
          `
        : html`
            <button role="button" type="${this.buttonType()}" class="button ${this.transform ? `text-transform-${this.transform}` : ''} ${this.default ? 'default' : ''}" ?disabled="${this.disabled}" @click=${this.onClick}>
              <slot></slot>
            </button>
          `}
    `;
  }
  onClick(evt) {
    // If the button is in a form, then create a temporary button to submit the form
    const form = this.formElement();
    if (form && this.submit) {
      evt.preventDefault();
      const tmpButton = document.createElement("button");
      tmpButton.type = "submit";
      tmpButton.name = this.name;
      tmpButton.value = this.textContent;
      tmpButton.style.display = "none";
      form.appendChild(tmpButton);
      tmpButton.click();

      let formData = new FormData(form, tmpButton);
      let formValues = {};
      for (let [key, value] of formData.entries()) {
        formValues[key] = value;
      }
      tmpButton.remove();
      console.log(formValues);
    }

    // Dispatch a click event
    this.dispatchEvent(new CustomEvent(
      Event.EVENT_CLICK, {
      bubbles: true,
      composed: true,
      detail: this.name || this.textContent
    }));
  }
  formElement() {
    return this.#internals.form;
  }
}

customElements.define('wc-button', ButtonElement);


