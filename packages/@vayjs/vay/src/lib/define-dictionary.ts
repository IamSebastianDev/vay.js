/** @format */

import { Dictionary } from '../types/dictionary';
import { ISO639Code } from '../types/iso-639-code';
import { Phrase } from '../types/phrase';

/**
 * @description
 * A utility function used to create a `Dictionary` object. When using Typescript, the function is used to infer
 * the structure of the `Phrases` used for strongly typing the `translate()` method.
 *
 * @param { ISO639Code } locale - A valid, two letter ISO639 country code.
 * @param { T extends Record<string, Phrase> } phrases - The object containing the phrases used for translations
 *
 * @returns a valid `Dictionary` object that can be passed to a created `Vay` instance.
 *
 * ---
 * @example
 *
 * ```ts
 * import { Vay, defineDictionary } from "vay.js";
 *
 * // Create a Dictionary that typescript can use
 * // to infer the structure of the phrases
 * const en = defineDictionary('en', {
 *   token: 'Phrase'
 * })
 *
 * const i18n = new Vay(<config>, en, ...<other dictionaries>);
 * ```
 */
export const defineDictionary = <T extends Record<string, Phrase>>(locale: ISO639Code, phrases: T): Dictionary<T> => ({
    locale,
    phrases,
});
