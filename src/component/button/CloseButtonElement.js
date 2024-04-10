
import { LitElement, html, css } from 'lit';
import Event from '../../core/event';

/**
 * CloseButtonElement
 */
export class CloseButtonElement extends LitElement {
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
            }
            button div {
                position: relative;
                width: var(--button-close-size);
                height: var(--button-close-size);
                padding: var(--button-close-padding);
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
            <button role="button" @click=${this.onClick}>
                <div><wc-icon name="x-circle"></wc-icon></div>
            </button>
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

customElements.define('wc-close', CloseButtonElement);