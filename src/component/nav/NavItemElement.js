
import { LitElement, html, css } from 'lit';
import Event from '../../core/Event';

/**
 * NavItemElement
 */
export class NavItemElement extends LitElement {
    constructor() {
        super();
        // Default properties
        this.name = '';
        this.disabled = false;
    }
    static get properties() {
        return {
            /**
             * Name of the item to use when firing the EVENT_CLICK event
             * @type {String}
             */
            name: { type: String },

            /**
             * Whether the item is disabled
             * @type {Boolean}
             */
            disabled: { type: Boolean },
        };
    }
    static get styles() {
        return css`
        li {     
            color: var(--nav-item-color);       
            padding: var(--nav-item-padding-y) var(--nav-item-padding-x) var(--nav-item-padding-y) var(--nav-item-padding-x);
            cursor: pointer;
        }
        li:hover {
            color: var(--nav-item-color-hover);
        }
        li.disabled,li.disabled:hover {
            color: var(--nav-item-color-disabled);
            cursor: default;
        }
        `;
    }
    render() {
        return html`
            <li class="${this.disabled ? 'disabled' : ''}" @click=${this.onClick}><slot></slot></li>
        `;
    }
    onClick() {
        if (!this.disabled) {
            this.dispatchEvent(new CustomEvent(
                Event.EVENT_CLICK, { 
                  bubbles: true,
                  composed: true,
                  detail: this.name || this.textContent 
                },
              ));      
        }
    }
}

customElements.define('wc-nav-item', NavItemElement);