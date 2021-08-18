/** @format */

/*

    Import Vay and the dictionaries

*/

import { Vay } from '../vay.min.js';

import de from './service/dictionary.de.mjs';
import en from './service/dictionary.en.mjs';

/*

    Create the dictionaries object

*/

const dictionaries = { de, en };

/*

    Create a new instance of Vay and supply it with the dictionaries. No config is supplied, as the default config should serve fine.

*/

const i18n = new Vay({ dictionaries });

i18n.render();
