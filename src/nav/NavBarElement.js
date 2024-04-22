import {
  LitElement, html, css, nothing,
} from 'lit';

/**
 * NavBarElement
 * This class is used to create a navigational bar at the top or bottom of the window.
 *
 * @example
 * <wc-navbar position="top" sticky>
 *  <h1>Stick Top</h1>
 * </wc-nav>
*/
export class NavBarElement extends LitElement {
  static get localName() {
    return 'wc-navbar';
  }

  constructor() {
    super();
    // Default properties
    this.position = 'top';
    this.backgroundColor = 'primary';
    this.hidden = false;
  }

  static get properties() {
    return {
      /**
       * Position of the navbar, one of 'top', 'bottom'
       *
       * @type {String}
       * @default top
       * @memberof NavBarElement
       */
      position: { type: String },

      /**
       * Background color of the navbar, one of primary, secondary, light, white, dark, black
       *
       * @type {String}
       * @default primary
       * @memberof NavBarElement
       */
      backgroundColor: { type: String },

      /**
       * If true, bar is hidden and takes up no space
       *
       * @type {Boolean}
       * @default false
       * @memberof NavBarElement
       */
      hidden: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      div {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      div ::slotted(*) {
        flex: 1;
      }
      .hidden {
        display: none;        
      }
      .bg-color-primary {
        background-color: var(--primary-color);
        color: var(--white-color);
        border-color: var(--grey-80-color);
      }
      .bg-color-secondary {
        background-color: var(--secondary-color);
        color: var(--white-color);
        border-color: var(--grey-20-color);
      }
      .bg-color-light {
        background-color: var(--light-color);
        color: var(--dark-color);
        border-color: var(--grey-20-color);
      }
      .bg-color-white {
        background-color: var(--white-color);
        color: var(--black-color);
        border-color: var(--grey-20-color);
      }
      .bg-color-dark {
        background-color: var(--dark-color);
        color: var(--light-color);
        border-color: var(--grey-80-color);
      }
      .bg-color-black {
        background-color: var(--black-color);
        color: var(--white-color);
        border-color: var(--grey-80-color);
      }
    `;
  }

  get className() {
    let className = this.position === 'bottom' ? 'bottom ' : 'top ';
    if (this.backgroundColor) {
      className += `bg-color-${this.backgroundColor}`;
    }
    if (this.hidden) {
      className += ' hidden';
    }
    return className;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
        <div class=${this.className || nothing}><slot></slot></div>
      `;
  }
}
