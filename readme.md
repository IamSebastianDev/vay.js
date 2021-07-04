
  
# Vay.js

  

  

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)  [![Version](https://img.shields.io/badge/version-1.0.0-informational?style=flat-square)]()

  

  

Vay is a lightweight (2kb minified) & dependency free i18n provider.

  

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

/*

	The Vay constructor takes a Object as argument, that should contain 
	at least a "dictionaries" property. A "config" object can be provided 
	optionally.

*/

const i18n = new Vay({ 
	dictionaries: { en }
	})

```

> Note: A dictionary key should be conform to the ISO 639-1 two letter language Codes.

  

  
  

  

## License

  

Vay.js is licensed under the MIT License