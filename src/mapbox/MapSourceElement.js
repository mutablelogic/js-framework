import { LitElement } from 'lit';
import { EventType } from '../core/EventType';
import { ArrayElement } from '../core/ArrayElement';

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
  #data;

  static get localName() {
    return 'js-mapsource';
  }

  static get properties() {
    return {
      type: { type: String, reflect: true },
      data: { type: String, reflect: true },
    };
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === 'data') {
      this.#dataChanged(newVal, oldVal);
    }
  }

  get geojson() {
    if (this.type !== 'geojson') {
      return null;
    }
    const featurecollection = {};
    featurecollection.type = 'FeatureCollection';
    featurecollection.features = [];
    if (this.#data instanceof ArrayElement) {
      for (let i = 0; i < this.#data.length; i += 1) {
        featurecollection.features.push(this.#data.at(i));
      }
    }
    return featurecollection;
  }

  #dataChanged(newVal, oldVal) {
    if (oldVal != null && this.#data && newVal !== oldVal) {
      this.#data.removeEventListener(EventType.CHANGE, this.#dataFetch.bind(this));
      this.#data = null;
    }
    if (newVal != null && newVal !== oldVal) {
      this.#data = document.querySelector(newVal);
      if (this.#data) {
        this.#data.addEventListener(EventType.CHANGE, this.#dataFetch.bind(this));
      } else {
        throw new Error(`Data "${newVal}" not found`);
      }
    }
  }

  #dataFetch() {
    // Change event
    this.dispatchEvent(new CustomEvent(EventType.CHANGE, {
      detail: this,
    }));
  }
}
