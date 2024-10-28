import { LitElement, html } from 'lit';
import { EventType } from './EventType';

/**
 * @class ArrayElement
 *
 * This class is a store of arrays of objects of one type.
 * 
 * @property {String} provider - The provider for data
 *
 * @example
 * <js-array provider="provider"></js-array>
 */
export class ArrayElement extends LitElement {
    #data = new Array();
    #newdata = null;
    #provider = null;

    static get localName() {
        return 'js-array';
    }

    static get properties() {
        return {
            provider: { type: String, reflect: true },
        };
    }

    firstUpdated() {
        // Set up a listener for data changes
        this.addEventListener(EventType.CHANGE, () => {
            this.requestUpdate();
        });
    }

    render() {
        return html`<div>Array contains ${this.length} elements, provider=${this.provider}</div>`;
    }

    attributeChangedCallback(name, oldVal, newVal) {
        super.attributeChangedCallback(name, oldVal, newVal);
        if (name === 'provider') {
            this.#providerChanged(newVal, oldVal);
        }
    }

    get length() {
        return this.#data.length;
    }

    at(index) {
        return this.#data[index];
    }

    #providerChanged(newVal, oldVal) {
        if (oldVal != null && this.#provider && newVal !== oldVal) {
            this.#provider.removeEventListener(EventType.OBJECT, this.#providerFetch.bind(this));
            this.#provider.removeEventListener(EventType.OBJECT, this.#providerObject.bind(this));
            this.#provider.removeEventListener(EventType.OBJECT, this.#providerDone.bind(this));
            this.#provider = null;
        }
        if (newVal != null && newVal !== oldVal) {
            this.#provider = document.querySelector(newVal);
            if (this.#provider) {
                this.#provider.addEventListener(EventType.OBJECT, this.#providerFetch.bind(this));
                this.#provider.addEventListener(EventType.OBJECT, this.#providerObject.bind(this));
                this.#provider.addEventListener(EventType.OBJECT, this.#providerDone.bind(this));
            } else {
                throw new Error(`Provider "${newVal}" not found`);
            }
        }
    }

    #providerFetch(event) {
        // Reset the data container
        this.#newdata = new Array();
    }

    #providerObject(event) {
        // Add the object to the data container
        this.#newdata.push(event.detail);
    }

    #providerDone(event) {
        let modified = false;
        if (this.#newdata.length !== this.#data.length) {
            modified = true;
        } else {
            for (let i = 0; i < this.#newdata.length; i++) {
                if (this.#newdata[i] !== this.#data[i]) {
                    modified = true;
                    break;
                }
            }
        }

        // Copy over the data
        this.#data = this.#newdata;
        
        // Emit a change event if the data was modified
        if (modified) {
            this.dispatchEvent(new CustomEvent(EventType.CHANGE, {
                detail: this
            }));
        }

    }
}
