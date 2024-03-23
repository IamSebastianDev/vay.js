/** @format */

export const capitalize = (word: string) => {
    const words = word.split('-');
    const mapped = words.flatMap((word) => [word[0].toLocaleUpperCase(), ...word.slice(1)].join(''));
    return mapped.join(' ');
};
