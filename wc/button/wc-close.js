import { LitElement, html, css } from 'lit';

/**
 * A close button element
 */
window.customElements.define('wc-close', class extends LitElement {
  static get properties() {
    return {
      /**
       * Whether the button is disabled
       * @type {boolean}
       */
      disabled: { type: Boolean },
    };
  }

  static get styles() {
    return css`
        button {
          position: absolute;
          right: 0;
          padding: 0;
          border: 0;
          background: transparent;
        }
        button wc-icon {
          width: var(--button-close-size);
          height: var(--button-close-size);
          padding: var(--button-close-padding);
          color: var(--button-close-color);          
        }
        button:hover wc-icon {
          color: var(--button-close-color-hover);          
        }
        button:active wc-icon {
          color: var(--button-close-color-active);          
        }
        button.disabled {
          pointer-events: none;
          color: var(--button-close-color-disabled); 
        }
      `;
  }

  render() {
    return html`
        <button @click=${this.onClick} class="${this.disabled ? 'disabled' : ''}"><wc-icon name="x-circle"></wc-icon></button>
      `;
  }

  onClick() {
    if (!this.disabled) {
      this.parentElement.style.display = 'none';
    }
  }
});
