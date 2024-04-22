import { LitElement, html, css } from 'lit';
import Event from '../core/Event';

/**
 * NavItemElement
 * This class is used to create a navigational item, which responds to hover and click events
 *
 * @example
 * <wc-nav vertical>
 *   <wc-nav-item>File</wc-nav-item>
 * </wc-nav>
 */
export class NavItemElement extends LitElement {
  static get localName() {
    return 'wc-nav-item';
  }

  constructor() {
    super();
    // Default properties
    this.name = '';
    this.disabled = false;
  }

  static get properties() {
    return {
      /**
       * Name of the item to use when firing the EVENT_CLICK event
       * @type {String}
       */
      name: { type: String },

      /**
       * Whether the item is disabled
       * @type {Boolean}
       */
      disabled: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      li {     
          padding: var(--nav-item-padding-y) var(--nav-item-padding-x) var(--nav-item-padding-y) var(--nav-item-padding-x);
          cursor: pointer;
      }
      li.disabled,li.disabled:hover {
          cursor: default;
      }
    `;
  }

  render() {
    return html`
      <li class="${this.disabled ? 'disabled' : ''}" @click=${this.onClick}><slot></slot></li>
    `;
  }

  onClick() {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent(Event.EVENT_CLICK, {
        bubbles: true,
        composed: true,
        detail: this.name || this.textContent,
      }));
    }
  }
}
