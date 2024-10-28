import { LitElement, html, css, nothing } from 'lit';
import { Map } from 'mapbox-gl';
import styles from 'mapbox-gl/dist/mapbox-gl.css';

/**
 * @class MapLayerElement
 *
 * This class provides a map layer
 *
 * @example
 * <js-map>
 *   <js-maplayer></js-maplayer>
 * </js-map>
 */
export class MapLayerElement extends LitElement {
  static get localName() {
    return 'js-maplayer';
  }
}
