// Nav class provides navigation

import View from './view';

// ////////////////////////////////////////////////////////////////////////////
// CONSTANTS

const EVENT_ROOT = 'nav';

/**
 * Navigational element click event
 *
 * @event Nav#nav:click
 * @arg {Nav} sender - The provider that emitted the event.
 * @arg {Node} target - The target element clicked.
 */
const EVENT_CLICK = `${EVENT_ROOT}:click`;

const CLASS_ACTIVE = 'active';

/**
 * Nav manages a navigation component.
 * @class
 * @implements {View}
 * @classdesc This class is constructed with a DOM element and
 * controls an existing
 * [Bootstrap Nav element]{@link https://getbootstrap.com/docs/5.0/components/navs-tabs/}.
 * It expects the view element to include anchor elements wrapped in list items as per
 * the bootstrap documentation. Any anchor element with an empty href (or '#') will
 * emit a click event.
 *
 * @arg {Node} node - The node to attach the view to. Throws an error if the node
 *   is not provided.
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

  $set(node) {
    const hrefattr = node.getAttribute('href');
    if (!hrefattr || hrefattr === '#') {
      node.addEventListener('click', (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        this.dispatchEvent(EVENT_CLICK, this, node.parentNode);
      });
    } else {
      const navLink = new URL(node.href).pathname.pathSplit().join('/');
      if (node.parentNode.id) {
        console.log(`set ${navLink}`);
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
