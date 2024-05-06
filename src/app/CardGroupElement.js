import { LitElement, html, css, nothing } from 'lit';

/**
 * @class CardGroupElement
 *
 * This class is used as a group of information cards for layout purposes
 *
 * @example
 * <wc-card-group>
 *   <wc-card backgroundColor="error">
 *     <h1>Card Title</h1>
 *   </wc-card>
 * </wc-card-group>
 */
export class CardGroupElement extends LitElement {
  static get localName() {
    return 'wc-card-group';
  }

  static get styles() {
    return css`
      :host {
        flex: 0 1 auto;
      }
      div {
        display: flex;
        flex-wrap: wrap;
      }

      /* Hidden Cards */
      ::slotted(wc-card[hidden]) {
        display: none;
      }

      /* Colours */
      ::slotted(wc-card) {
        position: relative;
        border: 1px solid var(--grey-20-color);
        border-radius: var(--card-border-radius);
        margin: var(--card-margin-y) var(--card-margin-x);
        padding: var(--card-padding-y) var(--card-padding-x);
      }
      ::slotted(wc-card) { /* TODO: Default should vary based on theme */
        background-color: var(--light-color);
        color: var(--dark-color);
      }
      ::slotted(wc-card[backgroundColor="primary"]) {
          background-color: var(--primary-color);
          color: var(--light-color);
      }
      ::slotted(wc-card[backgroundColor="secondary"]) {
        background-color: var(--secondary-color);
        color: var(--dark-color);
      }
      ::slotted(wc-card[backgroundColor="success"]) {
        background-color: var(--success-color);
        color: var(--light-color);
      }
      ::slotted(wc-card[backgroundColor="warning"]) {
        background-color: var(--warning-color);
        color: var(--light-color);
      }
      ::slotted(wc-card[backgroundColor="error"]) {
        background-color: var(--error-color);
        color: var(--light-color);
      }
      ::slotted(wc-card[backgroundColor="light"]) {
        background-color: var(--light-color);
        color: var(--dark-color);
      }
      ::slotted(wc-card[backgroundColor="dark"]) {
        background-color: var(--dark-color);
        color: var(--light-color);
      }
      ::slotted(wc-card[backgroundColor="black"]) {
        background-color: var(--black-color);
        color: var(--white-color);
      }
      ::slotted(wc-card[backgroundColor="white"]) {
        background-color: var(--white-color);
        color: var(--black-color);
      }
  `;
  }

  render() {
    return html`
      <div class=${this.classes.join(' ') || nothing}>
        <slot></slot>
      </div>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  get classes() {
    const classes = [];
    classes.push('card-group');
    return classes;
  }
}
