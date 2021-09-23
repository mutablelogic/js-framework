import { LitElement, html, css } from 'lit';

/**
 * A row element
 *
 * @slot - This element has a slot for text content
 */
window.customElements.define('wc-nav-item', class extends LitElement {
  static get properties() {
    return {
      /**
       * The active state of the nav item
       * @type {boolean}
       */
      active: { type: Boolean },

      /**
       * The disabled state of the nav item
       * @type {boolean}
       */
      disabled: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host li {
        cursor: pointer;
        border-bottom: 2px solid transparent;
        margin: 0;
        padding: var(--navitem-padding);
        display: inline-block;
        font-weight: var(--navitem-font-weight);
        background-color: var(--navitem-background-color);
      }
      :host li:hover {
        border-bottom: 2px solid var(--navitem-color-hover);
        font-weight: var(--navitem-font-weight-hover);
        background-color: var(--navitem-background-color-hover);
      }
      :host li.active {
        border-bottom: 2px solid var(--navitem-color-active);
        font-weight: var(--navitem-font-weight-active);
        background-color: var(--navitem-background-color-active);
      }
      :host li.disabled {
        border-bottom: 2px solid var(--navitem-color-disabled) !important;
        font-weight: var(--navitem-font-weight-disabled);
        background-color: var(--navitem-background-color-disabled);
      }
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
        <li class="${this.active ? 'active' : ''} ${this.disabled ? 'disabled' : ''}"><slot></slot></li>
      `;
  }
});
