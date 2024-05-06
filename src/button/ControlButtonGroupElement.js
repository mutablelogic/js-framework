import { LitElement, html, css, nothing } from 'lit';

/**
 * @class ControlButtonGroupElement
 *
 * This class is used as a group of control buttons, as decoration of a card, located on the
 * top right corner of the card.
 *
 * @property {String} name - The name of the control group
 *
 * @example
 * <wc-control-button-group name="controls">
 *   <wc-button type="control">Close</wc-button>
 * </wc-control-button-group>
 */
export class ControlButtonGroupElement extends LitElement {
  static get localName() {
    return 'wc-control-button-group';
  }

  constructor() {
    super();

    // Default properties
    this.name = '';
  }

  static get properties() {
    return {
      name: { type: String },
    };
  }

  static get styles() {
    return css`
      div {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0;
        border: 0;
        background: transparent;
        margin: var(--control-button-group-margin-y) var(--control-button-group-margin-x) ;
      }
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  get classes() {
    const classes = [];
    classes.push('control-button-group');
    return classes;
  }

  render() {
    return html`
      <div class=${this.classes.join(' ') || nothing}>
        <slot></slot>
      </div>
    `;
  }
}
