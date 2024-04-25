import {
  LitElement, html, css, nothing,
} from 'lit';

/**
 * ViewGroupElement
 * This class is used to create a view, within a view group, which
 * displays one view at a time. In general you should use a
 * TabGroupElement as a controller for this view group to switch
 * between visible views.
 *
 * @example
 * <wc-view-group>
 *   <wc-view name="view1" selected>View1</wc-tab>
 *   <wc-view name="view2">View2</wc-tab>
 *   <wc-view name="view3">View3</wc-tab>
 *   <wc-view name="view4">View4</wc-tab>
 * </wc-view-group>
 */
export class ViewGroupElement extends LitElement {
  static get localName() {
    return 'wc-view-group';
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
       * The name of the tab, for click events.
       * @type {String}
       * @default ''
       * @memberof TabElement
       */
      name: { type: String },
    };
  }

  static get styles() {
    return css``;
  }

  get className() {
    const classes = [];
    if (this.selected) {
      classes.push('selected');
    }
    return classes.join(' ');
  }

  render() {
    return html`
            <div class=${this.className || nothing}><slot></slot></div>
          `;
  }
}
