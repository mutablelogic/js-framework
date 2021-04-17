// Copy Paste

import View from './view';
import Error from './error';

// ////////////////////////////////////////////////////////////////////////////
// CONSTANTS

const EVENT_ROOT = 'mvc.copypaste';
const EVENT_CHANGE = `${EVENT_ROOT}.change`;

// ////////////////////////////////////////////////////////////////////////////
// CopyPaste

export default class CopyPaste extends View {
  constructor(node) {
    super(node);
    node.addEventListener('click', (evt) => {
      navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
        if (result.state === 'granted') {
          const data = new Blob([node.innerText], { type: 'text/plain' });
          navigator.clipboard.write(data).then(() => {
            this.dispatchEvent(EVENT_CHANGE, this, evt.target);
          });
        } else {
          throw new Error('Permission not granted', result.state);
        }
      });
    });
  }
}
