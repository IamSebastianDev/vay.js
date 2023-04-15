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

}
