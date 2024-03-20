/** @format */

import { ISO639Code, Phrase, VayProvider } from '@vayjs/vay';

export type VayContext<T extends Record<string, Phrase>> = {
    translate: VayProvider<T>['translate'];
    language: ISO639Code;
    setLanguage: (locale: ISO639Code) => void;
};
