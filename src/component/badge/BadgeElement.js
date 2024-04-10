
import { LitElement, html, css } from 'lit';

/**
 * A badge element
 */
export class BadgeElement extends LitElement {
  constructor() {
    super();
    // Default properties
    this.transform = 'none';
  }

  static get properties() {
    return {
      /**
       * The text transform,  none, uppercase, lowercase,capitalize
       * @type {String}
       */
      transform: { type: String },      
    };
  }

  static get styles() {
    return css`
        :host {
          display: inline-block;
          background-color: var(--badge-background-color); 
          color: var(--badge-color);
          padding: var(--badge-padding-y) var(--badge-padding-x);
          font-size: var(--badge-font-size);
          font-weight:  var(--badge-font-weight);
          border-radius: var(--badge-border-radius);
          line-height: 1;
          text-align: center;
          white-space: nowrap;
          vertical-align: baseline;
          cursor: default;
        }
        .text-transform-capitalize {
          text-transform: capitalize;
        }
        .text-transform-uppercase {
          text-transform: uppercase;
        }
        .text-transform-lowercase {
          text-transform: lowercase;
        }
        .text-transform-none {
          text-transform: none;
        }
      `;
  }

  render() {
    return html`
      <slot class="${this.transform ? `text-transform-${this.transform}` : ''}"></slot>
      `;
  }
}

customElements.define('wc-badge', BadgeElement);


