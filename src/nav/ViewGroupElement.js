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

  static get properties() {
    return {};
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

  select(name) {
    // TODO
    console.log('select', this, name);
  }
}
