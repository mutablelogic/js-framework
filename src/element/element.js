// CSS
import './element.css';

// Elements
import { ContainerElement } from './ContainerElement';
import { TableBodyElement } from './TableBodyElement';
import { TableHeadElement } from './TableHeadElement';
import { ButtonElement } from './ButtonElement';
import { TagElement } from './TagElement';
import { IconElement } from './IconElement';

// Define Web Components
customElements.define(ContainerElement.localName, ContainerElement); // js-container
customElements.define(TableBodyElement.localName, TableBodyElement); // js-tablebody
customElements.define(TableHeadElement.localName, TableHeadElement); // js-tablehead
customElements.define(ButtonElement.localName, ButtonElement); // js-button
customElements.define(TagElement.localName, TagElement); // js-tag
customElements.define(IconElement.localName, IconElement); // js-icon
