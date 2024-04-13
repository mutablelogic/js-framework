
import { LitElement, html, css, nothing } from 'lit';

/**
 * FormElement is the base class for all form elements
 */
export class FormElement extends LitElement {
    #internals;

    constructor() {
        super();

        // Attach with the form
        this.#internals = this.attachInternals();

        // Default properties
        this.name = this.textContent;
        this.value = '';
        this.description = '';
        this.placeholder = '';
        this.disabled = false;
        this.required = false;
        this.autocomplete = false;
        this.labelabove = false;
    }
    static get formAssociated() {
        return true;
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
            value: { type: String, reflect: true },

            /**
             * Description of the input
             */
            description: { type: String },

            /**
             * The placeholder text for the input
             * @type {string}
             */
            placeholder: { type: String },

            /**
              * Whether the control is enabled
              * @type {boolean}
            */
            disabled: { type: Boolean },

            /**
              * Whether the input is required to be filled
              * for the form to submit
              * @type {boolean}
            */
            required: { type: Boolean },

            /**
              * Whether auto-complete is enabled
              * @type {boolean}
            */
            autocomplete: { type: Boolean },

            /**
              * Label position above, rather than to the left
              * @type {boolean}
            */
            labelabove: { type: Boolean }
        };
    }
    static get styles() {
        return css`
            div {
                display: flex; 
                justify-content: start;
                border: 1px solid red;
            }
            .labelbeside {
                flex-direction: row;
            }
            .labelabove {
                flex-direction: column;
            }
            div.description {
                flex-direction: column;
                color: var(--form-input-description-color);
                font-size: var(--form-input-description-font-size);
                font-weight:  var(--form-input-description-font-weight);
            }
            .control {
                border: 1px solid red;
                flex: 1;
                background-color: var(--form-input-background-color); 
                color: var(--form-input-color);
                margin: var(--form-input-margin-y) var(--form-input-margin-x) var(--form-input-margin-y) var(--form-input-margin-x);
                padding: var(--form-input-padding-y) var(--form-input-padding-x) var(--form-input-padding-y) var(--form-input-padding-x);
                font-family: inherit;
                font-size: var(--form-input-font-size);
                font-weight:  var(--form-input-font-weight);
                line-height: var(--form-input-line-height);
                border: var(--form-input-border);
            }
            .control::placeholder {
                color: var(--form-input-placeholder-color);
            }
            .error {
                color: var(--form-input-error-color);
            }
            label {
                display: block;
                min-width: 10em;  
                background-color: var(--form-label-background-color); 
                color: var(--form-label-color);
                padding: var(--form-label-padding-y) var(--form-label-padding-x) var(--form-label-padding-y) var(--form-label-padding-x);
                font-size: var(--form-label-font-size);
                font-weight:  var(--form-label-font-weight);
                line-height: var(--form-label-line-height);
                border: var(--form-label-border) solid red;
            }
          `;
    }
    _renderLabel() {
        if (this.innerHTML) {
            return html`<label for="${this.name}"><slot></slot></label>`;
        } else {
            return nothing;
        }
    }
    _renderInput() {
        return html`<input 
            class="control" 
            name=${this.name || nothing}
            value=${this.value || nothing}
            ?required=${this.required}
            ?disabled=${this.disabled}
            placeholder=${this.placeholder || nothing}
            autocomplete=${this.autocomplete ? 'on' : 'off'}
            @input=${this._updateValue}
        >`;
    }
    _renderDescription() {
        if (this.validationMessage) {
            return html`<span class="error">${this.validationMessage}</span>`;
        } else if (this.description) {
            return html`<span>${this.description}</span>`;
        } else {
            return nothing;
        }
    }
    render() {
        const renderLabel = this._renderLabel();
        const renderInput = this._renderInput();
        const renderDescription = this._renderDescription();
        return html`
            <div class="${this.labelabove ? 'labelabove' : 'labelbeside'}">
                ${renderLabel}
                <div class="description">
                    ${renderInput}
                    ${renderDescription}
                </div>
            </div>
        `;
    }

    // Form control properties
    get form() { return this.#internals ? this.#internals.form : null; }
    get type() { return this.localName; }
    get validity() { return this.#internals ? this.#internals.validity : null; }
    get validationMessage() { return this.#internals ? this.#internals.validationMessage : null; }
    get willValidate() { return this.#internals ? this.#internals.willValidate : null; }

    // Callbacks
    _updateValue(event) {
        if (!this.disabled) {
            this.value = event.target.value;
            this.#internals.setFormValue(this.value);
        }
    }
}

customElements.define('wc-form-input', FormElement);
