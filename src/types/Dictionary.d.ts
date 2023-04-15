/** @format */

import { ISO639Code } from './ISO639Code';
import { Phrase } from './Phrase';

export type Dictionary<T> = {
    locale: ISO639Code;
    phrases: T;
};
