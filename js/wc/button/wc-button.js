import { LitElement, html, css } from 'lit';
import Event from '../event';

/**
 * A basic button element
 *
 * @fires wc-click - Fired when the button is pressed
 * @slot - This element has a slot
 */
window.customElements.define('wc-button', class extends LitElement {
  static get properties() {
    return {
      /**
       * Whether the button is disabled
       * @type {boolean}
       */
      disabled: { type: Boolean },

      /**
       * Name of the button to use when firing the wc-click event
       * @type {string}
       */
      name: { type: String },
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
          padding: var(--button-padding-y) var(--button-padding-x);
          font-size: var(--button-font-size);
          border: none;
          border-top-left-radius: var(--button-border-radius-left);
          border-bottom-left-radius: var(--button-border-radius-left);
          border-top-right-radius: var(--button-border-radius-right);
          border-bottom-right-radius: var(--button-border-radius-right);
        }
        button:active {          
          top: var(--button-offset-active); 
          left: var(--button-offset-active); 
          color: var(--button-color-active); 
          background-color: var(--button-background-color-active); 
          font-weight:  var(--button-font-weight-active);
        }
        button:hover {
          color: var(--button-color-hover); 
          background-color: var(--button-background-color-hover); 
          font-weight:  var(--button-font-weight-hover);
        }
        button.disabled {
          pointer-events: none;
          color: var(--button-color-disabled); 
          background-color: var(--button-background-color-disabled); 
          font-weight:  var(--button-font-weight-disabled);
        }
      `;
  }

  render() {
    return html`
        <button @click=${this.onClick} class="${this.disabled ? 'disabled' : ''}" type="${this.hasParent('WC-FORM') ? 'submit' : ''}"><slot></slot></button>
      `;
  }

  hasParent(tagName) {
    let parentNode = this.parentElement;
    while (parentNode) {
      if (parentNode.tagName === tagName) {
        return true;
      }
      parentNode = parentNode.parentElement;
    }
    return false;
  }

  onClick() {
    this.dispatchEvent(new CustomEvent(
      Event.EVENT_CLICK, { detail: this.name || this.textContent },
    ));
  }
});
