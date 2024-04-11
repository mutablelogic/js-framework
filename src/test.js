

// Core
import Provider from './core/Provider';
import Event from './core/Event';

// Test
window.addEventListener('load', () => {
    // Button Group
    document.querySelector('wc-button-group').addEventListener(Event.EVENT_CLICK, (evt) => {
        console.log("Button Group Click", evt.detail);
    });

    // Card
    document.querySelector('.wc-card').addEventListener(Event.EVENT_CLICK, (evt) => {
        console.log("Card Click", evt.detail);
    });

    // Provider
    var p = new Provider("http://localhost:8000/");
    p.addEventListener(Event.EVENT_ERROR, (evt) => {
        console.log("Got error:", evt);
    });
    p.addEventListener(Event.EVENT_START, (evt) => {
        console.log("START", evt.detail);
    });
    p.addEventListener(Event.EVENT_DONE, (evt) => {
        console.log("DONE", evt.detail);
    });
    p.fetch("/", {}, 5000);

    // Buttons
    document.querySelectorAll('wc-button').forEach((button) => {
        button.addEventListener(Event.EVENT_CLICK, (evt) => {
            switch (evt.detail) {
                case "modal":
                    document.querySelector('wc-modal').toggle();
                    break;
                default:
                    console.log("Button Click", evt.detail);
            }
        });
    });

    // Close Modal
    document.querySelector('wc-modal').addEventListener(Event.EVENT_CLICK, (evt) => {
        if (evt.detail == "modal-close") {
            document.querySelector('wc-modal').hide();
        }
    });

    // NavItem
    document.querySelectorAll('wc-nav-item').forEach((navitem) => {
        navitem.addEventListener(Event.EVENT_CLICK, (evt) => {
            console.log("NavItem Click", evt.detail);
        });
    });
});
