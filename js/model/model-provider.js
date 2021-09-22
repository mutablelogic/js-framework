import { nothing } from 'lit-html';
import Component from '../view/component';

/// //////////////////////////////////////////////////////////////////
// EVENTS

const EVENT_ERROR = 'model-provider:error';

export default {
  EVENT_ERROR,
};

customElements.define('model-provider', class extends Component {
  // Properties
  static get observedAttributes() {
    return ['href'];
  }

  get href() {
    return this.getAttribute('href') || '/';
  }

  set href(v) {
    this.setAttribute('href', v || '/');
  }

  // Public methods
  request(path, req, interval) {
    this.$cancel();
    if (!this.$timer) {
      this.$fetch(path, req);
    }
    if (interval) {
      this.$timer = setInterval(this.$fetch.bind(this, path, req), interval);
    }
  }

  // Private methods
  $cancel() {
    if (this.$timer) {
      clearTimeout(this.$timer);
      this.$timer = undefined;
    }
  }

  $fetch(url, req) {
    let absurl = this.href + (url || '');
    if (!absurl.hasPrefix('/')) {
      absurl = `/${absurl}`;
    }
    fetch(absurl, req)
      .then((response) => {
        console.log('got', response);
      })
      .catch((error) => {
        this.dispatchEvent(new CustomEvent(EVENT_ERROR, {
          composed: true,
          bubbles: true,
          detail: error,
        }));
      });
  }

  // eslint-disable-next-line class-methods-use-this
  template() {
    return nothing;
  }
});
