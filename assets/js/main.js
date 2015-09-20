
(function($) {

	skel.breakpoints({
		wide: '(max-width: 1680px)',
		normal: '(max-width: 1280px)',
		narrow: '(max-width: 980px)',
		narrower: '(max-width: 840px)',
		mobile: '(max-width: 736px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');

			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');


			$('form').placeholder();

			skel.on('+narrower -narrower', function() {
				$.prioritize(
					'.important\\28 narrower\\29',
					skel.breakpoint('narrower').active
				);
			});


			$('.scrolly').scrolly({
				speed: 1000,
				offset: -10
			});

			$('#nav > ul').dropotron({
				mode: 'fade',
				noOpenerFade: true,
				expandMode: (skel.vars.touch ? 'click' : 'hover')
			});


				$(
					'<div id="navButton">' +
						'<a href="#navPanel" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);

				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#navButton, #navPanel, #page-wrapper')
						.css('transition', 'none');


			if (!skel.vars.mobile
			&&	$header.hasClass('alt')
			&&	$banner.length > 0) {

				$window.on('load', function() {

					$banner.scrollwatch({
						delay:		0,
						range:		1,
						anchor:		'top',
						on:			function() { $header.addClass('alt reveal'); },
						off:		function() { $header.removeClass('alt'); }
					});

				});

			}

	});

})(jQuery);


               
            // items trending
 
			$.ajax({
				    type: "POST",
  					dataType: 'jsonp',
			        url: "http://api.walmartlabs.com/v1/trends?format=json&apiKey=wu2exkj3jzxmwfp82e6dbm6h"
			 }).then(function(data) {

			 	document.getElementById("trending").innerHTML = "Trending: ";
			 	table = "<table cellpadding='20' width='100%'><tr>";
			 	for(i=0;i<5;i++){
				 	if(data.items[i].mediumImage){
				 	console.log(data.items[i].mediumImage);
				  	table += "<td  width='20%'><img src='" + data.items[i].mediumImage + "'></td>";
				    }
				}

                table += "</tr><tr>";

			    for(i=0;i<5;i++){
				 	  
				 	  	var str = data.items[i].shortDescription + data.items[i].longDescription + data.items[i].name;
				 	  	var score = 0 ;
				 	  	if(str){
	                        var creterion1 = Number(str.search("saves water"));
						    if (creterion1 < 0 ) {
						    	creterion1 = 0;
						    }
						    var creterion2 = Number(str.search("water efficient"));
						     if (creterion2 < 0 ) {
						    	creterion2 = 0;
						    }
						    var creterion3 = Number(str.search("less water"));
						      if (creterion3 < 0 ) {
						    	creterion3 = 0;
					    	}
					    	var creterion4 = Number(str.search("water"));
						      if (creterion4 < 0 ) {
						    	creterion4 = 0;
					    	}
					    score = Number(creterion1 + creterion2 + creterion3 + creterion4);
					    }	
					   
					  
					    table += "<td>Score: " + score + "</td>";		
                }

				
				table += "</tr></table>";
				document.getElementById("trending").innerHTML += table;


	    	});
           

            function search(){
            	document.getElementById("results").innerHTML = "";
				$.ajax({
					    type: "POST",
	  					dataType: 'jsonp',
				        url: "http://api.walmartlabs.com/v1/search?query=" + $('#search_item').val() + "&format=json&apiKey=wu2exkj3jzxmwfp82e6dbm6h"
				 }).then(function(data) {
				 	  console.log(data);
				 	  table = "<table width='100%'><tr>";

				 	  for(i=0;i<5;i++){

				 	  	table += "<td width='20%'>" + "<img src='" + data.items[i].thumbnailImage + "'>" + "</td>";
				 	  }

				 	  table += "</tr><tr>";	
				 	  
				 	  for(i=0;i<5;i++){

				 	  	table += "<td>" + data.items[i].name + "</td>";
				 	  }
				 	  table += "</tr><tr>";
				 	  for(i=0;i<5;i++){	
				 	  	var str = data.items[i].shortDescription + data.items[i].longDescription + data.items[i].name; 
				 	  	var score = 0;
				 	  	if(str){
	                        var creterion1 = Number(str.search("saves water"));
						    if (creterion1 < 0 ) {
						    	creterion1 = 0;
						    }
						    var creterion2 = Number(str.search("water efficient"));
						     if (creterion2 < 0 ) {
						    	creterion2 = 0;
						    }
						    var creterion3 = Number(str.search("less water"));
						      if (creterion3 < 0 ) {
						    	creterion3 = 0;
					    	}
					    	var creterion4 = Number(str.search("water"));
						      if (creterion4 < 0 ) {
						    	creterion4 = 0;
					    	}
					    score = Number(creterion1 + creterion2 + creterion3 + creterion4);
						} 
					    table += "<td>Score: " + score + "</td>";				 	  	
				 	  }

				 	  
				 	  	 		
				 	  table += "</tr></table>";
				      document.getElementById("results").innerHTML = table;
				 }); 
            }