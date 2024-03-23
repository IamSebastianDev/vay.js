/** @format */

import { ReadonlyGrain, combined, grain, readonly } from '@grainular/nord';
import { ISO639Code, Phrase, VayProvider } from '@vayjs/vay';
import { convertToGrain } from '../utils/convert-to-grain';
import { Localized } from '../types/localized';

/**
 * Provides a reactive internationalization setup for Nørd JS applications, leveraging the `VayProvider` for dynamic translations.
 * Initializes language management and translation capabilities, using Nørd JS's grains for reactive language changes and translations.
 *
 * @template Dict A generic extending a record of strings to `Phrase`, representing the dictionary structure for translations.
 *                Ensures type safety and IntelliSense support for dictionary tokens within Nørd JS applications.
 * @param {VayProvider<Dict>} provider A pre-configured instance of the VayProvider with translation dictionaries
 *                                     and an initial language setting. Manages the translation logic based on the active language.
 * @returns An object containing:
 *          - `language`: A readonly grain storing the current language code (ISO639Code), allowing components to reactively
 *                        respond to language changes.
 *          - `setLanguage`: A function to update the application's current language, synchronizing both the VayProvider's
 *                           state and the reactive `language` grain.
 *          - `translate`: A function that returns a combined grain for a translation result. It accepts a token and optional
 *                         data for interpolation or contextual translation, enabling reactive translations that update
 *                         automatically with language changes or when reactive data dependencies change.
 *
 * @example
 * // Import the language management utilities from your i18n provider setup.
 * import { translate as t, setLanguage, language } from "./i18n.provider";
 *
 * // Define a Nørd JS component that displays a translated message and language switch buttons.
 * const App = createComponent((html) => {
 *     return html`
 *         <div>${t("greeting", { name: "World" })}</div>
 *         <button ${on("click", () => setLanguage("en"))}>En</button>
 *         <button ${on("click", () => setLanguage("es"))}>Es</button>
 *     `;
 * });
 */

export const localized = <Dict extends Record<string, Phrase>>(provider: VayProvider<Dict>): Localized<Dict> => {
    const _locale = grain<ISO639Code>(provider.getLanguage());
    const language = readonly(_locale);
    const setLanguage = (locale: ISO639Code) => {
        provider.setLanguage(locale);
        _locale.set(locale);
    };

    type Token = Parameters<(typeof provider)['translate']>[0];
    type TData = Parameters<(typeof provider)['translate']>[1];
    type GrainData = Record<PropertyKey, unknown | ReadonlyGrain<any>>;

    const translate = (token: Token, data: GrainData) => {
        const grains = Object.values(data).map(convertToGrain);

        return combined([_locale, ...grains], ([, ...grains]) => {
            const tData = Object.fromEntries(Object.keys(data).map((key, idx) => [key, grains[idx]]));
            return provider.translate(token, tData as TData);
        });
    };

    return {
        language,
        setLanguage,
        translate,
    };
};
