import { LitElement, html, css } from 'lit';

/**
 * NavSpacerElement
 * This class is used to create a spacer element between items above and below (or left and right)
 *
 * @example
 * <wc-nav vertical>
 *   <wc-nav-item>Top</wc-nav-item>
 *   <wc-nav-spacer></wc-nav-spacer>
 *   <wc-nav-item>Bottom</wc-nav-item>
 * </wc-nav>
 */
export class NavSpacerElement extends LitElement {
  static get localName() {
    return 'wc-nav-spacer';
  }

  static get properties() {
    return {};
  }

  static get styles() {
    return css`
      :host {
        flex: 1;
      }
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <li class="disabled"></li>
    `;
  }
}
