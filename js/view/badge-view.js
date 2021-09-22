import { html } from 'lit-html';
import Component from './component';

customElements.define('badge-view', class extends Component {
  // eslint-disable-next-line class-methods-use-this
  template() {
    return html`
        <style type="text/css">
          slot { 
            display: inline-block;
            background-color: var(--badge-background-color); 
            color: var(--badge-color);
            padding: var(--badge-padding-y) var(--badge-padding-x);
            font-size: var(--badge-font-size);
            font-weight:  var(--badge-font-weight);
            border-radius: var(--badge-border-radius);
            line-height: 1;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
          }
        </style>
        <slot></slot>
    `;
  }
});
