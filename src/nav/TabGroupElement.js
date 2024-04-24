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

  static get properties() {
    return {

      /**
       * Background color of the tab group, one of primary, secondary, light, white, dark, black
       *
       * @type {String}
       * @default primary
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
        border-bottom: 1px solid red;
      }      
      ::slotted(wc-tab) {
        border: 1px solid red;
        border-bottom: none;
        padding: 10px;
        margin-right: 4px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        cursor: pointer;
      }
      ul.bg-color-primary {
        border-color: var(--grey-80-color);
      }
      .bg-color-primary ::slotted(wc-tab) {
        background-color: var(--primary-color);
        color: var(--white-color);
        border-color: var(--grey-80-color);
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
