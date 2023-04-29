/** @format */

import { Dictionary, VayConfig, ISO639Code, PropertyPath, TranslationData, Phrase } from '../types';
import { getCount, interpolateString } from '../utils';
import { VayError } from './VayError';

export class Vay<T extends Dictionary<Record<string, Phrase>>> {
    private _targetAttribute!: string;
    private _targetElement!: Element;
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

    setLanguage(code: ISO639Code): void {
        const dictionaryLanguageCodes = this._dicts.map(({ locale }) => locale);

        if (dictionaryLanguageCodes.includes(code)) {
            this._currentLanguage = code;

            window.dispatchEvent(
                new CustomEvent('languageHasChanged', {
                    detail: {
                        localeCode: this._currentLanguage,
                    },
                })
            );
        }
    }

    getLanguage(): ISO639Code {
        return this._currentLanguage;
    }

    translate<K extends PropertyPath<T['phrases']>>(token: K, tData?: TranslationData, language?: ISO639Code) {
        const exitWithError = (error: VayError) => {
            this._report(error, { token });
            return token;
        };
        const dict = this._dicts.find(({ locale }) => locale === language || this._currentLanguage);

        if (!dict) {
            return exitWithError(VayError.NO_DICT);
        }

        const { phrases } = dict;
        const { count, ...data } = tData || {};

        // Attempt to match the phrase by following the property path.
        // If no phrase is found, dispatch an error and return the token.

        const phrase = token.split('.').reduce((entry: any, token: string) => entry[token], phrases);

        if (!phrase) {
            return exitWithError(VayError.NO_PHRASE);
        }

        if (typeof phrase === 'string') {
            return interpolateString(phrase, data);
        }

        // If the phrase is an object, all keys should be numerical.
        // If this is not the case, the dictionary is malformed or the token is
        // incorrect.

        const closestIndex = Object.keys(phrase)
            .filter((key) => +key <= getCount(count))
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
