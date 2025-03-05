<!-- @format -->

<p align="center">
    <img src="https://repository-images.githubusercontent.com/381157985/05895345-3bd0-4776-adf9-a74602953480" alt="logo"/>
</p>

# @vayjs/vay-svelte

A Svelte-specific extension of Vay.js, offering a lightweight (additional 1kb minified), strongly typed, and modern approach to weaving Vay.js's internationalization (i18n) capabilities seamlessly into your Svelte projects. It introduces convenient Svelte stores and actions for managing language contexts, enabling interpolation, pluralization, and context management directly within Svelte components.

> Please note: The `@vayjs/vay-svelte` package is deprecated for all Svelte versions beginning from version 5. Stores are deprecated and replaced with runes. Implementing i18n using **Vay** in Svelte 5 is straightforward. A guide can be found here [(Using Vay with Svelte 5)](https://vayjs.dev/documentation/vay-svelte/#svelte-5)

## Features

- **Seamless Svelte Integration**: Designed specifically for Svelte, this extension enables you to add i18n support with minimal setup.
- **Reactive Language Management**: Leverage Svelte's reactivity to manage languages and translations dynamically within your components.
- **Type Safety and Autocompletion**: Enjoy the benefits of TypeScript for safer development and efficient coding with autocomplete suggestions.

## Installing

To integrate @vayjs/vay-svelte into your Svelte project, install it via yarn or npm, along with @vayjs/vay if it's not already part of your project:

```sh
yarn add @vayjs/vay @vayjs/vay-svelte
# or use npm
npm install @vayjs/vay @vayjs/vay-svelte
```

## Getting Started

Incorporating @vayjs/vay-svelte into your Svelte application is straightforward. Start by setting up a `VayProvider` instance from @vayjs/vay, and then use the `translatable` store from `@vayjs/vay-svelte` to facilitate internationalization in your Svelte app.

```ts
// Import Vay.js and Vay Svelte integration utilities
import { defineConfig, defineDictionary, createProvider, getBrowserDefaultLanguage } from '@vayjs/vay';
import { translatable } from '@vayjs/vay-svelte';

// Configure the Vay.js provider
const i18nProvider = createProvider(
    defineConfig({ defaultLocale: getBrowserDefaultLanguage() }),
    defineDictionary('en', { welcome: 'Welcome!' }),
);

// Utilize translatable to integrate with your Svelte app
export const { language, setLanguage, translate } = translatable(i18nProvider);
```

## Integrating with your Svelte App

Use the provided Svelte stores and actions in your components to manage translations and language settings:

```html
<script>
    import { language, setLanguage, translate: t } from './i18nSetup';
</script>

<div>
    {$t('welcome')}
    <!-- Displays 'Welcome!' -->
    <button on:click="{() => setLanguage('es')}">ES</button>
</div>
```

## License

**@vayjs/vay-svelte** is licensed under the MIT License
