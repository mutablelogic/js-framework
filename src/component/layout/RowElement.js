
import { LitElement, html, css } from 'lit';

/**
 * A row element which allows you to create a row with cells, either populating
 * the row elements left to right or right to left.
 * 
 * @class
 * 
 * Example:
 * 
 * ```html
 * <wc-row ltr>
 *  <wc-row-6>
 *      <!-- content goes here -->
 *  </wc-row-6>
 * </wc-row>
 * ```
 */
export class RowElement extends LitElement {
  static localName = 'wc-row';

  constructor() {
    super();
  }
  static get styles() {
    return css``;
  }
  render() {
    return html`
        <div class="row"><slot></slot></div>
    `;
  }
}
