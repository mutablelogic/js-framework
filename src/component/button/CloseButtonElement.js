
import { LitElement, html, css } from 'lit';
import Event from '../../core/Event';

/**
 * CloseButtonElement
 */
export class CloseButtonElement extends LitElement {
    constructor() {
        super();
        // Default properties
        this.name = 'wc-close';
        this.disabled = false;
    }
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
            button {
                position: absolute;
                top: 0;
                right: 0;
                padding: 0;
                border: 0;
                background: transparent;
                cursor: pointer;
            }
            button wc-icon {
                color: var(--button-close-color);          
            }
            button:hover wc-icon {
                color: var(--button-close-color-hover);          
            }
            button:active {
                top: var(--button-offset-active); 
                right: var(--button-offset-active); 
            }
            button:active wc-icon {          
                color: var(--button-close-color-active);          
            }
            button:disabled {
                pointer-events: none;
                color: var(--button-close-color-disabled); 
            }
        `;
    }
    render() {
        return html`
            <button role="button" ?disabled="${this.disabled}" @click=${this.onClick}>
                <wc-icon name="x-lg"></wc-icon>
            </button>
        `;
    }
    onClick() {
        this.dispatchEvent(new CustomEvent(
            Event.EVENT_CLICK, { 
                bubbles: true,
                composed: true,
                detail: this.name 
            },
        ));
    }
}

customElements.define('wc-close', CloseButtonElement);
