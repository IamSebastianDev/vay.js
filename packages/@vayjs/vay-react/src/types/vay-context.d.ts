/** @format */

import { ISO639Code, Phrase, VayProvider } from '@vayjs/vay';

/**
 * Defines the structure of the context used for managing language settings and translations within a React application integrating Vay.js.
 * This context provides access to the translation function, current language, and a method to update the language dynamically.
 *
 * @template T - Extends a record of strings to `Phrase`, representing the dictionary's structure for translations.
 */
export type VayContext<T extends Record<string, Phrase>> = {
    /**
     * A function to translate tokens into their corresponding phrases based on the current language or an optionally specified locale.
     * It leverages the underlying VayProvider's translate method to retrieve translations.
     *
     * @param token - The token representing the key in the dictionary to retrieve the translation for.
     * @param tData - Optional data for interpolation in the translation string.
     * @param locale - An optional locale to override the current language for this translation.
     * @returns The translated string corresponding to the provided token and data, in the current or specified language.
     */
    translate: VayProvider<T>['translate'];

    /**
     * The current language code (ISO 639-1 format) being used for translations within the application.
     * This value is dynamically updated via `setLanguage` and should reflect the current language choice.
     */
    language: ISO639Code;

    /**
     * A method to update the application's current language. This will dynamically change the language used for translations
     * and trigger re-renders in components using the context to reflect the new language across the application.
     *
     * @param locale - The ISO 639-1 language code to set as the new current language.
     */
    setLanguage: (locale: ISO639Code) => void;
};
