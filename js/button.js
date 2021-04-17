// Button

import View from './view';

// ////////////////////////////////////////////////////////////////////////////
// CONSTANTS

const EVENT_ROOT = 'mvc.button';
const EVENT_CLICK = `${EVENT_ROOT}.click`;

// ////////////////////////////////////////////////////////////////////////////
// BUTTON

export default class Button extends View {
  constructor(node) {
    super(node);
    node.addEventListener('click', (evt) => {
      this.dispatchEvent(EVENT_CLICK, this, evt.target);
    });
  }
}
