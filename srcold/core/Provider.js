import { Event } from './Event';

/**
 * Provider of data. In general, add provider to the controller using
 * the define method. Then for any component which is to be associated
 * with a provider, use the name of the provider.
 * @class
*/
export default class Provider extends EventTarget {
    #origin;
    #timer;
    #interval;

    constructor(origin) {
        super();
        this.#origin = origin ? new URL(origin) : '/';
    }

    /**
     * Get the origin of the provider
     * @returns {String}
     * @readonly
     * @memberof Provider
     */
    get origin() {
        return this.#origin;
    }

    /**
     * Cancel any existing request interval timer.
     * @memberof Provider
     */
    cancel() {
        if (this.#timer) {
            clearTimeout(this.#timer);
            this.#timer = null;
        }
    }

    fetch(path, request, interval) {
        // Create an absolute URL
        let url = new URL(path, this.#origin);

        // Cancel any existing requests
        this.cancel();

        // Fetch the data
        this.#fetch(url, request);

        // Set the interval for the next fetch
        if (interval) {
            this.#interval = interval;
            this.#timer = setTimeout(() => {
                this.#fetch(url, request);
            }, interval);
        } else {
            this.#timer = null;
        }
    }

    #fetch(url, request) {
        this.dispatchEvent(new CustomEvent(Event.EVENT_START, {
            detail: url
        }));
        fetch(url, request).then((response) => {
            if (!response.ok) {
                throw new Error(`status: ${response.status}`);
            }
            const contentType = response.headers ? response.headers.get('Content-Type') || '' : '';
            switch (contentType.split(';')[0]) {
                case 'application/json':
                case 'text/json':
                    return response.json();
                case 'text/plain':
                case 'text/html':
                    return response.text();
                default:
                    return response.blob();
            }
        }).then((data) => {
            if (typeof data == "string") {
                this.#string(data);
            } else if (data instanceof Array) {
                this.#array(data);
            } else if (data instanceof Object) {
                this.#object(data);
            } else {
                this.#blob(data);
            }
        }).catch((error) => {
            this.dispatchEvent(new ErrorEvent(Event.EVENT_ERROR, {
                error: error,
                message: `${error}`
            }));
        }).finally(() => {
            this.dispatchEvent(new CustomEvent(Event.EVENT_DONE, {
                detail: url
            }));
            if (this.#timer && this.#interval) {
                this.cancel();
                this.#timer = setTimeout(() => {
                    this.#fetch(url, request);
                }, this.#interval);
            }
        });
    }

    /**
     * Private method to process array of objects
     */
    #array(data) {
        data.forEach((item) => {
            this.#object(data);
        });
    }

    /**
     * Private method to process objects
     */
    #object(data) {
        //console.log("Object: ", data);
    }

    /**
     * Private method to process string data
     */
    #string(data) {
        //console.log("String: ", data);
    }

    /**
     * Private method to process blob data
     */
    #blob(data) {
        //console.log("Blob: ", data);
    }
}
