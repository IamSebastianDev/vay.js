/** @format */

import { Phrase } from './phrase';
import { VayProvider } from './vay-provider';

export type VayStaticProvider<Dict extends Record<string, Phrase>> = {
    provider: VayProvider<Dict>;
    render: (anchor: HTMLElement) => void;
};
