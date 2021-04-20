/* eslint-disable func-names */
/* eslint-disable no-extend-native */

/**
 * @class Number
 */

/**
 * @function bytesToString
 * @memberof Number
 * @args {number} bytes - The number of bytes
 * @args {boolean=false} si - Whether to represent in SI units
 * @args {number=1} dp - The number of decimal places to use
 * @description Returns the bytes as kilo, mega, terra, etc bytes.
 * @returns string
 */
Number.bytesToString = function (v, si = false, dp = 1) {
  let bytes = v;
  const thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`;
  }
  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;
  do {
    bytes /= thresh;
    u += 1;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
  return `${bytes.toFixed(dp)} ${units[u]}`;
};
