import { LitElement } from 'lit';
import { Event } from '../core/Event';

/**
 * ViewController
 * This class is used to reflect changes in hosts to keep them
 * in sync with each other. 
 */
export class ViewController {
  #hosts = [];

  constructor(...hosts) {
    // Add the hosts
    hosts.forEach((host) => {
      if (host instanceof LitElement) {
        console.log('ViewController', host);
        this.#hosts.push(host);
        host.addController(this);

        // Listen for events
        host.addEventListener(Event.EVENT_CLICK, (event) => {
          this.select(event.target, event.detail);
        });
      }
    });
  }

  select(sender, name) {
    this.#hosts.forEach((host) => {
      if (host !== sender && host.select) {
        host.select(name);
      }
    });
  }
}
