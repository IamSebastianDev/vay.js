/** @format */

import { ISO639Code } from './iso-639-code';
import { Phrase } from './phrase';
import { Translator } from './translator';
import { VayConfig } from './vay-config';

/**
 * Defines the `VayProvider` interface, representing the main entry point for using the `vay.js` i18n library.
 * A `VayProvider` instance encapsulates the translation functionality, allowing for setting and getting
 * the current language, translating phrases based on the current or specified locale, and accessing the
 * provider's configuration.
 *
 * @type {VayProvider} A generic type parameterized over a dictionary record of phrases.
 * @property {Translator<Dict>} translate The core translation function, capable of translating phrases to the current or specified locale.
 * @property {() => ISO639Code} getLanguage A function to get the current language (locale) code.
 * @property {(locale: ISO639Code) => void} setLanguage A function to set the current language (locale), affecting subsequent translations.
 * @property {VayConfig} config The configuration object for the provider, specifying default settings and behaviors.
 */
export type VayProvider<Dict extends Record<string, Phrase>> = {
    /**
     * Translates a phrase identified by a key to the current or specified locale, supporting dynamic data insertion, pluralization, and contextual translations. Use this function to localize your application's UI text on the fly, making it adaptable to different languages and regions.
     *
     * **Key Features:**
     * - **Dynamic Data**: Inject variables directly into your translations for personalized messages.
     * - **Pluralization**: Handle singular and plural forms based on numeric values.
     * - **Contextual Translations**: Adjust translations based on context, ensuring relevance and cultural appropriateness.
     * - **Locale Override**: Specify a locale for each translation, bypassing the default or current language setting.
     *
     * @example
     * ```ts
     * // Translate a simple greeting
     * console.log(provider.translate('hello')); // "Hello"
     *
     * // Insert a name into a greeting
     * console.log(provider.translate('greeting', { name: 'Alice' })); // "Hello, Alice!"
     *
     * // Handle pluralization for items
     * console.log(provider.translate('itemCount', { count: 1 })); // "1 item"
     * console.log(provider.translate('itemCount', { count: 3 })); // "3 items"
     *
     * // Use contextual translation for time-specific greetings
     * console.log(provider.translate('greeting', { ctx: 'morning' })); // "Good morning!"
     * console.log(provider.translate('greeting', { ctx: 'night' })); // "Good night!"
     *
     * // Translate to a specific locale, regardless of the current language
     * console.log(provider.translate('farewell', undefined, 'es')); // "Adiós"
     * ```
     * @param {Translator<Dict>} translate - Translates phrases based on keys to the desired language.
     * @returns {string} The translated string. If the key doesn't match any phrase, returns the key itself to aid debugging.
     */
    translate: Translator<Dict>;

    /**
     * The `getLanguage` method returns the current active language code (ISO 639 format) of the translation provider.
     * This allows for checking the current locale at any point in the application.
     *
     * @returns {ISO639Code} The current language setting of the provider.
     */
    getLanguage: () => ISO639Code;

    /**
     * The `setLanguage` method allows changing the current language of the translation provider. This will affect
     * all subsequent calls to the `translate` function, rendering phrases according to the new locale.
     * If the specified locale does not exist within the provided dictionaries, the change will not be applied.
     *
     * @param {(locale: ISO639Code) => void} setLanguage Function to update the current language setting.
     *                                                   Accepts an ISO 639 language code as its parameter.
     */
    setLanguage: (locale: ISO639Code) => void;

    /**
     * The `config` property provides access to the configuration object used to initialize the `VayProvider`.
     * This includes settings such as the default locale, formatting options, and any other provider-specific configurations.
     *
     * @property {VayConfig} config The initial configuration object for the provider.
     */
    config: VayConfig;
};
