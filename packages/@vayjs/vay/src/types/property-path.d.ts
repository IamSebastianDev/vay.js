/** @format */

import { ContextPhrase, Phrase } from './phrase';

/**
 * Private API
 */
export type PropertyPath<Dict, Key extends keyof Dict = keyof Dict> = Key extends string
    ? // Key is a string
      Dict[Key] extends string
        ? `${Key}`
        : Dict[Key] extends ContextPhrase // Check for context phrases
          ? `(${Key})`
          : Dict[Key] extends Record<string, Phrase>
            ? `${Key}.${PropertyPath<Dict[Key]>}`
            : never
    : // Key is a number, indicating a numerical phrase exists inside the dict
      // those are handled for plural checking and treated accordingly
      Dict extends Record<number, string>
      ? `[...]`
      : never;
