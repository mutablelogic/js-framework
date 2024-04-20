// This file defines all the styles and elements used for the web components

// Core
import './core/Model';
import './core/Provider';
import './css/core.css';
import './css/document.css';

// Badges
import './css/badge.css';
import './js/badge';

// Nav
import './js/nav';
import './css/nav.css';

// Other
import './esbuild';
import './test';

// Buttons
import './component/button/ButtonElement';
import './component/button/ButtonGroupElement';
import './component/button/CloseButtonElement';

// Icons
import './component/icon/IconElement';

// Navigation
import './component/nav/NavBarElement';
import './component/nav/NavItemElement';

// Modal Elements
import './component/modal/ModalElement';
import './component/modal/SideModalElement';

// Form Elements
import './component/form/FormElement';
import './component/form/FormTextElement';
import './component/form/FormDateElement';

// Layout Elements
import { SpacerElement } from './component/layout/SpacerElement';
import {
  RowElement,
  RowCell1Element, RowCell2Element, RowCell3Element,
  RowCell4Element, RowCell5Element, RowCell6Element,
  RowCell7Element, RowCell8Element, RowCell9Element,
  RowCell10Element, RowCell11Element, RowCell12Element,
} from './component/layout/RowElement';

customElements.define(SpacerElement.localName, SpacerElement); // wc-spacer
customElements.define(RowElement.localName, RowElement); // wc-row
customElements.define(RowCell1Element.localName, RowCell1Element); // wc-row-1
customElements.define(RowCell2Element.localName, RowCell2Element); // wc-row-2
customElements.define(RowCell3Element.localName, RowCell3Element); // wc-row-3
customElements.define(RowCell4Element.localName, RowCell4Element); // wc-row-4
customElements.define(RowCell5Element.localName, RowCell5Element); // wc-row-5
customElements.define(RowCell6Element.localName, RowCell6Element); // wc-row-6
customElements.define(RowCell7Element.localName, RowCell7Element); // wc-row-7
customElements.define(RowCell8Element.localName, RowCell8Element); // wc-row-8
customElements.define(RowCell9Element.localName, RowCell9Element); // wc-row-9
customElements.define(RowCell10Element.localName, RowCell10Element); // wc-row-10
customElements.define(RowCell11Element.localName, RowCell11Element); // wc-row-11
customElements.define(RowCell12Element.localName, RowCell12Element); // wc-row-12
