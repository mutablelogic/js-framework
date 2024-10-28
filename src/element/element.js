// Elements
import { ContainerElement } from './ContainerElement';
import { TableBodyElement } from './TableBodyElement';
import { TableHeadElement } from './TableHeadElement';
import { ButtonElement } from './ButtonElement';
import { CloseButtonElement } from './CloseButtonElement';
import { TagElement } from './TagElement';
import { IconElement } from './IconElement';
import { ToastElement } from './ToastElement';

// Define Web Components
customElements.define(ContainerElement.localName, ContainerElement); // js-container
customElements.define(TableBodyElement.localName, TableBodyElement); // js-tablebody
customElements.define(TableHeadElement.localName, TableHeadElement); // js-tablehead
customElements.define(ButtonElement.localName, ButtonElement); // js-button
customElements.define(CloseButtonElement.localName, CloseButtonElement); // js-close
customElements.define(TagElement.localName, TagElement); // js-tag
customElements.define(IconElement.localName, IconElement); // js-icon
customElements.define(ToastElement.localName, ToastElement); // js-toast
