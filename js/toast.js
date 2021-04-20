// Toast

import { Toast as ToastBS } from 'bootstrap';
import View from './view';
import Error from './error';

// ////////////////////////////////////////////////////////////////////////////
// CONSTANTS

const EVENT_ROOT = 'toast';

/**
 * Toast show event, which is emitted when a toast is about to be made visible.
 *
 * @event Toast#toast:show
 * @arg {Toast} sender - The view that emitted the event.
 */
const EVENT_SHOW = `${EVENT_ROOT}:show`;

/**
 * Toast hide event, which is emitted when a toast has been hidden.
 *
 * @event Toast#toast:hide
 * @arg {Toast} sender - The view that emitted the event.
 */
const EVENT_HIDE = `${EVENT_ROOT}:hide`;

// ////////////////////////////////////////////////////////////////////////////

/**
 * @class Toast
 * @implements {View}
 * @classdesc This class is constructed with a DOM element and
 * controls an existing
 * [Bootstrap Toast]{@link https://getbootstrap.com/docs/5.0/components/toasts/}
 * and is generally used for showing transient error and informational messages. It
 * expects the view element to include display elements as described in the show method.
 *
 * @arg {Node} node - The node to attach the view to. Throws an error if the node
 *   is not provided.
 */
export default class Toast extends View {
  constructor(node) {
    super(node);
    this.$toast = new ToastBS(node, {});
    node.addEventListener('show.bs.toast', () => {
      node.parentNode.classList.remove('d-none');
      this.dispatchEvent(EVENT_SHOW, this);
    });
    node.addEventListener('hidden.bs.toast', () => {
      node.parentNode.classList.add('d-none');
      this.dispatchEvent(EVENT_HIDE, this);
    });
  }

  /**
  * Make the toast view visible with a reason and code.
  * It is expected that there are three elements within the
  * toast view with the class names _title, _reason and _code. An error is thrown if these
  * elements do not exist.
  * @arg {Error|string} reason - The body of the toast.
  * @arg {string|number=} code - If the reason is not an error object, this code is used.
  * @fires Toast#toast:show
  * @throws Error
  */
  show(reason, code) {
    if (reason instanceof Error) {
      this.replace('._title', 'ERROR');
      this.replace('._reason', reason.$reason);
      this.replace('._code', reason.$code ? `Code ${reason.$code}` : '');
    } else {
      this.replace('._title', 'INFO');
      this.replace('._reason', reason);
      this.replace('._code', code ? `Code ${code}` : '');
    }
    this.$toast.show();
  }

  /**
  * Make the toast view hidden.
  * @fires Toast#toast:hide
  */
  hide() {
    this.$toast.hide();
  }
}
