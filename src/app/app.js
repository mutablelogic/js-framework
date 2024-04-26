// CSS
import './app.css';

// Classes
import { CanvasElement } from './CanvasElement';
import { CanvasSectionElement } from './CanvasSectionElement';

// Web Components
customElements.define(CanvasElement.localName, CanvasElement); // w2-canvas
customElements.define(CanvasSectionElement.localName, CanvasSectionElement); // w2-canvas-section
