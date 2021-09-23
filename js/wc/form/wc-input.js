import { LitElement, html, css } from 'lit';

/**
 * A form text input element
 *
 * @slot - This element has a slot for text content, which forms the label for the input
 * @property {string} [value] - The value for the input
 */
window.customElements.define('wc-input', class extends LitElement {
  static get properties() {
    return {
      /**
       * The background color
       * @type {string}
       */
      value: { type: String },
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
        <div class="input">
            <label for="input"><slot></slot></label>
            <input type="text" name="input" id="input" value="${this.value}">
        </div>
      `;
  }
});
