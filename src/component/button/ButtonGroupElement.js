
import { LitElement, html, css } from 'lit';

/**
 * wc-button-group is a group of buttons
 *
 * @slot - This element has a slot to include wc-button elements
 */
export class ButtonGroupElement extends LitElement {
    constructor() {
        super();
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                --button-border-radius-left: 0;
                --button-border-radius-right: 0;
            }
            ::slotted(:not(:last-child)) {
                border-right: 1px solid var(--button-group-divider-color);
            }
            ::slotted(*:first-child) {
                --button-border-radius-left: var(--button-border-radius);
            }
            ::slotted(*:last-child) {
                --button-border-radius-right: var(--button-border-radius);
            }
          `;
    }

    render() {
        return html`<slot></slot>`;
    }
}

customElements.define('wc-button-group', ButtonGroupElement);


