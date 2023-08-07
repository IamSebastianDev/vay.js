/** @format */

export enum VayError {
    NO_DICT = 'No dictionary found.',
    NO_PHRASE = 'No phrase could be matched to token [{{token}}].',
    MALFORMED_PHRASE = 'The token [{{token}}] is not a valid Phrase containing only numeric keys to evaluate for plural forms.',
    MISSING_RENDER_TARGET = 'The target supplied to the `render` function is not a valid Element.',
}
