import { LitElement, html, css } from 'lit';

/**
 * A group of checkboxes
 *
 * @slot - This element has a slot for wc-checkbox elements
 */
window.customElements.define('wc-checkbox-group', class extends LitElement {
  constructor() {
    // Always call super() first
    super();

    // Initialize properties
    this.radio = false;
  }

  static get properties() {
    return {
      /**
       * The name for the group of checkboxes
       * @type {string}
       */
      name: { type: String },

      /**
       * Whether the group is "select one" (radio)
       * @type {boolean}
       */
      radio: { type: Boolean },
    };
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
        <slot></slot>
      `;
  }
});
