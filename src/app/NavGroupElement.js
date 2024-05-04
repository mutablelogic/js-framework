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
    ul {
        display: flex;
        flex-direction: row;
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      ul.vertical {
        flex-direction: column;
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
