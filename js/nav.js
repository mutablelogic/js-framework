// Nav class provides navigation

import View from './view';

// ////////////////////////////////////////////////////////////////////////////
// CONSTANTS

const EVENT_ROOT = 'mvc.nav';
const EVENT_CLICK = `${EVENT_ROOT}.click`;
const CLASS_ACTIVE = 'active';

// ////////////////////////////////////////////////////////////////////////////
// NAV

export default class Nav extends View {
  constructor(node) {
    super(node);
    this.$map = new Map();

    // Set up nav items
    this.queryAll('.nav-item a.nav-link').forEach((elem) => {
      const navLink = new URL(elem.href).pathname.pathSplit().join('/');
      if (elem.parentNode.id) {
        this.$map.set(navLink, elem.parentNode.id);
      }
      elem.addEventListener('click', () => {
        this.dispatchEvent(EVENT_CLICK, this, elem.parentNode);
      });
    });

    // Determine current path and set the active link
    const path = window.location.pathname.pathSplit().join('/');
    const key = this.$map.get(path);
    if (key) {
      this.setClassName(key, CLASS_ACTIVE);
    }
  }

  setClassName(key, className) {
    this.queryAll('.nav-item a.nav-link').forEach((elem) => {
      if (elem.parentNode.id === key) {
        elem.classList.add(className);
      } else {
        elem.classList.remove(className);
      }
    });
  }
}
