import { html, css, nothing } from 'lit';
import { FormControlElement } from './FormControlElement';
import { Event } from '../core/Event';
/**
 * @class FormSelectElement
 *
 * This class is used to create a selection from many options
 *
 * @property {Array} options - The list of options to select from
 * @property {Boolean} multiple - Whether multiple options can be selected
 *
 * @example
 * <wc-form-select name="colour" options='["red","green","blue"]'>Colour</wc-form-select>
 */
export class FormSelectElement extends FormControlElement {
  static get localName() {
    return 'wc-form-select';
  }

  constructor() {
    super();

    // Default properties
    this.options = [];
    this.multiple = false;
  }

  static get properties() {
    return {
      options: { type: Array },
      multiple: { type: Boolean },
    };
  }

  render() {
    return html`
      <label class=${this.classes.join(' ') || nothing}>
        <nobr>${this.textContent.trim()}</nobr>
        <select 
          name=${this.name || nothing}
          ?disabled=${this.disabled}
          ?autocomplete=${this.autocomplete}
          ?multiple=${this.multiple}
          @input=${this.onInput}>
            ${this.options.map(option => html`
              <option>${option}</option>
            `)}        
        </select>
      </label>
    `;
  }

  // Return classes for the switch control
  get classes() {
    const classes = super.classes;
    classes.push('select');
    return classes;
  }

  // Change the selected state when the input is changed
  onInput(event) {
    if (super.onInput(event)) {
      this.dispatchEvent(new CustomEvent(Event.CHANGE, {
        bubbles: true,
        composed: true,
        detail: this.value,
      }));
    }
  }
}
