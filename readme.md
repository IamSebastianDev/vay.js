
  
# Vay.js

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)  [![Version](https://img.shields.io/badge/version-1.0.0-informational?style=flat-square)]()

Vay is a lightweight (2kb minified), modern & dependency free i18n provider.

## Getting started

### Installing Vay

To use Vay, include it in your project as a module.

```HTML
<script  type="module"  src="./your/path/to/vay.min.js" ></script>

```
 

```HTML
<script  type="module"  src="https://vay.now.sh/dist/vay.min.js"></script>

```

### Creating a new Instance

```JS

// import Vay
import { Vay } from "./path/to/vay.js"

// import a dictionary
import en from "./path/to/your/dictionary.mjs"
import de from "./path/to/your/otherDictionary.mjs"

/*

	The Vay constructor takes a Object as argument, that should contain 
	at least a "dictionaries" property. A "config" object can be provided 
	optionally. See below for information on dictionaries and config objects.

*/

const i18n = new Vay({ 
	dictionaries: { en },
	config
	})
```
## dictionaries &lt;Object&gt;

> Note: A dictionary key should conform to the [ISO 639-1 two letter language Codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes "ISO 639-1 two letter language Codes").

The dictionaries property of the object supplied to the constructor is used to provide the data for Vay. How to create a dictionary is described further down, see "Dictionaries".

```js
// creating the individual dictionaries

const en = { token: "Hello World!" }
const de = { token: "Hallo Welt!" }

// creating the dictionary object to pass to the constructor

const dictionaries = { en, de }
```

The created dictionaries object can than be passed to the constructor as seen above and will be used to translate as requested.

## config &lt;Object&gt;

The config object is used to control certain aspect of the translation and mechanics of Vay.

### targetAttribute &lt;String&gt;

The targetAttribute property is used to tell Vay which attribute to look for when rendering the page with the translated strings. The default is "vay".

### targetElement &lt;HTMLElement&gt;

The targetElement sets the element Vay uses as parent Element to start looking for elements to translate on render. The default is document.documentBody. You can use this to only translate specific parts of the Website.

### defaultLanguage &lt;String&gt;

You can use the defaultLanguage property to set a default language Vay should use. This should correspond to a two letter code used as dictionary key. The default is undefined, instead Vay will try to detect the default language automatically.

### ignoreAttributes &lt;Boolean&gt;

Setting ignoreAttributes to true will cause Vay to ignore Attributes while translating on render. This means only elements inside will be translated. The default is false.

### removeAttributesOnRender &lt;Boolean&gt;

Setting this option to true will cause Vay to remove the attributes used to translate the page on Render. This makes it impossible for Vay to rerender and retranslate the page after translating it. You can use this to serve a website only in a specific language.



## Compatability

Vay.js is compatabile with all major browsers that support at least ES6.

## License

Vay.js is licensed under the MIT License