/* 
Author: Jesse Weisbeck, with liberally borrowed notions from Ethan Marcotte and Filament Group
 
*/
(function(win) {
	var d 		= win.document,
		html	= d.documentElement,
		head 	= d.head || d.getElementsByTagName('head')[0] || d.documentElement,
		nizr	= win.Modernizr;
	
	/*
	 - Global site object.
	 - Provide a meaningful project name and rename all references in this script
	*/
	packed = {};

	// util to extend packed object props
	packed.extend = function(obj, props) {
		// mixin object extension
		for(var i in props) {
			obj[i] = props[i];
		}
	};
	

	// decide if agent is enhanced
	var oldie = html.className.indexOf("oldIE");
	packed.enhanced =  (respond.mediaQueriesSupported || packed.oldIE);
	
	if (!packed.enhanced){
		return;
	};
	
	// add class to html elem
	html.className += " enhanced";
	
	// bodyready manager
	//callback for body-dependent scripts
	packed.bodyready = (function(){
		var callbackStack 	= [],
			checkRun		= function( callback ){
			
				if( callback ){
					callbackStack.push( callback );
				}
				
				if( d.body ){
					while( callbackStack[0] && typeof( callbackStack[0] ) === "function" ){
						callbackStack.shift().call( win );
					}
				}
				else{
					setTimeout(checkRun, 15); 
				}
			};
			return checkRun;
	})();
	
	// set to accept a single js file, or an array of files
	packed.loadScript = function(file) {
		if (!file) return;	
		var script  = d.createElement("script"),
			scripts;
		if(file instanceof Array){
			scripts = d.createDocumentFragment();
			// loop over and generate populated script elems
			for (var i=0, len = file.length; i < len; i++) {
					script  = d.createElement("script");
					script.src = file[i];
					scripts.appendChild(script);
			};

		} else {
			// one sad, lonely script elem to load
			script.src = file;
			scripts = script;	
		};
		head.appendChild(scripts);		
		
	};
	
	// set to accept a single file or an array of files
	packed.loadCSS = function(file) {
		var link = d.createElement("link"),	
			links;
			
		link.setAttribute('rel', 'stylesheet');
		
		if(file instanceof Array){
			links = d.createDocumentFragment();
			for (var i=0; i < file.length; i++) {
				link = d.createElement("link");
				link.setAttribute('rel', 'stylesheet');
				link.href = file[i];
				links.appendChild(link);
			};
		} else {
			link.href = file;
			links = link;
		}
		
		head.appendChild(links, head);
	};
	
	
	
	// Replace basic css with enhanced style sheet
	var basic = d.getElementById('basic-css');
	if(basic){
		head.removeChild(basic);
	}
	
	// Base javascripts (read: they should load site-wide) and stylesheets to load
	// I'd remove the cachebust querystring in production envs.
	var jsToLoad = [
			'js/libs/jquery-1.6.2.min.js'
			,'js/coolshit.js?cachebust='+Math.floor(Math.random()*10000000000) 
	],
		cssToLoad = [
			'http://fonts.googleapis.com/css?family=Gentium+Book+Basic:400,400italic,700,700italic'
			,'css/reset.css'
			,'css/main.css?cachebust='+Math.floor(Math.random()*10000000000)
		];
		
	
	packed.scripts = {
		tweets: [
					'http://www.twitter.com/statuses/user_timeline/jlweisbeck.json?callback=tw.callback&count=5'
				]
	};
	
	packed.styles = {
		tweets: 'css/twitterlist-styles.css?cachebust='+Math.floor(Math.random()*10000000000) 
	};
	
	// provide all possible project body classes
	packed.sections = [
		'tweets'
	]

	// go make the internet better-er
	packed.bodyready(function() {
		// loads any additional js assets defined in packed.assets
		var body = d.body,
			matched;
		for (var i=0; i < packed.sections.length; ++i) {
			if(body.className.indexOf(''+packed.sections[i]+'') >= 0  ){
			
				matchedScripts = packed.scripts[packed.sections[i]]; 
				matchedStyles = packed.styles[packed.sections[i]];
				
				// add matching js assets
				if(matchedScripts){
					if (matchedScripts instanceof Array) {
						for (var x=0; x < matchedScripts.length; ++x) {
							jsToLoad.push(matchedScripts[i]);
						}
					} else {
						jsToLoad.push(packed.scripts[packed.sections[i]]);	
					}				
				}
				
				// add matching css assets
				if(matchedStyles){
					if (matchedStyles instanceof Array) {
						for (var x=0; x < matchedStyles.length; ++x) {
							cssToLoad.push(matchedStyles[i]);
						}
					} else {
						cssToLoad.push(packed.styles[packed.sections[i]]);	
					}
				}
				
			}
		};
		
		packed.loadCSS(cssToLoad);
		packed.loadScript( jsToLoad );
	});

})(this);






