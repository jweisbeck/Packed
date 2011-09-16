/*
	- Additional scripts and css should be managed here.
	- loader.js will handle the loading
	- Make sure the global object name matches the name in controller!
*/

packed.scripts = {
	tweets	: 'http://www.twitter.com/statuses/user_timeline/jlweisbeck.json?callback=tw.callback&count=5'
};	


packed.styles = {
	
};

packed.jsToLoad.push(packed.scripts);
packed.cssToLoad.push(packed.styles);

packed.bodyready(function() {
	packed.loadScript( jsToLoad );
	packed.loadCSS( cssToLoad );
});
