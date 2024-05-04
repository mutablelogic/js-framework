import { LitElement, html, css, nothing } from 'lit';

/**
 * @class CardGroupElement
 *
 * This class is used as a group of information cards for layout purposes
 *
 * @example
 * <wc-card-group>
 *   <wc-card backgroundColor="error">
 *     <h1>Card Title</h1>
 *   </wc-card>
 * </wc-card-group>
 */
export class CardGroupElement extends LitElement {
  static get localName() {
    return 'wc-card-group';
  }

  static get styles() {
    return css`
      :host {
        flex: 0 1 auto;
      }
      div.card-group {
        display: flex;
        flex-wrap: wrap;
      }

      /* Colours */
      ::slotted(wc-card) {
        border: 1px solid var(--grey-20-color);
        border-radius: var(--card-border-radius);
        margin: var(--card-margin-y) var(--card-margin-x);
        padding: var(--card-padding-y) var(--card-padding-x);
      }
      ::slotted(wc-card) { /* TODO: Default should vary based on theme */
        background-color: var(--light-color);
        color: var(--dark-color);
      }
      ::slotted(wc-card[backgroundColor="primary"]) {
          background-color: var(--primary-color);
          color: var(--light-color);
      }
      ::slotted(wc-card[backgroundColor="secondary"]) {
        background-color: var(--secondary-color);
        color: var(--dark-color);
      }
      ::slotted(wc-card[backgroundColor="success"]) {
        background-color: var(--success-color);
        color: var(--light-color);
      }
  `;
  }

  render() {
    return html`
      <div class=${this.classes.join(' ') || nothing}>
        <slot></slot>
      </div>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  get classes() {
    const classes = [];
    classes.push('card-group');
    return classes;
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