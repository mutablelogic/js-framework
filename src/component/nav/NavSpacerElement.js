import { LitElement, html, css } from 'lit';
import Event from '../../core/Event';

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
    li {
      flex-grow: 1;
      flex-shrink: 0;
      border: 1px solid red;
    }
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
            <li>SPACER</li>
        `;
  }
}
