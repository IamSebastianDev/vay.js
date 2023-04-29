<!-- @format -->

# Vay.js

[![Npm package version](https://badgen.net/npm/v/vay.js)](https://www.npmjs.com/package/vay.js)[![Npm package total downloads](https://badgen.net/npm/dt/vay.js)](https://npmjs.com/package/vay.js)[![Npm package license](https://badgen.net/npm/license/vay.js)](https://npmjs.com/package/vay.js)[![Github tag](https://badgen.net/github/tag/iamsebastiandev/vay.js)](https://github.com/iamsebastiandev/vay.js/tags)

A lightweight (3kb minified), modern & dependency free internationalization (i18n) provider that features a simple API that supports nested tokens, pluralization and interpolation. **Vay** is strongly typed.

## Installing

To use **Vay** with node and/or a bundler such as webpack or rollup, install it via yarn or npm:

```bash
yarn add vay.js
# or use npm
npm install vay.js
```

You can also use it directly in the browser and include it via CDN or locally.

```html
<head>
    ...
    <!-- as a local file -->
    <script src="./your/path/to/vay.browser.min.js"></script>
    <!-- or via CDN -->
    <script src="http://unpkg.com/vay.js"></script>
    ...
</head>
```

## Getting started

Setting up the initial **Vay** instance is quick and requires only a dictionary and a configuration object. **Vay** provides functions to create both, to utility editor autocompletion and type safety. For a more in depth guide on how to use **Vay**, take a look at the full [documentation](./docs/readme.md).

Start by importing or destructuring the required methods. You are free to use module or import syntax, **Vay** provides export for both standards. When included via CDN or locally, destructuring the globally accessible `Vay` property is the easiest way to access the API.

```js
// node require syntax
const { Vay, defineConfig, defineDictionary } = require('vay.js');

// modern es6 style syntax
import { Vay, defineConfig, defineDictionary } from 'vay.js';

// if added to the global namespace
const { Vay, defineConfig, defineDictionary } = Vay;
```

### Creating a `Vay` instance

To use **Vay**, create a new instance and pass an array of dictionaries, a configuration object and a optional initial language code to it as parameters.

> Note: The examples below assumes you're using es6.

```ts
import { defineConfig, defineDictionary, Vay } from 'vay.js';

const config = defineConfig(); // create a default config
const en = defineDictionary('en', { token: 'Phrase' }); // create a dictionary

const i18n = new Vay([en], config); // create the Vay instance
```

> Note: The dictionary keys should follow [the ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) convention of two letter language codes.

### Translating static content with the `render()` method

Use the `render()` method to translate a subset of a provided `HTML Element` and it's descendants. The method should be called after the DOM has finished rendering and is best used for static websites.

```html
<div vay="title"></div>

<script>
    const { defineConfig, defineDictionary, Vay } = Vay;

    // setup the instance
    const config = defineConfig();
    const en = defineDictionary('en', { title: 'Hello World' });

    const i18n = new Vay([en], config, 'en');

    // render the translations to the page
    window.addEventListener('DOMContentLoaded', () => {
        i18n.render(document.documentElement);
    });
</script>
```

The `<div>` with the `token` 'title' will have it's text-content replaced with the respective `phrase` in the dictionary,
'Hello World'. When ever the used changes the language, you can re-render the translations.

> Note: The dictionary created above is one in it's simplest form. To learn more about nesting, pluralization and interpolation, take a look at the in depth [documentation](./docs/creating-a-dictionary.md).

### Translating dynamic content using the `translate()` method

**Vay** also provides a function to translate strings dynamically. This can prove useful when **Vay** is used with a JavaScript framework, or when translating text that is dynamically created. When using TypeScript, the method is strongly typed and will only accepts tokens that exists in the dictionary as well as provide useful autocompletion suggestions deeding on the used IDE.

```ts
import { defineConfig, defineDictionary, Vay } from 'vay.js';

const config = defineConfig();
const en = defineDictionary('en', { title: 'Hello World' });

const i18n = new Vay([en], config);

i18n.translate('title'); // Return 'Hello World'
```

You can also provide [interpolation and pluralization](./docs/pluralization-and-interpolation.md) data to improve the flexibility of the method.

## Contributing

If you would like to contribute, take a look at the [contribution guide](./contributing.md).

## License

**Vay** is licensed under the MIT License
