/** @format */

import { TData } from '../types/translator';

export const interpolateString = (string: string, data: TData = {}) =>
    string.replaceAll(/{{[^{]*}}/gim, (r) => `${data[r.substring(2, r.length - 2)]}`);
