/* eslint-disable func-names */
/* eslint-disable no-extend-native */

const DATE_NEVER = -62135596800;

/**
 * @class Date
 */

/**
 * @function isLeapYear
 * @memberof Date
 * @returns boolean
 */
Date.prototype.isLeapYear = function () {
  const year = this.getFullYear();
  // eslint-disable-next-line no-bitwise
  if ((year & 3) !== 0) {
    return false;
  }
  return ((year % 100) !== 0 || (year % 400) === 0);
};

/**
 * @function getDayOfYear
 * @memberof Date
 * @description Returns the day of the year, from 1 onwards
 * @returns number
 */
Date.prototype.getDayOfYear = function () {
  const dayCount = [0, 31, 59, 120, 151, 181, 212, 243, 273, 304, 334];
  const mn = this.getMonth();
  const dn = this.getDate();
  let dayOfYear = dayCount[mn] + dn;
  if (mn > 1 && this.isLeapYear()) {
    dayOfYear += 1;
  }
  return dayOfYear;
};

/**
 * @function relativeDate
 * @memberof Date
 * @description Returns english-language relative date and time to the present date.
 *   For example, returns "just now" if the date is less than 30 seconds away from the
 *   present date. Returns time in the current locale if the date is more than sixty
 *   days ago. Does not yet work for dates and times in the future.
 * @returns string
 */
Date.prototype.relativeDate = function () {
  const delta = Math.round((new Date() - this) / 1000);
  if (delta < 30) {
    return 'just now';
  }
  if (delta < 60) {
    return `${delta} secs ago`;
  }
  if (delta === 60) {
    return '1 min ago';
  }
  const minutes = Math.floor(delta / 60);
  if (minutes < 60) {
    return `${minutes} mins ago`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours === 1) {
    return '1 hr ago';
  }
  if (hours < 24) {
    return `${hours} hrs ago`;
  }
  const days = new Date().getDayOfYear() - this.getDayOfYear();
  if (days === 0) {
    return 'today';
  }
  if (days === 1) {
    return 'yesterday';
  }
  if (days < 60) {
    return `${days} days ago`;
  }
  if (Math.round(this.getTime() / 1000) === DATE_NEVER) {
    return 'never';
  }
  return `on ${this.toLocaleDateString()}`;
};
