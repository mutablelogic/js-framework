import { LitElement, html, css, nothing } from 'lit';

/**
 * @class ControlButtonGroupElement
 *
 * This class is used as a group of control buttons, as decoration of a card, located on the
 * top right corner of the card.
 *
 * @example
 * <wc-control-button-group name="controls"></wc-control-button-group>
 */
export class ControlButtonGroupElement extends LitElement {
  static get localName() {
    return 'wc-control-button-group';
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
        <button class="control-button" title="Close">CLOSE</button>
        <button class="control-button" title="Help">HELP</button>
        <slot></slot>
      </div>
    `;
  }
}
