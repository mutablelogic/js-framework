import { LitElement, html } from 'lit';

/**
 * A form heading which presents a title and possible text to explain the form.
 *
 * @slot - This element has a slot for input elements
 */
window.customElements.define('wc-form-head', class extends LitElement {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
        <h3><slot></slot></h3>
        <hr>
      `;
  }
});
