import { ModelElement } from '../core/ModelElement';

/**
 * @class ShapeElement
 *
 * This class is a data store for an object.
 *
 * @property {String} provider - A connnected provider element id
 *
 * @example
 * <js-model provider="customprovider"></js-model>
 */
export class ShapeElement extends ModelElement {
  static get localName() {
    return 'js-geo-shape';
  }

  static get properties() {
    const properties = super.properties;
    properties.type = { type: String, reflect: true };
    properties.coordinates = { type: Array, reflect: true };
    return properties;
  }
}
