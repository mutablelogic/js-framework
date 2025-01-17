import { LitElement, html } from 'lit';
import { EventType } from '../core/EventType';

/**
 * @class TableHeadElement
 *
 * This class provides a table header element. The header
 * columns are rendered every time a the body is changed.
 *
 * @example
 * <js-tablehead body="#tablebody-id"></js-tablehead>
 */
export class TableHeadElement extends LitElement {
  #body = null;

  static get localName() {
    return 'js-tablehead';
  }

  static get properties() {
    return {
      body: { type: String, reflect: true },
    };
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === 'body') {
      this.#bodyChanged(newVal, oldVal);
    }
  }

  #bodyChanged(newVal, oldVal) {
    if (oldVal != null && this.#body && newVal !== oldVal) {
      this.#body.removeEventListener(EventType.CHANGE, this.#body.bind(this));
      this.#body = null;
    }
    if (newVal != null && newVal !== oldVal) {
      this.#body = document.querySelector(newVal);
      if (this.#body) {
        this.#body.addEventListener(EventType.CHANGE, this.#bodyUpdate.bind(this));
      } else {
        throw new Error(`Table Body "${newVal}" not found`);
      }
    }
  }

  #bodyUpdate() {
    this.requestUpdate();
  }

  render() {
    const rows = this.#renderColumns(this.#body.columns);
    return html`<thead><tr>${rows}</tr></thead>`;
  }

  #renderColumns(row) {
    const columns = [];
    Object.keys(row).forEach((key) => {
      columns.push(html`<th>${this.#renderCell(row[key])}</th>`);
    });
    return columns;
  }

  // eslint-disable-next-line class-methods-use-this
  #renderCell(cell) {
    return html`${cell}`;
  }
}
