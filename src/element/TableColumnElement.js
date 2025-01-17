import { LitElement } from "lit";

/**
 * @class TableColumnElement
 *
 * This class provides a table column element, for rendering
 * a table cell. It also provides properties for the column.
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
    };
  }
}
