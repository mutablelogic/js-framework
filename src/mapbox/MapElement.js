import { LitElement, unsafeCSS, html, css, nothing } from 'lit';
import { Map } from 'mapbox-gl';
import styles from 'mapbox-gl/dist/mapbox-gl.css';

/**
 * @class MapElement
 *
 * This class provides a map container
 *
 * @example
 * <js-map></js-map>
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
      style: { type: String, reflect: true },
      accessToken: { type: String }
    };
  }

  static get styles() {
    return css`
      #map {
        width: 100%;
        height: 100%;

        .mapboxgl-ctrl-logo {
          display: none !important;
        }
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
    this.style = 'mapbox://styles/mapbox/streets-v11';
  }

  firstUpdated() {
    super.firstUpdated();
    if (!this.#map) {
      this.#initMap();
    }
  }

  render() {
    console.log(styles);
    return html`
      ${unsafeCSS(styles)}
      <div id="map" class=${this.classes.join(' ') || nothing}></div>      
    `;
  }

  #initMap() {
    this.#map = new Map({
      container: this.shadowRoot.querySelector('#map'),
      style: this.style,
      center: [this.lon, this.lat],
      zoom: this.zoom,
      pitch: this.pitch,
      bearing: this.bearing,
      accessToken: this.accessToken
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
