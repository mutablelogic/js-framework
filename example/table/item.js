import { html } from 'lit';
import { TableColumnElement } from '../../src/element/TableColumnElement';

export class ItemColumn extends TableColumnElement {
  static get localName() {
    return 'js-itemcol';
  }

  // eslint-disable-next-line class-methods-use-this
  #text(value, key) {
    return value instanceof Object ? value[key] : value;
  }

  render(value, key) {
    const cell = value instanceof Object ? value[key] : value;
    switch (key) {
      case 'title':
        return html`
          <div style="padding: 5px;">
            <js-tag size="small">${this.#text(value, 'author')}</js-tag>
            <h4>${this.#text(value, 'title')}</h4>
            <small><strong>${this.#text(value, 'pubdate')}</strong></small>
            <p>${this.#text(value, 'desc')}</p>
            ${value.media ? this.#renderAudio(value.media[0]) : ''}
          </div>
        `;
      default:
    }
    return html`${cell}`;
  }

  // eslint-disable-next-line class-methods-use-this
  #renderAudio(media) {
    return html`
      <audio controls>
        <source src="${media.url}" type="${media.type}">
        Your browser does not support the audio element.
      </audio>
    `;
  }
}

customElements.define(ItemColumn.localName, ItemColumn); // js-itemcol
