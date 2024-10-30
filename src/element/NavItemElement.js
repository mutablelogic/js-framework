import {
  LitElement, html, css, nothing,
} from 'lit';

/**
 * @class NavItemElement
 *
 * This class provides a navigation element.
 *
 * @example
 * <js-nav>
 *   <js-navitem><js-icon>Bootstrap</js-icon></js-navitem>
 * </js-nav>
 */
export class NavItemElement extends LitElement {
  static get localName() {
    return 'js-navitem';
  }

  static get properties() {
    return {
      name: { type: String, reflect: true },
      texttransform: { type: String, reflect: true },
      disabled: { type: Boolean, reflect: true },
    };
  }

  static get styles() {
    return css`  
      .text-transform-uppercase {
        text-transform: uppercase;
      }
      .text-transform-lowercase {
        text-transform: lowercase;
      }
      .text-transform-capitalize {
        text-transform: capitalize;
      }
      .text-transform-none {
        text-transform: none;
      }
    `;
  }

  render() {
    return html`
      <li 
        class=${this.classes.join(' ') || nothing}>
        <slot></slot>
      </li>      
    `;
  }

  get classes() {
    const classes = [];
    if (this.texttransform) {
      classes.push(`text-transform-${this.texttransform}`);
    }
    if (this.disabled) {
      classes.push('disabled');
    }
    return classes;
  }
}
