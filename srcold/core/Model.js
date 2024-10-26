/**
 * Model is the base class for all data models and is intended to be the base
 * class for all data models.
 * @class
*/
// eslint-disable-next-line import/prefer-default-export
export class Model {
  static get properties() {
    return {};
  }

  toString() {
    return JSON.stringify(this);
  }
}
