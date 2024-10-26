// CSS
import './element.css';

// Elements
import { TableBodyElement } from './TableBodyElement';
import { ButtonElement } from './ButtonElement';
import { ContainerElement } from './ContainerElement';

// Define Web Components
customElements.define(TableBodyElement.localName, TableBodyElement); // js-table-body
customElements.define(ButtonElement.localName, ButtonElement); // js-button
customElements.define(ContainerElement.localName, ContainerElement); // js-container
