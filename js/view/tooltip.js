// Tooltip element

import { Tooltip as TooltipBS } from 'bootstrap';
import View from '../view';

// ////////////////////////////////////////////////////////////////////////////
// CONSTANTS

const EVENT_ROOT = 'tooltip';

/**
 * Tooltip show event, which is emitted when a element is about to be made visible.
 *
 * @event Tooltip#tooltip:show
 * @arg {Tooltip} sender - The view that emitted the event.
 */
const EVENT_SHOW = `${EVENT_ROOT}:show`;

/**
 * Tooltip hide event, which is emitted when a element has been hidden.
 *
 * @event Tooltip#tooltip:hide
 * @arg {Tooltip} sender - The view that emitted the event.
 */
const EVENT_HIDE = `${EVENT_ROOT}:hide`;

// ////////////////////////////////////////////////////////////////////////////

/**
 * @class Tooltip
 * @implements {View}
 * @classdesc This class is constructed with a DOM element and
 * controls an existing
 * [Bootstrap Tooltip]{@link https://getbootstrap.com/docs/5.0/components/tooltips/}
 * and is generally used for showing additional information above an existing element.
 *
 * @arg {Node} node - The node to attach the view to. Throws an error if the node
 *   is not provided. Include the tooltip text in the "title" attribute of the view.
 */
export default class Tooltip extends View {
  constructor(node) {
    super(node);
    this.$tooltip = new TooltipBS(node, {
      boundary: document.body,
    });
    node.addEventListener('show.bs.tooltip', () => {
      this.dispatchEvent(EVENT_SHOW, this);
    });
    node.addEventListener('hidden.bs.tooltip', () => {
      this.dispatchEvent(EVENT_HIDE, this);
    });
  }

  /**
  * Make the tooltip view visible
  * @fires Offcanvas#offcanvas:show
  * @throws Error
  */
  show() {
    this.$tooltip.show();
  }

  /**
  * Make the tooltip view hidden.
  * @fires Offcanvas#offcanvas:hide
  */
  hide() {
    this.$tooltip.hide();
  }
}
