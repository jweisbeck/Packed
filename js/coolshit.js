// author: Jesse Weisbeck
(function(win, undefined){
	(function($) {
	// do cool shit in here
		
		
		// jQuery ready
		$(function() {
			// code here
			tw = {
				callback: function( tweets ) {
					
					for (var i=0, t = tweets; i < tweets.length; i++){						
						var status = tweets[i].text
							.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/gmi, function(url) {
								return '<a href="'+url+'">'+url+'</a>';
							});
						$('#main').prepend('<span class="status">' + status + '</span><br/>');
					}
					
				}
			}; // end tw obj
	
	
		}); // end DOM ready wrapper
				
	}(jQuery));	
})( window );