---
outline: deep
next: false
prev: false
---

<!-- @format -->

# Vay & React

[**@vayjs/vay-react**](https://npmjs.com/package/@vayjs/vay-react) serves as the definitive bridge between **Vay** and the [React](https://react.dev) ecosystem, facilitating a seamless blend of advanced internationalization features with React's dynamic UI capabilities. This guide is your comprehensive resource for incorporating efficient, type-safe i18n solutions into your React projects, enhancing global reach with minimal effort.

::: info
You can find the package and additional information [here](https://npmjs.com/package/@vayjs/vay-react).
:::

## Features

- **React Hooks**: Use custom hooks like useLanguage to manage translations and language state within your components.
- **Dynamic Language Switching**: Easily change the application's current language with setLanguage, triggering automatic re-renders of translated content.
- **Type Safety**: Leverage TypeScript for type-safe translations, ensuring that only defined translation keys are used and autocomplete suggestions are provided in supported IDEs.

## Installation

Start by installing both `@vayjs/vay` and `@vayjs/vay-react` packages in your project:

::: code-group

```sh [yarn]
# Install via yarn add
$ yarn add @vayjs/vay @vayjs/vay-react
```

```sh [npm]
# Install via npm install
$ npm install @vayjs/vay @vayjs/vay-react
```

```sh [pnpm]
# Install via pnpm add
$ pnpm add @vayjs/vay @vayjs/vay-react
```

```sh [bun ]
# Install using bun add
$ bun add @vayjs/vay @vayjs/vay-react
```

:::

These packages provide the core functionalities needed to manage translations and language contexts within React.

## Setup

Before integrating `@vayjs/vay-react` into your application, you'll need to set up a `VayProvider` instance from `@vayjs/vay`.

```ts
import { defineConfig, defineDictionary, createProvider } from '@vayjs/vay';

// Create the Vay.js provider with a default configuration and your dictionary
const i18nProvider = createProvider(
    // define the config and a dictionary
    defineConfig(),
    defineDictionary('en', {
        welcome: 'Welcome!',
    }),
);
```

## Integrating with React

`@vayjs/vay-react` offers a simple way to integrate the Vay.js provider into your React application using the `createLanguageProvider` function.

```ts
import { i18nProvider } from './i18n.provider';
import { createLanguageProvider } from '@vayjs/vay-react';

// Create the React language provider and hook
export const { LanguageProvider, useLanguage } = createLanguageProvider(i18nProvider);
```

### Using the Language Provider

Wrap your application or a specific component tree with the `LanguageProvider` to make translation functionalities accessible:

```tsx
function App() {
    return (
        <LanguageProvider>
            <MainComponent />
        </LanguageProvider>
    );
}
```

### Translating Content

Utilize the `useLanguage` hook within your components to access translation functions, current language, and the ability to switch languages:

```tsx
function Greeting() {
    const { translate: t, setLanguage } = useLanguage();

    return (
        <div>
            <p>{t('welcome')}</p>
            <button onClick={() => setLanguage('es')}>ES</button>
        </div>
    );
}
```

::: tip
The `translate` function exposed by the `useLanguage` hook works the same way as the `translate` function of **Vay**. Read more about how to [interpolate](../docs/06.interpolation.md), [pluralize](../docs/07.pluralization.md) and [contextualize](../docs/08.context.md) in the **Vay** [documentation](../docs/05.translating.md).
:::
