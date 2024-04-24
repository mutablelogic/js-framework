import {
  LitElement, html, css, nothing,
} from 'lit';

/**
 * TabElement
 * This class is used to create a tab, within a tab group, which
 * displays a tabbed navigation horizontally.
 *
 * @example
 * <wc-tab-group>
 *   <wc-tab name="tab1" selected>Tab1</wc-tab>
 *   <wc-tab name="tab2">Tab2</wc-tab>
 *   <wc-tab name="tab3">Tab3</wc-tab>
 *   <wc-tab name="tab4" disabled>Tab4</wc-tab>
 * </wc-tab-group>
 */
export class TabElement extends LitElement {
  static get localName() {
    return 'wc-tab';
  }

  static get properties() {
    return {
      /**
       * Whether the tab is selected. Only one tab within a group should
       * be selected at a time.
       * @type {Boolean}
       * @default false
       * @memberof TabElement
       */
      selected: { type: Boolean },

      /**
       * Whether the tab can be selected.
       * @type {Boolean}
       * @default false
       * @memberof TabElement
       */
      disabled: { type: Boolean },

      /**
       * The name of the tab, for click events.
       * @type {String}
       * @default ''
       * @memberof TabElement
       */
      name: { type: String },
    };
  }

  static get styles() {
    return css`
      li {
        text-align: center;
      }
    `;
  }

  get className() {
    const classes = [];
    if (this.selected) {
      classes.push('selected');
    }
    if (this.disabled) {
      classes.push('disabled');
    }
    return classes.join(' ');
  }

  render() {
    return html`
        <li class=${this.className || nothing}><slot></slot></li>
      `;
  }
}
