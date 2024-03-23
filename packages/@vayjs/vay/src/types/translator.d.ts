/** @format */

import { ISO639Code } from './iso-639-code';
import { Phrase } from './phrase';
import { PropertyPath } from './property-path';

type TData = Record<PropertyKey, unknown>;
type TCount = Record<'count', number>;
type TContext = Record<'ctx', unknown>;

/**
 * Defines a translator function capable of handling various types of translation needs within the application.
 * It supports translating simple phrases, phrases with numerical context, and phrases with specific contextual
 * requirements. The translator is flexible and can adjust based on the type of data provided.
 *
 * @typedef {Function} Translator
 * @param {Token} token The key or path to the phrase in the dictionary. The path may indicate a simple phrase,
 *                      a phrase with numerical context `[...]`, or a phrase with specific context `(...)`.
 * @param {TData | TData & TCount | TData & TContext} tData Additional data required for translating the phrase.
 *                      This can include numbers for pluralization, context for contextual translations, or other data.
 *                      The structure of `tData` depends on the token type:
 *                      - For numerical phrases `[...]`, `TData & TCount` is expected.
 *                      - For context phrases `(...)`, `TData & TContext` is used.
 *                      - For other phrases, `TData` may be provided if additional data is needed for the translation.
 * @param {ISO639Code} [locale] Optionally specifies the locale to use for the translation. If not provided, the current
 *                              active locale of the application is used.
 *
 * @returns {string} The translated phrase as a string. The translation will be based on the provided token, data,
 *                   and optionally specified locale. If the translation cannot be found or the token is malformed,
 *                   the token itself may be returned as a fallback.
 *
 * This type uses TypeScript's advanced typing features, like generic types and conditional types, to ensure
 * type safety and intelligibility across different translation scenarios.
 */

export type Translator<Phrases extends Record<string, Phrase>> = {
    // Handle numerical phrases
    <Token extends PropertyPath<Phrases>>(
        token: Token,
        tData: Token extends `${string}[...]` ? TData & TCount : never,
        locale?: ISO639Code,
    ): string;

    // Handle context phrases
    <Token extends PropertyPath<Phrases>>(
        token: Token,
        tData: Token extends `${string}(${string})` ? TData & TContext : never,
        locale?: ISO639Code,
    ): string;

    // Handle other Phrases
    <Token extends PropertyPath<Phrases>>(
        token: Token,
        tData?: Token extends `${string}(${string})` | `${string}[...]` ? never : TData,
        locale?: ISO639Code,
    ): string;
};
