
import { LitElement, html } from 'lit';
import {customElement} from 'lit/decorators.js';

export class Test extends LitElement {
  render() {
    return html`<button role="button">Test</button>`;
  }
}

customElements.define('Test', Test);
