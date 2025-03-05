---
outline: deep
next: false
prev: false
---

<!-- @format -->

# Vay & Nørd JS

[**@vayjs/vay-nord**](https://npmjs.com/package/@vayjs/vay-nord) represents the tailor-made bridge between Vay and the Nørd framework, uniting Vay.js's advanced internationalization features with [@grainular/nord](https://nordjs.dev)'s reactive programming model. This guide aims to be a comprehensive resource for integrating robust, type-safe internationalization solutions into your Nørd projects, effortlessly expanding your application's global accessibility.

::: info
Find out more about the package on [npm](https://npmjs.com/package/@vayjs/vay-nord).
:::

## Features

- **Reactive Grains for i18n**: Leverage Nørd's grains to manage translations and language states reactively within your components.
- **Reactive Language Switching**: Fluidly change your application's language setting using Nørd's reactivity, with automatic updates across the UI for any language switch.
- **TypeScript Support**: Utilize TypeScript to ensure type safety for your translation keys, enhancing the development experience with reliable autocompletion in IDEs.

## Installation

tart by adding both `@vayjs/vay` and `@vayjs/vay-nord` to your Nørd project:

::: code-group

```sh [yarn]
# Install via yarn add
$ yarn add @vayjs/vay @vayjs/vay-nord
```

```sh [npm]
# Install via npm install
$ npm install @vayjs/vay @vayjs/vay-nord
```

```sh [pnpm]
# Install via pnpm add
$ pnpm add @vayjs/vay @vayjs/vay-nord
```

```sh [bun ]
# Install using bun add
$ bun add @vayjs/vay @vayjs/vay-nord
```

:::

These packages provide the necessary tools for embedding translation and language context management capabilities within your Nørd applications.

## Setup

Prior to incorporating `@vayjs/vay-nord` into your Nørd application, configure a `VayProvider` instance from `@vayjs/vay`:

```ts
import { defineConfig, defineDictionary, createProvider } from '@vayjs/vay';

// Initialize the Vay.js provider with configuration and dictionaries
export const i18nProvider = createProvider(
    defineConfig(), // Default configuration
    defineDictionary('en', { greeting: 'Hello, World!' }), // English dictionary
    // ...more dictionaries
);
```

## Integrating with Nørd

Use the `localized` function from `@vayjs/vay-nord` to seamlessly integrate Vay's provider into your Nørd app:

```ts
import { i18nProvider } from './i18nProvider';
import { localized } from '@vayjs/vay-nord';

// Enable reactive internationalization in your Nørd JS application
export const { language, setLanguage, translate } = localized(i18nProvider);
```

## Reactive Language and Translations

Employ the reactive `language` grain and `translate` function in your Nørd components for dynamic translation management:

```ts
import { createComponent, on } from '@grainular/nord';
import { translate as t, setLanguage } from 'i18nProvider';

const App = createComponent((html) => {
    return html`<div>${t('greeting', { name: 'World' })}</div>
        <button ${on('click', () => setLanguage('en'))}>En</button>
        <button ${on('click', () => setLanguage('es'))}>Es</button>`;
});
```

::: tip
The `translate` function provided mirrors Vay's own, supporting advanced features like interpolation, pluralization, and contextual translations. Discover more about how to [interpolate](../docs/06.interpolation.md), [pluralize](../docs/07.pluralization.md) and [contextualize](../docs/08.context.md) in the **Vay** [documentation](../docs/05.translating.md).
:::
