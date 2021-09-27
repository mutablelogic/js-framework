// This file defines all the styles and elements used for the
// web components

// Global styles
import './vars.css';
import './document.css';

// Components
import './badge/wc-badge';
import './button/wc-button';
import './button/wc-button-group';
import './button/wc-close';
import './data/wc-table';
import './form/wc-form';
import './form/wc-form-head';
import './form/wc-input';
import './form/wc-checkbox';
import './form/wc-checkbox-group';
import './grid/wc-row';
import './grid/wc-col';
import './icon/wc-icon';
import './modal/wc-modal';
import './nav/wc-nav';
import './nav/wc-navbar';
import './nav/wc-nav-item';

// Extensions
import './extension/string';

// Core
import Controller from './core/controller';
import Provider from './core/provider';
import Model from './core/model';
import Event from './core/event';

class Test extends Model {
  static get properties() {
    return [
      {
        name: 'fruit', type: String, array: false, map: false,
      },
      {
        name: 'size', type: String, array: false, map: false,
      },
      {
        name: 'color', type: String, array: false, map: false,
      },
    ];
  }
}

window.addEventListener('load', () => {
  // Bootstrap
  const provider = Controller.define('fake-data', new Provider(Test, '/'));
  provider.addEventListener(Event.EVENT_START, (evt) => {
    console.log('Started', evt.detail);
  });
  provider.addEventListener(Event.EVENT_DONE, (evt) => {
    console.log('Done', evt.detail);
  });
  provider.addEventListener(Event.EVENT_ERROR, (evt) => {
    console.log('Error', evt.detail);
  });
  provider.request('/example.json');
});
