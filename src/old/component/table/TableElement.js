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

  constructor() {
    super();

    // Set default values for properties
    this.data = [];
    this.backgroundColor = '';
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

      /**
       * @property {Boolean} stripedRows
       * @memberof TableElement
       *
       * Whether to offset the colour of the rows in the table
       */
      stripedRows: { type: Boolean },

      /**
       * @property {String} backgroundColor
       * @memberof TableElement
       * @default ''
       *
       * The colour of the background of the table. Either primary, secondary, light, dark, black or white.
       */
      backgroundColor: { type: String },
    };
  }

  static get styles() {
    return css`
      table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid gray;
      }
      table.bg-color-primary {
        background-color: var(--primary-color);
        color: var(--light-color);
      }
      table.bg-color-secondary {
        background-color: var(--secondary-color);
        color: var(--light-color);
      }
      table.bg-color-light {
        background-color: var(--light-color);
        color: var(--dark-color);
      }
      table.bg-color-dark {
        background-color: var(--dark-color);
        color: var(--light-color);
      }
      table.bg-color-white {
        background-color: var(--white-color);
        color: var(--black-color);
      }
      table.bg-color-black {
        background-color: var(--black-color);
        color: var(--white-color);
      }
      table th {
        text-align: left;
        backdrop-filter: var(--table-row-filter-header)
      }
      table td,th {
        padding: var(--table-cell-padding-y) var(--table-cell-padding-x);
      }
      table.striped-rows tbody tr:nth-child(odd) {
        backdrop-filter: var(--table-row-filter-odd);
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

  #renderTableHeader() {
    return html`
      <tr>
        ${this.tableColumns.map((column) => html`<th>${column.name}</th>`)}
      </tr>
    `;
  }

  #renderTableCell(column, i, j) {
    const row = this.data[i];
    if (Array.isArray(row) && row.length <= j) {
      return row[j];
    }
    if (typeof row === 'object' && column.name in row) {
      return row[column.name];
    }
    return nothing;
  }

  #renderTableRow(i) {
    return this.tableColumns.map((column, j) => html`<td>${this.#renderTableCell(column, i, j)}</td>`);
  }

  #renderTableRows() {
    return html`
      ${this.data.map((_, i) => html`<tr>${this.#renderTableRow(i)}</tr>`)}
    `;
  }

  get className() {
    const classes = ['table'];
    if (this.backgroundColor) {
      classes.push(`bg-color-${this.backgroundColor}`);
    }
    if (this.stripedRows) {
      classes.push('striped-rows');
    }
    return classes.join(' ');
  }

  render() {
    const tableHeader = this.#renderTableHeader();
    const tableRows = this.#renderTableRows();
    return html`
        <table class=${this.className || nothing}>
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
