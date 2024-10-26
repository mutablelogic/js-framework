import { Model } from '../core/Model';
import { ShapeModel } from './ShapeModel';

/**
 * @class FeatureModel
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
export class FeatureModel extends Model {
  static get localName() {
    return 'js-geo-feature';
  }

  static get properties() {
    const properties = super.properties;
    properties.type = { type: String, reflect: true };
    properties.title = { type: String, reflect: true };
    properties.geometry = { type: ShapeModel, reflect: true };
    properties.properties = { type: Object, reflect: true };
    return properties;
  }

  constructor(provider) {
    super(provider);

    // Set the default properties
    this.type = 'Feature';
    this.title = '';
    this.geometry = null;
    this.properties = {};
  }
}
