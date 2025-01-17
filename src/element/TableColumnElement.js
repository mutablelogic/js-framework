import { LitElement, html } from 'lit';

/**
 * @class TableColumnElement
 *
 * This class provides a table column element, for rendering
 * a table cell. It also provides properties for the column.
 * The name property is used to identify the column in the
 * table, and the hidden property is used to hide the column.
 *
 * @example
 * <js-tablecol name="id">ID</js-tablecol>
 */
export class TableColumnElement extends LitElement {
  static get localName() {
    return 'js-tablecol';
  }

  static get properties() {
    return {
      name: { type: String, reflect: true },
      hidden: { type: Boolean, reflect: true },
    };
  }

  /**
   * Get the column title.
   *
   * @returns {string}
   */
  get title() {
    return this.textContent;
  }

  // eslint-disable-next-line class-methods-use-this
  render(value, key) {
    const cell = value instanceof Object ? value[key] : value;
    if (cell instanceof Object) {
      return html`<code>${JSON.stringify(cell)}</code>`;
    }
    return html`${cell}`;
  }
}
