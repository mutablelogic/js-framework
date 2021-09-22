import { html } from 'lit-html';
import Component from './component';

// Dependent components
import './navitem-view';

customElements.define('navbar-view', class extends Component {
  // Properties
  static get observedAttributes() {
    return ['active'];
  }

  get active() {
    let name = null;
    this.querySelectorAll('navitem-view').forEach((elem) => {
      if (elem.active) {
        name = elem.name;
      }
    });
    return name;
  }

  set active(v) {
    this.querySelectorAll('navitem-view').forEach((elem) => {
      if (elem.name === v) {
        // eslint-disable-next-line no-param-reassign
        elem.active = true;
      } else {
        // eslint-disable-next-line no-param-reassign
        elem.active = false;
      }
    });
  }

  attributeChangedCallback() {
    this.update();
  }

  update() {
    super.update();
    this.shadowRoot.querySelector('nav').classList = (this.direction === 'column' ? 'direction-column' : 'direction-row');
  }

  // eslint-disable-next-line class-methods-use-this
  template() {
    return html`
    <style type="text/css">
      nav { 
        position: relative;
        padding-top: var(--navbar-padding-y);
        padding-right: var(--navbar-padding-x);
        padding-bottom: var(--navbar-padding-y);
        padding-left: var(--navbar-padding-x);
        background-color: var(--navbar-background-color);
        color: var(--navbar-color);
        border-bottom: var(--navbar-border-width) solid var(--navbar-border-color);
        display: flex;
        justify-content: space-between;
      }

      slot {
        flex-flow: row wrap;
        align-items: center;
        color: var(--navbar-color);
      }

      ::slotted(*) {
        border-left: 1px solid var(--navbar-border-color);
        margin: auto;
        padding-left: var(--navbar-padding-x);
        text-decoration: none;
      }

    </style>
    <nav><slot></slot></nav>    
    `;
  }
});
