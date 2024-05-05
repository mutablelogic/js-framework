import { LitElement, html, css, nothing } from 'lit';

/**
 * @class ButtonElement
 *
 * This class is used as a button, either a control (close, help, etc), a form submission or
 * a normal button.
 *
 * @property {String} name - The name of the button
 * @property {String} type - The type of the button if not standard
 *                           (control, submit)
 * @property {String} textTransform - If the button text should be transformed
 *                                    (uppercase, lowercase, capitalize)
 * @property {Boolean} disabled - Whether the button is disabled
 *
 * @example
 * <wc-button type="control">Close</wc-button>
 */
export class ButtonElement extends LitElement {
  static get localName() {
    return 'wc-button';
  }

  constructor() {
    super();

    // Default properties
    this.name = '';
    this.type = '';
    this.textTransform = '';
    this.disabled = false;
  }

  static get properties() {
    return {
      name: { type: String },
      type: { type: String },
      textTransform: { type: String },
      disabled: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      button.control {
        background: transparent;
      }
    `;
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

  get controlButtonIcon() {
    switch (this.type.toLowerCase()) {
      case 'close':
        return 'x-square';
      case 'help':
        return 'question-square';
      case 'maximise':
        return 'fullscreen';
      case 'minimise':
        return 'fullscreen-exit';
      default:
        return '';
    }
  }

  renderButton() {
    return html`
      <button class=${this.classes.join(' ') || nothing} ?disabled=${this.disabled}><slot></slot></button>
    `;
  }

  renderSubmit() {
    return html`
      <button class=${this.classes.join(' ') || nothing} ?disabled=${this.disabled}><slot></slot></button>
    `;
  }

  renderControl() {
    return html`
      <button class=${this.classes.join(' ') || nothing} ?disabled=${this.disabled}><slot></slot></button>
    `;
  }

  render() {
    switch (this.type.toLowerCase()) {
      case 'control':
        return this.renderControl();
      case 'submit':
        return this.renderSubmit();
      default:
        return this.renderButton();
    }
  }
}
