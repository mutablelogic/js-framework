
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
            /**
             * Size of the icon to display, either default, small, medium, large, xlarge
             * @type {String}
             */
            size: { type: String },
        };
    }

    static get styles() {
        return css`
        .size-default {
            position: relative;
            width: var(--icon-size-default);
            height: var(--icon-size-default);
        }
        .size-small {
            position: relative;
            width: var(--icon-size-small);
            height: var(--icon-size-small);
        }
        .size-medium {
            position: relative;
            width: var(--icon-size-medium);
            height: var(--icon-size-medium);
        }
        .size-large {
            position: relative;
            width: var(--icon-size-large);
            height: var(--icon-size-large);
        }
        .size-xlarge {
            position: relative;
            width: var(--icon-size-xlarge);
            height: var(--icon-size-xlarge);
        }
        svg {
                width: 100%;
                height: 100%;
                fill: currentColor;
            }
        `;
    }

    render() {
        return svg`<div class="size-${this.size}"><svg><use href="${icons}#${this.name}"/></svg></div>`;
    }

    constructor() {
        super();
        // Default properties
        this.name = 'bootstrap-reboot';
        this.size = 'default';
    }
}

customElements.define('wc-icon', IconElement);
