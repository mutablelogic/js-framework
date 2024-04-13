
// This file defines all the styles and elements used for the web components

// Core
import './core/Model';
import './core/Provider';

// Buttons
import './component/button/ButtonElement';
import './component/button/ButtonGroupElement';
import './component/button/CloseButtonElement';

// Badges
import './component/badge/BadgeElement';
import './component/badge/BadgeGroupElement';

customElements.define(BadgeElement.localName, BadgeElement); // wc-badge


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
import './component/layout/SpacerElement.js';
import './component/layout/RowElement.js';

customElements.define(SpacerElement.localName, SpacerElement); // wc-spacer
customElements.define(RowElement.localName, RowElement); // wc-row

// CSS
import './css/core.css';
import './css/document.css';

// Other
import './esbuild.js';
import './test.js';import { BadgeElement } from './component/badge/BadgeElement';
import { SpacerElement } from './component/layout/SpacerElement.js';

