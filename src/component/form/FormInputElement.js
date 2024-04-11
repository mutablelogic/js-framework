
import { LitElement, html, css } from 'lit';

/**
 * FormInputElement
 */
export class FormInputElement extends LitElement {
    constructor() {
        super();
        // Default properties
        this.name = 'input';
        this.required = false;
        this.autocomplete = false;
        this.labelabove = false;
    }
    static get properties() {
        return {
            /**
             * The name for the input
             * @type {string}
             */
            name: { type: String },

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

            /**
              * Label position above, rather than to the left
              * @type {boolean}
            */
            labelabove: { type: Boolean },
        };
    }
    static get styles() {
        return css`
            div {
                display: flex; 
                justify-content: start;
            }
            .labelbeside {
                flex-direction: row;
            }
            .labelabove {
                flex-direction: column;
            }
            input {
                flex: 1;
                background-color: var(--form-input-background-color); 
                color: var(--form-input-color);
                margin: var(--form-input-margin-y) var(--form-input-margin-x) var(--form-input-margin-y) var(--form-input-margin-x);
                padding: var(--form-input-padding-y) var(--form-input-padding-x) var(--form-input-padding-y) var(--form-input-padding-x);
                font-size: var(--form-input-font-size);
                font-weight:  var(--form-input-font-weight);
                line-height: var(--form-input-line-height);
                border: var(--form-input-border);
            }
            input:focus {
              background-color: var(--form-input-background-color-focus);
              color: var(--form-input-color-focus);
              border: var(--form-input-border-focus);
           }
            label {
              display: block;
              min-width: 10em;  
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
    render() {
        return html`
            <div class="${this.labelabove ? 'labelabove' : 'labelbeside'}">
                <label for="${this.name}"><slot></slot></label>
                <input type="text" name="${this.name}" ?value="${this.value}" ?required="${this.required}" placeholder="${this.placeholder}" autocomplete="${this.autocomplete ? 'on' : 'off'}" ?pattern="${this.pattern}">        
            </div>
        `;
    }
}

customElements.define('wc-form-input', FormInputElement);
