/** @format */

/**
 *  Utility method to set the default count of the count property if no value is passed.
 *
 * @param { number | undefined } value - the numerical value provided to the method. The value is strongly compared as 0 is a
 * valid value and not a falsy.
 * @returns { number } the inferred nullish/singular/plural index
 */

export const getCount = (value: number | undefined): number => (value === 0 ? 0 : value || 1);
