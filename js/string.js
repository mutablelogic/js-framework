// eslint-disable-next-line no-extend-native, func-names
String.prototype.quote = function () {
  return JSON.stringify(this);
};

// eslint-disable-next-line no-extend-native, func-names
String.prototype.pathSplit = function () {
  const parts = [];
  this.split('/').forEach((part) => {
    if (part) {
      parts.push(part);
    }
  });
  return parts;
};

// eslint-disable-next-line no-extend-native, func-names
String.prototype.removePrefix = function (prefix) {
  const hasPrefix = this.indexOf(prefix) === 0;
  return hasPrefix ? this.substr(prefix.length) : this.toString();
};
