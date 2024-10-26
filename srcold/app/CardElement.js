import { LitElement, html, css, nothing } from 'lit';

/**
 * @class CardElement
 *
 * This class is used as a information card to display content
 *
 * @property {String} backgroundColor - The color theme of the card, default light
 * @property {Number} width - The width of the card in 1/12th of the available space
 * @property {Boolean} hidden - Whether the card is hidden, default false
 *
 * @example
 * <wc-card-group>
 *   <wc-card backgroundColor="error">
 *     <h1>Card Title</h1>
 *   </wc-card>
 * </wc-card-group>
 */
export class CardElement extends LitElement {
  static get localName() {
    return 'wc-card';
  }

  constructor() {
    super();

    // Default properties
    this.backgroundColor = 'light';
    this.width = 0;
    this.hidden = false;
  }

  static get properties() {
    return {
      backgroundColor: { type: String, attribute: true },
      width: { type: Number, attribute: true },
      hidden: { type: Boolean, attribute: true },
    };
  }

  render() {
    this.style.maxWidth = `${this.flexBasis}`;
    this.style.flexBasis = `${this.flexBasis}`;
    return html`
      <div class=${this.classes.join(' ') || nothing}>
        <slot></slot>
      </div>
    `;
  }

  get classes() {
    const classes = [];
    classes.push('card');
    if (this.width) {
      classes.push(`width-${this.width}`);
    }
    if (this.backgroundColor) {
      classes.push(`bg-${this.backgroundColor}`);
    }
    return classes;
  }

  get flexBasis() {
    if (this.width > 0 && this.width <= 12) {
      return `${this.width * (100 / 12)}%`;
    }
    return 'none';
  }
}

/*
      --primary-color: #16f;
      --secondary-color: #aaa;
      --success-color: #285;
      --warning-color: #f72;
      --error-color: #f55;
      --light-color: #eee;
      --white-color: #fff;
      --dark-color: #333;
      --black-color: #000;
      --grey-10-color: #EAEAEA;
      --grey-20-color: #D0D0D0;
      --grey-30-color: #B6B6B6;
      --grey-40-color: #9C9C9C;
      --grey-50-color: #828282;
      --grey-60-color: #6A6A6A;
      --grey-70-color: #4E4E4E;
      --grey-80-color: #343434;
      --grey-90-color: #1A1A1A;
  */