
import { html, nothing } from 'lit';
import { FormElement} from './FormElement';

/**
 * FormTextElement implements a text input element
 */
export class FormTextElement extends FormElement {
    constructor() {
        super();

        // Default properties
        this.pattern = '';
        this.rows = 0;
        this.minlength = null;
        this.maxlength = null;
    }
    static get properties() {
        return {
            /**
              * The pattern used to validate the value on submission. Not
              * currently supported where rows > 1
              * @type {string}
            */
            pattern: { type: String },

            /**
             * The number of rows (for textarea)
             */
            rows: { type: Number },

            /**
             * The minimum length of the input
             */
            minlength: { type: Number },

            /**
             * The maximum length of the input
             */
            maxlength: { type: Number }
        };
    }
    _renderInput() {
        if (this.rows > 1) {
            return html`<textarea class="control"
                name=${this.name || nothing}
                ?required=${this.required}
                ?disabled=${this.disabled}
                placeholder=${this.placeholder || nothing}
                autocomplete=${this.autocomplete ? 'on' : 'off'}
                rows=${this.rows || nothing}
                minlength=${this.minlength || nothing}
                maxlength=${this.maxlength || nothing}
                @input=${this._updateValue}>${this.value}</textarea>
            `;
        } else {
            return html`<input 
                class="control" 
                name=${this.name || nothing}
                value=${this.value || nothing}
                ?required=${this.required}
                ?disabled=${this.disabled}
                placeholder=${this.placeholder || nothing}
                autocomplete=${this.autocomplete ? 'on' : 'off'}
                pattern=${this.pattern || nothing}
                minlength=${this.minlength || nothing}
                maxlength=${this.maxlength || nothing}
            @input=${this._updateValue}
            >`;
        }
    }
}

customElements.define('wc-form-text', FormTextElement);
