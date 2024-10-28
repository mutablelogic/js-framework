import { LitElement, html, css, nothing } from 'lit';

/**
 * @class MapSourceElement
 *
 * This class provides a map data source
 *
 * @example
 * <js-map>
 *   <js-mapsource type="geojson" data="{}"></js-mapsource>
 * </js-map>
 */
export class MapSourceElement extends LitElement {
  #source;

  static get localName() {
    return 'js-mapsource';
  }

  static get properties() {
    return {
      type: { type: String, reflect: true },
      data: { type: Object, reflect: true }
    };
  }
}
