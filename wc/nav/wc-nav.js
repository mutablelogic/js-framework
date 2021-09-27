import { LitElement, html, css } from 'lit';

/**
 * A row element
 *
 * @slot - This element has a slot for either wc-col or wc-card elements
 */
window.customElements.define('wc-nav', class extends LitElement {
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
        padding-left: 0;
        margin-bottom: 0;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        border-bottom: var(--nav-border-bottom);
      }
      :host nav.direction-column {
        flex-direction: column !important;
      }
      :host nav ul {
        margin: 0;
        padding: 0;
        list-style: none; 
      }
      `;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
        <nav class="${this.column ? 'direction-column' : ''}"><ul><slot></slot></ul></nav>
      `;
  }
});
