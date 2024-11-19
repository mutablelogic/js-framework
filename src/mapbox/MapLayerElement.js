import { LitElement } from 'lit';

/**
 * @class MapLayerElement
 *
 * This class provides a map layer
 *
 * @example
 * <js-map>
 *   <js-maplayer type="circle" source="#source"></js-maplayer>
 * </js-map>
 */
export class MapLayerElement extends LitElement {
  static get localName() {
    return 'js-maplayer';
  }

  static get properties() {
    return {
      source: { type: String, reflect: true },
      type: { type: String, reflect: true },
      paint: { type: Object, reflect: true },
    };
  }
}
