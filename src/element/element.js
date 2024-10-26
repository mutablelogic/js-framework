// CSS
import './element.css';

// Elements
import { TableBodyElement } from './TableBodyElement';
import { ButtonElement } from './ButtonElement';

// Define Web Components
customElements.define(TableBodyElement.localName, TableBodyElement); // js-table-body
customElements.define(ButtonElement.localName, ButtonElement); // js-button
