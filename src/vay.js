/** @format */

/**

	@license MIT

	---------------------------------------------------------------------------

	Copyright (c) 2021 Sebastian Heinz

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

	---------------------------------------------------------------------------

*/

/**

*/

class Vay {
	/**

        @constructor
        @param { Object } dicts - An Object containing the dictionary objects vay should use to translate strings.
        @param { Object } config - the Object used to configure Vay @todo destructure the config object


    */

	constructor({ dictionaries, config } = {}) {
		this._defaultConfig = {
			/**

				@description targetAttribute can be changed to have Vay look for another tag when the render method is executeed

			*/

			targetAttribute: 'vay',

			/**

				@description targetElement describes the Parent Element which children should be used to check for translation attributes.

			*/

			targetElement: document.documentElement,

			/**

				@description defaultLangauge is used to set a language to use for Vay. If no language is set, vay will try to detect the language it should use. This is the default

			*/

			defaultLanguage: undefined,

			/**

				@description set this to true if you want to only convert and translate text content and want to ignore vay-* attributes for translation

			*/

			ignoreAttributes: false,

			/**

				@description setting removeAttributesOnRender to true will remove the vay attribute and other attributes on render. After this, vay won't be able to rerender the page in a different language unless the complete HTML is rerenderer with new attributes. 

			*/

			removeAttributesOnRender: false,
		};

		/*

			Parse the provided config & the default config into the internal _config property

		*/

		this._config = Object.assign({}, this._defaultConfig, config);

		/*

			Parse the dictionaries property of the constructor for compliance with the two letter language code format described in ISO 639-1.

		*/

		this._dicts = this._parseDictionaries(dictionaries);

		/*

			Extract the available languages from the _dicts object by obtaining all keys of dict object, which should represent the available languages provided to Vay.

		*/

		this._dictLanguages = Object.keys(this._dicts);

		/*

			Try to evaluate the default language.

		*/

		this._defaultLanguage =
			this._config.defaultLanguage || // check the config object if a defaultLanguage is provided
			this._evaluateDefaultLanguage() || // if not, try to evaluate the defaultLanguage
			this._dictLanguages[0]; // if no default langauge can be found, fall back to the first entry of the dictLanguages Array.

		/*

			Set the current language property to the default language

		*/

		this._currentLanguage = this._defaultLanguage;
	}

	/**

		@description internal method used to parse the dictionaries for compliance with the dictionary rules

		@param { Object } dicts - the dictionary object provided to vay

		@returns { Object } a compliant dictionary

	*/

	_parseDictionaries(dicts) {
		/*

			Check the provided dicts object keys for the correct form

		*/

		Object.keys(dicts).forEach((dict) => {
			dict.length != 2
				? console.warn(
						`Vay.js: '${dict}' is not a  two letter language code. This should be fine, but it might not be possible to find an automatic match. Dictionary names should conform to the two letter language code format described in ISO 639-1.`
				  )
				: null;
		});

		/*

			Parse the dictionary keys to be consistently lowercase

		*/

		const parsedDictionarys = Object.fromEntries(
			Object.entries(dicts).map(([key, values]) => [
				key.toLowerCase(),
				values,
			])
		);

		/*

			Return the parsed Dictionarys

		*/

		return parsedDictionarys;
	}

	/**

		@description this method is used to find the first intersection between the browser supported languages and the languages provided by the dictionary object

		@returns { string | undefined } the found intersection or undefined

	*/

	_evaluateDefaultLanguage() {
		/*

			Filter the existing dictionarie languages for the first intersection with the languages supported by the browser and return it. If no intersection is found, return undefined and the fallback is invoked.

		*/

		return this._languagesSupportedByBrowser.filter((lang) =>
			this._dictLanguages.includes(lang)
		)[0];
	}

	/** 

		@description public method to translate a token according to the provided dictionary of the currently active language.

		@param { String } token - the token in dot notation form used to find the correct replacement string in the dictionary.
		@param { Object } data - data passed to the method, can be used to indicate singular/plural forms or dynamic content.
		@param { String } lang - you can use this argument to optionally pass a language argument to override the curentLanguage parameter. This should be a two letter code conforming to ISO 639-1 that has a dictionary available

		@returns { String } the translated and processed string for further use

	*/

	translate(token = '', data = {}, lang) {
		/*

			Assign the language to use, this is either the provided lang argument or the current language set to active.

		*/

		const language = lang || this._currentLanguage;

		/*

			Try to assign a dictionary, if the dictionary of the choosen language can not be found, assign the current language dictionary instead.

		*/

		let dict;

		if (this._dicts[language] == undefined) {
			console.warn(
				`Vay.js: 'No dictionary was provided for ${language}'.`
			);
			dict = this._dicts[this._currentLanguage];
		} else {
			dict = this._dicts[language];
		}

		/* 
			
			check if the data object contains a count, if not default to a count of one for singular. 
			
		*/

		const count = data.count == 0 ? 0 : data.count || 1;

		/*

			process the token string and find the entry by splitting the string using dotnotation and reducing the resulting array using the dictionary with the chosen language as acumulator

		*/

		let entry = token
			.split('.')
			.reduce((entry, token) => entry[token], dict);

		/*

			Process the count value to find the correct singular/plural form. Count values are defined as lower bounds. All numerical keys of the object are listed, then compared against the determined count value to find the value that is just below the provided value.
			
		*/

		let computedString;

		if (typeof entry == 'object') {
			/* 
				
				retrieve all keys from the entry object and get the number closest to the lower bound of the provided count
				
			*/

			let numericalValues = Object.keys(entry).filter(
				(value) => value <= count
			);

			// assign the computed string

			computedString =
				entry[numericalValues[numericalValues.length - 1]] ||
				'undefined';
		} else {
			// if there is only a string, assign the string as entry for further processing
			computedString = entry || 'undefined';
		}

		/*

			process the string further and replace dynamicly marked values with values provided by the data object

		*/

		let processedString = computedString.replaceAll(
			/{{.*?}}/gim,
			(r) =>
				r
					.substring(2, r.length - 2) // extract the string from the curly braces
					.split('.') // create an array from the nested properties
					.reduce((a, b) => a[b], data) // reduce the array to find the property in the data object
		);

		// return the processed string

		return processedString;
	}

	/**
		
		@description the render function replaces all found element's textContent & marked attributes with the respective value sourced through the translate function.

		@returns { Array } a collection of elements on which the text could not be replaced

	*/

	render() {
		/*

			the token is the property vay uses to denote elements that should be translated using the render function

		*/

		const token = this._config.targetAttribute;

		/*

			get all elements that are childs of the target element that contain an attribute equal to the provided token. Those elements will have their textcontent replaced with the values provided by the dictionary that are equal to the value of the attribute.

		*/

		let elements = this._config.targetElement.querySelectorAll(
			`[${token}]`
		);

		/*

				Itterate over the elements and replace their textContent and attributes with the values provided by the translate function. Checks for failure and replaces only on success. On failure, the elements is pushed to the failedElements array instatiated below, that is returned by the function.

		*/

		let failedElements = [];

		elements.forEach((elem) => {
			/*

				Check if the token attribute has a value associated.

			*/

			let value = elem.getAttribute(token);

			/*

				If a value is associated, use the value to produce a translation using the translate method

			*/

			if (value) {
				let translated = this.translate(value);

				/*

					If a translation string was found, use it to replace the textContent of the Element

				*/

				if (translated != 'undefined') {
					/*

						If the element has a vay-html marker, the translated phrase will be treated as html instead of as textcontent.

					*/

					if (elem.hasAttribute('vay-html')) {
						elem.innerHTML = translated;
					} else {
						elem.textContent = translated;
					}
					/*

						if the translation is null or undefined, push the element to the failed elements array

					*/
				} else if (translated == undefined || translated == null) {
					failedElements.push(elem);
				}
			}

			/*

				If attributes are ignored, return early 
				
			*/

			if (this._config.ignoreAttributes) {
				return failedElements;
			}

			/*

				Create a attribute set out of all attributes the element possesses

			*/

			let attributeSet = [...new Set(elem.getAttributeNames())];

			/*

				itterate over the attribute set and process the values accordingly

			*/

			attributeSet.forEach((att) => {
				if (att.includes(token)) {
					/*

							extract the provided attribute name from the found attribute

						*/

					let attribute = att.split('-')[1];

					/*

						If the attribute does not have a target attribute or is the reserverd html attributeq, return early after removing the attribute if desired

					*/

					if (attribute == undefined || attribute == 'html') {
						if (this._config.removeAttributesOnRender) {
							elem.removeAttribute(att);
						}

						return;
					}

					/*

						set the new attribute on the elemet

					*/

					elem.setAttribute(
						attribute,
						this.translate(elem.getAttribute(att))
					);

					/*

						if removeAttributesOnRender is set to true, remove the attributee

					*/

					if (this._config.removeAttributesOnRender) {
						elem.removeAttribute(att);
					}
				}
			});
		});

		return failedElements;
	}

	/*

		SECTION: setters & getters

	*/

	/**

		@description the getter return an array of processed two letter language code from the browser's navigator property. Only the first two letters of the langauge code are returned. 

		@returns { Array <string> } - the array of two letter language codes

	*/

	get _languagesSupportedByBrowser() {
		return [
			...new Set(
				window.navigator.languages.map((lang) =>
					lang.split('-')[0].toLocaleLowerCase()
				)
			),
		];
	}

	/**

		@description the currentLanguage getter returns the internal _currentLanguage property

		@returns { String } the two letter languagee code currently assigned to the _currentLangauge property

	*/

	get currentLanguage() {
		return this._currentLanguage;
	}

	/**

		@description the currentLanguage setter sets the internal equivalent after checking if the dictionary languages contain the provided value

		@returns { Boolean } true or false depening on if the was set

	*/

	set currentLanguage(string) {
		/*

			Check if the _dictLanguages Array contains the string

		*/

		if (this._dictLanguages.includes(string)) {
			/*

				If the language to set is valid, set the language and return true

			*/

			this._currentLanguage = string.toLocaleLowerCase();

			/*

				Dispatch a custom setLanguage event

			*/

			window.dispatchEvent(
				new CustomEvent('setLanguage', {
					detail: { newLanguage: this._currentLanguage },
				})
			);

			/*

				Return true to indicate the language was set

			*/

			return true;
		} else {
			/*

				If the language code does not exist, log an error to the console and return false

			*/

			console.error(`Vay.js: '${string}' does not exist as dictionary.`);
			return false;
		}
	}
}

export { Vay };
