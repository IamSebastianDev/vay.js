/** @format */

import { ISO639Code } from '../types/iso-639-code';
import { getExecutionContext } from '../utils/get-execution-environment';

/**
 * Retrieves the default language set in the browser. This function is specifically designed to work
 * in a browser environment and will throw an error if executed in a non-browser context. It aims to
 * extract the first language preference set by the user in their browser settings, adhering to ISO 639-1 codes.
 *
 * @returns {ISO639Code} The browser's default language code as per ISO 639-1, or 'en' if none is found.
 * @throws {Error} Throws an error if called outside of a browser environment.
 */

export const getBrowserDefaultLanguage = (): ISO639Code => {
    // Check if the function is executed in a browser environment
    if (!getExecutionContext()) {
        throw new Error(`[Vay] Browser Default Language can only be extracted in a browser context.`);
    }

    // Extract the first match of browser default languages. The language will be returned,
    // if no language could be extracted, 'en' is returned as default.
    const [browser] = [
        ...new Set(
            window.navigator.languages.map((language) => {
                return language.split('-')[0].toLocaleLowerCase() as ISO639Code;
            }),
        ),
    ];

    return browser ?? 'en';
};
