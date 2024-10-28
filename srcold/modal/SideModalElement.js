
import { LitElement, html, css } from 'lit';

/**
 * A modal pop-up element which is hidden by default
 */
export class SideModalElement extends LitElement {
    constructor() {
        super();
        // Default properties
        this.visible = false;
    }
    static get properties() {
        return {
            /**
             * Whether the modal is visible
             * @type {Boolean}
             * @memberof ModalElement
             */
            visible: { type: Boolean },
        };
    }
    static get styles() {
        return css`
        .canvas {
            position: fixed; 
            left: 0; 
            top: 0;
            bottom: 0;
            right: 0;
            overflow-x: hidden;
            overflow-y: hidden;
            background-color: var(--modal-canvas-color);   
        }
        .modal {
            position: fixed; 
            top: 0;
            bottom: 0;
            left: 0;
            background-color: var(--modal-background-color);
        }
        .animation {
            transition: 
                opacity var(--modal-fade-delay) ease,
                visibility var(--modal-fade-delay) ease,
                display var(--modal-fade-delay) ease,
                transform var(--modal-position-delay) ease;
        }
        .hidden-canvas {
            opacity: 0;
            visibility: hidden;
        }
        .hidden-modal {
            visibility: hidden;
            opacity: 0;
            transform: translateX(-12rem);
        }
        .visible-modal {
            visibility: visible;
            opacity: 1;
            transform: translateX(0);
        }
        .visible-canvas {
            visibility: visible;
            opacity: var(--modal-canvas-opacity);
        }
        .wrapper {
            position: relative;
            width: auto;
            height: auto;             
        }`;
    }
    render() {
        return html`
            <div class="canvas animation ${this.visible ? 'visible-canvas' : 'hidden-canvas'}"></div>
            <div class="modal animation ${this.visible ? 'visible-modal' : 'hidden-modal'}">
                <div class="wrapper"><slot></slot></div>
            </div>
        `;
    }
    toggle() {
        this.visible = !this.visible;
    }
    show() {
        this.visible = true;
    }
    hide() {
        this.visible = false;
    }
}

customElements.define('wc-sidemodal', SideModalElement);
