/** @format */

import { Phrase, VayProvider, ISO639Code } from '@vayjs/vay';
import { useState, useCallback } from 'react';

export const useLanguage = <Dict extends Record<string, Phrase>>(provider: VayProvider<Dict>) => {
    const [language, _setLanguage] = useState(provider.getLanguage());

    const setLanguage = useCallback(
        (locale: ISO639Code) => {
            provider.setLanguage(locale);
            _setLanguage(locale);
        },
        [language],
    );

    return [language, setLanguage] as const;
};
