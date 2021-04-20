/**
 * Error represents an error message.
 * @class
 * @classdesc Errors are emitted by several components. The Error class is used
 * to encapsulate an error and numerical code for the error.
 *
 * @arg {string} reason - The error description
 * @arg {number} code - The numerical code for the error
 *
 * @property {string} $reason - Returns the error reason
 * @property {number} $code - Return the error code
 */
export default class Error {
  constructor(reason, code) {
    this.$reason = reason;
    this.$code = code;
  }
}
