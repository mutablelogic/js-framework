import {
  LitElement, html, css, nothing,
} from 'lit';

/**
 * NavElement
 * This class is used to create a navigational list, either horizontal or vertical.
 *
 * @example
* <wc-nav vertical>
*   <wc-nav-item>File</wc-nav-item>
* </wc-nav>
*/
export class NavElement extends LitElement {
  static get localName() {
    return 'wc-nav';
  }

  static get properties() {
    return {
      /**
       * Whether the navigation is vertical, rather than horizontal
       * @type {Boolean}
       * @default false
       * @memberof NavElement
       */
      vertical: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      ul {
        display: flex;
        margin: 0;
        border: 0;
        padding: 0;

        list-style: none;
        font-size: var(--nav-item-font-size);
        font-weight: var(--nav-item-font-weight);
      }
      ul.horizontal {
        flex-direction: row;
      }
      ul.vertical {
        flex-direction: column;
      }
      ::slotted(*) {
        color: var(--nav-item-color);
        background-color: var(--nav-item-background-color);
      }
      .vertical ::slotted(*) {
        border-bottom: 1px solid var(--nav-item-divider-color);
      }
    `;
  }

  get className() {
    let className = '';
    if (this.vertical) {
      className += 'vertical ';
    } else {
      className += 'horizontal ';
    }
    return className;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <ul class=${this.className || nothing}><slot></slot></ul>
    `;
  }
}
