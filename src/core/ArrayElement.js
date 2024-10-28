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
    #newdata = new Array();
    #provider = null;

    static get localName() {
        return 'js-array';
    }

    static get properties() {
        return {
            provider: { type: String, reflect: true },
            select: { type: String, reflect: true },
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
            this.#provider.removeEventListener(EventType.FETCH, this.#providerFetch.bind(this));
            this.#provider.removeEventListener(EventType.OBJECT, this.#providerObject.bind(this));
            this.#provider.removeEventListener(EventType.DONE, this.#providerDone.bind(this));
            this.#provider = null;
        }
        if (newVal != null && newVal !== oldVal) {
            this.#provider = document.querySelector(newVal);
            if (this.#provider) {
                this.#provider.addEventListener(EventType.FETCH, this.#providerFetch.bind(this));
                this.#provider.addEventListener(EventType.OBJECT, this.#providerObject.bind(this));
                this.#provider.addEventListener(EventType.DONE, this.#providerDone.bind(this));
            } else {
                throw new Error(`Provider "${newVal}" not found`);
            }
        }
    }

    #providerFetch() {
        // Reset the data container
        this.#newdata = new Array();
    }

    #providerObject(event) {
        var data = event.detail;
        if (this.select) {
            if(data instanceof Object) {
                data = data[this.select];
                if (data === undefined) {
                    throw new Error(`Property "${this.select}" not found in object`);
                } else if (Array.isArray(data)) {
                    this.#newdata = this.#newdata.concat(data);
                } else {
                    this.#newdata.push(data);
                }
            }
        } else {
            // Add the object to the data container
            this.#newdata.push(data);
        }
    }

    #providerDone() {
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
