import {
  LitElement, html,
} from 'lit';

/**
* TableElement - A class that can be used to display a table
*
* @example
* <wc-table>
*  <tr>
*    <th>Column A</th>
*    <th>Column B</th>
*  </tr>
*  <tr>
*    <td>Row 1, Column A</td>
*    <td>Row 1, Column B</td>
*  </tr>
* </wc-table>
*/
export class TableElement extends LitElement {
  static get localName() {
    return 'wc-table';
  }

  static get properties() {
    return {
      data: { type: Array },
    };
  }

  get tableHeader() {
    return html`
      <tr>
        <th>A</th><th>B</th>
      </tr>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    // eslint-disable-next-line no-console
    console.log('TableElement render', this.data);
    return html`
        <table>
          <thead>
            ${this.tableHeader}
          </thead>
          <tbody>
          </tbody>
        </table>
        <caption><slot></slot></caption>
      `;
  }
}
