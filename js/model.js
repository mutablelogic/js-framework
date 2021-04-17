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
    // Get prototype
    const className = this.constructor.name;
    const proto = Model.models[className];
    if (!proto) {
      throw new Error(`Missing model definition for ${className}`);
    }

    // Set prototype of instance prototype
    Object.setPrototypeOf(Object.getPrototypeOf(this), proto);

    // Set values of object
    this.$setall(data);
  }

  static define(classConstructor, classProps) {
    if (typeof classConstructor !== 'function') {
      throw new Error('Called define without a class constructor');
    }
    const className = classConstructor.name;
    if (Model.constructors[className]) {
      throw new Error(`Class already defined ${className}`);
    }
    const proto = Model.$newproto(classConstructor, classProps);
    if (!proto) {
      throw new Error(`No prototype for ${className}`);
    }
    Model.constructors[className] = classConstructor;
    Model.models[className] = proto;
  }

  static $newproto(classConstructor, classProps) {
    const className = classConstructor.name;
    const proto = {};

    // $className property
    Object.defineProperty(proto, '$className', {
      value: className,
      writable: false,
      enumerable: false,
    });

    // $type property
    Model.types[className] = new Map();
    Object.defineProperty(proto, '$type', {
      get() {
        return Model.types[className];
      },
      enumerable: false,
    });

    // $json property
    Object.defineProperty(proto, '$json', {
      get() {
        return JSON.stringify(this.$getall());
      },
      enumerable: false,
    });

    // Other properties
    Object.entries(classProps).forEach((entry) => {
      const key = entry[0];
      const decl = entry[1];
      // Parse type
      const type = this.$parsetype(key, decl);
      if (!type) {
        throw new Error(`Unable to parse declaration ${decl} for ${key}`);
      } else {
        Model.types[className].set(key, type);
      }
      // Create getter and setter
      Object.defineProperty(proto, key, {
        enumerable: true,
        get() {
          return this.$data[key];
        },
        set(value) {
          const v = this.$type.get(key);
          this.$data[key] = Model.$cast(value, v.collection, v.primitive, v.model);
        },
      });
    });

    // $get function
    // eslint-disable-next-line func-names
    proto.$get = function (key) {
      return this.$data[key];
    };

    // $set function
    // eslint-disable-next-line func-names
    proto.$set = function (key, value) {
      const v = this.$type.get(key);
      this.$data[key] = Model.$cast(value, v.collection, v.primitive, v.model);
    };

    // $getall function
    // eslint-disable-next-line func-names
    proto.$getall = function () {
      const obj = {};
      this.$type.forEach((v, k) => {
        const value = Model.$json(this.$data[k]);
        if (value !== undefined) {
          obj[v.alias] = value;
        }
      });
      return obj;
    };

    // $setall function
    // eslint-disable-next-line func-names
    proto.$setall = function (data) {
      if (typeof data !== 'object') {
        throw new Error(`Constructor requires object for ${this.constructor.name}`);
      }
      this.$data = {};
      this.$type.forEach((v, k) => {
        this.$data[k] = Model.$cast(data[v.alias], v.collection, v.primitive, v.model);
      });
    };

    // toString function
    // eslint-disable-next-line func-names
    proto.toString = function () {
      let str = `<${this.$className}`;
      this.$type.forEach((_, k) => {
        const value = Model.$toString(this.$get(k));
        str += ` ${k}=${value}`;
      });
      return `${str}>`;
    };

    // $equals function
    // eslint-disable-next-line func-names
    proto.$equals = function (other) {
      if (!other) {
        return false;
      }
      if (this.$className !== other.$className) {
        return false;
      }
      return (this.$json === other.$json);
    };

    // Return the prototype
    return proto;
  }

  static $toString(value) {
    if (value === null || value === undefined) {
      return '<nil>';
    }
    if (typeof value === 'string') {
      return value.quote();
    }
    if (typeof value === 'boolean' || typeof value === 'number') {
      return `${value}`;
    }
    if (typeof value !== 'object') {
      return '[?? unsupported type]';
    }
    if (value instanceof Date) {
      return `<${value.toLocaleString()}>`;
    }
    if (value instanceof Map) {
      let str = '{ ';
      value.forEach((elem, k) => {
        str += `${k}:${this.$toString(elem)} `;
      });
      return `${str}}`;
    }
    if (value instanceof Array) {
      let str = '[ ';
      value.forEach((elem, i) => {
        str += (i === 0 ? '' : ',') + this.$toString(elem);
      });
      return `${str} ]`;
    }
    return `${value}`;
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

  static $json(value) {
    if (typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number') {
      return value;
    }
    if (typeof value === 'object' && value instanceof Date) {
      return value;
    }
    if (typeof value === 'object' && value instanceof Array) {
      const arr = [];
      value.forEach((elem) => {
        arr.push(this.$json(elem));
      });
      return arr;
    }
    if (typeof value === 'object' && value instanceof Map) {
      const map = {};
      value.forEach((elem, key) => {
        map[key] = this.$json(elem);
      });
      return map;
    }
    if (typeof value === 'object' && value.$getall) {
      return value.$getall();
    }
    return undefined;
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
      if (value instanceof constructor) {
        return value;
      }
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
