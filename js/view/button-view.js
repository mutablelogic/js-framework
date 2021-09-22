import { html } from 'lit-html';
import Component from './component';

/// //////////////////////////////////////////////////////////////////
// EVENTS

const EVENT_CLICK = 'button-view:click';

export default {
  EVENT_CLICK,
};

/// //////////////////////////////////////////////////////////////////
// COMPONENT

customElements.define('button-view', class extends Component {
  // Properties
  static get observedAttributes() {
    return ['name', 'disabled'];
  }

  get name() {
    return this.getAttribute('name') || this.textContent;
  }

  set name(v) {
    this.setAttribute('name', v);
  }

  get disabled() {
    return !!this.hasAttribute('disabled');
  }

  set disabled(v) {
    if (v) {
      this.setAttribute('disabled', 'disabled');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get class() {
    return `${this.disabled ? 'disabled' : ''}`;
  }

  // Events
  onClick() {
    this.dispatchEvent(new CustomEvent(EVENT_CLICK, {
      composed: true,
      bubbles: true,
      detail: this.name,
    }));
  }

  // Rendering
  template() {
    return html`
      <style type="text/css">
        button {
          position: relative;
          color: var(--button-color);
          background-color: var(--button-background-color); 
          font-weight:  var(--button-font-weight);
          padding: var(--button-padding-y) var(--button-padding-x);
          font-size: var(--button-font-size);
          border: none;
          border-radius: var(--button-border-radius);
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
      </style>
      <button name="${this.name}" class="${this.class}" @click=${this.onClick}><slot class="${this.class}"></slot></button>
    `;
  }
});
