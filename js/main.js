(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	var carousel = function() {
		$('.featured-carousel').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:30,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:true,
	    dots: true,
	    autoplayHoverPause: false,
	    items: 3,
		responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:2
	      },
	      1000:{
	        items:4
	      }
	    }
		});
		$( ".owl-prev").html('<i class="fal fa-arrow-left"></i>');
		$( ".owl-next").html('<i class="fal fa-arrow-right"></i>');
	};
	carousel();

})(jQuery);