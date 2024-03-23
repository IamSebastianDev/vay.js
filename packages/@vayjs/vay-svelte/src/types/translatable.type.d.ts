/** @format */

import { ISO639Code, Phrase, VayProvider } from '@vayjs/vay';
import { Readable } from 'svelte/store';

/**
 * Defines the structure for objects that facilitate language management and translation within Svelte applications
 * using the Vay.js internationalization library. This type encapsulates the functionality necessary for components
 * to reactively access the current language, change the language, and perform translations based on the active locale.
 *
 * @template Dict - A generic type parameter extending a record of strings to `Phrase`, which represents the structure
 *                  of translation dictionaries. This ensures that translations are strongly typed and adhere to the
 *                  structure defined by the developer.
 */
export type Translatable<Dict extends Record<string, Phrase>> = {
    /**
     * A readable Svelte store containing the current language code (ISO639Code). Components can subscribe to this store
     * to reactively update when the language changes, allowing for dynamic UI adjustments based on the current locale.
     */
    language: Readable<ISO639Code>;

    /**
     * A function to update the application's current language. This method updates both the VayProvider's internal state
     * and the `language` store, triggering reactive updates across subscribed components. Changing the language through
     * this function ensures that translations across the application reflect the new language setting.
     *
     * @param {ISO639Code} locale - The new language code (ISO 639-1 format) to set as the current language. This code
     *                              should match one of the languages available in the provided dictionaries.
     */
    setLanguage: (locale: ISO639Code) => void;

    /**
     * A derived readable Svelte store providing access to the `translate` function from the VayProvider, configured
     * to use the current language. This store ensures that the translation function is always aligned with the current
     * locale, enabling components to perform translations that automatically update when the language changes.
     *
     * The `translate` function is used to retrieve translations for specified tokens, optionally incorporating interpolation
     * and pluralization based on the provided dictionaries and the current language setting.
     */
    translate: Readable<VayProvider<Dict>['translate']>;
};
