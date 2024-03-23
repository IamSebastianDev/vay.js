/** @format */

import { Phrase } from '@vayjs/vay';
import { VayContext } from '../types/vay-context';
import { useContext } from 'react';

export const useLanguageContext =
    <Dict extends Record<string, Phrase>>(vayCtx: React.Context<VayContext<Dict> | null>) =>
    () => {
        const ctx = useContext(vayCtx);
        if (ctx) return ctx;
        throw new Error(`[Vay-React]: 'useLanguageContext' can only be used inside a Vay Context Provider`);
    };
