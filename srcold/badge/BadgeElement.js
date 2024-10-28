import {
  LitElement, html, css, nothing,
} from 'lit';

/**
* BadgeElement - A badge element class that can be used to display a badge with text or icon.
*
* @example
* <wc-badge backgroundColor="primary" textTransform="uppercase">New</wc-badge>
* <wc-badge backgroundColor="primary"><wc-icon name="circle"></wc-icon></wc-badge>
*/
export class BadgeElement extends LitElement {
  static get localName() {
    return 'wc-badge';
  }

  /**
    * @constructor
    * Badge element constructor. Sets the default properties, textTransform and backgroundColor
    * to none and primary respectively.
    */
  constructor() {
    super();

    // Default properties
    this.textTransform = 'none';
    this.backgroundColor = 'primary';
  }

  static get properties() {
    return {
      /**
       * @property {String} textTransform
       * @memberof BadgeElement
       *
       * The text transform, one of: none, uppercase, lowercase, capitalize
       */
      textTransform: { type: String },

      /**
       * @property {String} backgroundColor
       * @memberof BadgeElement
       *
       * The badge background color. One of the following: primary, secondary, success,
       * warning, danger, light, dark
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

  get className() {
    let className = '';
    if (this.textTransform) {
      className += `text-transform-${this.textTransform}`;
    }
    if (this.backgroundColor) {
      className += ` bg-color-${this.backgroundColor}`;
    }
    return className;
  }

  render() {
    return html`
      <span class=${this.className || nothing}><slot></slot></span>
    `;
  }
}
