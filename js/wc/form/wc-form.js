import { LitElement, html } from 'lit';

/**
 * A form element for submitting data
 *
 * @slot - This element has a slot for input elements
 */
window.customElements.define('wc-form', class extends LitElement {
  static get properties() {
    return {
      /**
       * The method for submitting the form
       * @type {string}
       */
      method: { type: String },

      /**
       * The action when submitting the form
       * @type {string}
       */
      action: { type: String },
    };
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
        <form method="${this.method || 'POST'}" action="${this.action || '#'}"><slot></slot></form>
      `;
  }
});
