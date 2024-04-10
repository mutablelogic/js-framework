
import { LitElement, svg, css } from 'lit';
import icons from 'bootstrap-icons/bootstrap-icons.svg';

/**
 * IconElement
 */
export class IconElement extends LitElement {
    static get properties() {
        return {
            /**
             * Name of the icon to display
             * @type {String}
             */
            name: { type: String },
        };
    }

    static get styles() {
        return css`
            svg {
                width: 100%;
                height: 100%;
                fill: currentColor;
            }
        `;
    }

    render() {
        return svg`<svg><use href="${icons}#${this.name}"/></svg>`;
    }

    constructor() {
        super();
        // Default properties
        this.name = 'bootstrap-reboot';
    }
}

customElements.define('wc-icon', IconElement);
