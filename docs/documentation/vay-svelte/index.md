---
outline: deep
next: false
prev: false
---

<!-- @format -->

# Vay & Svelte

[**@vayjs/vay-svelte**](https://npmjs.com/package/@vayjs/vay-svelte) stands as the specialized conduit between **Vay** and the [Svelte](https://svelte.dev) framework, bringing together the sophisticated internationalization features of Vay.js with Svelte's reactive component model. This guide is designed to be your all-encompassing reference for embedding efficient, type-safe internationalization solutions into your Svelte projects, thereby broadening your application's global appeal with ease.

::: info
The `@vayjs/vay-svelte` package is deprecated for all versions beginning from Svelte 5. Read about how to integrate Vay with Svelte 5 [here](#svelte-5)
:::

::: info
For more details about the package, visit it on [npm](https://npmjs.com/package/@vayjs/vay-svelte).
:::

## Features

- **Svelte Stores**: Harness Svelte stores to reactively manage translations and language states across your components.
- **Reactive Language Switching**: Seamlessly transition your application's current language using Svelte's reactivity, ensuring updates are reflected across your UI instantaneously.
- **TypeScript Integration**: Embrace TypeScript for its type safety benefits, guaranteeing the usage of defined translation keys and enhancing developer experience with IDE autocompletion.

## Installation

Begin by installing both @vayjs/vay and @vayjs/vay-svelte in your project:

::: code-group

```sh [yarn]
# Install via yarn add
$ yarn add @vayjs/vay @vayjs/vay-svelte
```

```sh [npm]
# Install via npm install
$ npm install @vayjs/vay @vayjs/vay-svelte
```

```sh [pnpm]
# Install via pnpm add
$ pnpm add @vayjs/vay @vayjs/vay-svelte
```

```sh [bun ]
# Install using bun add
$ bun add @vayjs/vay @vayjs/vay-svelte
```

:::

These packages equip you with the essential tools needed to facilitate translation and language context management within Svelte.

## Setup

Before weaving `@vayjs/vay-svelte` into your Svelte application, create a `VayProvider` instance from `@vayjs/vay`:

```ts
import { defineConfig, defineDictionary, createProvider } from '@vayjs/vay';

export const i18nProvider = createProvider(
    // Define your config and dictionaries
    defineConfig(),
    defineDictionary('en', { welcome: 'Welcome!' }),
);
```

## Integrating with Svelte

Utilize the `translatable` function from `@vayjs/vay-svelte` to integrate Vay's provider seamlessly into your Svelte application:

```ts
import { i18nProvider } from './i18nProvider';
import { translatable } from '@vayjs/vay-svelte';

// Set up translatable to interact with Svelte's reactivity
export const { language, setLanguage, translate } = translatable(i18nProvider);
```

## Reactive Language and Translations

Incorporate the reactive `language` store and `translate` function within your Svelte components to manage and display translations:

```html
<script>
    import { language, setLanguage, translate: t } from './i18nSetup';
</script>

<p>{$language}</p>
<p>{$t('welcome')}</p>
<button on:click="{()>setLanguage('es')}">ES</button>
```

::: tip
Similar to its usage in Vay, the `translate` function within `@vayjs/vay-svelte` supports interpolation, pluralization, and contextual translations. Discover more about how to [interpolate](../docs/06.interpolation.md), [pluralize](../docs/07.pluralization.md) and [contextualize](../docs/08.context.md) in the **Vay** [documentation](../docs/05.translating.md).
:::

## Svelte 5

One of the core mechanics of the `@vayjs/vay-svelte` package was a custom store. As of Svelte 5, stores are deprecated. However, Runes allow for an even easier integration of **Vay** into your Svelte application.

```ts
import type { ISO639Code } from '@vayjs/vay';
import { provider } from './i18n.provider';

// We track the language in a separate state rune,
// so that our translate function can derive from
// that rune.
let _language$ = $state(provider.getLanguage());

// Functions to set and get the language are exposed
// and act as getter and setter, enabling us to
// update and set the language as well as read the
// language accordingly
export const getLanguage = () => _language$;
export const setLanguage = (code: ISO639Code) => {
    provider.setLanguage(code);
    _language$ = code;
};

// We derive the translate function by providing a
// integration with the previously created language
// rune, that will rerun the function when the locale
// changes (or any of the provided data.) This allows
// for reactive changes inside the translation function
export const translate = (...[token, data, locale = undefined]: Parameters<typeof provider.translate>) => {
    return provider.translate(token, data, locale ?? _language$);
};
```
