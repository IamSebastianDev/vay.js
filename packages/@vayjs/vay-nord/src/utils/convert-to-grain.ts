/** @format */

import { ReadonlyGrain, grain, readonly } from '@grainular/nord';

export const convertToGrain = (maybeGrain: ReadonlyGrain<any> | unknown) => {
    return typeof maybeGrain === 'object' && maybeGrain !== null && 'subscribe' in maybeGrain
        ? (maybeGrain as ReadonlyGrain<any>)
        : readonly(grain(maybeGrain));
};
