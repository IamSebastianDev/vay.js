/** @format */

export type ContextPhrase = (ctx: any) => string;

export type Phrase =
    | string
    | ContextPhrase
    | ({
          [key: string]: Phrase;
      } & {
          [key: number]: string;
      });
