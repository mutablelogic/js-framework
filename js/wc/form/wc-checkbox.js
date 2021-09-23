import { LitElement, html, css } from 'lit';

/**
 * A checkbox to be grouped within a wc-checkbox-group
 *
 * @slot - This element has a slot for text which is the label for the checkbox
 */
window.customElements.define('wc-checkbox', class extends LitElement {
  static get properties() {
    return {
      /**
       * The name for the checkbox
       * @type {string}
       */
      name: { type: String },

      /**
       * The type for the checkbox, if true then use radio
       * @type {boolean}
       */
      radio: { type: Boolean },

      /**
       * The value for the checkbox
       * @type {string}
       */
      value: { type: String },

      /**
       * Whether the checkbox is checked
       * @type {string}
       */
      checked: { type: Boolean },

      /**
       * Whether the checkbox is disabled
       * @type {string}
       */
      disabled: { type: Boolean },
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
          cursor: pointer;
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
            <input type="${this.radio ? 'radio' : 'checkbox'}" name="${this.name}" id="checkbox" value="${this.value || this.textContent}" .checked=${this.checked} .disabled=${this.disabled}>
            <label for="checkbox"><slot></slot></label>
        </div>
      `;
  }

  connectedCallback() {
    super.connectedCallback();
    // Type propogates from the wc-checkbox-group
    if (!this.radio) {
      this.radio = this.parentElement.getAttribute('radio');
    }

    // Name propogates from the wc-checkbox-group
    if (!this.name) {
      this.name = this.parentElement.getAttribute('name');
    }
  }
});
