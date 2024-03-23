<!-- @format -->

<p align="center">
    <img src="https://repository-images.githubusercontent.com/381157985/05895345-3bd0-4776-adf9-a74602953480" alt="logo"/>
</p>

# Vay.js

[![Npm package version](https://badgen.net/npm/v/vay.js)](https://www.npmjs.com/package/vay.js)[![Npm package total downloads](https://badgen.net/npm/dt/vay.js)](https://npmjs.com/package/vay.js)[![Npm package license](https://badgen.net/npm/license/vay.js)](https://npmjs.com/package/vay.js)[![Github tag](https://badgen.net/github/tag/iamsebastiandev/vay.js)](https://github.com/iamsebastiandev/vay.js/tags)

A lightweight (3kb minified), strongly typed, modern & dependency free internationalization (i18n) provider that features a simple API that supports interpolation, pluralization and context.

## Installing

To use **Vay** with node and/or a bundler such as webpack or rollup, install it via yarn or npm:

```bash
yarn add @vayjs/vay
# or use npm
npm install @vayjs/vay
```

You can also use it directly in the browser and include it via CDN or locally.

```html
<head>
    ...
    <!-- as a local file -->
    <script src="./your/path/to/vay.browser.min.js"></script>
    <!-- or via CDN -->
    <script src="http://unpkg.com/@vayjs/vay"></script>
    ...
</head>
```

## Getting started

Setting up the initial **Vay** instance is quick and requires only a dictionary and a configuration object. **Vay** provides functions to create both, to utility editor autocompletion and type safety. For a more in depth guide on how to use **Vay**, take a look at the full [documentation](https://github.com/IamSebastianDev/vay.js/docs/documentation/index.md).

Start by importing or destructuring the required methods. You are free to use module or import syntax, **Vay** provides export for both standards. When included via CDN or locally, destructuring the globally accessible `Vay` property is the easiest way to access the API.

```js
// node require syntax
const { Vay, defineConfig, defineDictionary } = require('vay.js');

// modern es6 style syntax
import { Vay, defineConfig, defineDictionary } from 'vay.js';

// if added to the global namespace
const { Vay, defineConfig, defineDictionary } = Vay;
```

### Creating a `Vay` provider

To use **Vay**, create a new **provider** providing a config as well as any amount of dictionaries.

> Note: The examples below assumes you're using es6.

```ts
import { defineConfig, defineDictionary, createProvider } from 'vay.js';

// create the Vay instance
const i18n = createProvider(
    defineConfig(), // create a default config
    defineDictionary('en', { token: 'Phrase' }), // create a dictionary
);
```

> Note: The dictionary keys should follow [the ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) convention of two letter language codes.

### Translating dynamic content using the `translate()` method

**Vay** also provides a function to translate strings dynamically. This can prove useful when **Vay** is used with a JavaScript framework, or when translating text that is dynamically created. When using TypeScript, the method is strongly typed and will only accepts tokens that exists in the dictionary as well as provide useful autocompletion suggestions deeding on the used IDE.

```ts
import { defineConfig, defineDictionary, createProvider } from '@vayjs/vay';

const i18n = createProvider(defineConfig(), defineDictionary('en', { title: 'Hello World' }));

i18n.translate('title'); // Return 'Hello World'
```

> You can read more about the capabilities of the `translate` method on the official [docs](https://vayjs.dev).

### Translating static content using the `createStaticProvider` function

Use the `render()` method of a **staticProvider** to translate a subset of a provided `HTML Element` and it's descendants. The method should be called after the DOM has finished rendering and is best used for static websites.

```html
<div vay="title"></div>

<script>
    const { defineConfig, defineDictionary, createProvider, createStaticProvider } = Vay;

    // setup the instance
    const i18n = createStaticProvider(
        createProvider(
            defineConfig(), // create a default config
            defineDictionary('en', { title: 'Hello World' }), // create a dictionary
        ),
    );

    // render the translations to the page
    window.addEventListener('DOMContentLoaded', () => {
        i18n.render(document.documentElement);
    });
</script>
```

The `<div>` with the `token` 'title' will have it's text-content replaced with the respective `phrase` in the dictionary,
'Hello World'. When ever the used changes the language, you can re-render the translations.

## Contributing

If you would like to contribute, take a look at the [contribution guide](https://github.com/IamSebastianDev/vay.js/contributing.md).

## License

**Vay** is licensed under the MIT License
