import { LitElement, html, nothing } from 'lit';

/**
 * @class PopupElement
 *
 * This class is used as a popup, which is initially hidden but can be shown indefinitely
 * or for a specific duration.
 *
 * @example
 * <wc-popup id="popup">Suprise!</wc-popup>
 */
export class PopupElement extends LitElement {
  static get localName() {
    return 'wc-popup';
  }

  // eslint-disable-next-line class-methods-use-this
  get classes() {
    const classes = [];
    return classes;
  }

  render() {
    return html`
      <div class=${this.classes.join(' ') || nothing} popover><slot></slot></div>
    `;
  }
}
