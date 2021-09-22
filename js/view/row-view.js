import { html } from 'lit-html';
import Component from './component';

customElements.define('row-view', class extends Component {
  // eslint-disable-next-line class-methods-use-this
  template() {
    return html`
      <style type="text/css">
      slot {
        position: relative;
        display: flex;
        flex: 0 1 auto;
        flex-direction: row;
        flex-wrap: wrap;
        margin-right: 0;
        margin-left: 0;
      }
      .col-1 {
        flex-basis: 8.33333333%;
        max-width: 8.33333333%;
      }
      .col-2 {
        flex-basis: 16.66666667%;
        max-width: 16.66666667%;
      }
      .col-3 {
        flex-basis: 25%;
        max-width: 25%;
      }
      .col-4 {
        flex-basis: 33.33333333%;
        max-width: 33.33333333%;
      }
      .col-5 {
        flex-basis: 41.66666667%;
        max-width: 41.66666667%;
      }
      .col-6 {
        flex-basis: 50%;
        max-width: 50%;
      }
      .col-7 {
        flex-basis: 58.33333333%;
        max-width: 58.33333333%;
      }
      .col-8 {
        flex-basis: 66.66666667%;
        max-width: 66.66666667%;
      }
      .col-9 {
        flex-basis: 75%;
        max-width: 75%;
      }
      .col-10 {
        flex-basis: 83.33333333%;
        max-width: 83.33333333%;
      }
      .col-11 {
        flex-basis: 91.66666667%;
        max-width: 91.66666667%;
      }
      .col-12 {
        flex-basis: 100%;
        max-width: 100%;
      }
      </style>
      <slot></slot>
    `;
  }
});
