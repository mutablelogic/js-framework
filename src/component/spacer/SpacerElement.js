
import { LitElement, html, css } from 'lit';

/**
 * A vertical spacer element
 */
export class SpacerElement extends LitElement {
  constructor() {
    super();

    // Default properties
    this.y = 1;
  }
  static get properties() {
    return {
      /**
       * Y space (0-6)
       * @type {Number}
       */
      y: { type: Number },
    };
  }

  static get styles() {
    return css`
        .m-0 {
            margin: var(--spacer-0)
        }
        .m-1 {
            margin: var(--spacer-1)
        }
        .m-2 {
            margin: var(--spacer-2)
        }
        .m-3 {
            margin: var(--spacer-3)
        }
        .m-4 {
            margin: var(--spacer-4)
        }
        .m-5 {
            margin: var(--spacer-5)
        }
        .m-6 {
            margin: var(--spacer-6)
        }
    `;
  }
  render() {
    return html`
        <div class="m-${this.y}"></div>
    `;
  }
}

customElements.define('wc-spacer', SpacerElement);
