
import { LitElement, html, css } from 'lit';

/**
 * NavBarElement
 */
export class NavBarElement extends LitElement {
    static get properties() {
        return {
            /**
             * Name of the button to use when firing the EVENT_CLICK event
             * @type {String}
             */
            name: { type: String },

            /**
             * Whether the button is disabled
             * @type {Boolean}
             */
            disabled: { type: Boolean },
        };
    }
    static get styles() {
        return css`
        nav {            
            position: relative;
            padding: var(--navbar-padding-y) var(--navbar-padding-x) var(--navbar-padding-y) var(--navbar-padding-x);
            background-color: var(--navbar-background-color);
            color: var(--navbar-color);
            border-bottom: 1px solid var(--navbar-border-edge-color);
        }
        ul {
            list-style: none;
            display: flex;
            flex-flow: row wrap;
            justify-content: start;
            padding-left: 0;
        }
        `;
    }

    render() {
        return html`
            <nav><ul><slot></slot></ul></nav>
        `;
    }

    constructor() {
        super();
        // Default properties
        this.name = '';
        this.disabled = false;
    }
}

customElements.define('wc-navbar', NavBarElement);