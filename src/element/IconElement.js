import {
  LitElement, svg, css, nothing,
} from 'lit';
import icons from 'bootstrap-icons/bootstrap-icons.svg';

/**
 * @class IconElement
 *
 * This class provides an icon element
 *
 * @example
 * <js-icon size="large">1-circle</js-icon>
 */
export class IconElement extends LitElement {
  static get localName() {
    return 'js-icon';
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
      }
      .size-small {
          width: var(--icon-size-small);
          height: var(--icon-size-small);
      }
      .size-medium, .size-default {
          width: var(--icon-size-medium);
          height: var(--icon-size-medium);
      }
      .size-large {
          width: var(--icon-size-large);
          height: var(--icon-size-large);
      }
      .size-xlarge {
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
    return this.textContent.trim() || 'bootstrap-reboot';
  }

  render() {
    return svg`<div class=${this.classes.join(' ') || nothing}><svg class=${this.classes.join(' ') || nothing}><use href="${icons}#${this.name}"/></svg></div>`;
  }
}
