import { LitElement, html, css } from 'lit';

/**
 * A basic badge element
 *
 * @slot - This element has a slot for text content
 * @property {string} [bg] - The background color
 * @property {string} [color] - The text color
 */
window.customElements.define('wc-badge', class extends LitElement {
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
       * The text transform, uppercase, lowercase, none, capitalize
       * @type {string}
       */
      transform: { type: String },
    };
  }

  static get styles() {
    return css`
        :host {
          display: inline-block;
          background-color: var(--badge-background-color); 
          color: var(--badge-color);
          padding: var(--badge-padding-y) var(--badge-padding-x);
          font-size: var(--badge-font-size);
          font-weight:  var(--badge-font-weight);
          border-radius: var(--badge-border-radius);
          line-height: 1;
          text-align: center;
          white-space: nowrap;
          vertical-align: baseline;
        }
        .transform-capitalize {
          text-transform: capitalize;
        }
        .transform-uppercase {
          text-transform: uppercase;
        }
        .transform-lowercase {
          text-transform: lowercase;
        }
        .transform-none {
          text-transform: none;
        }
      `;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <slot class="${this.bg ? `bg-${this.bg}` : ''} ${this.color ? `text-${this.color}` : ''} ${this.transform ? `transform-${this.transform}` : ''}"></slot>
      `;
  }
});
