(function ($) {

	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollup').fadeIn();
			} else {
				$('.scrollup').fadeOut();
			}
		});
		$('.scrollup').click(function(){
			$("html, body").animate({ scrollTop: 0 }, 1000);
				return false;
		});
	
	// local scroll
	jQuery('.navbar').localScroll({hash:true, offset: {top: 0},duration: 800, easing:'easeInOutExpo'});
        jQuery('.register-localscroll').localScroll({hash:true, offset: {top: 0},duration: 800, easing:'easeInOutExpo'});
	
        $('.team-bio').matchHeight();
	
	// portfolio
    if($('.isotopeWrapper').length){

        var $container = $('.isotopeWrapper');
        var $resize = $('.isotopeWrapper').attr('id');
        // initialize isotope
        
        $container.isotope({
            itemSelector: '.isotopeItem',
            resizable: false, // disable normal resizing
            masonry: {
                columnWidth: $container.width() / $resize
            }


            
        });

        $('#filter a').click(function(){



            $('#filter a').removeClass('current');
            $(this).addClass('current');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 1000,
                    easing: 'easeOutQuart',
                    queue: false
                }
            });
            return false;
        });
        
        
        $(window).smartresize(function(){
            $container.isotope({
                // update columnWidth to a percentage of container width
                masonry: {
                    columnWidth: $container.width() / $resize
                }
            });
        });
        

}  


	// fancybox
	jQuery(".fancybox").fancybox();


	if (Modernizr.mq("screen and (max-width:1024px)")) {
			jQuery("body").toggleClass("body");
			
	} else {
		var s = skrollr.init({
			mobileDeceleration: 1,
			edgeStrategy: 'set',
			forceHeight: true,
			smoothScrolling: true,
			smoothScrollingDuration: 300,
				easing: {
					WTF: Math.random,
					inverted: function(p) {
						return 1-p;
					}
				}
			});	
	}



	//scroll menu
	jQuery('.appear').appear();
	jQuery(".appear").on("appear", function(data) {
			var id = $(this).attr("id");
			jQuery('.nav li').removeClass('active');
			jQuery(".nav a[href='#" + id + "']").parent().addClass("active");					
		});


		//parallax
        var isMobile = false;

        if(Modernizr.mq('only all and (max-width: 1024px)') ) {
            isMobile = true;
        }

        
        if (isMobile == false && ($('#parallax1').length  ||isMobile == false &&  $('#parallax2').length ||isMobile == false &&  $('#testimonials').length))
        {


            $(window).stellar({
                responsive:true,
                scrollProperty: 'scroll',
                parallaxElements: false,
                horizontalScrolling: false,
                horizontalOffset: 0,
                verticalOffset: 0
            });

        }
	
    //Google Map
    var get_latitude = $('#google-map').data('latitude');
    var get_longitude = $('#google-map').data('longitude');
    //var get_placeid = $('#google-map').data('placeid');
     
var get_placeid =
[
    {"placeId":"ChIJiSOO22I0cEER89ajhjCESNg", "date":"26.11.2016", "time":"18 Uhr" },
    {"placeId":"ChIJtQJVfI_jvkcRSvvXei0pAE8", "date":"30.01.2017"},
    {"placeId":"ChIJTycBaWAfv0cRfM7P6YUuzz8", "date":"03.03.2017"},
    {"placeId":"ChIJt_3Yx3fhvkcRza0WHlkmGR0", "date":"02.04.2017", "time":"17 Uhr"}
]

    function initialize_google_map() {
        var myLatlng = new google.maps.LatLng(get_latitude, get_longitude);
        var mapOptions = {
            zoom: 8,
            scrollwheel: false,
            center: myLatlng
        };
        var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
        
        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);

        get_placeid.forEach(
            function(currentValue) {
                    service.getDetails({
                        placeId: currentValue.placeId
                    }, function(place, status) {
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                        var marker = new google.maps.Marker({
                            map: map,
                            position: place.geometry.location
                        });
                        google.maps.event.addListener(marker, 'click', function() {
                            infowindow.setContent('<div><strong>' + currentValue.date + (currentValue.time != undefined ? ' - ' + currentValue.time : '') + '</strong><br>' + place.name + '<br>' + place.formatted_address);
                            infowindow.open(map, this);
                        });
                        }
                    });
            }
        );
    }
    google.maps.event.addDomListener(window, 'load', initialize_google_map);

})(jQuery);
