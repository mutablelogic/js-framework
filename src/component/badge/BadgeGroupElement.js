import { LitElement, html, css } from 'lit';

/**
  *  wc-badge-group is a group of badges
  *
  * @slot - This element has a slot to include wc-badge elements
  */
export default class BadgeGroupElement extends LitElement {
  static get localName() {
    return 'wc-badge-group';
  }

  static get styles() {
    return css`
    span {
      display: flex;
      --badge-border-radius-left: 0;
      --badge-border-radius-right: 0;
    }
    ::slotted(:not(:last-child)) {
      border-right: 1px solid var(--badge-group-divider-color);
    }
    ::slotted(*:first-child) {
      --badge-border-radius-left: var(--badge-border-radius);
    }
    ::slotted(*:last-child) {
      --badge-border-radius-right: var(--badge-border-radius);
    }
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`<span><slot></slot></span>`;
  }
}
