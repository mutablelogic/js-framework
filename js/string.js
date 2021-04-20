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
