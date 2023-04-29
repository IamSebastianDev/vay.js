/** @format */

import anyTest, { TestFn } from 'ava';
import { Vay, defineConfig, defineDictionary } from '../src';
import { JSDOM, DOMWindow } from 'jsdom';

const config = defineConfig();
const en = defineDictionary('en', {
    title: 'Title',
});

const test = anyTest as TestFn<{ i18n: Vay<typeof en>; window: DOMWindow }>;

test.before((t) => {
    const { window } = new JSDOM();
    const i18n = new Vay([en], config, 'en');

    t.context.i18n = i18n;
    t.context.window = window;
});

test('Vay instances correctly', (t) => {
    const { i18n } = t.context;
    t.assert(i18n);
});
