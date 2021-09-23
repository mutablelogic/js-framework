import { LitElement, html } from 'lit';

/**
 * A column element
 *
 * @slot - This element has a slot for any content
 */
window.customElements.define('wc-col', class extends LitElement {
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
         * The width for the column, between 0 and 12
         * @type {number}
         */
      width: { type: Number },
    };
  }

  get flexBasis() {
    if (this.width <= 12) {
      return `${this.width * (100 / 12)}%`;
    }
    return 'none';
  }

  get display() {
    if (this.width) {
      return 'block';
    }
    return 'none';
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    this.style.maxWidth = `${this.flexBasis}`;
    this.style.flexBasis = `${this.flexBasis}`;
    this.style.display = `${this.display}`;
    return html`
        <slot class="${this.bg ? `bg-${this.bg}` : ''} ${this.color ? `text-${this.color}` : ''}"></slot>
      `;
  }
});
