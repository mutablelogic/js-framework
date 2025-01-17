// This file defines all the styles and elements used for the web components
import '../../src/index';
import './item.js'

/* Code to reload in the esbuild serve development environment */
window.addEventListener('load', () => {
  // eslint-disable-next-line no-restricted-globals
  new EventSource('/esbuild').addEventListener('change', () => location.reload());
});
