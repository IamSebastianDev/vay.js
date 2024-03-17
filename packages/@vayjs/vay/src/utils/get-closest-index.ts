/** @format */

/**
 * Utility function to find the closest index in a range of keys matched to a given index.
 */
export const getClosestIndex = (keys: string[], index: number) => keys.filter((key) => +key <= index).at(-1) ?? 0;
