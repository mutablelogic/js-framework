import {
  LitElement, html, css, nothing,
} from 'lit';

/**
 * @class ImageElement
 *
 * This class provides a image element
 *
 * @example
 * <js-image src="url">Caption for the image</js-image>
 */
export class ImageElement extends LitElement {
  static get localName() {
    return 'js-image';
  }

  static get properties() {
    return {
      src: { type: String, reflect: true },
      size: { type: String, reflect: true },
    };
  }

  static get styles() {
    return css`
        :host {
            display: inline-block;
            vertical-align: middle;
        }
        .size-small {
          width: var(--image-size-small);
        }
        .size-medium, .size-default {
          width: var(--image-size-medium);
        }
        .size-large {
          width: var(--image-size-large);
        }
        .size-xlarge {
          width: var(--image-size-xlarge);
        }
      `;
  }

  constructor() {
    super();
    this.size = 'default';
  }

  // eslint-disable-next-line class-methods-use-this
  get classes() {
    const classes = [];
    if (this.size) {
      classes.push(`size-${this.size}`);
    }
    return classes;
  }

  get caption() {
    return this.textContent.trim();
  }

  render() {
    return html`
      <img 
        class=${this.classes.join(' ') || nothing}
        src="${this.src || nothing}" 
        alt="${this.caption || nothing}">
      </img>
    `;
  }
}
