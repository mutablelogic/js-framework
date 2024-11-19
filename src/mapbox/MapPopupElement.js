import { LitElement, html, nothing } from 'lit';

/**
 * @class MapPopupElement
 *
 * This class provides a map popup (a HTML overlay on the map)
 *
 * @example
 * <js-map>
 *   <js-map-popup>Test</js-map-popup>
 * </js-map>
 */
export class MapPopupElement extends LitElement {
  static get localName() {
    return 'js-map-popup';
  }

  static get properties() {
    return {
      lat: { type: Number, reflect: true },
      long: { type: Number, reflect: true },
    };
  }

  /**
   * Set the latitude and longitude
   *
   * @memberof MapPopupElement
   */
  setLatLong(lat, long) {
    this.long = long;
    this.lat = lat;
  }

  render() {
    return html`
      <div id="map-popup" class=${this.classes.join(' ') || nothing}><slot></slot></div>      
    `;
  }
}
