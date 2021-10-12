import Logger, { Colour } from "./logger";

const log = new Logger("storage", Colour.CADMIUM_ORANGE);

/**
 * KolomonStorage abstracts two types of storage on clients: The localStorage and sessionStorage APIs.
 */
export default class KolomonStorage {
    domain: string;

    storageApi: Storage;

    /**
     * Initialize a new KolomonStorage.
     * @param type - which Storage API to use. Will throw an Error if the requested API is not available in the browser.
     * @param prefix - The prefix to use for this specific instance of the StorageManager.
     * Prefixing makes sure two instances cannot collide (if they have a different prefix).
     * @constructor
     */
    constructor(type: "session" | "local", prefix: string) {
        this.domain = prefix;
        this.storageApi = type === "session"
            ? window.sessionStorage : window.localStorage;

        if (typeof this.storageApi === "undefined") {
            log.error(`Attempted to use the ${type} storage API, but it is undefined.`);
            throw new Error("Requested Storage API is unavailable.");
        }
    }

    /**
     * This method will merge the KolomonStorage prefix with the actual key.
     * This kind of prefixing ensures that two instances of storage with a different prefix cannot collide.
     * @param key - Key to merge.
     * @returns A new key that includes the prefix.
     * @private
     */
    private mergeKeyWithPrefix(key: string): string {
        return `${this.domain}_${key}`;
    }

    /**
     * Return the value at the key.
     * @param key - Key to fetch the value for.
     * @returns The value at the key, null if empty.
     */
    get(key: string): string | null {
        return this.storageApi.getItem(this.mergeKeyWithPrefix(key));
    }

    /**
     * Set the value at a specific key.
     * @param key - Key to set the value at.
     * @param value - Value to set.
     */
    set(key: string, value: string): void {
        this.storageApi.setItem(this.mergeKeyWithPrefix(key), value);
    }
}
