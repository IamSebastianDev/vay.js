/** @format */

import { Phrase, VayProvider } from '@vayjs/vay';
import { derived } from 'svelte/store';
import { useLanguage } from '../lib/use-language';
import { Translatable } from '../types/translatable.type';

/**
 * Creates a set of utilities to enable dynamic translations within a Svelte application using a specified VayProvider.
 * This function returns an object containing a readable store for the current language, a function to update the language,
 * and a derived store that reacts to language changes, providing an up-to-date translate function from the VayProvider.
 *
 * @template Dict A generic type extending a record of strings to `Phrase`, representing the structure of your translation dictionaries.
 *                This ensures type safety and IntelliSense support for dictionary tokens within your Svelte components.
 * @param {VayProvider<Dict>} provider An instance of VayProvider pre-configured with your dictionaries and initial language setting.
 *                                     This provider manages the translation logic based on the current language.
 * @returns {Translatable<Dict>} An object comprising:
 *          - `language`: A readable Svelte store that holds the current language code (ISO639Code), allowing Svelte components
 *                        to reactively update when the language changes.
 *          - `setLanguage`: A function to update the current language both in the VayProvider and within the Svelte store,
 *                           enabling dynamic language switching across the application.
 *          - `translate`: A derived Svelte store that provides the translate function from the VayProvider. This function is
 *                         automatically updated when the language changes, ensuring translations are always performed using
 *                         the current language setting.
 *
 * @example
 * ```html
 * // Import the translatable function and initialize it with a VayProvider instance
 * <script lang="ts">
 * import { translatable } from './translatable';
 * const { language, setLanguage, translate: t } = translatable(vayProvider);
 *</script>

 * <!-- Use the `language` store to display the current language in a component -->
 * <p>Current language: {$language}</p>
 *
 * // Use the `setLanguage` function to change the language
 * <button on:click={() => setLanguage('es')}>Change to Spanish</button>
 *
 * // Use the `t` store to perform translations reactively
 * <p>{$t('greeting')}</p>
 * ```
 */

export const translatable = <Dict extends Record<string, Phrase>>(provider: VayProvider<Dict>): Translatable<Dict> => {
    const [locale, language, setLanguage] = useLanguage(provider);

    return {
        language,
        setLanguage,
        translate: derived([locale], () => provider.translate),
    };
};
