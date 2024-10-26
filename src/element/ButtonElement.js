import { LitElement, html, nothing } from 'lit';
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
      name: { type: String },
      type: { type: String },
      textTransform: { type: String },
      disabled: { type: Boolean },
    };
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
    if (this.textTransform) {
      classes.push(`text-transform-${this.textTransform.toLowerCase()}`);
    }
    return classes;
  }
}
