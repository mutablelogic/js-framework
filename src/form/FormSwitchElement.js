import { html, nothing } from 'lit';
import { FormControlElement } from './FormControlElement';

/**
 * @class FormSwitchElement
 *
 * This class is used to create a binary switch
 *
 * @property {Boolean} selected - Whether the switch is checked
 *
 * @example
 * <wc-form-switch name="power" selected>Power</wc-form-switch>
 */
export class FormSwitchElement extends FormControlElement {
  static get localName() {
    return 'wc-form-switch';
  }

  constructor() {
    super();

    // Default properties
    this.selected = false;
  }

  static get properties() {
    return {
      selected: { type: Boolean },
    };
  }

  render() {
    return html`
      <label class=${this.classes.join(' ') || nothing}>
        <nobr>
        <input type="checkbox" role="switch" 
          name=${this.name || nothing} 
          ?disabled=${this.disabled} 
          ?checked=${this.selected}
          @input=${this.onInput}>
        <slot></slot>
        </nobr>
      </label>
    `;
  }

  // Return classes for the switch control
  get classes() {
    const classes = super.classes;
    classes.push('switch');
    return classes;
  }

  // Change the selected state when the input is changed
  onInput(event) {
    if (!this.disabled) {
      this.selected = event.target.checked;
    }
    super.onInput(event);
  }
}
