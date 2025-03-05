/** @format */

import { ISO639Code } from './iso-639-code';
import { Phrase } from './phrase';

/**
 * Represents a dictionary for a specific locale, containing a set of phrases
 * and their translations. This type is a cornerstone in the internationalization
 * (i18n) process, allowing the association of multilingual text with unique keys
 * within a structured format. Each dictionary is tied to a specific language,
 * identified by an ISO 639 language code, and contains phrases that are used
 * throughout the application or website to support multiple languages seamlessly.
 *
 * @template T A generic type extending a record of strings to phrases, ensuring
 *             that each entry in the dictionary maps a unique key to its translated text.
 *             This flexible structure supports a wide range of applications and
 *             allows for the inclusion of dynamic phrases or context-specific translations.
 *
 * @typedef {Object} Dictionary
 * @property {ISO639Code} locale The ISO 639-1 or ISO 639-2 language code representing
 *                               the dictionary's language. This code ensures that each
 *                               dictionary is easily identifiable and matches a specific
 *                               linguistic standard.
 * @property {T} phrases The collection of phrases within the dictionary, where each phrase
 *                       is keyed by a unique string identifier and contains the translated
 *                       text or a function for dynamic translations. This structured approach
 *                       facilitates easy access to translations based on their keys and
 *                       supports a rich set of linguistic expressions.
 *
 * Usage Example:
 * ```
 * const englishDictionary: Dictionary<{
 *   greeting: Phrase;
 *   farewell: Phrase;
 * }> = {
 *   locale: 'en',
 *   phrases: {
 *     greeting: 'Hello',
 *     farewell: 'Goodbye'
 *   }
 * };
 * ```
 * This example defines a simple dictionary for English, with translations for a greeting
 * and a farewell. Each dictionary can be customized to include any number of phrases,
 * supporting comprehensive internationalization efforts across applications.
 */

export type Dictionary<T extends Record<string, Phrase>> = {
    locale: ISO639Code;
    phrases: T;
};
