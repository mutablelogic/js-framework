import {
  LitElement, html, css, nothing 
} from 'lit';

/**
 * NavElement
 * This class is used to create a navigational list, either horizontal or vertical.
 *
 * @example
* <wc-nav vertical>
*   <wc-nav-item>File</wc-nav-item>
* </wc-nav>
*/
export class NavElement extends LitElement {
  static get localName() {
    return 'wc-nav';
  }

  static get properties() {
    return {
      /**
       * Whether the navigation is vertical, rather than horizontal
       * @type {Boolean}
       * @default false
       * @memberof NavElement
       */
      vertical: { type: Boolean },
    };
  }

  static get styles() {
    return css`
          :host {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: stretch;
          }
        `;
  }

  get className() {
    let className = '';
    if (this.vertical) {
      className += 'vertical ';
    }
    return className;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <ul class={$this.className || nothing}><slot></slot></ul>
    `;
  }
}
