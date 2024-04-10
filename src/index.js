
// This file defines all the styles and elements used for the web components

// Components
import './component/button/ButtonElement';
import './component/button/ButtonGroupElement';
import './component/button/CloseButtonElement';
import './component/icon/IconElement';
import './component/nav/NavBarElement';

// Core
import Provider from './core/Provider';
import Event from './core/event';

// CSS
import './css/core.css';
import './css/document.css';

// Test
window.addEventListener('load', () => {
    new EventSource('/esbuild').addEventListener('change', () => location.reload());

    var p = new Provider("http://localhost:8000/");
    p.addEventListener(Event.EVENT_ERROR,(evt) => {
        console.log("Got error:",evt);
    });
    p.addEventListener(Event.EVENT_START,(evt) => {
        console.log("START",evt.detail);
    });
    p.addEventListener(Event.EVENT_DONE,(evt) => {
        console.log("DONE",evt.detail);
    });
    p.fetch("/", {}, 5000);
});
