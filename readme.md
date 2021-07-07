
  
# Vay.js

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)  [![Version](https://img.shields.io/badge/version-1.0.0-informational?style=flat-square)]()

Vay is a lightweight (2kb minified), modern & dependency free i18n provider.

## Table of Contents
- [Vay.js](#vayjs)
  * [Getting started with Vay](#getting-started-with-vay)
    + [Creating a new Instance](#creating-a-new-instance)
    + [Translating static content](#translating-static-content)
    + [Translating dynamic content](#translating-dynamic-content)
  * [Taking a closer look](#taking-a-closer-look)
  * [Config Reference](#config-reference)
  * [API Reference](#api-reference)
  * [Compatability](#compatability)
  * [License](#license)


## Getting started with Vay

###Preparations

To get started with Vay, start by including it inside your project as a module.

```HTML
<script type="module" src="./your/path/to/vay.js">
```

From there, you can import Vay into your project, to eventually create a new instance

```JS
// import Vay into your project

import { Vay } from "./your/path/to/vay.js"

```

To actually create a new instance of Vay, you will need a dictionary and, optionally, a config object. 

```JS
/*

	A simple dictionary consists of just a Token and a Phrase. Tokens are 
	what Vay uses to identify the Phrase it needs to translate.

*/

const Dictionary = {
	greeting: "Hello World!",
}

```
>Note: We will look at more complex dictionaries later on, but an easy one will do for now.

### Creating a new Instance
To use Vay in your Project, you need to creaete a new Instance of it. This will let you access Vay's API.

```JS
/*

	To create new a Instance, call it's constructor and supply it with a Object that 
	contains at least a 'dictionaries' property. The config Object is optional and the 
	defaults should work for most projects.

*/

const i18n = new Vay({
	dictionaries: {
		en: Dictionary
	}
})
```
>Note: The dictionary keys should follow [the ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) convention of two letter language codes.

### Translating static content

With your freshly created instance of Vay, you can finally start translating content. Let's consider the **Token** we already have in our dictionary, 'greeting'. We can simply add a HTML Tag and tell Vay to translate it.

```HTML
<h1 vay="greeting"></h1>
```

You will use the "vay" attribute not only to denote elements that should be translated, but also to supply the **Token** for the translation. In this case, the **Token** is 'greeting'.  But there is one more addiontal step to see "Hello World!" on the website. 

```JS
/*

	To transform all elements that have a vay attribute, we need to call the
	'Render' method of Vay. This will check all Elements for the Attribute and
	replace their textcontent with the Phrase corresponding to the supplied Token.  

*/

i18n.render()

```
Your element should now read "Hello World!". 

### Translating dynamic content
Sometimes you'll want to use Vay with a JavaScript Library or with dynamically created elemeents. For that case, Vay provides the 'translate' method, that will directly translate a **Token** and return a **Phrase** string. Consider a example like this:

```JS
/*

	We first translate the phrase

*/

const translated = i18n.translate('greeting'); 

/*

	Now let's add the translated string to an element

*/

const Element = document.createElement("h1");
Element.textContent = translated;

/*

	Logging the Element will show us that our translation worked

*/

console.log(Element); 
// will result in: <h1>Hello World!</h1>

```

## Taking a closer look

## Config Reference

You can supply a config object to Vay to control certain aspects and behaviours.

## API Reference

## Compatability

Vay.js is compatabile with all major browsers that support at least ES6.

## License

Vay.js is licensed under the MIT License