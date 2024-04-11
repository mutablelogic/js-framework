
import { LitElement, html, css } from 'lit';

/**
 *  wc-badge-group is a group of badges
 *
 * @slot - This element has a slot to include wc-badge elements
 */
export class BadgeGroupElement extends LitElement {
    constructor() {
        super();
    }

    static get styles() {
        return css`
            span {
                display: flex;
                --badge-border-radius-left: 0;
                --badge-border-radius-right: 0;
            }
            ::slotted(:not(:last-child)) {
                border-right: 1px solid var(--badge-group-divider-color);
            }
            ::slotted(*:first-child) {
                --badge-border-radius-left: var(--badge-border-radius);
            }
            ::slotted(*:last-child) {
                --badge-border-radius-right: var(--badge-border-radius);
            }
          `;
    }

    render() {
        return html`<span><slot></slot></span>`;
    }
}

customElements.define('wc-badge-group', BadgeGroupElement);


