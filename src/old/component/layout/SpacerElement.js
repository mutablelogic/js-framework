
import { LitElement, html, css } from 'lit';

/**
 * A vertical spacer element
 */
export class SpacerElement extends LitElement {
  static localName = 'wc-spacer';

  constructor() {
    super();

    // Default properties
    this.v = 1;
  }
  static get properties() {
    return {
      /**
       * Vertical spacer: 0, 1, 2, 3, 4, 5, 6 which defaults to 1 space element
       * 
       * @type Number
       * @memberof SpacerElement
       * 
       * Example:
       * 
       * ```html
       * <wc-spacer v="3"></wc-spacer>
       * ```
       */
      v: { type: Number },
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
        <div class="m-${this.v}"></div>
    `;
  }
}
