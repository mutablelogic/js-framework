// CSS
import './app.css';

// Classes
import { CanvasElement } from './CanvasElement';
import { CanvasSectionElement } from './CanvasSectionElement';
import { CanvasNavbarElement } from './CanvasNavbarElement';
import { NavGroupElement } from './NavGroupElement';
import { NavItemElement } from './NavItemElement';
import { NavSpacerElement } from './NavSpacerElement';
import { NavDividerElement } from './NavDividerElement';
import { IconElement } from './IconElement';
import { CardGroupElement } from './CardGroupElement';
import { CardElement } from './CardElement';

// Web Components
customElements.define(CanvasElement.localName, CanvasElement); // wc-canvas
customElements.define(CanvasSectionElement.localName, CanvasSectionElement); // wc-canvas-section
customElements.define(CanvasNavbarElement.localName, CanvasNavbarElement); // wc-canvas-navbar
customElements.define(NavGroupElement.localName, NavGroupElement); // wc-nav-group
customElements.define(NavItemElement.localName, NavItemElement); // wc-nav-item
customElements.define(NavSpacerElement.localName, NavSpacerElement); // wc-nav-spacer
customElements.define(NavDividerElement.localName, NavDividerElement); // wc-nav-divider
customElements.define(IconElement.localName, IconElement); // wc-icon
customElements.define(CardGroupElement.localName, CardGroupElement); // wc-card-group
customElements.define(CardElement.localName, CardElement); // wc-card

