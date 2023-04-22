/** @format */

export const interpolateString = (string: string, data: Record<PropertyKey, string> = {}) =>
    string.replaceAll(/{{[^{]*}}/gim, (r) => data[r.substring(2, r.length - 2)]);
