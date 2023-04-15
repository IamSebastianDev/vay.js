/** @format */

export type Phrase =
    | string
    | ({
          [key: string]: Phrase;
      } & {
          [key: number]: string;
      });
