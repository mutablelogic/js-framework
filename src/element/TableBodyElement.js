import { LitElement, html } from 'lit';
import { Model } from '../core/Model';
import { EventType } from '../core/EventType';

/**
 * @class TableBodyElement
 *
 * This class provides a table body element.
 *
 * @example
 * <js-table-body></js-table-body>
 */
export class TableBodyElement extends LitElement {
  static get localName() {
    return 'js-table-body';
  }

  static get properties() {
    return {
      model: {
        type: Model, reflect: true, converter: {
          fromAttribute: (value, type) => {
            console.log(`TableBodyElement.model.fromAttribute(${value}, ${type})`);
            return value;
          },
          toAttribute: (value, type) => {
            console.log(value);
            return value.data;
          }
        }
      }
    };
  }

  render() {
    console.log(`TableBodyElement.render() ${this.model ? this.model.data : '(not a model)'}`);
    return html`
      <tbody>
      <tr>
        <td>A</td>
        <td>B</td>
      </tr>
      </tbody>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('model')) {
      this.#modelChangedSetListeners(this.model, changedProperties.get('model'));
    }
  }

  #modelChangedSetListeners(newVal, oldVal) {
    if (oldVal) {
      oldVal.removeEventListener(EventType.CHANGE, this.#modelChanged.bind(this));
    }
    if (newVal) {
      newVal.addEventListener(EventType.CHANGE, this.#modelChanged.bind(this));
    }
  }

  #modelChanged() {
    console.log(`TableBodyElement.#modelChanged`);
    this.requestUpdate();
  }
}
