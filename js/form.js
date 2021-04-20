// Form class

import { Modal as ModalBS } from 'bootstrap';
import View from './view';
import Error from './error';

// ////////////////////////////////////////////////////////////////////////////
// CONSTANTS

const EVENT_ROOT = 'form';

/**
 * Form submit event, which is emitted whenever submission occurs on the
 * form (with a button or other method). The event is only fired if the
 * form validation checks passed.
 *
 * @event Form#form:submit
 * @arg {Form} sender - The form that emitted the event.
 * @arg {Node} target - The input control or button that submitted the form.
 */
const EVENT_SUBMIT = `${EVENT_ROOT}:submit`;

/**
 * Form change event, which is emitted whenever an input control on the
 * form is changed.
 *
 * @event Form#form:change
 * @arg {Form} sender - The form that emitted the event.
 * @arg {Node} target - The input control that changed.
 */
const EVENT_CHANGE = `${EVENT_ROOT}:change`;

// ////////////////////////////////////////////////////////////////////////////

/**
 * Form represents a HTML form, which can contain values entered by the user.
 * @class
 * @implements {View}
 * @classdesc A list is a view which uses a 'row' template to added and remove
 *  rows from a view.
 * @classdesc This class is constructed with a DOM element and
 * controls an existing
 * [Bootstrap Form]{@link https://getbootstrap.com/docs/5.0/forms/overview/}
 * and is generally used for validating, submitting and tracking form input. The form
 * can be wrapped in a [Bootstrap Modal]{@link https://getbootstrap.com/docs/5.0/components/modal/}
 * so that the show and hide methods can be used to set visibility.
 *
 * @arg {Node} node - The node to attach the view to. Throws an error if the node
 *   is not provided.
 *
 * @property {FormData} formdata - Returns a form data object representing the form values
 * @property {Object<string,string>} values - Get and set the form values
 *
 * @throws Error
 */
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

  /**
  * Sets the default values for the form and if the form is modal, the modal
  * is show.
  * @param {Object<string,string>} defaults - The values for the form controls.
  * @fires Form#form:submit
  * @fires Form#form:change
  */
  show(defaults) {
    this.$form.classList.remove('was-validated');
    if (defaults) {
      this.values = defaults;
    }
    this.$modal.show();
  }

  /**
  * If the form is modal, the modal is hidden.
  */
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
