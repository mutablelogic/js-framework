// Error class

export default class Error {
  constructor(reason, code) {
    this.$reason = reason;
    this.$code = code;
  }
}
