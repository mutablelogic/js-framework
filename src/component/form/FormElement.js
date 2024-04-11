
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
    render() {
        return html`
            <form method="${this.method}" action="${this.action}"><slot></slot></form>
          `;
    }
}

customElements.define('wc-form', FormElement);
