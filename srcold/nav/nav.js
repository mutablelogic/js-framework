// CSS
import './nav.css';

// Classes
import { NavBarElement } from './NavBarElement';
import { NavElement } from './NavElement';
import { NavItemElement } from './NavItemElement';
import { NavSpacerElement } from './NavSpacerElement';
import { CanvasElement } from './CanvasElement';
import { SideBarElement } from './SideBarElement';
import { ContentElement } from './ContentElement';
import { TabElement } from './TabElement';
import { TabGroupElement } from './TabGroupElement';
import { ViewElement } from './ViewElement';
import { ViewGroupElement } from './ViewGroupElement';
import { ViewController } from './ViewController';

// Web Components
customElements.define(NavBarElement.localName, NavBarElement); // wc-navbar
customElements.define(NavElement.localName, NavElement); // wc-nav
customElements.define(NavItemElement.localName, NavItemElement); // wc-nav-item
customElements.define(NavSpacerElement.localName, NavSpacerElement); // wc-nav-spacer
customElements.define(CanvasElement.localName, CanvasElement); // wc-canvas
customElements.define(SideBarElement.localName, SideBarElement); // wc-sidebar
customElements.define(ContentElement.localName, ContentElement); // wc-content
customElements.define(TabElement.localName, TabElement); // wc-tab
customElements.define(TabGroupElement.localName, TabGroupElement); // wc-tab-group
customElements.define(ViewElement.localName, ViewElement); // wc-view
customElements.define(ViewGroupElement.localName, ViewGroupElement); // wc-view-group
