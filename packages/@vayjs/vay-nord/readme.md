<!-- @format -->

<p align="center">
    <img src="https://repository-images.githubusercontent.com/381157985/05895345-3bd0-4776-adf9-a74602953480" alt="logo"/>
</p>

# @vayjs/vay-nord

A [@grainular/nord](https://nordjs.dev) specific extension of Vay.js, offering a lightweight, strongly typed, and modern solution for seamlessly integrating Vay.js's internationalization (i18n) capabilities into your Nørd projects. It introduces reactive grains for managing language contexts and dynamic translations directly within Nørd components.

## Features

- **Nørd Integration**: Tailored specifically for Nørd JS, this extension enables straightforward integration of i18n support with minimal boilerplate.
- **Reactive Language Management**: Utilize Nørd JS's grains to reactively manage languages and translations, ensuring your UI automatically updates with language changes.
- **Type Safety and Developer Experience**: Benefit from TypeScript's type safety and enhanced developer experience with IntelliSense and autocomplete suggestions for translation tokens.

## Installing

To integrate `@vayjs/vay-nord` into your Nørd project, install it via yarn or npm, along with `@vayjs/vay` if not already included in your project:

```sh
yarn add @vayjs/vay @vayjs/vay-nord
# or use npm
npm install @vayjs/vay @vayjs/vay-nord

```

## Getting Started

Incorporating `@vayjs/vay-nord` into your Nørd application is a streamlined process. Start by configuring a `VayProvider` instance from `@vayjs/vay`, and then utilize the `localized` function from `@vayjs/vay-nord` to enable internationalization in your app.

```ts
// Import Vay.js and Vay Nørd integration utilities
import { defineConfig, defineDictionary, createProvider } from '@vayjs/vay';
import { localized } from '@vayjs/vay-nord';

const i18nProvider = createProvider(
    // Configure the provider and add dictionaries
    defineConfig(),
    defineDictionary('en', { greeting: 'Hello, World!' }),
);

// Initialize localized utilities for Nørd JS
export const { language, setLanguage, translate } = localized(i18nProvider);
```

## Integrating with Your Nørd Application

Leverage the provided reactive grains in your Nørd components to manage and display translations:

```ts
import { createComponent, on } from '@grainular/nord';
import { translate as t, setLanguage } from 'i18n.provider';

const App = createComponent((html) => {
    return html`<div>${t('greeting', { name: 'World' })}</div>
        <button ${on('click', () => setLanguage('en'))}>En</button>
        <button ${on('click', () => setLanguage('es'))}>Es</button> `;
});
```

## License

**@vayjs/vay-nord** is licensed under the MIT License
