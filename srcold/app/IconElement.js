import { LitElement, svg, css, nothing } from 'lit';
import icons from 'bootstrap-icons/bootstrap-icons.svg';

/**
 * @class IconElement
 *
 * This class is used to display a bootstrap icon
 *
 * @property {Boolean} name - The name of the icon
 * @property {Boolean} size - The size of the icon
 *
 * @example
 * <wc-icon name="test" size="medium">
 */
export class IconElement extends LitElement {
  static get localName() {
    return 'wc-icon';
  }

  constructor() {
    super();
    this.name = 'bootstrap-reboot';
    this.size = 'default';
  }

  static get properties() {
    return {
      name: { type: String },
      size: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
          display: inline-block;
          vertical-align: middle;
      }
      .size-default {
          position: relative;
          width: var(--icon-size-default);
          height: var(--icon-size-default);
      }
      .size-small {
          position: relative;
          width: var(--icon-size-small);
          height: var(--icon-size-small);
      }
      .size-medium {
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

  render() {
    return svg`<div class=${this.classes.join(' ') || nothing}><svg><use href="${icons}#${this.name}"/></svg></div>`;
  }
}
