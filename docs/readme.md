<!-- @format -->

# Vay.js

You can find the in depth documentation for **Vay** (from v.1.0.0) here.

## Table of Contents

-   [Configuration reference](./configuration.md)
-   [API reference](./api.md)
-   [Creating a dictionary](./creating-a-dictionary.md)
-   [Translating static content](./translating-static-content.md)
-   [Translating dynamic content](./translating-dynamic-content.md)
-   [Pluralization and interpolation](./pluralization-and-interpolation.md)
-   [TypeScript support](./using-vay-with-typescript.md)
-   [Examples](./examples.md)

## Quick start guide

Vay.js is an internationalization (i18n) library to manage translations in your application. This guide will help you get started with setting up and using Vay.js.

In general, there are two different ways to use **Vay**, either as pure, standalone frontend dependency or via package manager in a Node.js context. Depending on the way your website or application has been setup, there might be overlaps.

-   [Using Vay.js with Static Websites](#quick-start-using-vayjs-with-static-websites)
-   [Using Vay.js in a Node.js Context](#quick-start-using-vayjs-in-a-nodejs-context)

### Quick Start: Using Vay.js with Static Websites

-   1. Start by including the library as a local file or via CDN.

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

-   2. Create some markup to be translated

```html
<h1 vay="title">Fallback Title Text</h1>
<p vay="text">Fallback Text</p>
```

-   3. Create a dictionary and the Vay.js instance

```js
const { defineConfig, defineDictionary, Vay } = Vay;

const en = defineDictionary('en', {
    title: 'Transformed Title Text',
    text: 'Transformed Body Text',
});

const i18n = new Vay([en], defineConfig());
```

-   4. Listen for the `DOMContentLoaded` event and call the render method of the Library to replace the DOM Nodes that should be rendered.

```js
/*
 * Previous Code
 */

window.addEventListener('DOMContentLoaded', (ev) => i18n.render(document.documentElement));
```

-   5. The complete example should look like this:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Translating Static Websites with Vay.js</title>
        <!-- or via CDN -->
        <script src="http://unpkg.com/vay.js"></script>
    </head>
    <body>
        <h1 vay="title">Fallback Title Text</h1>
        <p vay="text">Fallback Text</p>
        <script>
            const { defineConfig, defineDictionary, Vay } = Vay;

            const en = defineDictionary('en', {
                title: 'Transformed Title Text',
                text: 'Transformed Body Text',
            });

            const i18n = new Vay([en], defineConfig());

            window.addEventListener('DOMContentLoaded', (ev) => i18n.render(document.documentElement));
        </script>
    </body>
</html>
```

### Quick Start: Using Vay.js in a Node.js context

-   1. Start by importing the library and setting up the instance.

```js
import { defineConfig, defineDictionary, Vay } from 'vay.js';

const en = defineDictionary('en', {
    title: 'Transformed Title Text',
    text: 'Transformed Body Text',
});

const i18n = new Vay([en], defineConfig());
```

-   2. Create a translator

```js
// The translator is a function that has it's context bound
// to the instances Dictionary. That makes it easier to
// reassign the method to a more useful name.
// `t` and `i18n.translate` are equal
const t = i18n.createTranslator();
```

-   3. Use the translator to translate a token.

```js
const translated = t('title');
// return 'Transformed Title Text'
```
