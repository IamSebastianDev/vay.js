<!-- @format -->

<p align="center">
    <img src="https://repository-images.githubusercontent.com/381157985/05895345-3bd0-4776-adf9-a74602953480" alt="logo"/>
</p>

# @vayjs/vay-react

A React-specific extension of Vay.js, providing a lightweight (additional 1kb minified), strongly typed, and modern solution for integrating the Vay.js internationalization (i18n) capabilities into your React applications. It features simple React hooks and providers for managing language contexts, supporting interpolation, pluralization, and context seamlessly within React components.

## Features

- **Easy Integration**: Seamlessly add internationalization support to your React apps with minimal boilerplate.
- **React Hooks**: Utilize custom hooks for language switching and accessing translation functionalities.
- **Dynamic Language Switching**: Change languages on the fly and re-render your components automatically to reflect the updates.

## Installing

To use @vayjs/vay-react with your React project, install it via yarn or npm along with @vayjs/vay if you haven't already:

```sh
yarn add @vayjs/vay @vayjs/vay-react
# or use npm
npm install @vayjs/vay @vayjs/vay-react
```

## Getting Started

Integrating **@vayjs/vay-react** into your application is straightforward. Begin by setting up a `VayProvider` instance from `@vayjs/vay` and then use `createLanguageProvider` function from `@vayjs/vay-react` to seamlessly integrate it into your React application.

```ts
// Import Vay.js and Vay React integration utilities
import { defineConfig, defineDictionary, createProvider, getBrowserDefaultLanguage } from '@vayjs/vay';
import { createLanguageProvider } from '@vayjs/vay-react';

// Set up the Vay.js provider
const i18nProvider = createProvider(
    // Define the config and dictionaries
    defineConfig({ defaultLocale: getBrowserDefaultLanguage() }),
    defineDictionary('en', { welcome: 'Welcome!' }),
);

// Create the React language provider and hook
const { LanguageProvider, useLanguage } = createLanguageProvider(i18nProvider);
```

## Integrating with your React Application

Wrap your app or component tree with the `LanguageProvider` to make the translation capabilities accessible:

```tsx
function App() {
    return (
        <LanguageProvider>
            <YourComponent />
        </LanguageProvider>
    );
}

// Accessing translation and language functionalities within your components
function YourComponent() {
    const { translate: t, language, setLanguage } = useLanguage();

    return (
        <div>
            {t('welcome')} // Outputs: 'Welcome!'
            <button onClick={() => setLanguage('es')}>Español</button>
        </div>
    );
}
```

## License

**@vayjs/vay-react** is licensed under the MIT License
