// Import assets
import './badge.css';
import { BadgeElement } from './BadgeElement';
import { BadgeGroupElement } from './BadgeGroupElement';

// Define the custom elements
customElements.define(BadgeElement.localName, BadgeElement); // wc-badge
customElements.define(BadgeGroupElement.localName, BadgeGroupElement); // wc-badge-group
