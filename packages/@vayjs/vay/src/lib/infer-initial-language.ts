/** @format */

import { ISO639Code } from '../types/iso-639-code';
import { Phrase } from '../types/phrase';
import { getExecutionContext } from '../utils/get-execution-environment';

export const inferInitialLanguage = (dicts: Map<ISO639Code, Record<string, Phrase>>): ISO639Code => {
    if (getExecutionContext()) {
        const [defaultLanguage, ...languages] = [
            ...new Set(
                window.navigator.languages.map((language) => {
                    return language.split('-')[0].toLocaleLowerCase() as ISO639Code;
                }),
            ),
        ];

        if (dicts.has(defaultLanguage)) {
            return defaultLanguage;
        }

        // get the first intersection between dictionary languages
        // and the found browser languages
        const [matched] = languages.filter((lang) => [...dicts.keys()].map((locale) => lang.includes(locale)));
        return matched ?? 'en';
    }

    return dicts.size ? [...dicts.keys()][0] : 'en';
};
