
# Vay.js

  

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org) [![Version](https://img.shields.io/badge/version-1.0.0-informational?style=flat-square)]()

  
  

Vay is a lightweight (2kb minified) & dependency free i18n provider.

## Getting started
 

### Installing Vay

  

To use Vay, include it in your project as a module.

  

```HTML

<script type="module" src="./your/path/to/vay.min.js" ></script>

```

```HTML

<script type="module" src="https://vay.now.sh/dist/vay.min.js"></script>

```

  

### Creating a new Instance

  

You can add a shadow on any HTML element just like this:

  

```HTML

<h1  class="flatShadow">I'll have a shadow!</h1>

```

  

Shadows added this way can be styled with custom attributes. Learn more about attributes.

  

```HTML

<h1  class="flatShadow"  flatShadow-Angle="45deg"  flatShadow-Blur="4">

``

  

You can also add a Shadow using Javascript:

  

```JS

let shadow = new FlatShadow(document.querySelector(".add-shadow"))

```

  

Shadows added with Javascript can be styled with an optional Object. The keys are identical to the HTML attributes, just without the "flatShadow"-prefix:

  

```JS

let  options  = {

angle:"45deg",

length: 100,

enableTracking: true,

}

  

let  shadow  =  new  FlatShadow(document.querySelector(".add-shadow"), options)

```

  

## API & Attributes

  

Attributes are used to style the Shadow. There are three different ways to style the Shadows, depending on how you create the Shadow. You can use custom HTML-Attributes, a options catalouge when creating the Shadow with JavaScript, or use the provided Methods directly on the created Shadow object. Mixing and matching is possible, which makes flatShadow super flexible.

  

### Angle &lt;Number&gt;

```HTML

<elem  flatshadow-angle="45">

```

  

```JS

// set the angle of the shadow in the options object provided to the constructor

let  options  = { angle: 45 }

```

  

```JS

// set the angle directly on the shadow using a setter

shadow.angle  =  45

```

  

The angle attribute describes the angle of the shadow. 0° is straigt down, 180° is straight up. The default angle is 45deg.

  

### Length &lt;Number&gt;

  

```HTML

<elem  flatshadow-shadowlength="1000">

```

  

```JS

// set the length of the shadow in the options object provided to the constructor

let  options  = { shadowLength: 1000 }

```

  

```JS

// set the length directly on the shadow using a setter

shadow.shadowLength  =  1000

```

  

The length attributes sets the number of steps for the shadow. The more steps, the longer the shadow will be. The default is 1000 steps. If you're having trouble with perfomance, this is one of the first attributes you should lower.

  

### Stepsize &lt;Number&gt;

  

```HTML

<elem  flatshadow-step="2">

```

  

```JS

// set the stepsize of the shadow in the options object provided to the constructor

let  options  = { step: 2 }

```

  

```JS

// set the stepsize directly on the shadow using a setter

shadow.step  =  2

```

The step size attribute sets the space between the calculated steps. The default value is 2, which means about 2px per step. You can increase this to get a more stylistic looking shadow or to increase perfomance. The amount of shadows drawn is calculated by dividing the length through the step.

  

### Blur &lt;Number&gt;

  

```HTML

<elem  flatshadow-blur="0">

```

  

```JS

// set the blur of the shadow in the options object provided to the constructor

let  options  = { blur: 0 }

```

  

```JS

// set the blur directly on the shadow using a setter

shadow.blur  =  0

```

  

The blur attribute describes the blur radius of the shadow, or the softness. The default is 0, this creates a sharp shadow. Increase the blur to soften the shadows edges.

  

### Color &lt;String&gt;

  

```HTML

<elem  flatshadow-color="rgba(0,0,0,0.3)">

```

  

```JS

// set the color of the shadow in the options object provided to the constructo

let  options  = { color:"rgba(0,0,0,0.3)" }

```

  

```JS

// set the color directly on the shadow using a setter

shadow.blur  =  "rgba(0,0,0,0.3)"

```

  

You can use the color attribute to set the color of the shadow. Usually flatShadow will try to extract the color of the Parent element and make it slightly darker, but this depends on the parent element having a background color. Sometimes you also just want to have a darker or lighter or just different color. RGBA is advised, however, in theory any color system should work.

  

### Hover &lt;Boolean&gt;

  

```HTML

<elem  flatshadow-hover="false">

```

  

```JS

// set the hover of the shadow in the options object provided to the constructor

let  options  = { hover: "false" }

```

  

```JS

// set the hover directly on the shadow using a setter

shadow.hover  =  "false"

```

Set the hover attribute to true to have the shadow only appear on a hover. The default is false. If you want to transition the hover, you can add the transition using normal CSS rules.

  

### Tracking Shadow &lt;Boolean&gt;

  

```HTML

<elem  flatshadow-trackingenabled="false">

```

  

```JS

// set the tracking state of the shadow in the options object provided to the constructor

let  options  = { trackingEnabled: "false" }

```

  

```JS

// set the tracking directly on the shadow using a setter

shadow.trackingEnabled  =  "false"

```

  

Enable tracking to have the shadow angle follow the mouse. This gives the impression that your mouse cursor is the source of light for the shadow. This attribute is very perfomance hungry, experiment with step size and shadow length to get a smooth result. This is disabled by default, and will not work even if set to true on mobile and touch devices.

  

### Forcing a text-shadow &lt;Boolean&gt;

  

```HTML

<elem  flatshadow-forcetext="false">

```

  

```JS

// set the shadow type of the shadow in the options object provided to the constructor

let  options  = { forceText: "false" }

```

  
  

FlatShadow will try to detect if the shadow should be a box or a text shadow. Sometimes this is not intended, or fails. You can use this method to force a text shadow on an element. This is disabled by default.

  

### Debug &lt;Boolean&gt;

  

```HTML

<elem  flatshadow-debug="false">

```

  

```JS

// enable the debug in the options object provided to the constructor

let  options  = { debug: "false" }

```

  

This attribute will, when set to true, cause the created shadow object to be loggeg to the console. You can use this to look at the properties, or to debug if something is not going as planned. This is disabled by default.

  

## License

  

flatshadow.js is licensed under the MIT License# Vay.js

  

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

[![Version](https://img.shields.io/badge/version-1.0.0-informational?style=flat-square)]()

  
  

Vay is a lightweight (2kb minified) & dependency free i18n provider.

  

Get it here: <a  href="https://flatshadow.vercel.app"  alt="flatshadow website"  target="_blank"  rel="norefferer noopener">flatshadow.vercel.app</a>

  
  

## Getting started

  

Download, or link the flatshadow file, whatever works best for you.

  

## Use it

  

### Installing FlatShadow

  

To use FlatShadow, include it in your project

  

```HTML

<script  src="./your/path/to/flatshadow.min.js" ></script>

```

```HTML

<script  src="https://flatshadow.now.sh/dist/flatShadow.min.js" ></script>

```

  

### Creating a Shadow

  

You can add a shadow on any HTML element just like this:

  

```HTML

<h1  class="flatShadow">I'll have a shadow!</h1>

```

  

Shadows added this way can be styled with custom attributes. Learn more about attributes.

  

```HTML

<h1  class="flatShadow"  flatShadow-Angle="45deg"  flatShadow-Blur="4">

``

  

You can also add a Shadow using Javascript:

  

```JS

let shadow = new FlatShadow(document.querySelector(".add-shadow"))

```

  

Shadows added with Javascript can be styled with an optional Object. The keys are identical to the HTML attributes, just without the "flatShadow"-prefix:

  

```JS

let  options  = {

angle:"45deg",

length: 100,

enableTracking: true,

}

  

let  shadow  =  new  FlatShadow(document.querySelector(".add-shadow"), options)

```

  

## API & Attributes

  

Attributes are used to style the Shadow. There are three different ways to style the Shadows, depending on how you create the Shadow. You can use custom HTML-Attributes, a options catalouge when creating the Shadow with JavaScript, or use the provided Methods directly on the created Shadow object. Mixing and matching is possible, which makes flatShadow super flexible.

  

### Angle &lt;Number&gt;

```HTML

<elem  flatshadow-angle="45">

```

  

```JS

// set the angle of the shadow in the options object provided to the constructor

let  options  = { angle: 45 }

```

  

```JS

// set the angle directly on the shadow using a setter

shadow.angle  =  45

```

  

The angle attribute describes the angle of the shadow. 0° is straigt down, 180° is straight up. The default angle is 45deg.

  

### Length &lt;Number&gt;

  

```HTML

<elem  flatshadow-shadowlength="1000">

```

  

```JS

// set the length of the shadow in the options object provided to the constructor

let  options  = { shadowLength: 1000 }

```

  

```JS

// set the length directly on the shadow using a setter

shadow.shadowLength  =  1000

```

  

The length attributes sets the number of steps for the shadow. The more steps, the longer the shadow will be. The default is 1000 steps. If you're having trouble with perfomance, this is one of the first attributes you should lower.

  

### Stepsize &lt;Number&gt;

  

```HTML

<elem  flatshadow-step="2">

```

  

```JS

// set the stepsize of the shadow in the options object provided to the constructor

let  options  = { step: 2 }

```

  

```JS

// set the stepsize directly on the shadow using a setter

shadow.step  =  2

```

The step size attribute sets the space between the calculated steps. The default value is 2, which means about 2px per step. You can increase this to get a more stylistic looking shadow or to increase perfomance. The amount of shadows drawn is calculated by dividing the length through the step.

  

### Blur &lt;Number&gt;

  

```HTML

<elem  flatshadow-blur="0">

```

  

```JS

// set the blur of the shadow in the options object provided to the constructor

let  options  = { blur: 0 }

```

  

```JS

// set the blur directly on the shadow using a setter

shadow.blur  =  0

```

  

The blur attribute describes the blur radius of the shadow, or the softness. The default is 0, this creates a sharp shadow. Increase the blur to soften the shadows edges.

  

### Color &lt;String&gt;

  

```HTML

<elem  flatshadow-color="rgba(0,0,0,0.3)">

```

  

```JS

// set the color of the shadow in the options object provided to the constructo

let  options  = { color:"rgba(0,0,0,0.3)" }

```

  

```JS

// set the color directly on the shadow using a setter

shadow.blur  =  "rgba(0,0,0,0.3)"

```

  

You can use the color attribute to set the color of the shadow. Usually flatShadow will try to extract the color of the Parent element and make it slightly darker, but this depends on the parent element having a background color. Sometimes you also just want to have a darker or lighter or just different color. RGBA is advised, however, in theory any color system should work.

  

### Hover &lt;Boolean&gt;

  

```HTML

<elem  flatshadow-hover="false">

```

  

```JS

// set the hover of the shadow in the options object provided to the constructor

let  options  = { hover: "false" }

```

  

```JS

// set the hover directly on the shadow using a setter

shadow.hover  =  "false"

```

Set the hover attribute to true to have the shadow only appear on a hover. The default is false. If you want to transition the hover, you can add the transition using normal CSS rules.

  

### Tracking Shadow &lt;Boolean&gt;

  

```HTML

<elem  flatshadow-trackingenabled="false">

```

  

```JS

// set the tracking state of the shadow in the options object provided to the constructor

let  options  = { trackingEnabled: "false" }

```

  

```JS

// set the tracking directly on the shadow using a setter

shadow.trackingEnabled  =  "false"

```

  

Enable tracking to have the shadow angle follow the mouse. This gives the impression that your mouse cursor is the source of light for the shadow. This attribute is very perfomance hungry, experiment with step size and shadow length to get a smooth result. This is disabled by default, and will not work even if set to true on mobile and touch devices.

  

### Forcing a text-shadow &lt;Boolean&gt;

  

```HTML

<elem  flatshadow-forcetext="false">

```

  

```JS

// set the shadow type of the shadow in the options object provided to the constructor

let  options  = { forceText: "false" }

```

  
  

FlatShadow will try to detect if the shadow should be a box or a text shadow. Sometimes this is not intended, or fails. You can use this method to force a text shadow on an element. This is disabled by default.

  

### Debug &lt;Boolean&gt;

  

```HTML

<elem  flatshadow-debug="false">

```

  

```JS

// enable the debug in the options object provided to the constructor

let  options  = { debug: "false" }

```

  

This attribute will, when set to true, cause the created shadow object to be loggeg to the console. You can use this to look at the properties, or to debug if something is not going as planned. This is disabled by default.

  

## License

  

flatshadow.js is licensed under the MIT License