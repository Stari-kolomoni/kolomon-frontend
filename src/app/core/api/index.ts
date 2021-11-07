import { request } from "./requests";
import Logger, { Colour } from "../logger";
import {
    Category,
    DetailResponse,
    ExtendedEnglishWord, Link,
    SimpleEnglishWord,
    Suggestion,
    User,
    validateCategoryArraySchema,
    validateCategoryDeletedSchema,
    validateCategorySchema,
    validateCheckResponseSchema,
    validateDeletedSuggestionSchema,
    validateEnglishWordDeletedSchema,
    validateExtendedEnglishWordSchema,
    validateLinkArraySchema,
    validateLinkSchema,
    validatePingResponseSchema,
    validateSimpleEnglishWordArraySchema,
    validateSimpleEnglishWordSchema,
    validateSuggestionArraySchema,
    validateSuggestionSchema,
    validateTokenResponseSchema,
    validateUserArraySchema,
    validateUserDeletedSchema,
    validateUserSchema,
} from "./validation";

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
    /**
     * API Endpoint: GET /users/
     * Pings the backend and returns a boolean indicating the status.
     * @param page - Page number to request. Automatic pagination is not implemented yet.
     * @returns An array containing user objects.
     */
    static async getAllUsers(page = 0): Promise<User[]> {
        const [_response, json] = await request(
            constructUrl("/users/"), "GET", true,
            { page }, "url",
        );

        if (!validateUserArraySchema(json)) {
            throw new Error("Failed to validate User[]");
        }

        return json;
    }

    /**
     * API Endpoint: POST /users/
     * Creates a new user with a specific username, password and permissions.
     * @param username - Username to register.
     * @param password - What password to assign to the new user.
     * @param permissions - Permissions to set on the new user. TODO which permissions are actually available
     * @returns Newly-created User.
     */
    static async createUser(
        username: string,
        password: string,
        permissions = 0,
    ): Promise<User> {
        const [_response, json] = await request(
            constructUrl("/users/"), "POST", true,
            { username, password, permissions }, "json",
        );

        if (!validateUserSchema(json)) {
            throw new Error("createUser: Failed to validate User.");
        }

        return json;
    }

    /**
     * API Endpoint: GET /users/me
     * @returns Logged-in user's information.
     */
    static async getLoggedInUser(): Promise<User> {
        const [_response, json] = await request(
            constructUrl("/users/me"), "GET", true,
        );

        if (!validateUserSchema(json)) {
            throw new Error("getLoggedInUser: Failed to validate User.");
        }

        return json;
    }

    /**
     * API Endpoint: GET /users/{user_id}
     * @param id - ID of the user to get information about.
     * @returns Information about the user with the specified ID.
     */
    static async getUser(id: number): Promise<User> {
        const [_response, json] = await request(
            constructUrl(`/users/${id}`), "GET", true,
        );

        if (!validateUserSchema(json)) {
            throw new Error("getLoggedInUser: Failed to validate User.");
        }

        return json;
    }

    /**
     * API Endpoint: DELETE /users/{user_id}
     * Deletes an existing user.
     * @param id - ID of the user to delete.
     */
    // TODO change to Promise<bool>
    static async deleteUser(id: number): Promise<DetailResponse> {
        const [_response, json] = await request(
            constructUrl(`/users/${id}`), "DELETE", true,
        );

        if (!validateUserDeletedSchema(json)) {
            throw new Error("deleteUser: Failed to validate User.");
        }

        return json;
    }

    /**
     * API Endpoint: PATCH /users/{user_id}
     * Modify a users' password or permissions.
     * TODO (@Gorazd) Maybe a username change could be useful?
     * @param id - ID of the user to modify.
     * @param newPassword - Optionally, the new user password.
     * @param newPermissions - Optionally, the new user permissions.
     */
    static async modifyUser(
        id: number,
        newPassword?: string,
        newPermissions?: number,
    ): Promise<User> {
        // TODO ensure either newPassword or newPermissions is set
        const jsonData: { password?: string, permissions?: number } = {};
        if (typeof newPassword !== "undefined") {
            jsonData.password = newPassword;
        }
        if (typeof newPermissions !== "undefined") {
            jsonData.permissions = newPermissions;
        }

        const [_response, json] = await request(
            constructUrl(`/users/${id}`), "DELETE", true,
            jsonData, "json",
        );

        if (!validateUserSchema(json)) {
            throw new Error("modifyUser: Failed to validate User.");
        }

        return json;
    }




    /*
     * CATEGORIES (get all, create, get one, delete one, modify one)
     */
    /**
     * API Endpoint: GET /lex/categories/
     * @param page - Category page to fetch, defaults to the first page.
     * @returns A list of available categories (on that page).
     * TODO (@Gorazd) How does the user know there are no more pages?
     */
    static async getAllCategories(page = 0): Promise<Category[]> {
        const [_response, json] = await request(
            constructUrl("/lex/categories/"), "GET", true,
            { page }, "json",
        );

        if (!validateCategoryArraySchema(json)) {
            throw new Error("getAllCategories: Failed to validate Category[]");
        }

        return json;
    }

    /**
     * API Endpoint: POST /lex/categories/
     * Creates a new category.
     * @param name - Category name.
     * @param description - Category description.
     * @returns The newly created category.
     */
    static async createCategory(name: string, description: string): Promise<Category> {
        const [_response, json] = await request(
            constructUrl("/lex/categories/"), "POST", true,
            { name, description }, "json",
        );

        if (!validateCategorySchema(json)) {
            throw new Error("createCategory: Failed to validate Category");
        }

        return json;
    }

    /**
     * API Endpoint: GET /lex/categories/{category_id}
     * @param id - ID of the category to fetch.
     * @returns Information about the requested category.
     */
    static async getCategory(id: number): Promise<Category> {
        const [_response, json] = await request(
            constructUrl(`/lex/categories/${id}`), "POST", true,
        );

        if (!validateCategorySchema(json)) {
            throw new Error("getCategory: Failed to validate Category");
        }

        return json;
    }

    /**
     * API Endpoint: DELETE /lex/categories/{category_id}
     * Delete a single category.
     * @param id - ID of the category to delete.
     */
    static async deleteCategory(id: number): Promise<DetailResponse> {
        const [_response, json] = await request(
            constructUrl(`/lex/categories/${id}`), "DELETE", true,
        );

        if (!validateCategoryDeletedSchema(json)) {
            throw new Error("deleteCategory: Failed to validate DetailResponse");
        }

        return json;
    }

    /**
     * API Endpoint: PATCH /lex/categories/{category_id}
     * Modify a single category.
     * @param id - ID of the category to modify.
     * @param newName - Optionally, the new category name.
     * @param newDescription - Optionally, the new category description.
     */
    static async modifyCategory(
        id: number,
        newName?: string,
        newDescription?: string,
    ): Promise<Category> {
        const jsonData: { name?: string, description?: string } = {};
        if (typeof newName !== "undefined") {
            jsonData.name = newName;
        }
        if (typeof newDescription !== "undefined") {
            jsonData.description = newDescription;
        }

        const [_response, json] = await request(
            constructUrl(`/lex/categories/${id}`), "PATCH", true,
            jsonData, "json",
        );

        if (!validateCategorySchema(json)) {
            throw new Error("modifyCategory: Failed to validate Category");
        }

        return json;
    }




    /*
     * ENGLISH ENTRIES (get all, create, get one, delete one, modify one)
     */
    /**
     * API Endpoint: GET /lex/english/
     * @param page - Page of english words to request.
     * @returns A list of objects containing english words (the simple, smaller schema with less details).
     */
    static async getAllEnglishWords(page = 0): Promise<SimpleEnglishWord[]> {
        const [_response, json] = await request(
            constructUrl("/lex/english/"), "GET", true,
            { page }, "json",
        );

        if (!validateSimpleEnglishWordArraySchema(json)) {
            throw new Error("getAllEnglishWords: Failed to validate SimpleEnglishWord[]");
        }

        return json;
    }

    /**
     * API Endpoint: POST /lex/english/
     * Create a new english word entry.
     * @param word - English word.
     * @param description - Word description.
     * @returns The newly-created english word (the simple schema).
     */
    static async createEnglishWord(
        word: string, description: string,
    ): Promise<SimpleEnglishWord> {
        const [_response, json] = await request(
            constructUrl("/lex/english/"), "POST", true,
            { word, description }, "json",
        );

        if (!validateSimpleEnglishWordSchema(json)) {
            throw new Error("createEnglishWord: Failed to validate SimpleEnglishWord");
        }

        return json;
    }

    /**
     * API Endpoint: GET /lex/english/{english_id}
     * @param id - ID of the english word.
     * @returns All information about the english word (the extended schema).
     */
    static async getEnglishWord(id: number): Promise<ExtendedEnglishWord> {
        const [_response, json] = await request(
            constructUrl(`/lex/english/${id}`), "GET", true,
        );

        if (!validateExtendedEnglishWordSchema(json)) {
            throw new Error("getEnglishWord: Failed to validate ExtendedEnglishWord");
        }

        return json;
    }

    /**
     * API Endpoint: DELETE /lex/english/{english_id}
     * Deletes a single english word.
     * @param id - ID of the english word to delete.
     */
    static async deleteEnglishWord(id: number): Promise<DetailResponse> {
        const [_response, json] = await request(
            constructUrl(`/lex/english/${id}`), "DELETE", true,
        );

        if (!validateEnglishWordDeletedSchema(json)) {
            throw new Error("deleteEnglishWord: Failed to validate DetailResponse");
        }

        return json;
    }

    /**
     * API Endpoint: PATCH /lex/english/{english_id}
     * @param id
     * @param newWord
     * @param newDescription
     */
    static async modifyEnglishWord(
        id: number,
        newWord?: string,
        newDescription?: string,
    ): Promise<SimpleEnglishWord> {
        const jsonData: { word?: string, description?: string } = {};
        if (typeof newWord !== "undefined") {
            jsonData.word = newWord;
        }
        if (typeof newDescription !== "undefined") {
            jsonData.description = newDescription;
        }

        const [_response, json] = await request(
            constructUrl(`/lex/english/${id}`), "PATCH", true,
            jsonData, "json",
        );

        if (!validateSimpleEnglishWordSchema(json)) {
            throw new Error("modifyEnglishWord: Failed to validate SimpleEnglishWord");
        }

        return json;
    }




    /*
     * SUGGESTIONS (get all for english word, create, get one, delete one, modify one)
     */
    /**
     * API Endpoint: GET /lex/english/{english_id}/suggestions/
     * @param wordID - ID of the word to get translation suggestions for.
     * @param page - Which page to get (if there are so many to need pagination).
     * @returns An array containing suggestions.
     */
    static async getAllEnglishWordTranslationSuggestions(
        wordID: number, page = 0,
    ): Promise<Suggestion[]> {
        const [_response, json] = await request(
            constructUrl(`/lex/english/${wordID}/suggestions/`), "GET", true,
            { page }, "url",
        );

        if (!validateSuggestionArraySchema(json)) {
            throw new Error(
                "getEnglishWordTranslationSuggestions: Failed to validate Suggestion[]",
            );
        }

        return json;
    }

    /**
     * API Endpoint: POST /lex/english/{english_id}/suggestions/
     * Submit a new translation suggestion for the specified english word.
     * @param wordID - ID of the word to suggest a translation for.
     * @param suggestion - Suggested translation.
     * @param comment - A comment alongside the suggestion.
     * @param separateGenderForm - Whether this word has separate gender forms in the target language.
     * @returns The newly-created translation suggestion.
     */
    static async addEnglishWordTranslationSuggestion(
        wordID: number, suggestion: string,
        comment: string, separateGenderForm: boolean,
    ): Promise<Suggestion> {
        const [_response, json] = await request(
            constructUrl(`/lex/english/${wordID}/suggestions/`), "POST", true,
            { suggestion, comment, separate_gender_form: separateGenderForm }, "json",
        );

        if (!validateSuggestionSchema(json)) {
            throw new Error(
                "addEnglishWordTranslationSuggestion: Failed to validate Suggestion",
            );
        }

        return json;
    }

    /**
     * API Endpoint: GET /lex/english/{english_id}/suggestions/{suggestion_id}
     * @param wordID - ID of the english word this suggestion is on.
     * @param suggestionID - ID of the suggestion to get.
     * @returns Information about the specific suggestion.
     */
    static async getEnglishWordTranslationSuggestion(
        wordID: number, suggestionID: number,
    ): Promise<Suggestion> {
        const [_response, json] = await request(
            constructUrl(`/lex/english/${wordID}/suggestions/${suggestionID}`),
            "GET", true,
        );

        if (!validateSuggestionSchema(json)) {
            throw new Error(
                "getEnglishWordTranslationSuggestion: Failed to validate Suggestion",
            );
        }

        return json;
    }

    /**
     * API Endpoint: DELETE /lex/english/{english_id}/suggestions/{suggestion_id}
     * @param wordID - ID of the english word this suggestion is on.
     * @param suggestionID - ID of the suggestion to delete.
     */
    static async deleteEnglishWordTranslationSuggestion(
        wordID: number, suggestionID: number,
    ): Promise<DetailResponse> {
        const [_response, json] = await request(
            constructUrl(`/lex/english/${wordID}/suggestions/${suggestionID}`),
            "DELETE", true,
        );

        if (!validateDeletedSuggestionSchema(json)) {
            throw new Error(
                "deleteEnglishWordTranslationSuggestion: "
                + "Failed to validate DetailResponse",
            );
        }

        return json;
    }

    static async modifyEnglishWordTranslationSuggestion(
        wordID: number, suggestionID: number,
        newSuggestion?: string,
        newComment?: string,
        newSeparateGenderForm?: boolean,
    ): Promise<Suggestion> {
        const jsonData: {
            suggestion?: string, comment?: string, separate_gender_form?: boolean,
        } = {};
        if (typeof newSuggestion !== "undefined") {
            jsonData.suggestion = newSuggestion;
        }
        if (typeof newComment !== "undefined") {
            jsonData.comment = newComment;
        }
        if (typeof newSeparateGenderForm !== "undefined") {
            jsonData.separate_gender_form = newSeparateGenderForm;
        }

        const [_response, json] = await request(
            constructUrl(`/lex/english/${wordID}/suggestions/${suggestionID}`),
            "PATCH", true,
            jsonData, "json",
        );

        if (!validateSuggestionSchema(json)) {
            throw new Error(
                "modifyEnglishWordTranslationSuggestion: "
                + "Failed to validate Suggestion",
            );
        }

        return json;
    }

    /*
     * LINKS (get all for english word, create, get one, delete one, modify one)
     */
    /**
     * API Endpoint: GET /lex/english/{english_id}/links/
     * @param wordID - ID of the english word to get the links for.
     * @param page - Which page to request.
     * @returns An array containing links.
     */
    static async getAllEnglishWordLinks(wordID: number, page = 0): Promise<Link[]> {
        const [_response, json] = await request(
            constructUrl(`/lex/english/${wordID}/links/`),
            "GET", true,
            { page }, "json",
        );

        if (!validateLinkArraySchema(json)) {
            throw new Error("getAllEnglishWordLinks: Failed to validate Link[]");
        }

        return json;
    }

    /**
     * API Endpoint: POST /lex/english/{english_id}/links/
     * @param wordID - ID of the english word to get the links for.
     * @param title - New link's title.
     * @param url - New link's URL.
     */
    static async createEnglishWordLink(
        wordID: number,
        title: string,
        url: string,
    ): Promise<Link> {
        const [_response, json] = await request(
            constructUrl(`/lex/english/${wordID}/links/`),
            "POST", true,
            { title, url }, "json",
        );

        if (!validateLinkSchema(json)) {
            throw new Error("createEnglishWordLink: Failed to validate Link");
        }

        return json;
    }

    // TODO Add 404/... handlers to other API methods as well.
    /**
     * API Endpoint: GET /lex/english/{english_id}/links/{link_id}/
     * @param wordID - ID of the english word to get the links for.
     * @param linkID - ID of the link to get.
     * @returns The requested link.
     */
    static async getEnglishWordLink(
        wordID: number, linkID: number,
    ): Promise<Link | null> {
        const [response, json] = await request(
            constructUrl(`/lex/english/${wordID}/links/${linkID}/`),
            "GET", true,
        );

        if (response.status === 404) {
            // English word or link does not exist
            return null;
        }

        if (!validateLinkSchema(json)) {
            throw new Error("getEnglishWordLink: Failed to validate Link");
        }

        return json;
    }

    /**
     * API Endpoint: DELETE /lex/english/{english_id}/links/{link_id}/
     * @param wordID - ID of the english word to get the links for.
     * @param linkID - ID of the link to get.
     */
    static async deleteEnglishWordLink(
        wordID: number, linkID: number,
    ): Promise<DetailResponse> {
        const [_response, json] = await request(
            constructUrl(`/lex/english/${wordID}/links/${linkID}/`),
            "DELETE", true,
        );

        if (!validateEnglishWordDeletedSchema(json)) {
            throw new Error("deleteEnglishWordLink: Failed to validate DetailResponse");
        }

        return json;
    }

    // TODO modify word link

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
     * Asks the backend to respond to a ping request, essentially checking for server status.
     */
    static async ping(): Promise<boolean> {
        const [_response, json] = await request(
            constructUrl("/ping"), "GET", false,
        );

        if (!validatePingResponseSchema(json)) {
            throw new Error("ping: failed to validate MessageResponse");
        }

        return json.message === "pong";
    }

    /**
     * API Endpoint: GET /check
     * Verifies that the user is logged in.
     */
    static async checkIfProperlyLoggedIn(): Promise<boolean> {
        const [_response, json] = await request(
            constructUrl("/check"), "GET", true,
        );

        if (!validateCheckResponseSchema(json)) {
            throw new Error("checkIfProperlyLoggedIn: failed to validate TokenResponse");
        }

        return json.message === "You are authorized.";
    }

    /**
     * API Endpoint: POST /token
     * Essentially logs in the user, and receives a bearer token
     * to include in subsequent requests inside the Authorization header.
     * NOTE: This method DOES NOT save the token, only fetches it.
     * @param username - Username to log in with.
     * @param password - Password to log in with.
     */
    static async getUserToken(
        username: string, password: string,
    ): Promise<string | null> {
        const [response, json] = await request(
            constructUrl("/token"), "POST", true,
            { username, password }, "form",
        );

        if (response.status === 401) {
            // Unauthorized
            return null;
        }
        if (!validateTokenResponseSchema(json)) {
            throw new Error("getUserToken: failed to validate TokenResponse");
        }

        return json.access_token;
    }
}
