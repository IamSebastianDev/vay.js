/** @format */

import { Phrase } from '@vayjs/vay';
import { ReactNode } from 'react';
import { VayContext } from './vay-context';

export type VaySolution<Dict extends Record<string, Phrase>> = [
    VayProvider: React.FC<{ children: ReactNode }>,
    useLanguageContext: () => VayContext<Dict>,
];
