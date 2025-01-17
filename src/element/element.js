// Elements
import { ButtonElement } from './ButtonElement';
import { CloseButtonElement } from './CloseButtonElement';
import { TagElement } from './TagElement';
import { IconElement } from './IconElement';
import { ImageElement } from './ImageElement';
import { ToastElement } from './ToastElement';

import { NavElement } from './NavElement';
import { NavItemElement } from './NavItemElement';
import { NavSpacerElement } from './NavSpacerElement';

import { TableElement } from './TableElement';
import { TableHeadElement } from './TableHeadElement';
import { TableColumnElement } from './TableColumnElement';

// Define Web Components
customElements.define(ButtonElement.localName, ButtonElement); // js-button
customElements.define(CloseButtonElement.localName, CloseButtonElement); // js-close
customElements.define(TagElement.localName, TagElement); // js-tag
customElements.define(IconElement.localName, IconElement); // js-icon
customElements.define(ImageElement.localName, ImageElement); // js-image
customElements.define(ToastElement.localName, ToastElement); // js-toast

customElements.define(NavElement.localName, NavElement); // js-nav
customElements.define(NavItemElement.localName, NavItemElement); // js-navitem
customElements.define(NavSpacerElement.localName, NavSpacerElement); // js-navspacer

customElements.define(TableElement.localName, TableElement); // js-table
customElements.define(TableHeadElement.localName, TableHeadElement); // js-tablehead
customElements.define(TableColumnElement.localName, TableColumnElement); // js-tablecol
