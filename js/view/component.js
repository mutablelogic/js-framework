import { render, nothing } from 'lit-html';

export default class Component extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.update();
  }

  // eslint-disable-next-line class-methods-use-this
  disconnectedCallback() { }

  attributeChangedCallback() {
    this.update();
  }

  // eslint-disable-next-line class-methods-use-this
  template() {
    return nothing;
  }

  update() {
    render(this.template(), this.shadowRoot, { eventContext: this });
  }
}
