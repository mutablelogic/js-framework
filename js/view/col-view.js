import { html } from 'lit-html';
import Component from './component';

customElements.define('col-view', class extends Component {
  // Properties
  static get observedAttributes() {
    return ['width', 'background'];
  }

  get width() {
    return parseInt(this.getAttribute('width'), 10);
  }

  get background() {
    return this.getAttribute('background');
  }

  set width(v) {
    this.setAttribute('width', v);
  }

  set background(v) {
    this.setAttribute('background', v);
  }

  get class() {
    return `col-${this.width} ${this.background ? `bg-${this.background}` : ''}`;
  }

  update() {
    super.update();
    this.classList.value = this.class;
  }

  // eslint-disable-next-line class-methods-use-this
  template() {
    return html`
      <slot class="${this.class}"></slot>
    `;
  }
});
