import { ModelElement } from '../core/ModelElement';
import { ShapeElement } from './ShapeElement';

/**
 * @class FeatureElement
 *
 * This class is a data store for a GeoJSON feature object.
 * 
 * @property {String} type - Type of feature
 * @property {String} title - Title of feature
 * @property {ShapeElement} geometry - Geometry of feature
 * @property {Object} properties - Properties of feature
 *
 * @example
 * <js-model provider="customprovider"></js-model>
 */
export class FeatureElement extends ModelElement {
  static get localName() {
    return 'js-geo-feature';
  }

  static get properties() {
    const properties = super.properties;
    properties.type = { type: String, reflect: true };
    properties.title = { type: String, reflect: true };
    properties.geometry = { type: ShapeElement, reflect: true };
    properties.properties = { type: Object, reflect: true };
    return properties;
  }
}
