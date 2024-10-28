// Elements
import { MapElement } from './MapElement';
import { MapLayerElement } from './MapLayerElement';
import { MapSourceElement } from './MapSourceElement';

// Define Web Components
customElements.define(MapElement.localName, MapElement); // js-map
customElements.define(MapLayerElement.localName, MapLayerElement); // js-maplayer
customElements.define(MapSourceElement.localName, MapSourceElement); // js-mapsource
