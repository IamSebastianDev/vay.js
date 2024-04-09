/** @format */

import { VayProvider, ISO639Code } from '@vayjs/vay';
import { writable, readonly } from 'svelte/store';

/**
 * Creates a Svelte store and associated functions to manage and observe language changes within a Svelte application.
 * This function leverages a VayProvider instance to facilitate dynamic internationalization (i18n) by providing
 * reactive language state management and a method to update the current language.
 *
 * @param {VayProvider<any>} provider - An instance of the VayProvider from @vayjs/vay, pre-configured with dictionaries
 *                                      and an initial language setting. This provider is used to set and get the current
 *                                      language for translation purposes.
 * @returns {readonly [Writable<ISO639Code>, Readable<ISO639Code>, (locale: ISO639Code) => void]} A tuple containing:
 *          1. A writable Svelte store (_locale) holding the current language code (ISO639Code), allowing for reactivity
 *             and updates within Svelte components.
 *          2. A readonly version of the _locale store, providing a way to subscribe to language changes without the ability
 *             to directly modify the store's value.
 *          3. A function to update the current language both within the VayProvider and the local Svelte store, ensuring
 *             synchronization between the i18n provider and the Svelte application state.
 */

export const useLanguage = (provider: VayProvider<any>) => {
    const _locale = writable<ISO639Code>(provider.getLanguage());

    return [
        _locale,
        readonly(_locale),
        (locale: ISO639Code) => {
            provider.setLanguage(locale);
            _locale.set(locale);
        },
    ] as const;
};
