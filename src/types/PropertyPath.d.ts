/** @format */

import { Phrase } from './Phrase';

export type PropertyPath<T, K extends keyof T = keyof T> = K extends string
    ? T[k] extends Record<string, Record<number, string>>
        ? K
        : T[K] extends Record<string, Phrase>
        ? `${K}.${PropertyPath<T[K]>}`
        : K
    : never;
