import { LitElement, html, css } from 'lit';

/**
 * A modal window
 *
 * @slot - This element has a slot for any element as contents of the modal
 */
window.customElements.define('wc-modal', class extends LitElement {
  static get properties() {
    return {
      /**
       * The background color
       * @type {string}
       */
      bg: { type: String },

      /**
       * The text color
       * @type {string}
       */
      color: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        position: fixed; 
        left: 0; 
        top: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        display: none;
        outline: 0;
        background-color: rgba(0, 0, 0, 0.5);        
      }
      :host div {
        position: relative; 
        width: auto;
        margin: var(--modal-margin);
        padding: var(--modal-padding);
        background-color: white;
        border: var(--modal-border);
        border-radius: var(--modal-border-radius);
      }
      :host slot {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        color: var(--modal-color);
        background-color: var(--modal-background-color);
        background-clip: padding-box;
        outline: 0;        
      }
      `;
  }

  get class() {
    return `${this.bg ? `bg-${this.bg}` : ''} ${this.color ? `color-${this.color}` : ''}`;
  }

  render() {
    return html`
        <div><slot class="${this.class}"></slot></div>
      `;
  }
});
