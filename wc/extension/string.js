/* eslint-disable func-names */
/* eslint-disable no-extend-native */

/**
 * @class String
 */

/**
 * @function quote
 * @memberof String
 * @description Make a string quoted (in speech marks)
 * @returns string
 */
String.prototype.quote = function () {
  return JSON.stringify(this);
};

/**
 * @function pathSplit
 * @memberof String
 * @description Split a path into elements, removing any initial and final
 *  path separators
 * @returns string[]
 */
String.prototype.pathSplit = function () {
  const parts = [];
  this.split('/').forEach((part) => {
    if (part) {
      parts.push(part);
    }
  });
  return parts;
};

/**
 * @function removePrefix
 * @memberof String
 * @description Remove a prefix from a string, or return the whole string if
 *  the prefix does not exist.
 * @arg {string} prefix - The prefix to test for and remove
 * @returns string
 */
String.prototype.removePrefix = function (prefix) {
  const hasPrefix = this.indexOf(prefix) === 0;
  return hasPrefix ? this.substr(prefix.length) : this.toString();
};

/**
 * @function hasPrefix
 * @memberof String
 * @description Check for prefix on a string.
 * @arg {string} prefix - The prefix to test for and remove
 * @returns boolean
 */
String.prototype.hasPrefix = function (prefix) {
  const hasPrefix = this.indexOf(prefix) === 0;
  return hasPrefix;
};

/**
 * @function hashCode
 * @memberof String
 * @description Return a hash code for a string.
 * @returns number
 */
String.prototype.hashCode = function () {
  let hash = 0;
  let i;
  let chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i += 1) {
    chr = this.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = ((hash << 5) - hash) + chr;
    // eslint-disable-next-line no-bitwise
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};
