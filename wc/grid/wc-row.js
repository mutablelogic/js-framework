import { LitElement, html, css } from 'lit';

/**
 * A row element
 *
 * @slot - This element has a slot for either wc-col or wc-card elements
 */
window.customElements.define('wc-row', class extends LitElement {
  static get styles() {
    return css`
      :host slot {
        position: relative;
        display: flex;
        flex: 0 1 auto;
        flex-direction: row;
        flex-wrap: wrap;
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
