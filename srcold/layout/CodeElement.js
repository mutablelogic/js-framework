import {
  LitElement, html, css, nothing,
} from 'lit';
import { style } from './CodeElement.css.js';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

/* register only certain languages */
hljs.registerLanguage('javascript', javascript);

/**
 * CodeElement
 * This class is used to create a code block element, which
 * displays code according to the language specified.
 *
 * @example
 * <wc-code language="javascript">
 *  console.log('Hello, World!');
 * </wc-code>
 */
export class CodeElement extends LitElement {
  static get localName() {
    return 'wc-code';
  }

  constructor() {
    super();
    this.code = 'javascript';
  }

  static get properties() {
    return {
      /**
       * The code language, for syntax highlighting.
       * @type {String}
       * @default javascript
       * @memberof CodeElement
       */
      code: { type: String },
    };
  }

  static get styles() {
    return [css`
      pre {
        white-space: pre-line;
      }
    `, style];
  }

  get className() {
    const classes = [];
    if (this.code) {
      classes.push(this.code);
    }
    return classes.join(' ');
  }

  render() {
    return html`
      <pre class=${this.className || nothing}></pre>
    `;
  }

  firstUpdated() {
    this.shadowRoot.querySelector('pre').innerHTML = hljs.highlight(this.innerHTML, { language: this.code }).value;
  }
}
