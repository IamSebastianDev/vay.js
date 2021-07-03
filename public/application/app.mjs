/** @format */

/*

    Create a new instance of Vay and provide it with the imported dictionary

*/

import en from './service/dictionary.en.mjs';

import { Vay } from '../vay.js';

const i18n = new Vay({
	dictionaries: { en },
});

i18n.render();

console.log(i18n);
