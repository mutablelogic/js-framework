
import { html } from 'lit';
import { FormTextElement } from './FormTextElement.js';
import icons from 'bootstrap-icons/bootstrap-icons.svg';

/**
 * FormPasswordElement
 */
export class FormPasswordElement extends FormTextElement {
    constructor() {
        super();
    }
    renderInput() {
        return html`
                <input type="password" class="input" name="${this.name}" value="${this.value}" ?required="${this.required}" placeholder="${this.placeholder}" ?disabled=${this.disabled} autocomplete="${this.autocomplete ? 'on' : 'off'}" pattern="${this.pattern}">
                    <button><svg><use href="${icons}#eye"/></svg></button>
                </input>        
        `;
    }
}

customElements.define('wc-form-password', FormPasswordElement);
