// CSS
import './form.css';

// Classes
import { FormSwitchElement } from './FormSwitchElement';
import { FormSelectElement } from './FormSelectElement';

// Web Components
customElements.define(FormSwitchElement.localName, FormSwitchElement); // wc-form-switch
customElements.define(FormSelectElement.localName, FormSelectElement); // wc-form-select
