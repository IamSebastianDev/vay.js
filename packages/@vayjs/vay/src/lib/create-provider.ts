/** @format */

import { Dictionary } from '../types/dictionary';
import { ISO639Code } from '../types/iso-639-code';
import { Phrase } from '../types/phrase';
import { inferInitialLanguage } from './infer-initial-language';
import { VayConfig } from '../types/vay-config';
import { getExecutionContext } from '../utils/get-execution-environment';
import { VayProvider } from '../types/vay-provider';
import { TData, Translator } from '../types/translator';
import { interpolateString } from './interpolate-string';
import { getClosestIndex } from '../utils/get-closest-index';

/**
 * Creates a translation provider for managing and using a multilingual dictionary.
 * The provider allows setting and getting the current language, and translating phrases
 * according to the current or specified locale.
 *
 * @param {VayConfig} config Configuration options for the provider, including the default locale.
 * @param {...Dict[]} dictionaries An array of dictionaries, each containing phrases for a specific locale.
 *                                Each dictionary must have a `locale` (ISO 639 code) and `phrases` (translation key-value pairs).
 *
 * @returns {VayProvider<Phrases>} An object that includes:
 *                                  - `translate`: A function to translate phrases based on the current or specified locale.
 *                                  - `getLanguage`: A function to get the current locale.
 *                                  - `setLanguage`: A function to set the current locale, if it exists within the provided dictionaries.
 *                                  - `config`: The provided configuration object.
 *
 * @example
 *
 * ```ts
 * // Creating a provider with English and Spanish dictionaries.
 * const provider = createProvider(
 *  defineConfig({ defaultLocale: 'en' }),
 *  defineDictionary({locale: 'en', phrases: {...}}),
 *  defineDictionary({locale: 'es', phrases: {...}}),
 * );
 *
 * // Setting the language to Spanish.
 * provider.setLanguage('es');
 *
 * // Getting the current language, which should be 'es'.
 * console.log(provider.getLanguage());
 *
 * // Translating a phrase to the current language (Spanish).
 * console.log(provider.translate('greeting'));
 * ```
 *
 * **Note**: The function ensures consistent locale handling by converting locales to lowercase.
 * It infers the initial language from the provided dictionaries or the default locale in the config.
 * Warnings are logged if no dictionaries are provided, the specified locale does not exist, or phrases are malformed.
 */

export const createProvider = <
    Dict extends Dictionary<Record<string, Phrase>>,
    Phrases extends Record<string, Phrase> = Dict['phrases'],
>(
    config: VayConfig,
    ...dictionaries: Dict[]
): VayProvider<Phrases> => {
    const { defaultLocale, quiet } = config;

    const reporter = {
        warn: (message: any) => {
            if (quiet) return;
            console.warn(`[Vay]: ${message}`);
        },
    };

    // Parse all passed dictionaries and change the locale to lowercase, to ensure
    // consistent locale handling.
    if (!dictionaries.length) {
        reporter.warn(`No dictionaries provided.`);
    }

    const _dicts = new Map<ISO639Code, Record<string, Phrase>>([
        ...dictionaries.map(({ locale, phrases }) => [locale.toLocaleLowerCase() as ISO639Code, phrases] as const),
    ]);

    // Infer the initial language to set. The initial language is a construct
    // of multiple possible conditions, with the last one being a fallback to
    // the dictionaries first entry language.
    let _currentLocale = defaultLocale ?? inferInitialLanguage(_dicts);

    // Public API implementation for Language getter and setter
    const getLanguage = () => _currentLocale;
    const setLanguage = (locale: ISO639Code) => {
        const dictionaryLanguageCodes = [..._dicts.keys()];
        if (!dictionaryLanguageCodes.includes(locale)) {
            reporter.warn(`Locale '${locale}' does not exist in a dictionary. Locale was not set.`);
            return;
        }

        _currentLocale = locale;
        if (getExecutionContext()) {
            window.dispatchEvent(
                new CustomEvent('LanguageHasChanged', {
                    detail: {
                        locale,
                    },
                }),
            );
        }
    };

    // Translation Function
    const translate: Translator<Phrases> = (...args) => {
        const [token, tData, locale] = args;
        // Get the phrases from the currently selected dictionary and
        // Verify they exist
        const tLocale = locale ?? _currentLocale;
        if (!_dicts.has(tLocale)) {
            reporter.warn(`No Dictionary found or available for the provided Locale: '${tLocale}'`);
            return token;
        }

        // Begin the token processing and matching
        try {
            // Get all necessary data to translate the token to the target phrase
            const phrases = _dicts.get(tLocale)!;
            const { count = 0, ctx, ...data } = tData ?? {};

            // The token is first normalized and the dict then queried for a matching
            // phrase. If no matching phrase is found, the phrase will be either undefined
            // or null.
            const normalized = token.replace(/\(|\)|\.\[\.\.\.\]/g, '');
            const phrase = normalized.split('.').reduce((prev: any, curr) => prev[curr], phrases);

            switch (typeof phrase) {
                // Handle Context Phrases
                case 'function':
                    return interpolateString(phrase(ctx), data as TData);
                // Handle Numerical Phrases
                case 'object':
                    const matched = phrase[getClosestIndex(Object.keys(phrase), parseInt(`${count}`))];
                    return interpolateString(matched, tData);
                // Handle Simple string Phrases
                case 'string':
                    return interpolateString(phrase, data);
                // If no other conditions match, warn about malformed phrases and return the token unprocessed
                // to enable easier debugging
                default:
                    // Throw an error to return the error value
                    throw new TypeError();
            }
        } catch (e) {
            reporter.warn(`Malformed Phrase '${token}' could not be parsed.`);
            return token;
        }
    };

    return {
        translate,
        getLanguage,
        setLanguage,
        config,
    };
};
