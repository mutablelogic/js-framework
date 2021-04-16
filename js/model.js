// Model class to be subclassed by an actual model

import Error from './error';

// ////////////////////////////////////////////////////////////////////////////
// CONSTANTS

// Valid type specifications:
//   string
//   []string (array of string)
//   {}string (map of string)
//   _id string (string with alias)
const REGEXP_ALIASED = /^([A-Za-z0-9-_]*)\s+(\{\}|\[\])?(\w+)$/i;
const REGEXP_NOTALIASED = /^()(\{\}|\[\])?(\w+)$/i;

// ////////////////////////////////////////////////////////////////////////////
// MODEL CLASS

export default class Model {
  constructor(data) {
    // Set prototype
    const proto = Model.models[this.constructor.name];
    if (!proto) {
      throw new Error(`Missing model definition for ${this.constructor.name}`);
    } else {
      let instance = Object.getPrototypeOf(this);
      while (instance && instance.constructor.name !== 'Model') {
        instance = Object.getPrototypeOf(instance);
      }
      Object.setPrototypeOf(instance, proto);
    }
    // Set values
    this.$setv(data);
    console.log(this);
  }

  // Function to set the values of a model
  $setv(data) {
    if (typeof data !== 'object') {
      throw new Error(`Constructor requires object for ${this.constructor.name}`);
    }
    this.$data = {};
    this.$type.forEach((v, k) => {
      this.$data[k] = Model.$cast(data[v.alias], v.collection, v.primitive, v.model);
    });
  }

  // Covert to a string value
  toString() {
    return `<${this.className}>`;
  }

  static define(classConstructor, classProps) {
    if (typeof classConstructor !== 'function') {
      throw new Error('Called define without a class constructor');
    }
    if (this.constructors[classConstructor.name]) {
      throw new Error(`Class already defined ${classConstructor.name}`);
    }
    const proto = this.$newproto(classConstructor, classProps);
    if (!proto) {
      throw new Error(`No prototype for ${classConstructor.name}`);
    } else {
      this.constructors[classConstructor.name] = classConstructor;
      this.models[classConstructor.name] = proto;
    }
  }

  static $newproto(classConstructor, classProps) {
    const proto = {};

    // $className property
    Object.defineProperty(proto, '$className', {
      value: classConstructor.name,
      writable: false,
      enumerable: false,
    });

    // $type property
    Object.defineProperty(proto, '$type', {
      // eslint-disable-next-line object-shorthand, func-names
      get: function () {
        return Model.types[classConstructor.name];
      },
      enumerable: false,
    });

    // Other properties
    const types = new Map();
    Object.entries(classProps).forEach((entry) => {
      const key = entry[0];
      const value = entry[1];
      // Parse type
      const type = this.$parsetype(key, value);
      if (!type) {
        throw new Error(`Unable to parse ${value} for ${key}`);
      } else {
        types.set(key, type);
      }
      // Create getter and setter
      Object.defineProperty(proto, key, {
        enumerable: true,
        // eslint-disable-next-line object-shorthand, func-names
        get: function () {
          return this.$data[key];
        },
      });
    });
    Model.types[classConstructor.name] = types;

    console.log(classConstructor.name, '=>', proto, Model.types[classConstructor.name]);

    // Return the prototype
    return proto;
  }

  static $parsetype(key, value) {
    let parts = REGEXP_ALIASED.exec(value);
    if (!parts) {
      parts = REGEXP_NOTALIASED.exec(value);
    }
    if (parts) {
      return {
        alias: parts[1] || key,
        collection: this.$collectiontype(parts[2]),
        primitive: this.$primitivetype(parts[3]),
        model: this.$modeltype(parts[3]),
      };
    }
    return undefined;
  }

  static $collectiontype(value) {
    switch (value) {
      case '{}':
        return Model.primitive.MAP;
      case '[]':
        return Model.primitive.ARRAY;
      default:
        return undefined;
    }
  }

  static $primitivetype(value) {
    switch (value) {
      case Model.primitive.NUMBER:
      case Model.primitive.STRING:
      case Model.primitive.BOOLEAN:
      case Model.primitive.DATE:
        return value;
      default:
        return Model.types.OBJECT;
    }
  }

  static $modeltype(value) {
    switch (value) {
      case Model.primitive.NUMBER:
      case Model.primitive.STRING:
      case Model.primitive.BOOLEAN:
      case Model.primitive.DATE:
        return undefined;
      default:
        return value;
    }
  }

  static $cast(value, collection, primitive, model) {
    // If undefined then return
    if (value === null || value === undefined) {
      return undefined;
    }

    // Cast collection types
    switch (collection) {
      case Model.primitive.ARRAY:
        return this.$castarray(value, primitive, model);
      case Model.primitive.MAP:
        return this.$castmap(value, primitive, model);
      default:
      // NOOP
    }

    // Cast primitive and object types
    switch (primitive) {
      case Model.primitive.STRING:
        return this.$caststring(value);
      case Model.primitive.NUMBER:
        return this.$castnumber(value);
      case Model.primitive.BOOLEAN:
        return this.$castboolean(value);
      case Model.primitive.DATE:
        return this.$castdate(value);
      default:
        return this.$castobject(value, model);
    }
  }

  static $castarray(value, primitive, model) {
    const arr = [];
    if (Array.isArray(value)) {
      value.forEach((elem) => {
        console.log('arr cast', elem, ' to ', primitive, ' model ', model);
        arr.push(this.$cast(elem, undefined, primitive, model));
      });
      return arr;
    }
    return undefined;
  }

  static $castmap(value, primitive, model) {
    const map = new Map();
    if (typeof value === 'object') {
      Object.entries(value).forEach((entry) => {
        map.set(entry[0], this.$cast(entry[1], undefined, primitive, model));
      });
      return map;
    }
    return undefined;
  }

  static $castobject(value, model) {
    const constructor = Model.constructors[model];
    if (constructor) {
      return new constructor(value);
    }
    throw new Error(`Undefined Model of type ${model}`);
  }

  static $castnumber(value) {
    if (typeof value === 'number' || typeof value === 'bigint') {
      return value;
    }
    return parseInt(value, 10);
  }

  static $castdate(value) {
    if (value instanceof Date) {
      return value;
    }
    if (typeof value === 'string') {
      return new Date(value);
    }
    return undefined;
  }

  static $castboolean(value) {
    if (typeof value === 'boolean') {
      return value;
    }
    if (`${value}` === 'true') {
      return true;
    }
    if (`${value}` === 'false') {
      return false;
    }
    return undefined;
  }

  static $caststring(value) {
    if (typeof value === 'string') {
      return value;
    }
    if (value) {
      return `${value}`;
    }
    return undefined;
  }
}

// ////////////////////////////////////////////////////////////////////////////
// GLOBALS

Model.constructors = {};
Model.models = {};
Model.types = {};
Model.primitive = Object.freeze({
  NUMBER: 'number',
  STRING: 'string',
  BOOLEAN: 'boolean',
  DATE: 'date',
  OBJECT: 'object',
  ARRAY: 'array',
  MAP: 'map',
});
