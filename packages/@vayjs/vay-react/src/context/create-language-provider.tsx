/** @format */

import { Phrase, VayProvider } from '@vayjs/vay';
import React, { ReactNode, createContext, useCallback, useMemo } from 'react';
import { VayContext } from '../types/vay-context';
import { VaySolution } from '../types/vay-solution';
import { useLanguageContext } from '../hooks/use-language-context';
import { useLanguage } from '../hooks/use-language';

export const createLanguageProvider = <Dict extends Record<string, Phrase>>(
    provider: VayProvider<Dict>,
): VaySolution<Dict> => {
    const Ctx = createContext<VayContext<Dict> | null>(null);

    const ctxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
        const [language, setLanguage] = useLanguage(provider);
        const translate = useCallback(provider.translate, [language]);

        const value = useMemo(
            () => ({
                translate,
                language,
                setLanguage,
            }),
            [translate, language, setLanguage],
        );

        return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
    };

    return [ctxProvider, useLanguageContext(Ctx)] as const;
};
