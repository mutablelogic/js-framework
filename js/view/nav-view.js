import { html } from 'lit-html';
import Component from './component';

// Dependent components
import './navitem-view';

customElements.define('nav-view', class extends Component {
  // Properties
  static get observedAttributes() {
    return ['active', 'direction'];
  }

  get direction() {
    return this.getAttribute('direction') || 'row';
  }

  set direction(v) {
    this.setAttribute('direction', v);
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

  get class() {
    return (this.direction === 'column' ? 'direction-column' : 'direction-row');
  }

  // eslint-disable-next-line class-methods-use-this
  template() {
    return html`
    <style type="text/css">
    nav {
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;  
    }
    .direction-row {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      border-bottom: var(--nav-border-bottom);
    }
    .direction-column {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
    }
    </style>
    <nav class="${this.class}"><slot></slot></nav>    
    `;
  }
});
