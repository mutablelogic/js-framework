import { LitElement, html, css } from 'lit';

/**
 * A group of buttons
 *
 * @slot - This element has a slot to include wc-button elements
 */
window.customElements.define('wc-button-group', class extends LitElement {
  static get styles() {
    return css`
        :host {
            display: flex;
            --button-border-radius-left: 0;
            --button-border-radius-right: 0;
        }
        ::slotted(*:first-child) {
            --button-border-radius-left: var(--button-border-radius);
        }
        ::slotted(*:last-child) {
            --button-border-radius-right: var(--button-border-radius);
        }
      `;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
        <slot></slot>
      `;
  }
});
