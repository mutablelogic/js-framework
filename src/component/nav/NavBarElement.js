
import { LitElement, html, css } from 'lit';
import Event from '../../core/event';

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
        :host nav {            
            position: relative;
            padding: var(--navbar-padding);
            background-color: var(--navbar-background-color);
            color: var(--navbar-color);
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            align-items: center;
            border-bottom: var(--navbar-border-bottom);
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

    onClick() {
        this.dispatchEvent(new CustomEvent(
            Event.EVENT_CLICK, { detail: this.name },
        ));
    }
}

customElements.define('wc-navbar', NavBarElement);