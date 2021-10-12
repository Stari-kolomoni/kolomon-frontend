import { request } from "./requests";
import Logger, { Colour } from "./logger";

const log = new Logger("api", Colour.LAUREL_GREEN);

// noinspection UnnecessaryLocalVariableJS
const apiEndpointBaseUrl = API_ENDPOINT_URL;
const constructUrl = (trail: string): string => `${apiEndpointBaseUrl}${trail}`;

if (!IS_PRODUCTION) {
    log.debug(`API endpoint base: ${apiEndpointBaseUrl}`);
}

export default class KolomonApi {
    /*
     * USERS (get all, create, get self, get one, delete one, modify one)
     */
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
     * API Endpoint: /ping
     * Pings the backend and returns a boolean indicating the status.
     */
    static async ping(): Promise<boolean> {
        const [response, json] = await request(
            constructUrl("/ping"), "GET", false,
        );

        return response.ok && json !== null && json.message === "pong";
    }

    /**
     * API Endpoint: /check
     * Asks the backend to verify that the current bearer token is valid.
     */
    static async check(): Promise<boolean> {
        const [response, json] = await request(
            constructUrl("/check"), "GET", true,
        );

        return response.ok && json !== null && json.message === "You are authorized.";
    }

    /**
     * API Endpoint: /token
     * This method "logs in" the user. We get a Oauth2 bearer token that needs to be send in
     * subsequent requests inside the Authorization header.
     * NOTE: This method DOES NOT save the token, only fetches it.
     * @param username - Username to login with.
     * @param password - Password to login with.
     */
    static async token(username: string, password: string): Promise<string | null> {
        const [response, json] = await request(
            constructUrl("/token"), "GET", true,
            { username, password }, "form",
        );

        if (!response.ok || json === null) {
            return Promise.reject(
                new Error(`Response: ${response.status} ${response.statusText}`),
            );
        }

        return Promise.resolve(json.access_token);
    }
}
