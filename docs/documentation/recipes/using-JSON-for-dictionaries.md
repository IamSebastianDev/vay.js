---
outline: deep
---

<!-- @format -->

# Using JSON for Dictionaries

For simple dictionaries, the default `JSON-Module` import of TypeScript can be used to retain strongly typed dictionaries. However, as JSON syntax has a reduced set of features compared to TypeScript, pluralization & contextualization is not available. You can still use interpolation as usual.

## Prerequisites

Make sure your `tsconfig.json` has `"resolveJsonModule"` set to `true`. This will enable TypeScript to infer the structure of the imported object.

## Using JSON as Dictionary

Import the JSON into your provider file to create a dictionary.

::: code-group

```ts [./i18n.provider.ts]
import { createProvider, defineConfig, defineDictionary } from '@vayjs/vay';
import en from './dictionary.en.json'; // Import the JSON dictionary

const i18n = createProvider(
    // configure the provider
    defineConfig(),
    defineDictionary('en', en),
);

// The translate method uses the JSON object to infer paths
console.log(i18n.translate('token'));
```

```json [./dictionary.en.json]
{
    "token": "Phrase"
}
```

:::

::: info
You can also mix and match `.json` and `.ts` dictionaries if needed. You can include JSON objects in TypeScript, just not the other way round.
:::
