/** @format */

/*

    Create a new instance of Vay and provide it with the imported dictionary

*/

import de from './service/dictionary.de.mjs';
import en from './service/dictionary.de.mjs';

import { Vay } from '../vay.js';

const i18n = new Vay({
	dictionaries: { de, en },
	config: { defaultLanguage: 'de' },
});

console.log(i18n);

i18n.currentLanguage = 'de';
