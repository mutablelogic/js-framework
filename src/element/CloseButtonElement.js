import { LitElement, html, svg, css, nothing } from 'lit';
import icons from 'bootstrap-icons/bootstrap-icons.svg';

/**
 * @class CloseButtonElement
 *
 * This class provides an icon element
 *
 * @example
 * <js-close size="large"></js-close>
 */
export class CloseButtonElement extends LitElement {
  static get localName() {
    return 'js-close';
  }

  constructor() {
    super();
    this.size = 'default';
  }

  static get properties() {
    return {
      size: { type: String, reflect: true },
    };
  }

  static get styles() {
    return css`
      :host {
          display: inline-block;
          vertical-align: middle;
          cursor: pointer;
          user-select: none;
          float: right;

          div:hover {
            color: red;
          }          

          div:active {
            color: red;
            transform: translate(0.1rem, 0.1rem);
          }          
      }
      .size-small {
          position: relative;
          width: var(--icon-size-small);
          height: var(--icon-size-small);
      }
      .size-medium, .size-default {
          position: relative;
          width: var(--icon-size-medium);
          height: var(--icon-size-medium);
      }
      .size-large {
          position: relative;
          width: var(--icon-size-large);
          height: var(--icon-size-large);
      }
      .size-xlarge {
          position: relative;
          width: var(--icon-size-xlarge);
          height: var(--icon-size-xlarge);
      }
      svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
      }
    `;
  }

  get classes() {
    const classes = [];
    classes.push(`size-${this.size}`);
    return classes;
  }

  get name() {
    return this.textContent.trim() || 'x-lg';
  }

  render() {
    return svg`<div class=${this.classes.join(' ') || nothing}><svg><use href="${icons}#${this.name}"/></svg></div>`;
  }
}
