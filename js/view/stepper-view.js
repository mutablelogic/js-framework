import { html } from 'lit-html';
import Component from './component';

/// //////////////////////////////////////////////////////////////////
// EVENTS

const EVENT_CLICK = 'stepper-view:click';

export default {
  EVENT_CLICK,
};

/// //////////////////////////////////////////////////////////////////
// COMPONENT

customElements.define('stepper-view', class extends Component {
  connectedCallback() {
    super.connectedCallback();
  }

  onClick(evt) {
    this.dispatchEvent(new CustomEvent(EVENT_CLICK, {
      composed: true,
      bubbles: true,
      detail: evt.target.classList.contains('left') ? 'left' : 'right',
    }));
  }

  // eslint-disable-next-line class-methods-use-this
  template() {
    return html`
      <style type="text/css">
      div {
        display: flex;
        padding-top: var(--stepper-padding-y);
        padding-right: var(--stepper-padding-x);
        padding-bottom: var(--stepper-padding-y);
        padding-left: var(--stepper-padding-x);
      }
      button {
        display: inline-block;
        vertical-align: top;
        cursor: pointer;
        padding: 5px 15px;
        background-color: var(--stepper-btn-background-color);
        color: var(--stepper-btn-color);
        border-radius: var(--stepper-border-radius);
        border: none;
        line-height: 0;
      }
      button:hover {
        background-color: var(--stepper-btn-background-color-hover);
      }
      button:active {
        background-color: var(--stepper-btn-background-color-active);
      }
      button.left::after {
        content: var(--icon-minus);        
      }
      button.left {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      button.right::before {
        content: var(--icon-plus);
      }
      button.right {
        content: var(--icon-plus);
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      slot {
        display: inline-block;
        background-color: var(--stepper-background-color);
        color: var(--stepper-color);
        padding: 5px 15px;
      }
      </style>
      <div>
        <button class="left" @click=${this.onClick}></button>
        <slot></slot>
        <button class="right" @click=${this.onClick}></button>
      </div>
    `;
  }
});
