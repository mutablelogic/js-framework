import {
  LitElement, html, css, nothing,
} from 'lit';

/**
 * @class TagElement
 *
 * This class provides a tag (badge)
 *
 * @property {String} color - The color of the tag (primary, secondary, success, warning,
 *   error, light, dark, white, black)
 * @property {String} texttransform - The text transformation of the tag (uppercase,
 *   lowercase, capitalize)
 * @property {String} size - The size of the tag (small, medium, large, xlarge)
 *
 * @example
 * <js-tag color="success" size="small">OK</js-tag>
 */
export class TagElement extends LitElement {
  static get localName() {
    return 'js-tag';
  }

  static get properties() {
    return {
      color: { type: String, reflect: true },
      texttransform: { type: String, reflect: true },
      size: { type: String, reflect: true },
    };
  }

  static get styles() {
    return css`
      :host span {
        display: inline-block;
        user-select: none;
        margin: 0;
      }
      .size-small {
        border: var(--tag-border-small);
        border-radius: var(--tag-border-radius-small);
        font-size: var(--font-size-small);
        padding: var(--tag-padding-small);
      }
      .size-medium, .size-default {
        border: var(--tag-border-medium);
        border-radius: var(--tag-border-radius-medium);
        font-size: var(--font-size-medium);
        padding: var(--tag-padding-medium);
      }
      .size-large {
        border: var(--tag-border-large);
        border-radius: var(--tag-border-radius-large);
        font-size: var(--font-size-large);
        padding: var(--tag-padding-large);
      }
      .size-xlarge {
        border: var(--tag-border-xlarge);
        border-radius: var(--tag-border-radius-xlarge);
        font-size: var(--font-size-xlarge);
        padding: var(--tag-padding-xlarge);
      }
      .color-primary {
        background-color: var(--tag-background-color-primary);
        color: var(--tag-color-primary);
        border-color: var(--tag-border-color-primary);
      }
      .color-secondary {
        background-color: var(--tag-background-color-secondary);
        color: var(--tag-color-secondary);
        border-color: var(--tag-border-color-secondary);
      }
      .color-success {
        background-color: var(--tag-background-color-success);
        color: var(--tag-color-success);
        border-color: var(--tag-border-color-success);
      }
      .color-warning {
        background-color: var(--tag-background-color-warning);
        color: var(--tag-color-warning);
        border-color: var(--tag-border-color-warning);
      }
      .color-error {
        background-color: var(--tag-background-color-error);
        color: var(--tag-color-error);
        border-color: var(--tag-border-color-error);
      }
      .color-light {
        background-color: var(--tag-background-color-light);
        color: var(--tag-color-light);
        border-color: var(--tag-border-color-light);
      }
      .color-dark {
        background-color: var(--tag-background-color-dark);
        color: var(--tag-color-dark);
        border-color: var(--tag-border-color-dark);
      }
      .color-white {
        background-color: var(--tag-background-color-white);
        color: var(--tag-color-white);
        border-color: var(--tag-border-color-white);
      }
      .color-black {
        background-color: var(--tag-background-color-black);
        color: var(--tag-color-black);
        border-color: var(--tag-border-color-black);
      }
      .text-transform-uppercase {
        text-transform: uppercase;
      }
      .text-transform-lowercase {
        text-transform: lowercase;
      }
      .text-transform-capitalize {
        text-transform: capitalize;
      }
      .text-transform-none {
        text-transform: none;
      }
    `;
  }

  constructor() {
    super();
    this.color = 'primary';
    this.texttransform = 'none';
    this.size = 'default';
  }

  render() {
    return html`
      <span class=${this.classes.join(' ') || nothing}><slot></slot></span>      
    `;
  }

  get classes() {
    const classes = [];
    classes.push(`color-${this.color}`);
    classes.push(`size-${this.size}`);
    classes.push(`text-transform-${this.texttransform}`);
    return classes;
  }
}
