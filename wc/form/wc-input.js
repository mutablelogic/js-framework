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
       * The value for the input
       * @type {string}
       */
      value: { type: String },

      /**
       * The placeholder text for the input
       * @type {string}
       */
      placeholder: { type: String },

      /**
        * Whether the input is required to be filled
        * for the form to submit
        * @type {boolean}
      */
      required: { type: Boolean },

      /**
        * The pattern used to validate the value on submission
        * @type {string}
      */
      pattern: { type: String },

      /**
        * Whether auto-complete is enabled
        * @type {boolean}
      */
      autocomplete: { type: Boolean },

    };
  }

  static get styles() {
    return css`
        :host {
          display: block;
          width: 100%;
          margin: var(--form-input-margin);
        }
        :host input {
          background-color: var(--form-input-background-color); 
          color: var(--form-input-color);
          padding: var(--form-input-padding);
          font-size: var(--form-input-font-size);
          font-weight:  var(--form-input-font-weight);
          line-height: var(--form-input-line-height);
          border: var(--form-input-border);
        }
        :host input:focus {
          background-color: var(--form-input-background-color-focus);
          color: var(--form-input-color-focus);
          border: var(--form-input-border-focus);
          outline: 0;
       }
        :host label {
          background-color: var(--form-label-background-color); 
          color: var(--form-label-color);
          padding: var(--form-label-padding);
          font-size: var(--form-label-font-size);
          font-weight:  var(--form-label-font-weight);
          line-height: var(--form-label-line-height);
          border: var(--form-label-border);
        }
      `;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
        <div class="input">
            <label for="input"><slot></slot></label>
            <input type="text" name="input" id="input" value="${this.value}" required="${this.required}" placeholder="${this.placeholder}" autocomplete="${this.autocomplete}" pattern="${this.pattern}">
        </div>
      `;
  }
});
