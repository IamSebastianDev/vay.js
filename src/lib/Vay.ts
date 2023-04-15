/** @format */

import { Dictionary, VayConfig, ISO639Code, PropertyPath, TranslationData, Phrase } from '../types';
import { getCount, interpolateString } from '../utils';
import { VayError } from './VayError';

export class Vay<T extends Dictionary<Record<string, Phrase>>> {
    #targetAttribute!: string;
    #targetElement!: Element;
    #ignoreAttributes!: boolean;
    #removeAttributesOnRender!: boolean;
    #quiet!: boolean;

    #dicts!: T[];

    #currentLanguage: ISO639Code;

    constructor(dicts: T[], init: VayConfig, initialLanguage?: ISO639Code) {
        Object.assign(
            this,
            Object.fromEntries(
                Object.entries(init).map(([key, value]) => {
                    return [`#${key}`, value];
                })
            )
        );

        this.#dicts = dicts.map((dict) => {
            return {
                ...dict,
                // parse all locales to lowercase to ensure exact matching
                locale: dict.locale.toLocaleLowerCase(),
            };
        });

        this.#currentLanguage = this.#inferInitialLanguage(initialLanguage);
    }

    #inferInitialLanguage(initialLanguageCode: ISO639Code | undefined): ISO639Code {
        const dictionaryLanguageCodes = this.#dicts.map(({ locale }) => locale);

        if (initialLanguageCode && dictionaryLanguageCodes.includes(initialLanguageCode)) {
            return initialLanguageCode;
        }

        const [defaultLanguage, ...rest] = this.#getBrowserDefaultLanguages();

        if (dictionaryLanguageCodes.includes(defaultLanguage)) {
            return defaultLanguage;
        }

        const intersectionMatch = rest.filter((code) => dictionaryLanguageCodes.includes(code))[0];

        if (intersectionMatch) {
            return intersectionMatch;
        }

        return dictionaryLanguageCodes[0];
    }

    #getBrowserDefaultLanguages(): ISO639Code[] {
        return [
            ...new Set(
                window.navigator.languages.map((language) => {
                    return language.split('-')[0].toLocaleLowerCase() as ISO639Code;
                })
            ),
        ];
    }

    #report(msg: VayError, interpolate: Record<string, string> = {}) {
        if (this.#quiet) return;

        const interpolatedString = interpolateString(msg, interpolate);
        console.warn(`[Vay.js]: ${interpolatedString}`);
    }

    setLanguage(code: ISO639Code): void {
        const dictionaryLanguageCodes = this.#dicts.map(({ locale }) => locale);

        if (dictionaryLanguageCodes.includes(code)) {
            this.#currentLanguage = code;

            window.dispatchEvent(
                new CustomEvent('languageHasChanged', {
                    detail: {
                        localeCode: this.#currentLanguage,
                    },
                })
            );
        }
    }

    getLanguage(): ISO639Code {
        return this.#currentLanguage;
    }

    translate<K extends PropertyPath<T['phrases']>>(token: K, tData?: TranslationData, language?: ISO639Code) {
        const exitWithError = (error: VayError) => {
            this.#report(error, { token });
            return token;
        };
        const dict = this.#dicts.find(({ locale }) => locale === language || this.#currentLanguage);

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
}
