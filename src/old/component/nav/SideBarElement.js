import { LitElement, html, css } from 'lit';

/**
 * SideBarElement
 * This class is used to create a left or right hand sidebar within
 * a canvas element
 */
export class SideBarElement extends LitElement {
  static get localName() {
    return 'wc-sidebar';
  }

  constructor() {
    super();
    // Default properties
    this.backgroundColor = 'primary';
  }

  static get properties() {
    return {
      /**
       * Background color of the sidebar, one of primary, secondary, light, white, dark, black
       *
       * @type {String}
       * @default primary
       * @memberof SideBarElement
       */
      backgroundColor: { type: String },
    };
  }

  static get styles() {
    return css`
      .bg-color-primary {
        background-color: var(--primary-color);
        color: var(--white-color);
        border-color: var(--white-color);
      }
      .bg-color-secondary {
        background-color: var(--secondary-color);
        color: var(--white-color);
        border-color: var(--white-color);
      }
      .bg-color-light {
        background-color: var(--light-color);
        color: var(--dark-color);
        border-color: var(--dark-color);
      }
      .bg-color-white {
        background-color: var(--white-color);
        color: var(--black-color);
        border-color: var(--black-color);
      }
      .bg-color-dark {
        background-color: var(--dark-color);
        color: var(--light-color);
        border-color: var(--light-color);
      }
      .bg-color-black {
        background-color: var(--black-color);
        color: var(--white-color);
        border-color: var(--black-color);
      }
    `;
  }

  get className() {
    let className = '';
    if (this.backgroundColor) {
      className += `bg-color-${this.backgroundColor}`;
    }
    return className;
  }

  render() {
    return html`
      <div class="${this.className}">
        <slot></slot>
      </div>
    `;
  }
}
