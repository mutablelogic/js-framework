
import { LitElement, html, css } from 'lit';

/**
 * FormElement
 */
export class FormElement extends LitElement {
    constructor() {
        super();
        // Default properties
        this.name = 'wc-form';
        this.method = "POST";
        this.action = "#";
    }
    static get properties() {
        return {
            /**
             * Name of the form
             * @type {String}
             */
            name: { type: String },

            /**
             * The method for submitting the form (POST or GET)
             * @type {string}
             */
            method: { type: String },

            /**
             * The action when submitting the form
             * @type {string}
             */
            action: { type: String },
        };
    }
    static get styles() {
        return css`
            form {
              display: inline-block;
              width: 100%;
              margin: var(--form-margin);
            }
        `;
    }
    render() {
        return html`
            <form method="${this.method}" name="${this.name}" action="${this.action}" @submit=${this.onSubmit}>
                <slot></slot>
            </form>
          `;
    }
    submit() {
        if(this.shadowRoot) {
            this.shadowRoot.querySelector('form').submit();
        }
    }
    onSubmit(event) {
        event.preventDefault();
        console.log('Form submitted');
    }
}

customElements.define('wc-form', FormElement);
