# A front-end starter 'packed' with a js/css loader


## What is this for?

Basically, I wanted a reusable starting place for projects that enables progressive enhancement through feature detection
and allows packaging assets conditionally, so I can control which package of assets are loaded on a particular page.

loader.js is at the heart of this boilerplate. Using Modernizr and Respond.js it decides of a browser is 'enhanced', and if
so, carries on conditionally loading various js and css assets that I define. The html template includes a basic.css file that
will be served to browsers incapable of using javascript, so they get a fair experience. If loader.js determines the browser
is enhanced, it removes this basic stylesheet and loads the stylesheets I defined later on in that script.

loader.js also defines it's own bodyready function and does not rely on a library. I wanted to control the loading of libraries
(like jQuery) to ensure that only browsers deemed 'enhanced' receive it, ensuring a reasonable experience for less-featured
devices.

## How to use

* index.html
 These three lines are required in the head 

<code>
<link rel="stylesheet" href="css/basic.css" id="basic-css">
<script src="js/libs/common.js"></script>
<script src="js/loader.js"></script>
</code>

The body class (tweets here as an example) is the key that loader.js will use to conditionally load other js/css.


* js/loader.js
loader.js defines two arrays, jsToLoad and cssToLoad, that list any site-wide assets.

in packed.scripts and packed.styles are key/value pairs that load assets based on a body class. The key should be named
the same as the body class on the corresponding html document you want to load the assets on.

Note that the reset.css and main.css stylesheets are a common use-case foundation, and the google font was thrown in for fun
just as an example of how this starter can be used. The twitter script was also used as just an example.

* js/coolshit.js and css/twitterlist-styles.css

This is an example script where developers would write specific javascript for the site. The file is merely an example and
it could be included site-wide in jsToLoad, or it could be added to packed.scripts and loaded conditionally on a specific HTML
document

twitterlist-styles.css is likewise and example of a conditionally loaded stylesheet that is only used in an HTML document 
with a body tag class of "tweets".



