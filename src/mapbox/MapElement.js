import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { Map } from 'mapbox-gl';
import styles from './mapbox.css.txt';

/**
 * @class MapElement
 *
 * This class provides a map container
 *
 * @property {Number} lon - The longitude of the map center
 * @property {Number} lat - The latitude of the map center
 * @property {Number} zoom - The zoom level of the map
 * @property {Number} pitch - The pitch of the map
 * @property {Number} bearing - The bearing of the map
 * @property {String} mapstyle - The map style (mapbox://styles/mapbox/streets-v11)
 * @property {String} accessToken - The map access token
 * 
 * @example
 * <js-map accessToken="....."></js-map>
 */
export class MapElement extends LitElement {
  #map;

  static get localName() {
    return 'js-map';
  }

  static get properties() {
    return {
      lon: { type: Number, reflect: true },
      lat: { type: Number, reflect: true },
      zoom: { type: Number, reflect: true },
      pitch: { type: Number, reflect: true },
      bearing: { type: Number, reflect: true },
      mapstyle: { type: String, reflect: true },
      accessToken: { type: String }
    };
  }

  static get styles() {
    return css`
      ${unsafeCSS(styles)}
      #map {
        width: 100%;
        height: 100%;
      }
      .mapboxgl-ctrl-logo {
        display: none !important;
      }
    `;
  }

  constructor() {
    super();

    // Default properties
    this.lon = 0;
    this.lat = 0;
    this.zoom = 0;
    this.pitch = 0;
    this.bearing = 0;
    this.mapstyle = 'mapbox://styles/mapbox/streets-v11';
  }

  firstUpdated() {
    super.firstUpdated();
    if (!this.#map) {
      this.#initMap();
    }
  }

  render() {
    return html`
      <div id="map" class=${this.classes.join(' ') || nothing}></div>      
    `;
  }

  #initMap() {
    this.#map = new Map({
      container: this.shadowRoot.querySelector('#map'),
      style: this.mapstyle,
      center: [this.lon, this.lat],
      zoom: this.zoom,
      pitch: this.pitch,
      bearing: this.bearing,
      accessToken: this.accessToken,
      attributionControl: false,
    });
    this.#map.on('load', () => {
      // Add map sources
      console.log('Map loaded');
    });
  }

  // eslint-disable-next-line class-methods-use-this
  get classes() {
    const classes = [];
    return classes;
  }
}
