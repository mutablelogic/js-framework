import { html, nothing } from 'lit';
import { FormControlElement } from './FormControlElement';

/**
 * @class FormSwitchElement
 *
 * This class is used to create a binary switch
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
      /**
       * @property {Boolean} selected - Whether the switch is checked
       */
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

  onInput(event) {
    if (!this.disabled) {
      this.selected = event.target.checked;
    }
    super.onInput(event);
  }
}
