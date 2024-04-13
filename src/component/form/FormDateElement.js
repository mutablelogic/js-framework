
import { html, nothing } from 'lit';
import { FormElement} from './FormElement';

/**
 * FormDateElement implements a date input element
 */
export class FormDateElement extends FormElement {
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
             * The minimum date allowed
             */
            min: { type: Date },

            /**
             * The maximum date allowed
             */
            max: { type: Date }
        };
    }
    _renderInput() {
        return html`<input class="control"
            name=${this.name || nothing}
            type="date"
            ?required=${this.required}
            ?disabled=${this.disabled}
            placeholder=${this.placeholder || nothing}
            min=${this.min || nothing}
            max=${this.max || nothing}
            @input=${this._updateValue}>${this.value}</textarea>
        `;
    }
}

customElements.define('wc-form-date', FormDateElement);
