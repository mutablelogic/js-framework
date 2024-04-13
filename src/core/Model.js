/**
 * Model is the base class for all data models and is intended to be the base
 * class for all data models.
 * @class
*/
export class Model {
    constructor() {
        // Initialize properties
    }
    static get properties() {
        return {}
    }
    toString() {
        return JSON.stringify(this);
    }
}
