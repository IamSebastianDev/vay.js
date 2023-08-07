/** @format */

import { Dictionary, VayConfig, ISO639Code, PropertyPath, TranslationData, Phrase } from '../types';
import { getCount, interpolateString } from '../utils';
import { VayError } from './VayError';

/**
 * @class
 * The `Vay` class is used to instance a new i18n provider and supplying it
 * with the necessary dictionaries, configuration and a optional initial
 * language. When using TypeScript, the class accepts a generic used to
 * describe the structure of the supplied dictionaries
 *
 * @example
 *
 * ```ts
 * import { Vay, defineConfig, defineDictionary } from "vay.js"
 *
 * // Create a config object
 * const config = defineConfig();
 *
 * // Create a dictionary
 * const en = defineDictionary('en', {
 *   token: 'Phrase'
 * })
 *
 * const i18n = new Vay([en], config, 'en');
 *
 * ```
 *
 * ---
 * A configuration object can be provided to control certain aspects
 * of the created `Vay` instance. The `defineConfig` method can be used
 * to easily create a complete config object by merging supplied properties
 * with the default properties. Any object containing all necessary properties
 * can be supplied to the instance.
 *
 * @example
 *
 * ```ts
 * import {Vay, defineConfig} from "vay.js";
 *
 * // use the config method to create a config
 * const createdConfig = defineConfig({
 *   quiet: true // suppress all warnings
 * });
 *
 * // create a config object manually
 * const config = {
 *   quiet: true,
 *   targetAttribute: 'vay',
 *   ignoreAttributes: false,
 *   removeAttributesOnRender: false,
 * };
 *
 * const i18n = new Vay([...dictionaries], createdConfig || config);
 *
 * ```
 */

export class Vay<T extends Dictionary<Record<string, Phrase>>> {
    private _targetAttribute!: string;

    private _ignoreAttributes!: boolean;
    private _removeAttributesOnRender!: boolean;
    private _quiet!: boolean;

    private _dicts!: T[];

    private _currentLanguage: ISO639Code;

    constructor(dicts: T[], init: VayConfig, initialLanguage?: ISO639Code) {
        Object.assign(
            this,
            Object.fromEntries(
                Object.entries(init).map(([key, value]) => {
                    return [`_${key}`, value];
                })
            )
        );
        this._dicts = dicts.map((dict) => {
            return {
                ...dict,
                // parse all locales to lowercase to ensure exact matching
                locale: dict.locale.toLocaleLowerCase(),
            };
        });

        this._currentLanguage = this._inferInitialLanguage(initialLanguage);
    }

    private _inferInitialLanguage(initialLanguageCode: ISO639Code | undefined): ISO639Code {
        const dictionaryLanguageCodes = this._dicts.map(({ locale }) => locale);

        if (initialLanguageCode && dictionaryLanguageCodes.includes(initialLanguageCode)) {
            return initialLanguageCode;
        }

        const [defaultLanguage, ...rest] = this._getBrowserDefaultLanguages();

        if (dictionaryLanguageCodes.includes(defaultLanguage)) {
            return defaultLanguage;
        }

        const intersectionMatch = rest.filter((code) => dictionaryLanguageCodes.includes(code))[0];

        if (intersectionMatch) {
            return intersectionMatch;
        }

        return dictionaryLanguageCodes[0];
    }

    private _getBrowserDefaultLanguages(): ISO639Code[] {
        if (!window || (window && !window.navigator)) {
            return [];
        }

        return [
            ...new Set(
                window.navigator.languages.map((language) => {
                    return language.split('-')[0].toLocaleLowerCase() as ISO639Code;
                })
            ),
        ];
    }

    private _report(msg: VayError, interpolate: Record<string, string> = {}) {
        if (this._quiet) return;

        const interpolatedString = interpolateString(msg, interpolate);
        console.warn(`[Vay.js]: ${interpolatedString}`);
    }

    /**
     * @description
     * Method to set the current language. After the language has been set,
     * a custom `languageHasChanged` event is dispatched from the `window`, as
     * long as the library is used in a browser context.
     *
     * @param { ISO639Code } code - A valid, two letter ISO639 country code.
     */

    setLanguage(code: ISO639Code): void {
        const dictionaryLanguageCodes = this._dicts.map(({ locale }) => locale);

        if (dictionaryLanguageCodes.includes(code)) {
            this._currentLanguage = code;

            if (window && window.dispatchEvent) {
                window.dispatchEvent(
                    new CustomEvent('languageHasChanged', {
                        detail: {
                            localeCode: this._currentLanguage,
                        },
                    })
                );
            }
        }
    }

    /**
     * @description
     * Method to retrieve the language currently used to select the translation dictionary
     *
     * @returns { ISO639Code } the ISO639 language code that is currently used to select
     * the translation dictionary
     */

    getLanguage(): ISO639Code {
        return this._currentLanguage;
    }

    /**
     * @description
     * This method translates the specified token using the current or specified language.
     * If no translation is found, the original token is returned. Optionally, additional data
     * can be interpolated into the translated string using the `tData` parameter.
     *
     * When using TypeScript, the token will be strongly typed and only existing keys can be supplied.
     *
     * @param { K } token - The token to translate
     * @param { TranslationData } [tData] - Additional optional data for translation interpolation
     * @param { ISO639Code } [language] - An optional ISO639 language code to use for translation, that
     * replaces the one set on the `Vay` instance
     *
     * @returns { string } The translated string or the original token if no translation was found
     *
     * ---
     * @example
     * ```ts
     * // Given a dictionary with the following structure:
     * const en = {
     *   title: 'Hello, {name}!',
     *   greeting: {
     *     morning: 'Good morning, {name}!',
     *   },
     *   numerical: {
     *     1: 'We need one table',
     *     2: 'We need multiple tables', 
     *   }
     * }

     * // You can translate a simple string token with no interpolation like this:
     * const i18n = new Vay([en], <config>);
     * i18n.translate('title'); // Returns 'Hello, {name}!'
     *
     * // To translate a token with interpolation data, pass an object as the `tData` parameter:
     * i18n.translate('title', { name: 'John' } ); // Returns 'Hello, John!'
     *
     * // To translate a nested phrase, use a dot notation string as the token:
     * i18n.translate('greeting.morning', { name: 'Jane' } ); // Returns 'Good morning, Jane!'
     * 
     * // Using the `count` property when passing interpolation data, plural forms can be chosen: 
     * i18n.translate('numerical', { count: 1 }) // Return 'We need one table'
     * 
     * // If no exact numerical match is found, the lower bound is used:
     * i18n.translate('numerical', { count: 4 }) // Return 'We need multiple tables'
     * ```
     */

    translate<K extends PropertyPath<T['phrases']>>(token: K, tData?: TranslationData, language?: ISO639Code): string {
        const exitWithError = (error: VayError) => {
            this._report(error, { token });
            return token;
        };
        const dict = this._dicts.find(({ locale }) => locale === (language || this._currentLanguage));

        if (!dict) {
            return exitWithError(VayError.NO_DICT);
        }

        const { phrases } = dict;
        const { count, ...data } = tData || {};

        // Attempt to match the phrase by following the property path.
        // If no phrase is found, dispatch an error and return the token.

        const phrase = token.split('.').reduce((entry: any, token: string) => entry[token], phrases);

        if (phrase === undefined || phrase === null) {
            return exitWithError(VayError.NO_PHRASE);
        }

        if (typeof phrase === 'string') {
            return interpolateString(phrase, data);
        }

        // If the phrase is an object, all keys should be numerical.
        // If this is not the case, the dictionary is malformed or the token is
        // incorrect.

        const closestIndex = Object.keys(phrase)
            .filter((key) => +key <= getCount(count as number | undefined))
            .pop();

        if (Object.keys(phrase).some((key) => isNaN(+key)) || closestIndex === undefined) {
            return exitWithError(VayError.MALFORMED_PHRASE);
        }

        if (typeof phrase[closestIndex] === 'string') {
            return interpolateString(phrase[closestIndex], data);
        }

        // if no phrase can be matched to the token, return the token
        return token;
    }

    private _processToken(element: Element): void {
        const token = element.getAttribute(this._targetAttribute) as any;
        const translated = this.translate(token);

        // if no translation was found, return early to indicate
        // the translation failed. No further processing should take place
        if (translated === token) {
            return;
        }

        const method = element.hasAttribute(`${this._targetAttribute}-html`) ? 'innerHTML' : 'textContent';
        element[method] = translated;
    }

    private _processAttributes(element: Element): void {
        if (this._ignoreAttributes) return;

        const attributeSet = [...new Set(element.getAttributeNames())].filter(
            (attributeName) =>
                attributeName.startsWith(this._targetAttribute) && !(attributeName === `${this._targetAttribute}-html`)
        );

        attributeSet.forEach((attribute) => {
            const [, attributeName] = attribute.split(`-`);

            element.setAttribute(attributeName, this.translate(element.getAttribute(attribute) as any));
        });

        if (this._removeAttributesOnRender) {
            attributeSet.forEach((attribute) => {
                element.removeAttribute(attribute);
            });
        }
    }

    /**
     * Renders translations for all elements with a target attribute matching the `targetAttribute` value.
     * If no targetElement is specified, console warnings will be emitted and the render will not occur.
     *
     * @param {HTMLElement} targetElement - The root element to start rendering from
     *
     * ---
     * @example
     *
     * ```ts
     * const i18n = new Vay(<...configuration>)
     *
     * window.addEventListener('DOMContentLoaded', () => {
     *      i18n.render(document.documentElement);
     * })
     *
     * ```
     */

    render(targetElement: HTMLElement): void {
        if (!targetElement) {
            this._report(VayError.MISSING_RENDER_TARGET);
            return;
        }

        // Get all elements with a attribute matching the supplied targetAttribute
        // Iterate them to set the static translations
        const markedElements = [...targetElement.querySelectorAll(`[${this._targetAttribute}]`)];
        markedElements.map((element) => {
            this._processToken(element);
            this._processAttributes(element);
        });
    }

    /**
     * @description
     * Creates a new translator function bound to the current Vay instance. The returned function
     * can be used to translate tokens outside of the Vay instance.
     *
     * @returns {(token: PropertyPath<T['phrases']>, tData?: TranslationData, language?: ISO639Code) => string} A translator function
     */

    createTranslator(): (token: PropertyPath<T['phrases']>, tData?: TranslationData, language?: ISO639Code) => string {
        return this.translate.bind(this);
    }
}
