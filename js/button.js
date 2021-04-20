// Button

import View from './view';

// ////////////////////////////////////////////////////////////////////////////
// CONSTANTS

const EVENT_ROOT = 'button';

/**
 * Button click event
 *
 * @event Button#button:click
 * @arg {Button} sender - The view that emitted the event.
 * @arg {Node} target - The node for the button.
 */
const EVENT_CLICK = `${EVENT_ROOT}:click`;

// ////////////////////////////////////////////////////////////////////////////
// BUTTON

/**
 * @class Button
 * @implements {View}
 * @classdesc This class is constructed with a DOM element and
 * controls an existing
 * [Bootstrap Button]{@link https://getbootstrap.com/docs/5.0/components/buttons/}.
 *
 * @arg {Node} node - The node to attach the view to. Throws an error if the node
 *   is not provided.
 *
 * @throws Error
 */
export default class Button extends View {
  constructor(node) {
    super(node);
    node.addEventListener('click', (evt) => {
      this.dispatchEvent(EVENT_CLICK, this, evt.target);
    });
  }
}
