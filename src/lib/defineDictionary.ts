/** @format */

import { Dictionary, ISO639Code, Phrase } from '../types';

export const defineDictionary = <T extends Record<string, Phrase>>(locale: ISO639Code, phrases: T): Dictionary<T> => ({
    locale,
    phrases,
});
