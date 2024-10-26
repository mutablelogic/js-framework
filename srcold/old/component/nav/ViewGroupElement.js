import { LitElement, html, css, nothing } from 'lit';
import { Event } from '../core/Event';

/**
 * ViewGroupElement
 * This class is used to create a view, within a view group, which
 * displays one view at a time. In general you should use a
 * TabGroupElement as a controller for this view group to switch
 * between visible views.
 *
 * @example
 * <wc-view-group controller="#tabgroup">
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

  constructor() {
    super();
    this.backgroundColor = 'light';
  }

  static get properties() {
    return {
      /**
       * Background color of the view group, one of light or  dark
       *
       * @type {String}
       * @default light
       * @memberof TabGroupElement
       */
      backgroundColor: { type: String },
    };
  }

  static get styles() {
    return css`
      div {
        position: relative;
        height: 100vh;
      }
      ::slotted(wc-view) {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: visibility 0.2s, opacity 0.2s;
      }
      ::slotted(wc-view[selected]) {
        opacity: 1;
        flex: 1 0;
      }
      ::slotted(wc-view:not([selected])) {
        opacity: 0;
        flex: 0 0;
      }

      /* light theme */
      div.bg-color-light {
        border-bottom: 1px solid var(--grey-40-color);
        border-left: 1px solid var(--grey-40-color);
        border-right: 1px solid var(--grey-40-color);
      }
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  get className() {
    const classes = [];
    if (this.backgroundColor) {
      classes.push(`bg-color-${this.backgroundColor}`);
    }
    return classes.join(' ');
  }

  render() {
    return html`
      <div class=${this.className || nothing}><slot></slot></div>
    `;
  }

  /**
   * Select a view by name, and deselect all other view
   *
   * @param {String} name: The name of the tab to select
   * @returns The node that was selected, or null
   */
  select(name) {
    const views = this.querySelectorAll('wc-view');
    let selectedNode = null;
    views.forEach((view) => {
      if (view.name === name && !view.selected) {
        view.setAttribute('selected', 'selected');
        selectedNode = view;
      } else if (view.name !== name && view.selected) {
        view.removeAttribute('selected');
      }
    });
    return selectedNode;
  }
}
