import { LitElement, html, css, nothing } from 'lit';

/**
 * @class NavGroupElement
 *
 * This class is used to contain a list of navigation items, either horizontally or vertically.
 *
 * @property {Boolean} vertical - Fill the canvas vertically rather than horizontally, default false
 * @property {Boolean} flex - Take up all available space, default false
 *
 * @example
 * <wc-nav-group name="group" vertical>
 *  <wc-nav>....</wc-nav>
 *  <wc-nav-spacer></wc-nav-spacer>
 *  <wc-nav>....</wc-nav>
 * </wc-nav-group>
 */
export class NavGroupElement extends LitElement {
  static get localName() {
    return 'wc-nav-group';
  }

  constructor() {
    super();
    this.vertical = false;
  }

  static get properties() {
    return {
      vertical: { type: Boolean },
      flex: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        flex: 999 0;
        height: 100%;
      }
      ul {
        display: flex;
        flex-direction: row;
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      ul.vertical {
        flex-direction: column;
        height: 100%;
      }
      ::slotted(*) {
        cursor: pointer;
        user-select: none;
      }
      ::slotted(wc-nav-item) {
        flex: 0;
        padding: var(--nav-item-padding-y) var(--nav-item-padding-x);
      }
      ::slotted(wc-nav-spacer) {
        flex: 999;
      }
      ::slotted(wc-nav-item:hover) {
        font-weight: var(--nav-item-hover-font-weight);
      }
      ::slotted(wc-nav-item[selected]) {
        color: var(--nav-item-selected-color);
        background-color: var(--nav-item-selected-background-color,red);
      }
    `;
  }

  render() {
    return html`
      <ul class=${this.className || nothing}>
        <slot></slot>
      </ul>
    `;
  }

  get className() {
    const classes = [];
    if (this.vertical) {
      classes.push('vertical');
    }
    if (this.flex) {
      classes.push('flex');
    }
    return classes.join(' ');
  }
}
