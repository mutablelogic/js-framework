import {
  LitElement, html, css, nothing,
} from 'lit';

/**
 * @class NavElement
 *
 * This class provides a navigation element.
 *
 * @example
 * <js-nav>
 *   <js-navitem><js-icon>Bootstrap</js-icon></js-navitem>
 * </js-nav>
 */
export class NavElement extends LitElement {
  static get localName() {
    return 'js-nav';
  }

  static get properties() {
    return {
      vertical: { type: Boolean, reflect: true },
      color: { type: String, reflect: true },
    };
  }

  static get styles() {
    return css`
      :host {
        flex: 1 0;
      }
      ul {
        display: flex;
        flex-direction: row;
        list-style-type: none;
        padding: 0;
        margin: 0;
        border-bottom: var(--nav-border);

        &.vertical {
          flex-direction: column;
          height: 100%;
        }
      }
      ::slotted(*) {
        user-select: none;
        margin: var(--nav-item-margin);
        padding: var(--nav-item-padding);
      }
      ::slotted(js-navitem) {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: var(--nav-item-border);
        cursor: pointer;
      }
      ::slotted(js-navitem:hover) {
        border-bottom: var(--nav-item-border-hover);
      }  
      ::slotted(js-navitem[disabled]) {
        cursor: default;
        border-bottom: var(--nav-item-border);
      }              
      .color-primary {
        background-color: var(--nav-background-color-primary);
        color: var(--nav-color-primary);
      }
    `;
  }

  constructor() {
    super();
    this.vertical = false;
    this.color = 'primary';
  }

  render() {
    return html`
        <nav class=${this.classes.join(' ') || nothing}><ul><slot></slot></ul></nav>      
      `;
  }

  get classes() {
    const classes = [];
    if (this.vertical) {
      classes.push('vertical');
    }
    classes.push(`color-${this.color}`);
    return classes;
  }
}
