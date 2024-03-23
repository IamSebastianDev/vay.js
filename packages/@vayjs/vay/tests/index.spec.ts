/** @format */

import anyTest, { TestFn } from 'ava';
import { createProvider, defineConfig, defineDictionary } from '../src';
import { VayProvider } from '../src/types/vay-provider';

const config = defineConfig({ defaultLocale: 'en' });
const en = defineDictionary('en', {
    title: 'Title',
    nested: {
        key: 'Nested Key',
    },
    numerical: {
        0: 'Matched 0',
        1: 'Matched 1',
        5: 'Matched 5',
        10: 'Matched 10',
    },
    context: (ctx: boolean) => (ctx ? 'Test True' : 'Test False'),
});

const test = anyTest as TestFn<{ i18n: VayProvider<(typeof en)['phrases']> }>;

test.beforeEach((t) => {
    const i18n = createProvider(config, en);

    t.context.i18n = i18n;
});

test(`Ensure that 'provider.translate' is a function.`, (test) => {
    const { i18n } = test.context;
    const t = i18n.translate;

    test.is(typeof t, 'function');
    test.assert(t);
});

test(`Ensure that 'provider.translate' correctly translates a token to a textual phrase.`, (test) => {
    const { i18n } = test.context;
    const t = i18n.translate;

    test.is(t('title'), 'Title');
});

test(`Ensure that 'provider.translate' correctly translates a nested token to a textual phrase.`, (test) => {
    const { i18n } = test.context;
    const t = i18n.translate;

    test.is(t('nested.key'), 'Nested Key');
});

test(`Ensure that 'provider.translate' correctly translates a token to a numerical phrase.`, (test) => {
    const { i18n } = test.context;
    const t = i18n.translate;

    test.is(t('numerical.[...]', { count: 0 }), 'Matched 0');
    test.is(t('numerical.[...]', { count: 1 }), 'Matched 1');
    test.is(t('numerical.[...]', { count: 5 }), 'Matched 5');
    test.is(t('numerical.[...]', { count: 7.5 }), 'Matched 5');
    test.is(t('numerical.[...]', { count: 10 }), 'Matched 10');
    test.is(t('numerical.[...]', { count: 100 }), 'Matched 10');
});

test(`Ensure that 'provider.translate' correctly translates a token to a contextual phrase.`, (test) => {
    const { i18n } = test.context;
    const t = i18n.translate;

    test.is(t('(context)', { ctx: true }), 'Test True');
    test.is(t('(context)', { ctx: false }), 'Test False');
});

test(`Ensure that 'provider.translate' return the token if no match could be found`, (test) => {
    const { i18n } = test.context;
    const t = i18n.translate;

    /// @ts-expect-error
    test.is(t('does.not.exist'), 'does.not.exist');
});
