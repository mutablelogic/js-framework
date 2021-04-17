// Form class

import { Modal as ModalBS } from 'bootstrap';
import View from './view';
import Error from './error';

// ////////////////////////////////////////////////////////////////////////////
// CONSTANTS

const EVENT_ROOT = 'mvc.form';
const EVENT_SUBMIT = `${EVENT_ROOT}.submit`;
const EVENT_CHANGE = `${EVENT_ROOT}.change`;

// ////////////////////////////////////////////////////////////////////////////
// FORM

export default class Form extends View {
  constructor(node) {
    super(node);
    this.$modal = new ModalBS(node);
    this.$form = super.query('form');

    if (!this.$form) {
      throw new Error('Form: Missing form element');
    }

    // Apply custom Bootstrap validation to form
    this.$form.addEventListener('submit', (evt) => this.$submit(evt));
    this.$form.addEventListener('change', (evt) => this.$change(evt));
  }

  $submit(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (this.$form.checkValidity()) {
      this.dispatchEvent(EVENT_SUBMIT, this, evt.submitter);
    }
    this.$form.classList.add('was-validated');
  }

  $change(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.dispatchEvent(EVENT_CHANGE, this, evt.target);
  }

  show(defaults) {
    this.$form.classList.remove('was-validated');
    if (defaults) {
      this.values = defaults;
    }
    this.$modal.show();
  }

  hide() {
    this.$modal.hide();
  }

  get formdata() {
    return new FormData(this.$form);
  }

  set values(defaults) {
    Array.from(this.$form.elements).forEach((elem) => {
      const key = elem.name;
      const value = defaults[key] || '';
      if (key) {
        switch (elem.type) {
          case 'radio':
            if (elem.value === `${value}`) {
              // eslint-disable-next-line no-param-reassign
              elem.checked = true;
            }
            break;
          default:
            // eslint-disable-next-line no-param-reassign
            elem.value = `${value}`;
        }
      }
    });
  }

  get values() {
    const values = {};
    Array.from(this.$form.elements).forEach((elem) => {
      const key = elem.name;
      if (key) {
        switch (elem.type) {
          case 'radio':
            if (elem.checked) {
              values[key] = elem.value;
            }
            break;
          default:
            values[key] = elem.value;
            break;
        }
      }
    });
    return values;
  }
}
