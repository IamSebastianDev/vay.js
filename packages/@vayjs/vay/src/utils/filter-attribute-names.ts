/** @format */

/**
 * Utility function to filter attribute names used in
 * the static translation provider
 */

export const filterAttributeNames =
    (key: string) =>
    (name: string): boolean =>
        name.startsWith(key) && !(name === `${key}-html\\`);
