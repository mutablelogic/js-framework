// Toast

import { Toast as ToastBS } from 'bootstrap';
import View from './view';
import Error from './error';

// ////////////////////////////////////////////////////////////////////////////
// CONSTANTS

const EVENT_ROOT = 'mvc.toast';
const EVENT_SHOW = `${EVENT_ROOT}.show`;
const EVENT_HIDE = `${EVENT_ROOT}.hide`;

// ////////////////////////////////////////////////////////////////////////////
// TOAST

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

  show(reason, code) {
    if (reason instanceof Error) {
      this.replace('._title', 'ERROR');
      this.replace('._reason', reason.reason);
      this.replace('._code', reason.code ? `Code ${reason.code}` : '');
    } else {
      this.replace('._title', 'INFO');
      this.replace('._reason', reason);
      this.replace('._code', code ? `Code ${code}` : '');
    }
    this.$toast.show();
  }

  hide() {
    this.$toast.hide();
  }
}
