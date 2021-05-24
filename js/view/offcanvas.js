// Offcanvas element

import { Offcanvas as OffcanvasBS } from 'bootstrap';
import View from '../view';

// ////////////////////////////////////////////////////////////////////////////
// CONSTANTS

const EVENT_ROOT = 'offcanvas';

/**
 * Offcanvas show event, which is emitted when a element is about to be made visible.
 *
 * @event Offcanvas#offcanvas:show
 * @arg {Offcanvas} sender - The view that emitted the event.
 */
const EVENT_SHOW = `${EVENT_ROOT}:show`;

/**
 * Offcanvas hide event, which is emitted when a element has been hidden.
 *
 * @event Offcanvas#offcanvas:hide
 * @arg {Offcanvas} sender - The view that emitted the event.
 */
const EVENT_HIDE = `${EVENT_ROOT}:hide`;

// ////////////////////////////////////////////////////////////////////////////

/**
 * @class Offcanvas
 * @implements {View}
 * @classdesc This class is constructed with a DOM element and
 * controls an existing
 * [Bootstrap Offcanvas]{@link https://getbootstrap.com/docs/5.0/components/offcanvas/}
 * and is generally used for showing additional information on a modal canvas which is shown
 * and hidden from one side of the window.
 *
 * @arg {Node} node - The node to attach the view to. Throws an error if the node
 *   is not provided.
 */
export default class Offcanvas extends View {
  constructor(node) {
    super(node);
    this.$offcanvas = new OffcanvasBS(node, {});
    node.addEventListener('show.bs.offcanvas', () => {
      this.dispatchEvent(EVENT_SHOW, this);
    });
    node.addEventListener('hidden.bs.offcanvas', () => {
      this.dispatchEvent(EVENT_HIDE, this);
    });
  }

  /**
  * Make the offcanvas view visible
  * @fires Offcanvas#offcanvas:show
  * @throws Error
  */
  show() {
    this.$offcanvas.show();
  }

  /**
  * Make the offcanvas view hidden.
  * @fires Offcanvas#offcanvas:hide
  */
  hide() {
    this.$offcanvas.hide();
  }
}
