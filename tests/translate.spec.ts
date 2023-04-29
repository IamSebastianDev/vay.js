/** @format */

import anyTest, { TestFn } from 'ava';
import { Vay, defineConfig, defineDictionary } from '../src';

const config = defineConfig();
const en = defineDictionary('en', {
    title: 'Title',
});

const test = anyTest as TestFn<{ i18n: Vay<typeof en> }>;

test.before((t) => {
    const i18n = new Vay([en], config, 'en');

    t.context.i18n = i18n;
});

test('Creates a Translator function bound to the correct context', (t) => {
    const { i18n } = t.context;
    const tr = i18n.createTranslator();

    t.is(typeof tr, 'function');
    t.assert(tr);
});

test('Translates a phrase correctly', (t) => {
    const { i18n } = t.context;
    const tr = i18n.createTranslator();

    t.is(tr('title'), 'Title');
});
