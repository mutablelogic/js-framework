import { LitElement, html, css } from 'lit';
import { EventType } from '../core/EventType';
import { TableHeadElement } from './TableHeadElement';
import { TableColumnElement } from './TableColumnElement';

/**
 * @class TableElement
 *
 * This class provides a table element, in which the header, footer
 * and columns are rendered.
 *
 * @example
 * <js-table data="#data-source-id"><!-- .... --></js-table>
 */
export class TableElement extends LitElement {
  // Data source node
  #data = null;

  // Table header node
  #head = null;

  // Table column renderers
  #renderer = {};

  // Default renderer
  #default;

  static get localName() {
    return 'js-table';
  }

  static get properties() {
    return {
      data: { type: String, reflect: true },
      columns: { type: Array, reflect: true },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      table {
        border-spacing: 0;
      }
      td, th {
        vertical-align: top;
        border-left: 1px solid #aaa;
        border-top: 1px solid #aaa;
      }
      td:last-child, th:last-child {
        border-right: 1px solid #aaa;
      }
      tr:last-child td {
        border-bottom: 1px solid #aaa;
      }
      th {
        text-transform: capitalize;
      }
      .cell {
        overflow: hidden;        
      }
      code, pre {
        font-family: var(--font-family-monospace);
      }
    `;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === 'data') {
      this.#dataChanged(newVal, oldVal);
    }
  }

  #dataChanged(newVal, oldVal) {
    if (oldVal != null && this.#data && newVal !== oldVal) {
      this.#data.removeEventListener(EventType.CHANGE, this.#dataUpdate.bind(this));
      this.#data = null;
      this.columns = null;
    }
    if (newVal != null && newVal !== oldVal) {
      this.#data = document.querySelector(newVal);
      this.columns = [];
      if (this.#data) {
        this.#data.addEventListener(EventType.CHANGE, this.#dataUpdate.bind(this));
      } else {
        throw new Error(`Data Source "${newVal}" not found`);
      }
    }
  }

  #dataUpdate() {
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent(EventType.CHANGE, {
      detail: this,
    }));
  }

  firstUpdated() {
    // Set the table header
    this.#head = this.querySelector(TableHeadElement.localName);

    // Get the table columns
    const elements = this.childNodes;
    for (let i = 0; i < elements.length; i += 1) {
      if (elements[i] instanceof TableColumnElement) {
        // Column name and title
        const name = elements[i].getAttribute('name');
        // If the name is not empty, add it to the column list
        if (name && name !== '') {
          // Append the column to the list
          if (this.columns.indexOf(name) === -1) {
            this.columns.push(elements[i].getAttribute('name'));
          }
          // Set column renderer
          this.#renderer[name] = elements[i];
        } else {
          // Set the default renderer
          this.#default = elements[i];
        }
      }
    }
  }

  render() {
    const rows = this.#renderRows();
    const head = this.#head ? this.#head.render() : html``;
    return html`<table>${head}<tbody>${rows}</tbody></table>`;
  }

  #renderRows() {
    if (!this.#data) {
      return html``;
    }
    const rows = [];
    for (let i = 0; i < this.#data.length; i += 1) {
      rows.push(html`<tr>${this.#renderColumns(this.#data.at(i))}</tr>`);
    }
    return rows;
  }

  #rendererFor(key) {
    const renderer = this.#renderer[key];
    if (renderer) {
      return renderer;
    }
    return this.#default;
  }

  #hidden(key) {
    return this.#rendererFor(key).hidden;
  }

  #renderColumns(row) {
    const cells = [];
    if (row instanceof Object) {
      Object.keys(row).forEach((key) => {
        if (!this.#hidden(key)) {
          if (this.columns.indexOf(key) === -1) {
            this.columns.push(key);
          }
          cells[this.columns.indexOf(key)] = html`<td><div class="cell">${this.#renderCell(row, key)}</div></td>`;
        }
      });
    } else {
      this.columns.push('value');
      cells.push(html`<td>${this.#renderCell(row)}</td>`);
    }

    // Any missing columns we fill
    for (let i = 0; i < this.columns.length; i += 1) {
      if (!cells[i]) {
        cells[i] = html`<td></td>`;
      }
    }

    // Return cells for rendering in a row
    return cells;
  }

  #renderCell(value, key) {
    return this.#rendererFor(key).render(value, key);
  }
}
