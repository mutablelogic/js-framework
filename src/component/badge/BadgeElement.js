
import { LitElement, html, css } from 'lit';

/**
 * A badge element
 */
export class BadgeElement extends LitElement {
  constructor() {
    super();
    // Default properties
    this.transform = 'none';
    this.backgroundColor = 'primary';
  }

  static get properties() {
    return {
      /**
       * The text transform,  none, uppercase, lowercase,capitalize
       * @type {String}
       * @memberof BadgeElement
       */
      transform: { type: String },
      
      /** 
       * The badge background color. One of the following: primary, secondary, success, warning, danger, light, dark
       * @type {String}
       * @memberof BadgeElement
       */
        backgroundColor: { type: String },
    };
  }

  static get styles() {
    return css`
        span {
            display: inline-block;
            background-color: var(--badge-background-color); 
            color: var(--badge-color);
            padding: var(--badge-padding-y) var(--badge-padding-x);
            font-size: var(--badge-font-size);
            font-weight:  var(--badge-font-weight);
            border-top-left-radius: var(--badge-border-radius-left);
            border-bottom-left-radius: var(--badge-border-radius-left);
            border-top-right-radius: var(--badge-border-radius-right);
            border-bottom-right-radius: var(--badge-border-radius-right);      
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
        .bg-color-primary {
            background-color: var(--primary-color);
            color: var(--light-color);
        }
        .bg-color-secondary {
            background-color: var(--secondary-color);
            color: var(--dark-color);
        }
        .bg-color-success {
            background-color: var(--success-color);
            color: var(--light-color);
        }
        .bg-color-warning {
            background-color: var(--warning-color);
            color: var(--light-color);
        }
        .bg-color-error {
            background-color: var(--error-color);
            color: var(--light-color);
        }
        .bg-color-light {
            background-color: var(--light-color);
            color: var(--dark-color);
        }
        .bg-color-dark {
            background-color: var(--dark-color);
            color: var(--light-color);
        }  
      `;
  }

  render() {
    return html`
      <span class="bg-color-${this.backgroundColor}"><slot class="text-transform-${this.transform}"}></slot></span>
      `;
  }
}

customElements.define('wc-badge', BadgeElement);


