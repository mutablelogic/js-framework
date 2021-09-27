import { LitElement, svg } from 'lit';

// Icons
import icons from 'bootstrap-icons/bootstrap-icons.svg';

/**
 * An icon element
 *
 */
window.customElements.define('wc-icon', class extends LitElement {
  static get properties() {
    return {
      /**
       * Name of the icon to display
       * @type {string}
       */
      name: { type: String },
    };
  }

  render() {
    return svg`
        <svg fill="currentColor"><use href="${icons}#${this.name || 'bootstrap-reboot'}"/></svg>
      `;
  }
});
