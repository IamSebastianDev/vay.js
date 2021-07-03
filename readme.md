## CLI

--npm run dev to start development server
--npm run start to run server
--npm run build to minify the file

## API

### dict <Object>

### config <Object>

-- targetAttribute <String> - the Attribute vay uses to identify elements that should be translated or replaced 
-- targetElement <HTMLElement> - the element that should be used as a wrapper. All elements contained within the element will be parsed and translated according to the provided dictionary. This defaults to the document itself
-- detectLanguage <Boolean> - set to false to stop vay from automaticcaly trying to match the browser language. The default is true.
-- defaultLanguage <String> - In case the browser reports multiple available languages, you can use this attribute to provide a default language to vay, that will be used if no other viable language is found.

## Using Vay

