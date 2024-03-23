/** @format */

import { ReadonlyGrain } from '@grainular/nord';
import { ISO639Code, Phrase, VayProvider } from '@vayjs/vay';

/**
 * This type encapsulates the utilities necessary for components to observe language changes, switch languages, and
 * perform dynamic translations based on the current locale. It leverages Nørd JS's reactive grains to provide a
 * reactive internationalization strategy.
 *
 * @template Dict A generic type parameter extending a record of strings to `Phrase`, indicating the dictionary
 *                structure for translations. This setup ensures translations are strongly typed according to the
 *                dictionary provided to the VayProvider.
 */
export type Localized<Dict extends Record<string, Phrase>> = {
    /**
     * A reactive grain that holds the current language code (ISO639Code). Components can subscribe to this grain
     * to reactively update whenever the language changes, facilitating a dynamic UI that adapts to language preferences.
     */
    language: ReadonlyGrain<ISO639Code>;

    /**
     * A function to update the application's current language. Invoking this function will update the VayProvider's
     * internal state and the `language` grain, triggering a reactive change across the application that reflects the
     * new language setting. This method allows for dynamic language switching at runtime.
     *
     * @param {ISO639Code} locale - The ISO 639-1 code representing the new language to set as the current language.
     */
    setLanguage: (locale: ISO639Code) => void;

    /**
     * A function that returns a reactive grain representing the result of translating a specified token, optionally
     * including data for interpolation or contextual translations. This grain automatically updates when the language
     * changes or when any of its reactive data dependencies change, ensuring translations remain up-to-date with the
     * application state and user interactions.
     *
     * @param {Parameters<VayProvider<Dict>['translate']>[0]} token - The translation token identifying the text to translate.
     * @param {Record<PropertyKey, unknown | ReadonlyGrain<any>>} tData - Optional data for interpolation in the translation,
     *                                                                    which can include reactive grains for dynamic data binding.
     * @returns {ReadonlyGrain<string>} A reactive grain containing the translated string, which updates reactively.
     */
    translate: (
        token: Parameters<VayProvider<Dict>['translate']>[0],
        tData: Record<PropertyKey, unknown | ReadonlyGrain<any>>,
    ) => ReadonlyGrain<string>;
};
