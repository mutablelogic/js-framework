/* eslint-disable func-names */
/* eslint-disable no-extend-native */

/**
 * @function String.quote
 *
 * @returns string
 * @description Make a string quoted (in speech marks)
 */
String.prototype.quote = function () {
  return JSON.stringify(this);
};

/**
 * @function String.pathSplit
 *
 * @description Split a path into elements, removing any initial and final
 * path separators
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
 * @function String.removePrefix
 *
 * @description Remove a prefix from a string, or return the whole string if
 * the prefix does not exist.
 * @arg {string} prefix - The prefix to test for and remove
 * @returns string
 */
String.prototype.removePrefix = function (prefix) {
  const hasPrefix = this.indexOf(prefix) === 0;
  return hasPrefix ? this.substr(prefix.length) : this.toString();
};
