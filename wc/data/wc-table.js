import { LitElement, html, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import Controller from '../core/controller';

/**
 * A table element
 */
window.customElements.define('wc-table', class extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    // Create a host controller bound connected to a provider
    this.$provider = Controller.bind(this.data, this);
  }

  static get properties() {
    return {
      /**
       * The background color
       * @type {string}
       */
      bg: { type: String },

      /**
        * The text color
        * @type {string}
        */
      color: { type: String },

      /**
         * The column names, separated by commas
         * @type {string}
         */
      columns: {
        type: String,
      },

      /**
       * Whether there is a table header
       * @type {boolean}
       */
      head: { type: Boolean },

      /**
       * Whether there is a table footer
       * @type {boolean}
       */
      foot: { type: Boolean },

      /**
       * Data source name
       * @type {string}
       */
      data: { type: String, attribute: true },
    };
  }

  /* Properties */
  get columnArray() {
    return this.columns.split(',').map((c) => c.trim());
  }

  /* Events */

  /* Rendering */
  get class() {
    return `${this.bg ? `bg-${this.bg}` : ''} ${this.color ? `color-${this.color}` : ''}`;
  }

  get thead() {
    return this.head ? html`<thead><tr>${repeat(this.columnArray, (item) => html`<th>${item}</th>`)}</tr></thead>` : nothing;
  }

  get tfoot() {
    return this.head ? html`<tfoot></tfoot>` : nothing;
  }

  get tbody() {
    return this.head ? html`<tbody></tbody>` : nothing;
  }

  render() {
    return html`
        <table class="${this.class}">
            ${this.thead}
            ${this.tbody}
            ${this.tfoot}
        </table>
      `;
  }
});
