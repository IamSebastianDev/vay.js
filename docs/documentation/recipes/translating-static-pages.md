---
outline: deep
---

<!-- @format -->

# Translating Static Pages

The `createStaticProvider()` function, part of the Vay ecosystem, is specifically designed to facilitate internationalization for static web pages. This utility leverages an existing `VayProvider` instance to dynamically translate text content and attributes within HTML elements, enabling your static web content to be multilingual and accessible to a wider audience.

::: info
This function is intended for use in browser environments due to its direct manipulation of the DOM.
:::

## How it works

The created static Provider has a `render` method. This method, when invoked with an HTML element (`anchor`), searches for all child elements with a specific target attribute (defined in the `VayProvider`'s configuration) and applies translations directly to their text content or attributes. Optionally, it can also remove the attributes used for translations to clean up the markup after processing.

## Inserting HTML

To utilize the `createStaticProvider()` for translating static content on your webpage, you need to include your translation provider setup and call the `render` method of the static provider within a script tag. Here's a comprehensive example:

### HTML Structure

First, define your HTML structure with elements marked for translation using a custom data attribute (e.g., `data-translate` for this example). Optionally, you can specify which elements should have their translated text inserted as HTML content by adding an additional attribute (e.g., `data-translate-html`).

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Static Translation Example</title>
    </head>
    <body>
        <h1 data-translate="title"></h1>
        <p data-translate="welcome"></p>
        <a href="#" data-translate="link" data-translate-html></a>

        <!-- Translation Provider Setup and Static Provider Usage -->
        <script></script>
    </body>
</html>
```

### VayProvider Setup and Static Translation

Include your `VayProvider` setup and the `createStaticProvider()` usage within a `<script>` tag. This script should be placed at the end of the body to ensure the DOM is fully loaded before translations are applied.

```html
<script>
    // Assuming Vay.js and createStaticProvider are accessible here
    import { defineConfig, defineDictionary, createProvider } from '@vayjs/vay';
    import { createStaticProvider } from '@vayjs/vay-your-integration-package';

    // Define your dictionaries
    const enDict = defineDictionary('en', {
        title: 'Static Page Title',
        welcome: 'Welcome to our website!',
        link: '<a href="/contact">Contact Us</a>',
    });

    // Initialize VayProvider with your configuration and dictionaries
    const provider = createProvider(
        defineConfig({ defaultLocale: 'en', targetAttribute: 'data-translate', removeAttributesOnRender: true }),
        enDict,
    );

    // Create and use the static provider to render translations
    document.addEventListener('DOMContentLoaded', () => {
        const staticProvider = createStaticProvider(provider);
        staticProvider.render(document.body);
    });
</script>
```

This setup ensures that elements within your static HTML page are automatically translated according to the active language in the `VayProvider`. The translations are applied to the text content or as HTML based on the presence of `data-translate` or `data-translate-html` attributes, respectively.

::: tip
Make sure to adjust the `import` statements based on how you include or bundle your JavaScript code. For a purely static site, you might need to compile your ES6 modules and imports into a browser-compatible format using a bundler like Webpack, Rollup, or Parcel.
:::

## Configuration Tips

- **Target Attribute**: Ensure your HTML elements are marked with the correct attribute that matches the targetAttribute in your VayProvider's configuration for them to be recognized and translated.
- **Removing Attributes**: If you prefer a cleaner HTML output, enable the removeAttributesOnRender option in your VayProvider configuration to have translation-related attributes removed after processing.

::: tip
`createStaticProvider()` is an excellent tool for sites that are primarily static but require dynamic translation capabilities for enhanced accessibility and user experience. Remember, it requires a browser environment to function correctly.
:::

Integrating `createStaticProvider()` into your project brings the powerful internationalization features of Vay into static web pages, making your content more accessible and engaging for a global audience.
