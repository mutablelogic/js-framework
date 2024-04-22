import {
  LitElement, html, css, nothing,
} from 'lit';

import { TableColumn } from './TableColumn';

/**
* TableElement - A class that can be used to display a table
*
* @example
* <wc-table data="...">Table Caption</wc-table>
*/
export class TableElement extends LitElement {
  static get localName() {
    return 'wc-table';
  }

  static get properties() {
    return {
      /**
       * @property {Array} data
       * @memberof TableElement
       *
       * The array of data loaded into the table. Each element may be an array or object.
       */
      data: { type: Array },
    };
  }

  static get styles() {
    return css`
      table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid gray;
      }
      table th {
        background-color: lightgray;
        border: 1px solid gray;
        text-align: left;
      }
      table td,th {
        padding: 2px;
      }
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  get tableColumns() {
    return [
      new TableColumn('fruit'),
      new TableColumn('color'),
      new TableColumn('weight'),
    ];
  }

  renderTableHeader() {
    return html`
      <tr>
        ${this.tableColumns.map((column) => html`<th>${column.name}</th>`)}
      </tr>
    `;
  }

  renderTableCell(column, i, j) {
    const row = this.data[i];
    if (Array.isArray(row) && row.length <= j) {
      return row[j];
    }
    if (typeof row === 'object' && column.name in row) {
      return row[column.name];
    }
    return nothing;
  }

  renderTableRow(i) {
    return this.tableColumns.map((column, j) => html`<td>${this.renderTableCell(column, i, j)}</td>`);
  }

  renderTableRows() {
    return html`
      ${this.data.map((_, i) => html`<tr>${this.renderTableRow(i)}</tr>`)}
    `;
  }

  render() {
    const tableHeader = this.renderTableHeader();
    const tableRows = this.renderTableRows();
    return html`
        <table>
          <thead>
            ${tableHeader}
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
        <caption><slot></slot></caption>
      `;
  }
}
