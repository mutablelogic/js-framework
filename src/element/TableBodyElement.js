import { LitElement, html, css } from 'lit';
import { EventType } from '../core/EventType';
import { TableHeadElement } from './TableHeadElement';

/**
 * @class TableBodyElement
 *
 * This class provides a table body element.
 *
 * @example
 * <js-tablebody data="#data-source-id"></js-tablebody>
 */
export class TableBodyElement extends LitElement {
  #data = null;

  #head = null;

  static get localName() {
    return 'js-tablebody';
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
      .wrap {
        max-height: 40px;
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

  #renderColumns(row) {
    const columns = [];

    if (row instanceof Object) {
      Object.keys(row).forEach((key) => {
        if (this.columns.indexOf(key) === -1) {
          this.columns.push(key);
        }
        columns.push(html`<td><div class="wrap">${this.#renderCell(row[key])}</div></td>`);
      });
    } else {
      this.columns.push('value');
      columns.push(html`<td>${this.#renderCell(row)}</td>`);
    }

    return columns;
  }

  // eslint-disable-next-line class-methods-use-this
  #renderCell(cell) {
    if (cell instanceof Object) {
      return html`<code>${JSON.stringify(cell)}</code>`;
    }
    return html`${cell}`;
  }
}
