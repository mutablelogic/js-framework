
// This file defines all the styles and elements used for the web components

// Components
import './component/button/ButtonElement';
import './component/button/ButtonGroupElement';
import './component/button/CloseButtonElement';
import './component/icon/IconElement';
import './component/nav/NavBarElement';


// CSS
import './css/core.css';
import './css/document.css';

// Test
window.addEventListener('load', () => {
    new EventSource('/esbuild').addEventListener('change', () => location.reload());
});
