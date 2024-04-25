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
    this.controller = null;
  }

  static get properties() {
    return {
      /**
       * The controller selector for the view group.
       * This can either be a string selector or a reference to the
       * controller element.
       * @type {Object}
       * @memberof ViewGroupElement
       */
      controller: {},
    };
  }

  static get styles() {
    return css``;
  }

  // eslint-disable-next-line class-methods-use-this
  get className() {
    const classes = [];
    return classes.join(' ');
  }

  render() {
    return html`
      <div class=${this.className || nothing}><slot></slot></div>
    `;
  }

  // Connect the controller
  connectedCallback() {
    super.connectedCallback();

    if (typeof this.controller === 'string' && this.controller) {
      this.controller = this.parentElement.querySelector(this.controller);
    }
    if (typeof this.controller === 'object') {
      this.addController(this.controller);
    }
  }

  // Disconnect the controller
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.controller) {
      this.removeController(this.controller);
    }
  }
}
