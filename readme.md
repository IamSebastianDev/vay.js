
  
# Vay.js

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)  [![Version](https://img.shields.io/badge/version-1.0.0-informational?style=flat-square)]()

Vay is a lightweight (2kb minified), modern & dependency free i18n provider.

## Table of Contents

- [Vay.js](#vayjs)
  * [Getting started with Vay](#getting-started-with-vay)
    + [Preparations](#preparations)
    + [Creating a new Instance](#creating-a-new-instance)
    + [Translating static content](#translating-static-content)
    + [Translating dynamic content](#translating-dynamic-content)
  * [Taking a closer look](#taking-a-closer-look)
    + [Fallbacks](#fallbacks)
    + [Translating attributes](#translating-attributes)
    + [innerHTML instead of textContent](#innerhtml-instead-of-textcontent)
    + [Providing dynamic data](#providing-data-dynamically)
    + [Dictionaries and dot notation](#dictionaries-and-dot-notation)
    + [Singular, Plural, and more](#singular--plural--and-more)
  * [Config Reference](#config-reference)
    + [targetAttribute &lt;String&gt;](#targetattribute--lt-string-gt-)
    + [targetElement &lt;HTMLElement&gt;](#targetelement--lt-htmlelement-gt-)
    + [defaultLanguage &lt;String&gt;](#defaultlanguage--lt-string-gt-)
    + [ignoreAttributes &lt;Boolean&gt;](#ignoreattributes--lt-boolean-gt-)
    + [removeAttributesOnRender &lt;Boolean&gt;](#removeattributesonrender--lt-boolean-gt-)
  * [API Reference](#api-reference)
    + [The render method](#the-render-method)
    + [The translate method](#the-translate-method)
    + [The currentLanguage property](#the-currentlanguage-property)
  * [Compatability](#compatability)
  * [License](#license)

## Getting started with Vay

### Preparations

To get started with Vay include it inside your project as a module.

```html
<script type="module" src="./your/path/to/vay.js">
```

From there, you can import Vay into your project, to eventually create a new instance.

```js
// import Vay into your project

import { Vay } from "./your/path/to/vay.js"

```

To actually create a new instance of Vay, you will need a dictionary and, optionally, a config object. 

```js
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

```js
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

```html
<h1 vay="greeting"></h1>
```

You will use the "vay" attribute not only to denote elements that should be translated, but also to supply the **Token** for the translation. In this case, the **Token** is 'greeting'.  But there is one more addiontal step to see "Hello World!" on the website. 

```js
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

```js
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

There is more to Vay then just translating text. Let's take a look at some more advanced concepts.

### Fallbacks

Vay will only replace the textContent of elements when a valid **Phrase** can be found. This can be used to create fallbacks, in case a **Token** is missing or mistyped.

```html
<!-- If no 'missingToken' token is defined in the dictionary, the text will not change -->

<h1 vay="missingToken">This is a fallback text.</h1>

```
 
### Translating attributes

Sometimes you will need to translate text that is not inside an Element but instead part of the Elements mark up. For example accessibilty descriptions or alternative texts. Vay let's you do this very easily.

```html
<img vay vay-alt="headerImageDescription" src="src.jpg" />

<!-- will be changed to -->

<img vay vay-alt="headerImageDescription" alt="This is a header image." src="src.jpg" />

```
As you can see in the snippet above, all you need to do is add the 'vay' attribute to mark the element for translation and the 'vay-alt' attribute with a **Token** as value to create a 'alt' attribute with the corresponding **Phrase**. You can tell Vay to ignore attributes by setting the 'ignoreAttributes' property of the config object to **true**.

### innerHTML instead of textContent

There are cases where you'll want to translate or insert HTML blocks instead of regular text. You can do this by adding your markup to the dictionary as usual, and adding a 'vay-html' attribute to the Element you want to translate.

```js
const dictionary = {
	elementWithHTML: 'This is a <a href="#link"> Link </a>'
}
```

```html
<div vay="elementWithHTML" vay-html></div>

<!-- will be rendered as -->

<div vay="elementWithHTML" vay-html>
	This is a <a href="#link"> Link </a>
</div>
```

> Tip: In the case you're using the 'translate' method, you can just add the returned **Phrase** using innerHTML instead of textContent, basically bypassing this problem entirely.

### Providing dynamic data

Under certain circumstances it can be necessary to provide dynamic values for translation **Phrases**. This is possible in vay by using the 'data' parameter of the 'translate' method. 

```js
/*

	Adding a dynamic value to a Phrase is done by using a double set of 
	curly brackets as seen in the example below.

*/


const dictionary = {
	greeting: 'Hello, {{name}}!'
}

/*

	If a token is then translated and a name properety is passed, 
	the value will be exchanged dynamically.

*/

const translated = i18n.translate('greeting', { name: "World" });
// results in: "Hello, World!"

``` 

> Note: To read more about the translate method and it's parameters, take a look at the api reference.

### Dictionaries and dot notation

Creating a dictionary is fairly simple. A basic dictionary is a Object with the **Tokens** as key and **Phrases** as values. 

```js
const dictionary = { token: 'Phrase' }
```

For better readability dot notation can be used to read nested dictionary objects.

```js
const dictionary = {
	category: {
		token: 'Phrase'
	}
}
```
The corresponding mark up would look like this: 

```html
<h1 vay="category.token"></h1>

<!-- Which will be rendered as: -->

<h1 vay="category.token">Phrase</h1>
```

### Singular, Plural, and more

Sometimes it's necessrary to provide **Phrases** based on certain numbers, for example to differentiate between Singular & Plural forms. This is done by providing the **translate** method of Vay with a 'count' property.

Let's create the dictionary entry first:

```js
/*

	To be able to access different count values, you simply define the 
	count as a key for a string like in the example below. 
	When accessing the Token, Vay will check for a "count" propery, 
	and if noone is found, default the count to 1.

*/

const dictionary = {
	greetings: {
		1: "Hello You!",
		2: "Hello, more then one and less then 5!",
		5: "Hello, there's a lot of you!"
	}
}

```

```js

/*

	To access different forms, pass a 'count' property in the 
	data object like you can see below. 
	In case a number cannot be directly associated with a key, 
	Vay will look for the next lower number. 

*/

const singular = i18n.translate(greetings, { count: 1 }); 
// results in: "Hello You"
	
const plural = i18n.translate(greetings, { count: 2 }); 
// results in: "Hello, more then one and less then 5!"

const more = i18n.translate(greetings, { count: 4}); 
// results in: "Hello, more then one and less then 5!"

const alot = i18n.translate(greetings, { count: 5});
// results in: "Hello, there's alot of you!"

```

> Note: As static HTML markup should not actually change that often without the use of JavaScript, inserting dynamic content based on data or numeric values is only supported by the translate method.

## Config Reference

You can supply a config object to Vay to control certain aspects and behaviours.

```js

const configObject = {
	targetAttribute: 'vay',
	targetElement: document.documentElement,
	defaultLanguage: undefined,
	ignoreAttributes: false,
	removeAttributesOnRender: false
};

/*

	The config objet is then passed to the Vay constructor together with the 
	dictionaries object.

*/

const i18n = new Vay({
	dictionaries,
	config: configObject
});

```
>Tip: Use destructuring to make the constructor easier to read.

### targetAttribute &lt;String&gt;

The targetAttribute property describes the **String** Vay uses to check when a **Render** is called. The default is **'Vay'**. You can change this to customize your code.

```js
	const config = { targetAttribute: 'Vay' };
```

### targetElement &lt;HTMLElement&gt;

The targetElement property can be used to change the Parent element for Vay. Vay will only check Child elements of the targetElement when executing a render. This can be useful if you want to only translate certain parts of your website. The default value is **document.documentElement**

```js
	/*
	
		The default value is the document.documentElement element. 
	
	*/

	const config = { targetElement: document.documentElement };
	
	/*
	
		However, any valid HTMLElement can be used.
	
	*/
	
	const config = { targetElement: document.querySelector('.targetElement') };
```

### defaultLanguage &lt;String&gt;

You can use this property to set a default language for Vay. If no value is set, eg the value remains **undefined**, Vay will try to detect the language automatically depening on the first intersection of available languages in the browser and provided dictionaries.

```js
	const config = { defaultLanguage: 'en' }
```

### ignoreAttributes &lt;Boolean&gt;

This property can be used to change the behaviour of Vay's render. If the property is set to false, **Attributes** will be checked for a 'vay' prefix and translate those **Attributes** accordingly. The default is **false**

```js
	const config = { ignoreAttributes: false }
```
### removeAttributesOnRender &lt;Boolean&gt;
The removeAttributesOnRender property can be set to true to remove the Attributes after the first render. This can be used to only translate a page once and delete all traces of it. All **Attributes** containing the choosen **targetAttribute** will be removed. The default is false.

```js
const config = { removeAttributesOnRender: false }
```

## API Reference

Vay exposes certain methods and values to the user. All public methods and properties are listed below.

### The render method

```render () : HTMLElement[]```

The render method is used to render and replace the **Tokens** with the **Phrases** according to the dictionary corresponding to the currently set language. The method needs to be called manually to take effect. 

```js
window.addEventlistener(DOMContentLoaded, (ev) => { i18n.render() })
```

> Note: The method returns an array of HTMLElements that could not be translated, either because of a mismatch of tokens or another reason.

### The translate method

```translate ( token : String, data : Object, lang : String ) : String```

| Name | Type | Description |
|------|------|-------------|
|token|String| A string representing the path to the correct phrase inside the dictionary.
|data|Object| A optional object that can contain data for dynamic values or singular / plural forms.
|lang|String| A optional string that can be used to override the currently set language.

Vay's translate method can be used to translate a **Token** into a **Phrase**. It also supports way's to provide for dynamic content and plural / singular forms.

```js
// Consider a dictionary like this,

const dictionary = {
	greeting: 'Hello World!',
	greetings: {
		1: 'Hello, you!'
		2: 'Hello, you two!',
	}
	greetMe: 'Hello, {{name}}!'
}

// A simple example:

let translated = i18n.translate('greeting'); 
// results in: "Hello World!"

// Example with a Plural form

translated = i18n.translate('greetings', { count: 2 })
// results in: "Hello, you two!"

// example with dynamic content

translated = i18n.translate('greetMe', { name: 'World' });
// results in: "Hello, World!"

``` 
### The currentLanguage property

```currentLanguage : string```

The currentLanguage property is used to retrieve and set the current Language.

```js
// retrieving the language

const current = i18n.currentLanguage; 
// results in a two letter string that represents the current language 

// setting the langaugee

i18n.currentLanguage = 'en'; 
// sets the current language to 'en'; 

```
> Note: setting the currentLanguage property will **NOT** cause a rerender. This has to be done manually.

After the language is set using the setter, a custom event will be dispatched which can be used to request a rerender. The event's name is called 'setLanguage' and contains the current language code as payload under the *'event.detail.newLanguage'* property.

```js
/*

	A eventlistener can be used to cause a render. The current language code is supplied 
	as payload as seen below.

*/

window.addEventlistener('setLanguage', (ev) => {
	i18n.render()
	
	console.log(ev.detail.newLanguage);
	// will log the languagee that has been set.
})

```

## Compatability

Vay.js is compatabile with all major browsers that support at least ES6.

## License

Vay.js is licensed under the MIT License