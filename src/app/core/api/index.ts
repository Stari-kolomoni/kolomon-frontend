import { JSONObject, request } from "./requests";
import Logger, { Colour } from "../logger";
import { User, validateUserArraySchema } from "./validation";

const log = new Logger("api", Colour.LAUREL_GREEN);

// noinspection UnnecessaryLocalVariableJS
const apiEndpointBaseUrl = API_ENDPOINT_URL;
const constructUrl = (trail: string): string => `${apiEndpointBaseUrl}${trail}`;

if (!IS_PRODUCTION) {
    log.debug(`API endpoint base: ${apiEndpointBaseUrl}`);
}

export default class KolomonApi {
    /*
     * Private methods
     */
    /**
     * Ensures the argument type is an array and non-null.
     * If the requirements are not met, an Error is raised.
     * @param object - Object (array) to check.
     * @private
     */
    private static ensureTypeIsArray(object: JSONObject): any[] {
        if (object === null || object.constructor !== Array) {
            throw new Error(
                `Expected array, got ${object === null ? "" : object.constructor}`,
            );
        }

        return object;
    }

    /**
     * Ensures the argument type is an object and non-null.
     * If the requirements are not met, an Error is raised.
     * @param object - Object to check.
     * @private
     */
    private static ensureTypeIsObject(object: JSONObject): Record<string, any> {
        if (object === null || object.constructor !== Object) {
            throw new Error(
                `Expected object, got ${object === null ? "" : object.constructor}`,
            );
        }

        return object;
    }

    /*
     * USERS (get all, create, get self, get one, delete one, modify one)
     */
    /**
     * API Endpoint: GET /users/
     * Pings the backend and returns a boolean indicating the status.
     * @param page - Page number to request. Automatic pagination is not implemented yet.
     */
    static async getAllUsers(page = 0): Promise<User[]> {
        const [_response, json] = await request(
            constructUrl("/users/"), "GET", false,
            { page }, "url",
        );

        if (!validateUserArraySchema(json)) {
            throw new Error("Failed to validate User[]");
        }

        return json;
    }
    // TODO

    /*
     * CATEGORIES (get all, create, get one, delete one, modify one)
     */
    // TODO

    /*
     * ENGLISH ENTRIES (get all, create, get one, delete one, modify one)
     */
    // TODO

    /*
     * SUGGESTIONS (get all for english word, create, get one, delete one, modify one)
     */
    // TODO

    /*
     * LINKS (get all for english word, create, get one, delete one, modify one)
     */
    // TODO

    /*
     * RELATED (get all for english word, create, delete one)
     */
    // TODO

    /*
     * SLOVENE ENTRIES (get all, create, get one, delete one, modify one)
     */
    // TODO

    /*
     * TRANSLATION (get slovene translation from english word, link english word to slovene translation)
     */
    // TODO

    /*
     * OTHER (get recent, get orphans)
     */
    // TODO

    /*
     * DEFAULT (ping, check, token)
     */
    /**
     * API Endpoint: GET /ping
     * Pings the backend and returns a boolean indicating the status.
     */
    static async ping(): Promise<boolean> {
        const [response, json] = await request(
            constructUrl("/ping"), "GET", false,
        );

        const validJson = this.ensureTypeIsObject(json);
        return response.ok && validJson.message === "pong";
    }

    /**
     * API Endpoint: GET /check
     * Asks the backend to verify that the current bearer token is valid.
     */
    static async checkToken(): Promise<boolean> {
        const [response, json] = await request(
            constructUrl("/check"), "GET", true,
        );

        const validJson = this.ensureTypeIsObject(json);
        return response.ok && validJson.message === "You are authorized.";
    }

    /**
     * API Endpoint: GET /token
     * This method "logs in" the user. We get a Oauth2 bearer token that needs to be send in
     * subsequent requests inside the Authorization header.
     * NOTE: This method DOES NOT save the token, only fetches it.
     * @param username - Username to login with.
     * @param password - Password to login with.
     */
    static async getToken(username: string, password: string): Promise<string | null> {
        const [response, json] = await request(
            constructUrl("/token"), "GET", true,
            { username, password }, "form",
        );

        if (!response.ok || json === null) {
            return Promise.reject(
                new Error(`Response: ${response.status} ${response.statusText}`),
            );
        }

        // TODO find a better way to do this safely
        const validJson = this.ensureTypeIsObject(json);
        return Promise.resolve(validJson.access_token);
    }
}
