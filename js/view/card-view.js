import { html, nothing } from 'lit-html';
import Component from './component';

/// //////////////////////////////////////////////////////////////////
// COMPONENT

customElements.define('card-view', class extends Component {
  // Properties
  static get observedAttributes() {
    return ['width', 'background'];
  }

  get width() {
    return parseInt(this.getAttribute('width'), 10) || 4;
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
    return `card  ${this.background ? `bg-${this.background}` : ''}`;
  }

  get lightClass() {
    return `col-${this.width}`;
  }

  update() {
    super.update();
    this.classList.value = this.lightClass;
  }

  // eslint-disable-next-line class-methods-use-this
  template() {
    return html`
      <style type="text/css">
        .bg-light { background-color: var(--light-color) !important; }
        .bg-dark { background-color: var(--dark-color) !important; }
        .bg-primary { background-color: var(--primary-color) !important; }
        .bg-secondary { background-color: var(--secondary-color) !important; }

        div.card {
          margin: var(--card-margin);
          padding: var(--card-padding);
          background-color: var(--card-background-color);
          border: 1px solid var(--card-border-color);
          border-radius: var(--card-border-radius);
          overflow: hidden;
        }
        p {
          background-color: blue;
        }
      </style>
      <div class="${this.class}"><slot></slot></div>
    `;
  }
});
