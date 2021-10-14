/*
 * RequestManager manages the HTTP(S) requests that Kolomon makes.
 * It abstracts the request details away from the React logic
 * as well as makes sure the Authorization header and similar details are followed.
 */

import Logger, { Colour } from "../logger";
import KolomonStorage from "../storage";

const log = new Logger("requests", Colour.CAMEL);

const authStorage = new KolomonStorage("local", "auth");

type JSONObject = Record<string, any> | any[] | null;

if (!window.fetch) {
    log.error("The Fetch API is not available in this browser!");
    throw new Error("The Fetch API is not available!");
}

/**
 * Retrieve an Oauth2 bearer token from browser storage.
 */
const getGlobalBearerToken = (): string | null => authStorage.get("oauth2-bearer");

/**
 * Set the Oauth2 bearer token. It will be saved in the browser's local storage.
 * @param token
 */
const setGlobalBearerToken = (token: string): void => {
    authStorage.set("oauth2-bearer", token);
};

/**
 * Perform a HTTP(S) request, including handling errors and JSON.
 * @param url - URL to request.
 * @param method - HTTP method to use.
 * @param withAuthorization - Whether to include the Authorization header, if possible.
 * @param data - Additional JSON data/form data/URL parameters to send in the request body.
 * @param dataType - Specifies in which way the data parameter should be sent:
 * JSON, x-www-form-urlencoded or url parameter.
 */
const request = async (
    url: string,
    method: "GET" | "HEAD" | "POST" | "PUT" | "DELETE"
        | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH",
    withAuthorization = true,
    data: JSONObject = null,
    dataType: "json" | "form" | "url" = "json",
): Promise<[Response, JSONObject]> => {
    try {
        // Formulate correct headers (Authorization, Content-Type)
        let requestUrl = url;
        const headers = new Headers();

        headers.append("Accept", "application/json");
        if (withAuthorization) {
            headers.append(
                "Authorization",
                `Bearer ${getGlobalBearerToken()}`,
            );
        }

        if (dataType === "json") {
            headers.append("Content-Type", "application/json");
        } else if (dataType === "form") {
            headers.append("Content-Type", "application/x-www-form-urlencoded");
        }

        // Process data into the correct format (json/form)
        let bodyData = null;
        if (data !== null && dataType === "json") {
            bodyData = JSON.stringify(data);
        } else if (data !== null && dataType === "form") {
            bodyData = new URLSearchParams(data);
        } else if (data !== null && dataType === "url") {
            const params = new URLSearchParams(data);
            requestUrl += `?${params.toString()}`;
        }

        // Send the HTTP request
        const response = await fetch(
                requestUrl,
                {
                    method,
                    headers,
                    body: bodyData,
                },
            )
            // fetch only rejects on network errors and CORS
            // in this case, we want to retry once again to be safe, then fail for good
            .catch((error) => {
                log.error(`fetch rejected: ${error}`);
            });

        if (typeof response === "undefined") {
            // Promise rejected
            throw new Error("Could not fetch network resource, fetch rejected.");
        }

        // Decode and return the JSON as well
        const json = await response.json();

        return [response, json];
    } catch (e) {
        throw new Error(`Error while requesting data: ${e}`);
    }
};

export {
    JSONObject,
    getGlobalBearerToken, setGlobalBearerToken,
    authStorage, request,
};
