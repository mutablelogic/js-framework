// Nav class provides navigation

import View from './view';

// ////////////////////////////////////////////////////////////////////////////
// CONSTANTS

const EVENT_ROOT = 'mvc.nav';
const EVENT_CLICK = `${EVENT_ROOT}.click`;
const CLASS_ACTIVE = 'active';

/**
 * Nav is the navgation view, which emits a mvc.nav.click event whenever
 * a navigational item is clicked which has an empty href in the navigation
 * item.
 * @class
*/
export default class Nav extends View {
  constructor(node) {
    super(node);
    this.$map = new Map();

    // Set up nav items - those with HREF # dispatch events
    this.queryAll('li a.nav-link').forEach((elem) => {
      this.$set(elem);
    });
    this.queryAll('li a.dropdown-item').forEach((elem) => {
      this.$set(elem);
    });

    // Determine current path and set the active link
    const path = window.location.pathname.pathSplit().join('/');
    const key = this.$map.get(path);
    if (key) {
      this.setClassName(key, CLASS_ACTIVE);
    }
  }

  /// @private
  $set(node) {
    const { href } = node;
    console.log(node, '=>', href);
    if (!href || href === '#') {
      node.addEventListener('click', (evt) => {
        evt.preventDefault();
        evt.cancelPropogation();
        console.log(EVENT_CLICK, node.parentNode);
        this.dispatchEvent(EVENT_CLICK, this, node.parentNode);
      });
    } else {
      const navLink = new URL(href).pathname.pathSplit().join('/');
      if (node.parentNode.id) {
        this.$map.set(navLink, node.parentNode.id);
      }
    }
  }

  /**
  * Set a class name on a specific navigational item and remove
  * that class from other navigational items. Usually this is used
  * to mark a specific dropdown item as active, for example.
  * @param {string} key - The id of the navigational item
  * @param {string} className - The class name which indicates
  */
  setClassName(key, className) {
    this.queryAll('li a.nav-link').forEach((elem) => {
      if (elem.parentNode.id === key) {
        elem.classList.add(className);
      } else {
        elem.classList.remove(className);
      }
    });
  }
}
