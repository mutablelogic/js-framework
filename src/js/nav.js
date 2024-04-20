// Navigational Elements
import { NavElement } from '../component/nav/NavElement';
import { NavItemElement } from '../component/nav/NavItemElement';
import { NavSpacerElement } from '../component/nav/NavSpacerElement';
import { SidebarElement } from '../component/nav/SidebarElement';
import { SidebarNavElement } from '../component/nav/SidebarNavElement';
import { SidebarContentElement } from '../component/nav/SidebarContentElement';

customElements.define(NavElement.localName, NavElement); // wc-nav
customElements.define(NavItemElement.localName, NavItemElement); // wc-nav-item
customElements.define(NavSpacerElement.localName, NavSpacerElement); // wc-nav-spacer
customElements.define(SidebarElement.localName, SidebarElement); // wc-sidebar
customElements.define(SidebarNavElement.localName, SidebarNavElement); // wc-sidebar-nav
customElements.define(SidebarContentElement.localName, SidebarContentElement); // wc-sidebar-content
