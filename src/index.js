
// This file defines all the styles and elements used for the web components

// Components
export { ButtonElement } from './component/button/ButtonElement';

// CSS
import './css/core.css';

// Test
window.addEventListener('load', () => {
    new EventSource('/esbuild').addEventListener('change', () => location.reload());
});
