import {
  LitElement, html, css, nothing,
} from 'lit';
import { EventType } from '../core/EventType';

/**
 * @class ButtonElement
 *
 * This class provides a button element.
 *
 * @property {String} name - The name of the button
 * @property {String} type - The type of the button if not standard (control, submit)
 * @property {String} textTransform - If the button text should be transformed (uppercase,
 *  lowercase, capitalize)
 * @property {Boolean} disabled - Whether the button is disabled
 *
 * @example
 * <js-button>OK</js-button>
 */
export class ButtonElement extends LitElement {
  static get localName() {
    return 'js-button';
  }

  static get properties() {
    return {
      name: { type: String, reflect: true },
      type: { type: String, reflect: true },
      color: { type: String, reflect: true },
      texttransform: { type: String, reflect: true },
      size: { type: String, reflect: true },
      disabled: { type: Boolean, reflect: true },
    };
  }

  static get styles() {
    return css`
      button {
        display: inline-flex;
        position: relative;  
        margin: none;
        padding: var(--button-padding);
        cursor: pointer;
        user-select: none;
        border: var(--button-border);
        border-radius: var(--button-border-radius);
        
        &:disabled {
          opacity: var(--button-opacity-disabled);
          cursor: default;
        }          
        &:not(:disabled):active {
          color: var(--button-color-active);
          transform: translate(0.05rem, 0.05rem);
        }
      }
      .size-small {
        border: var(--button-border-small);
        border-radius: var(--button-border-radius-small);
        font-size: var(--font-size-small);
        padding: var(--button-padding-small);
      }
      .size-medium, .size-default {
        border: var(--button-border-medium);
        border-radius: var(--button-border-radius-medium);
        font-size: var(--font-size-medium);
        padding: var(--button-padding-medium);
      }
      .size-large {
        border: var(--button-border-large);
        border-radius: var(--button-border-radius-large);
        font-size: var(--font-size-large);
        padding: var(--button-padding-large);
      }
      .size-xlarge {
        border: var(--button-border-xlarge);
        border-radius: var(--button-border-radius-xlarge);
        font-size: var(--font-size-xlarge);
        padding: var(--button-padding-xlarge);
      }
      .color-primary {
        background-color: var(--button-background-color-primary);
        color: var(--button-color-primary);
        border-color: var(--button-border-color-primary);

        &:not(:disabled):hover {
          color: var(--button-color-hover-primary);
        }
      }
      .color-secondary {
        background-color: var(--button-background-color-secondary);
        color: var(--button-color-secondary);
        border-color: var(--button-border-color-secondary);

        &:not(:disabled):hover {
          color: var(--button-color-hover-secondary);
        }
      }
      .color-success {
        background-color: var(--button-background-color-success);
        color: var(--button-color-success);
        border-color: var(--button-border-color-success);

        &:not(:disabled):hover {
          color: var(--button-color-hover-success);
        }
      }
      .color-warning {
        background-color: var(--button-background-color-warning);
        color: var(--button-color-warning);
        border-color: var(--button-border-color-warning);

        &:not(:disabled):hover {
          color: var(--button-color-hover-warning);
        }
      }
      .color-error {
        background-color: var(--button-background-color-error);
        color: var(--button-color-error);
        border-color: var(--button-border-color-error);

        &:not(:disabled):hover {
          color: var(--button-color-hover-error);
        }
      }
      .color-light {
        background-color: var(--button-background-color-light);
        color: var(--button-color-light);
        border-color: var(--button-border-color-light);

        &:not(:disabled):hover {
          color: var(--button-color-hover-light);
        }
      }
      .color-dark {
        background-color: var(--button-background-color-dark);
        color: var(--button-color-dark);
        border-color: var(--button-border-color-dark);

        &:not(:disabled):hover {
          color: var(--button-color-hover-dark);
        }
      }
      .color-white {
        background-color: var(--button-background-color-white);
        color: var(--button-color-white);
        border-color: var(--button-border-color-white);

        &:not(:disabled):hover {
          color: var(--button-color-hover-white);
        }
      }
      .color-black {
        background-color: var(--button-background-color-black);
        color: var(--button-color-black);
        border-color: var(--button-border-color-black);

        &:not(:disabled):hover {
          color: var(--button-color-hover-black);
        }
      }
      .text-transform-uppercase {
        text-transform: uppercase;
      }
      .text-transform-lowercase {
        text-transform: lowercase;
      }
      .text-transform-capitalize {
        text-transform: capitalize;
      }
      .text-transform-none {
        text-transform: none;
      }
    `;
  }

  constructor() {
    super();
    this.name = '';
    this.type = '';
    this.color = 'primary';
    this.texttransform = 'none';
    this.size = 'default';
    this.disabled = false;
  }

  render() {
    return html`
      <button 
        class=${this.classes.join(' ') || nothing} 
        name=${this.name || nothing}       
        ?disabled=${this.disabled} 
        @click=${this.#onClick}>
        <slot></slot>
      </button>      
    `;
  }

  #onClick(event) {
    event.preventDefault();
    this.dispatchEvent(new CustomEvent(EventType.CLICK, { bubbles: true, composed: true }));
  }

  get classes() {
    const classes = [];
    if (this.type) {
      classes.push(this.type.toLowerCase());
    }
    classes.push(`color-${this.color}`);
    classes.push(`size-${this.size}`);
    classes.push(`text-transform-${this.texttransform}`);
    return classes;
  }
}
