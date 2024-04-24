import {
  LitElement, html, css, nothing,
} from 'lit';

/**
 * TabGroupElement
 * This class is used to create a tab group, which
 * displays a tabbed navigation horizontally and allows
 * selection of one tab within the group.
 *
 * @example
 * <wc-tab-group>
 *   <wc-tab name="tab1" selected>Tab1</wc-tab>
 *   <wc-tab name="tab2">Tab2</wc-tab>
 *   <wc-tab name="tab3">Tab3</wc-tab>
 *   <wc-tab name="tab4" disabled>Tab4</wc-tab>
 * </wc-tab-group>
 */
export class TabGroupElement extends LitElement {
  static get localName() {
    return 'wc-tab-group';
  }

  constructor() {
    super();
    this.backgroundColor = 'light';
    this.hidden = false;
  }

  static get properties() {
    return {

      /**
       * Background color of the tab group, one of primary, secondary, light, white, dark, black
       *
       * @type {String}
       * @default light
       * @memberof TabGroupElement
       */
      backgroundColor: { type: String },

      /**
       * If true, tab group is hidden and takes up no space
       *
       * @type {Boolean}
       * @default false
       * @memberof TabGroupElement
       */
      hidden: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      ul {
        display: flex;
        margin: 0;
        border: 0;
        padding: 0;
        padding-left: 4px;
        list-style: none;
      }      
      ::slotted(wc-tab) {
        border-bottom: none;
        padding: 10px;
        margin-right: 4px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        cursor: pointer;
        user-select: none;
      }

      /* dark theme */
      ul.bg-color-dark {
        border-bottom: 1px solid var(--grey-80-color);
      }
      .bg-color-dark ::slotted(wc-tab) {
        background-color: var(--dark-color);
        color: var(--light-color);
        border-color: var(--grey-80-color);
      }
      .bg-color-dark ::slotted(wc-tab:hover) {
        background-color: var(--primary-color);
        color: var(--white-color);
      }
      .bg-color-dark ::slotted(wc-tab:active) {
        background-color: var(--primary-color);
        color: var(--white-color);
        font-weight: var(--font-weight-bold);
      }

      /* light theme */
      ul.bg-color-light {
        border-bottom: 1px solid var(--grey-20-color);
      }
      .bg-color-light ::slotted(wc-tab) {
        background-color: var(--light-color);
        color: var(--dark-color);
        border-color: var(--grey-20-color);
      }
      .bg-color-light ::slotted(wc-tab:hover) {
        background-color: var(--primary-color);
        color: var(--white-color);
      }
      .bg-color-light ::slotted(wc-tab:active) {
        background-color: var(--primary-color);
        color: var(--white-color);
        font-weight: var(--font-weight-bold);
      }      
    `;
  }

  get className() {
    const classes = [];
    if (this.backgroundColor) {
      classes.push(`bg-color-${this.backgroundColor}`);
    }
    if (this.hidden) {
      classes.push('hidden');
    }
    return classes.join(' ');
  }

  render() {
    return html`
      <ul class=${this.className || nothing}><slot></slot></ul>
    `;
  }
}
