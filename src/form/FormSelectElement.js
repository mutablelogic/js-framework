import { html, nothing } from 'lit';
import { FormControlElement } from './FormControlElement';

/**
 * @class FormSelectElement
 *
 * This class is used to create a selection from many options
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
  }

  static get properties() {
    return {
      options: { type: Array },
    };
  }

  render() {
    console.log(this.options);
    return html`
      <select 
        name=${this.name || nothing}
        ?disabled=${this.disabled}
        @input=${this.onInput}>
        <option disabled selected>${this.textContent.trim()}</option>
        ${this.options.map(option => html`
          <option>${option}</option>
        `)}        
      </select>
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
    console.log('onInput=', event.target, event.target.selectedIndex);
    super.onInput(event);
  }
}
