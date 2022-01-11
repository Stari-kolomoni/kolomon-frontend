/*
 * This file contains JSON Schemas for validation of Kolomon API responses.
 * See https://ajv.js.org/json-schema.html for more information
 */
import Ajv, { JSONSchemaType } from "ajv";
import Logger, { Colour } from "../logger";

const ajv = new Ajv();
const log = new Logger("validation", Colour.GOLD_FUSION);

const compilationStartTime: number = (new Date()).getTime();



/*
 * Common schemas
 */
export interface DetailResponse {
    detail: string,
}
const detailResponseSchema: JSONSchemaType<DetailResponse> = {
    type: "object",
    properties: {
        detail: { type: "string" },
    },
    required: ["detail"],
};
export const validateDetailResponseSchema = ajv.compile(detailResponseSchema);



/*
 * USERS (get all, create, get self, get one, delete one, modify one)
 */

// GET /users/me
// and
// GET /users/{user_id}
// and
// POST /users/
// and
// PATCH /users/{user_id}
export interface User {
    username: string,
    id: number,
    permissions: number,
    // Time is in the UTC format
    // TODO add validator for that as well (https://ajv.js.org/json-schema.html#format)
    joined: string,
    last_active: string,
    is_active: boolean,
}
const userSchema: JSONSchemaType<User> = {
    type: "object",
    properties: {
        username: { type: "string" },
        id: { type: "number" },
        permissions: { type: "number" },
        joined: { type: "string" },
        last_active: { type: "string" },
        is_active: { type: "boolean" },
    },
    required: ["username", "id", "permissions", "last_active", "is_active"],
};
export const validateUserSchema = ajv.compile(userSchema);


// GET /users/
const userArraySchema: JSONSchemaType<User[]> = {
    type: "array",
    items: {
        ...userSchema,
    },
};
export const validateUserArraySchema = ajv.compile(userArraySchema);


// DELETE /user/{user_id}
export { validateDetailResponseSchema as validateUserDeletedSchema };



/*
 * CATEGORIES (get all, create, get one, delete one, modify one)
 */

// POST /lex/categories/
// and
// GET /lex/categories/{category_id}
// and
// PATCH /lex/categories/{category_id}
export interface Category {
    name: string,
    description: string,
    id: string,
}
const categorySchema: JSONSchemaType<Category> = {
    type: "object",
    properties: {
        name: { type: "string" },
        description: { type: "string" },
        id: { type: "string" },
    },
    required: ["name", "description", "id"],
};
export const validateCategorySchema = ajv.compile(categorySchema);

// GET /lex/categories/
const categoryArraySchema: JSONSchemaType<Category[]> = {
    type: "array",
    items: {
        ...categorySchema,
    },
};
export const validateCategoryArraySchema = ajv.compile(categoryArraySchema);

// DELETE /lex/categories/{category_id}
export { validateDetailResponseSchema as validateCategoryDeletedSchema };



/*
 * ENGLISH ENTRIES (get all, create, get one, delete one, modify one)
 */

// POST /lex/english/
// and
// PATCH /lex/english/{english_id}
export interface SimpleEnglishWord {
    word: string,
    description: string,
    id: number,
    translation_state: number,
    // Time is in the UTC format, see User for comment on time validation
    created_at: string,
    edited_at: string,
}
const simpleEnglishWordSchema: JSONSchemaType<SimpleEnglishWord> = {
    type: "object",
    properties: {
        word: { type: "string" },
        description: { type: "string" },
        id: { type: "number" },
        translation_state: { type: "number" },
        created_at: { type: "string" },
        edited_at: { type: "string" },
    },
    required: [
        "word", "description", "id",
        "translation_state", "created_at", "edited_at",
    ],
};
export const validateSimpleEnglishWordSchema = ajv.compile(simpleEnglishWordSchema);

// GET /lex/english/
const simpleEnglishWordArraySchema: JSONSchemaType<SimpleEnglishWord[]> = {
    type: "array",
    items: {
        ...simpleEnglishWordSchema,
    },
};
export const
    validateSimpleEnglishWordArraySchema = ajv.compile(simpleEnglishWordArraySchema);

// GET /lex/english/{english_id}
export interface ExtendedEnglishWord {
    word: string,
    description: string,
    id: number,
    translation_state?: number,
    // Time is in the UTC format, see User for comment on time validation
    created_at: string,
    edited_at: string,
    translation_comment?: string,
    edited_by_id?: number,
    edited_by_name?: string,
    categories: Category[],
}
const extendedEnglishWordSchema: JSONSchemaType<ExtendedEnglishWord> = {
    type: "object",
    properties: {
        word: { type: "string" },
        description: { type: "string" },
        id: { type: "number" },
        translation_state: { type: "number", nullable: true },
        // Time is in the UTC format, see User for comment on time validation
        created_at: { type: "string" },
        edited_at: { type: "string" },
        translation_comment: { type: "string", nullable: true },
        edited_by_id: { type: "number", nullable: true },
        edited_by_name: { type: "string", nullable: true },
        categories: {
            ...categoryArraySchema,
        },
    },
    required: [
        "word", "description", "id",
        "created_at", "edited_at",
        "categories",
    ],
};
export const validateExtendedEnglishWordSchema = ajv.compile(extendedEnglishWordSchema);

// DELETE /lex/english/{english_id}
export { validateDetailResponseSchema as validateEnglishWordDeletedSchema };



/*
 * SUGGESTIONS (get all for english word, create, get one, delete one, modify one)
 */

// POST /lex/english/{english_id}/suggestions/
// and
// GET /lex/english/{english_id}/suggestions/{suggestion_id}
// and
// PATCH /lex/english/{english_id}/suggestions/{suggestion_id}
export interface Suggestion {
    suggestion: string,
    comment: string,
    separate_gender_form: boolean,
    id: number,
    // Time is in the UTC format, see User for comment on time validation
    created_at: string,
    edited_at: string,
}
const suggestionSchema: JSONSchemaType<Suggestion> = {
    type: "object",
    properties: {
        suggestion: { type: "string" },
        comment: { type: "string" },
        separate_gender_form: { type: "boolean" },
        id: { type: "number" },
        created_at: { type: "string" },
        edited_at: { type: "string" },
    },
    required: [
        "suggestion", "comment", "separate_gender_form",
        "id", "created_at", "edited_at",
    ],
};
export const validateSuggestionSchema = ajv.compile(suggestionSchema);

// GET /lex/english/{english_id}/suggestions/
const suggestionArraySchema: JSONSchemaType<Suggestion[]> = {
    type: "array",
    items: {
        ...suggestionSchema,
    },
};
export const validateSuggestionArraySchema = ajv.compile(suggestionArraySchema);

// DELETE /lex/english/{english_id}/suggestions/{suggestion_id}
export { validateDetailResponseSchema as validateDeletedSuggestionSchema };



/*
 * LINKS (get all for english word, create, get one, delete one, modify one)
 */

// POST /lex/english/{english_id}/links/
// and
// GET /lex/english/{english_id}/links/{link_id}
// and
// PATCH /lex/english/{english_id}/links/{link_id}
export interface Link {
    title: string,
    url: string,
    id: number,
}
const linkSchema: JSONSchemaType<Link> = {
    type: "object",
    properties: {
        title: { type: "string" },
        url: { type: "string" },
        id: { type: "number" },
    },
    required: ["title", "url", "id"],
};
export const validateLinkSchema = ajv.compile(linkSchema);

// GET /lex/english/{english_id}/links/
const linkArraySchema: JSONSchemaType<Link[]> = {
    type: "array",
    items: {
        ...linkSchema,
    },
};
export const validateLinkArraySchema = ajv.compile(linkArraySchema);

export { validateDetailResponseSchema as validateLinkDeletedSchema };



/*
 * RELATED (get all for english word, create, delete one)
 */

// GET /lex/english/{english_id}/related/
export interface RelatedWord {
    id: number,
    word: string,
}
const relatedWordArraySchema: JSONSchemaType<RelatedWord[]> = {
    type: "array",
    items: {
        type: "object",
        properties: {
            id: { type: "number" },
            word: { type: "string" },
        },
        required: ["id", "word"],
    },
};
export const validateRelatedWordArraySchema = ajv.compile(relatedWordArraySchema);

// POST /lex/english/{english_id}/related/
// and
// DELETE /lex/english/{english_id}/related/
export {
    validateDetailResponseSchema as validateAddedRelatedWordSchema,
    validateDetailResponseSchema as validateDeletedRelatedWordSchema,
};



/*
 * SLOVENE ENTRIES (get all, create, get one, delete one, modify one)
 */

// POST /lex/slovene/
// and
// GET /lex/slovene/{slovene_id}
// and
// PATCH /lex/slovene/{slovene_id}
export interface SloveneWord {
    word: string,
    description: string,
    id: number,
    // Time is in the UTC format, see User for comment on time validation
    created_at: string,
    edited_at?: string,
    alternative_form?: string,
}
const sloveneWordSchema: JSONSchemaType<SloveneWord> = {
    type: "object",
    properties: {
        word: { type: "string" },
        description: { type: "string" },
        id: { type: "number" },
        created_at: { type: "string" },
        edited_at: { type: "string", nullable: true },
        alternative_form: { type: "string", nullable: true },
    },
    required: [
        "word", "description", "id",
        "created_at",
    ],
};
export const validateSloveneWordSchema = ajv.compile(sloveneWordSchema);

// GET /lex/slovene/
const sloveneWordArraySchema: JSONSchemaType<SloveneWord[]> = {
    type: "array",
    items: {
        ...sloveneWordSchema,
    },
};
export const validateSloveneWordArraySchema = ajv.compile(sloveneWordArraySchema);

// DELETE /lex/slovene/{slovene_id}
export { validateDetailResponseSchema as validateSloveneWordDeletedSchema };



/*
 * TRANSLATION (get slovene translation from english word, link english word to slovene translation)
 */

// GET /lex/english/{english_id}/translation/
export { validateSloveneWordSchema as validateSloveneTranslationSchema };

// POST /lex/english/{english_id}/translation/
export { validateDetailResponseSchema as validateEnglishTranslationLinkedSchema };



/*
 * OTHER (get recent, get orphans)
 */
// TODO



/*
 * DEFAULT (ping, check, token)
 */

interface MessageResponse {
    message: string,
}
const messageResponseSchema: JSONSchemaType<MessageResponse> = {
    type: "object",
    properties: {
        message: { type: "string" },
    },
    required: ["message"],
};
const validateMessageResponseSchema = ajv.compile(messageResponseSchema);

// GET /ping
export { validateMessageResponseSchema as validatePingResponseSchema };

// GET /check
export { validateMessageResponseSchema as validateCheckResponseSchema };

// POST /token
interface TokenResponse {
    access_token: string,
    token_type: string,
}
const tokenResponseSchema: JSONSchemaType<TokenResponse> = {
    type: "object",
    properties: {
        access_token: { type: "string" },
        token_type: { type: "string" },
    },
    required: ["access_token", "token_type"],
};
export const validateTokenResponseSchema = ajv.compile(tokenResponseSchema);



if (!IS_PRODUCTION) {
    const msDelta = ((new Date()).getTime() - compilationStartTime) / 1000;
    log.debug(`JSON schemas took ${msDelta.toFixed(2)} to compile.`);
}
