import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { Map } from 'mapbox-gl';
import styles from './mapbox.css.txt';
import { MapSourceElement } from './MapSourceElement';
import { MapLayerElement } from './MapLayerElement';
import { EventType } from '../core/EventType';

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
  #sources;
  #layers;

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
      const sources = this.querySelectorAll(MapSourceElement.localName);
      for (const source of sources) {
        this.#map.addSource(source.id, {
          type: source.type,
          data: source.geojson
        });

        // Watch source data changes
        source.addEventListener(EventType.CHANGE, (evt) => {
          // Source data has changed, update the source
          const mapSource = this.#map.getSource(evt.detail.id);
          if (mapSource && evt.detail.geojson) {
            mapSource.setData(evt.detail.geojson);
          }
        });
      }

      // Add map layers
      const layers = this.querySelectorAll(MapLayerElement.localName);
      for (const layer of layers) {
        const source = this.querySelector(`${layer.source}`);
        if (!source) {
          throw new Error(`Source ${layer.source} not found for layer ${layer.id}`);
        }
        this.#map.addLayer({
          id: layer.id,
          source: source.id,
          type: layer.type,
          paint: layer.paint || {},
        });
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  get classes() {
    const classes = [];
    return classes;
  }
}
