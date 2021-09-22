import { html } from 'lit-html';
import Component from './component';

// Events
const EVENT_CLICK = 'navitem-view:click';

export default {
  EVENT_CLICK,
};

customElements.define('navitem-view', class extends Component {
  // Properties
  static get observedAttributes() {
    return ['name', 'active', 'disabled'];
  }

  get name() {
    return this.getAttribute('name') || this.textContent;
  }

  set name(v) {
    this.setAttribute('name', v);
  }

  get active() {
    return !!this.hasAttribute('active');
  }

  set active(v) {
    if (v) {
      this.setAttribute('active', 'active');
    } else {
      this.removeAttribute('active');
    }
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

  // Events
  onClick() {
    this.dispatchEvent(new CustomEvent(EVENT_CLICK, {
      composed: true,
      bubbles: true,
      detail: this.name,
    }));
  }

  // Rendering
  attributeChangedCallback() {
    this.update();
  }

  update() {
    super.update();
  }

  get class() {
    return `${this.active ? 'active' : ''} ${this.disabled ? 'disabled' : ''}`;
  }

  template() {
    return html`
        <style type="text/css">
        a {
          text-decoration: none;
          color: var(--navitem-color);
          border-bottom: 2px solid transparent;
          padding: var(--navitem-padding-y) var(--navitem-padding-x);
          font-weight: var(--navitem-font-weight);
          background-color: var(--navitem-background-color);
        }
        a:hover {
          border-bottom-color: var(--navitem-color-hover);
          color: var(--navitem-color-hover);
          background-color: var(--navitem-background-color-hover);
          font-weight: var(--navitem-font-weight-hover);
        }
        a.active {
          color: var(--navitem-color-active) !important;
          background-color: var(--navitem-background-color-active) !important;
          font-weight: var(--navitem-font-weight-active) !important;
          border-bottom-color: var(--navitem-color-active);
        }
        a.disabled {
          pointer-events: none;
          color: var(--navitem-color-disabled) !important;
          background-color: var(--navitem-background-color-disabled) !important;
          font-weight: var(--navitem-font-weight-disabled) !important;
          border-bottom: none !important;
        }
      </style>
      <a href="#" name="${this.name}" class="${this.class}" @click=${this.onClick}><slot class="${this.class}"></slot></a>
    `;
  }
});
