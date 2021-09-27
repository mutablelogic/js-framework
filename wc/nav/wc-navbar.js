import { LitElement, html, css } from 'lit';

/**
 * A row element
 *
 * @slot - This element has a slot for either wc-col or wc-card elements
 */
window.customElements.define('wc-navbar', class extends LitElement {
  static get properties() {
    return {
      /**
       * Nav is displayed in a column
       * @type {boolean}
       */
      column: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host nav {
        position: relative;
        padding: var(--navbar-padding);
        background-color: var(--navbar-background-color);
        color: var(--navbar-color);
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
        border-bottom: var(--navbar-border-bottom);
      }
      `;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
        <nav><slot></slot></nav>
      `;
  }
});
