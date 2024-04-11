
import { LitElement, html, css } from 'lit';

/**
 * A modal pop-up element which is hidden by default
 */
export class ModalElement extends LitElement {
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
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            background-color: var(--modal-canvas-color);   
        }
        .modal {
            position: fixed; 
            left: 0; 
            top: 0;
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
        }
        .hidden {
            visibility: hidden;
            opacity: 0;
            transition: visibility var(--modal-fadeout-delay), opacity var(--modal-fadeout-delay); 
        }
        .visible {
            visibility: visible;
            opacity: var(--modal-canvas-opacity);
            transition: visibility var(--modal-fadein-delay), opacity var(--modal-fadein-delay); 
        }
        .visible-2 {
            visibility: visible;
            opacity: 1;
            transition: visibility var(--modal-fadein-delay), opacity var(--modal-fadein-delay); 
        }
        .wrapper {
            position: relative;             
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            margin: 20%;
            background-color: var(--modal-background-color);
            border: 5px solid var(--modal-background-color);
            padding: var(--modal-padding);
            border-radius: var(--modal-border-radius);
          }
          slot {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
        `;
    }
    render() {
        return html`
            <div class="canvas  ${this.visible ? 'visible' : 'hidden'}"></div>
            <div class="modal ${this.visible ? 'visible-2' : 'hidden'}">
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

customElements.define('wc-modal', ModalElement);
