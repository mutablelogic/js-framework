import { LitElement, html, css, nothing } from 'lit';
import { Event } from '../core/Event';

/**
 * @class NavGroupElement
 *
 * This class is used to contain a list of navigation items, either horizontally or vertically.
 *
 * @property {Boolean} vertical - Fill the canvas vertically rather than horizontally, default false
 * @property {Boolean} flex - Take up all available space, default false
 * @event CLICK - Dispatched when a navigation item is clicked, which is not disabled
 *
 * @example
 * <wc-nav-group vertical>
 *  <wc-nav-item>....</wc-nav-item>
 *  <wc-nav-spacer></wc-nav-spacer>
 *  <wc-nav-item>....</wc-nav-item>
 * </wc-nav-group>
 */
export class NavGroupElement extends LitElement {
  static get localName() {
    return 'wc-nav-group';
  }

  constructor() {
    super();
    this.vertical = false;
  }

  static get properties() {
    return {
      vertical: { type: Boolean },
      flex: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        flex: 1 0;
        height: 100%;
      }
      ul {
        display: flex;
        flex-direction: row;
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      ul.vertical {
        flex-direction: column;
        height: 100%;
      }
      ::slotted(*) {
        cursor: pointer;
        user-select: none;
      }
      ::slotted(wc-nav-item) {
        flex: 0;
        margin: var(--nav-item-margin-y) var(--nav-item-margin-x);
        padding: var(--nav-item-padding-y) var(--nav-item-padding-x);
        border-radius: var(--nav-item-border-radius);
      }
      ::slotted(wc-nav-spacer) {
        flex: 1;
      }
      ul:not([vertical]) ::slotted(wc-nav-divider) {
        border-left: 1px solid var(--nav-item-divider-color);
      }
      ul.vertical ::slotted(wc-nav-divider) {
          border-top: 1px solid var(--nav-item-divider-color);
      }
      ::slotted(wc-nav-item[selected]) {
        color: var(--nav-item-selected-color);
        background-color: var(--nav-item-selected-background-color,red);
      }
      ::slotted(wc-nav-item[disabled]) {
        color: var(--nav-item-disabled-color);
        cursor: default;
      }
    `;
  }

  render() {
    return html`
      <ul class=${this.classes.join(' ') || nothing} @click=${this.onClick}>
        <slot></slot>
      </ul>
    `;
  }

  get classes() {
    const classes = [];
    if (this.vertical) {
      classes.push('vertical');
    }
    if (this.flex) {
      classes.push('flex');
    }
    return classes;
  }

  /**
   * Select the named item from the list of wv-nav-item elements
   *
   * @param {String} name - Name of the item to select
   */
  select(name) {
    this.querySelectorAll('wc-nav-item').forEach((item) => {
      if (item.name === name) {
        item.setAttribute('selected', true);
      } else {
        item.removeAttribute('selected');
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  onClick(event) {
    const target = event.target.closest('wc-nav-item');
    if (target && !target.disabled) {
      this.dispatchEvent(new CustomEvent(Event.CLICK, {
        bubbles: true,
        composed: true,
        detail: target.name || target.textContent.trim(),
      }));
    }
  }
}
