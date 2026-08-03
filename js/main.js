;(function () {

	'use strict';

	// iPad and iPod detection
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") !== -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") !== -1) ||
			(navigator.platform.indexOf("iPod") !== -1)
	    );
	};

	var fullHeight = function() {
		if ( !isiPad() && !isiPhone() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			})
		}


	};

	var sliderMain = function() {

	  	$('#fh5co-home .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000
	  	});

	  	$('#fh5co-home .flexslider .slides > li').css('height', $(window).height());
	  	$(window).resize(function(){
	  		$('#fh5co-home .flexslider .slides > li').css('height', $(window).height());
	  	});

	};

	var sliderSayings = function() {
		$('#fh5co-sayings .flexslider').flexslider({
			animation: "slide",
			slideshowSpeed: 5000,
			directionNav: false,
			controlNav: true,
			reverse: true
	  	});
	}

	var offcanvasMenu = function() {
		$('body').prepend('<div id="fh5co-offcanvas" />');

		$('.fh5co-main-nav .fh5co-menu-1 a').each(function(){

			var $this = $(this);

			$('#fh5co-offcanvas').append($this.clone());

		});
		// $('#fh5co-offcanvas').append
	};

	var mainMenuSticky = function() {

		var sticky = $('.js-sticky');

		sticky.css('height', sticky.height());
		$(window).resize(function(){
			sticky.css('height', sticky.height());
		});

		var $section = $('.fh5co-main-nav');

		$section.waypoint(function(direction) {

		  	if (direction === 'down') {

			    	$section.css({
			    		'position' : 'fixed',
			    		'top' : 0,
			    		'width' : '100%',
			    		'z-index' : 99999
			    	}).addClass('fh5co-shadow');;
			}
		}, {
	  		offset: '0px'
		});

		$('.js-sticky').waypoint(function(direction) {
		}, {
		  	offset: function() { return -$(this.element).height() + 69; }
		});
	};

	var mobileMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){

			var $this = $(this);

			$('body').toggleClass('fh5co-overflow offcanvas-visible');
			$this.toggleClass('active');
			event.preventDefault();
		});
	};

	var scrolledWindow = function() {

		$(window).scroll(function(){

			var scrollPos = $(this).scrollTop();


			$('#fh5co-home .fh5co-text').css({
		      'opacity' : 1-(scrollPos/300),
		      'margin-top' : (0) + (scrollPos/1)
		   });

		   $('#fh5co-home .flexslider .fh5co-overlay').css({
				'opacity' : (.5)+(scrollPos/2000)
		   });

		   if (scrollPos > 300) {
				$('#fh5co-home .fh5co-text').css('display', 'none');
			} else {
				$('#fh5co-home .fh5co-text').css('display', 'block');
			}

			 var btn = $('.btn.btn-primary.btn-outline.no-underline');

                if (scrollPos > 100) {
                  btn.addClass('scrolled');
                } else {
                  btn.removeClass('scrolled');
                }
		});

		$(window).resize(function() {
			if ( $('body').hasClass('offcanvas-visible') ) {
		   	$('body').removeClass('offcanvas-visible');
		   	$('.js-fh5co-nav-toggle').removeClass('active');
		   }
		});

	};

	var goToTop = function() {
		// Търсим бутона по неговото ID
		var btn = $('#button-up');

		// Показване и скриване при скролване
		$(window).scroll(function() {
			if ($(window).scrollTop() > 300) {
				btn.addClass('show');
			} else {
				btn.removeClass('show');
			}
		});

		// Връщане в най-горно положение при клик
		btn.on('click', function(event){
			event.preventDefault();

			$('html, body').animate({
				scrollTop: 0 // Скролва точно до нулата (най-горе)
			}, 500);

			return false;
		});
	};

	// Page Nav
	var clickMenu = function() {
		var topVal = ( $(window).width() < 769 ) ? 0 : 58;

		$(window).resize(function(){
			topVal = ( $(window).width() < 769 ) ? 0 : 58;
		});
		$('.fh5co-main-nav a:not([class="external"]), #fh5co-offcanvas a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section');

				if ( $('div[data-section="' + section + '"]').length ) {

					$('html, body').animate({
			        	scrollTop: $('div[data-section="' + section + '"]').offset().top - topVal
			    	}, 500);

			   }

		    event.preventDefault();

		    // return false;
		});
        // Close menu on nav link click (for mobile)
        $('#fh5co-offcanvas a').on('click', function(){
            if ($('.js-fh5co-nav-toggle').is(':visible')) {
                $('.js-fh5co-nav-toggle').trigger('click');
            }
        });
	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

      $('.fh5co-main-nav [data-nav-section], #fh5co-offcanvas [data-nav-section]')
        .removeClass('active');

      $('.fh5co-main-nav, #fh5co-offcanvas')
        .find('[data-nav-section="'+section+'"]')
        .addClass('active');

    };

	var navigationSection = function() {

		var $section = $('div[data-section]');

		$section.waypoint(function(direction) {
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}

		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};


	// Animations
	var homeAnimate = function() {
		if ( $('#fh5co-home').length > 0 ) {

			$('#fh5co-home').waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						$('#fh5co-home .to-animate').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 200);


					$(this.element).addClass('animated');

				}
			} , { offset: '80%' } );

		}
	};

	var aboutAnimate = function() {
		var about = $('#fh5co-about');
		if ( about.length > 0 ) {

			about.waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						about.find('.to-animate').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 200);

					setTimeout(function() {
						about.find('.to-animate-2').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeIn animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 200);



					$(this.element).addClass('animated');

				}
			} , { offset: '80%' } );

		}
	};

	var sayingsAnimate = function() {
		var sayings = $('#fh5co-sayings');
		if ( sayings.length > 0 ) {

			sayings.waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						sayings.find('.to-animate').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 200);


					$(this.element).addClass('animated');

				}
			} , { offset: '80%' } );

		}
	};

	var featureAnimate = function() {
		var feature = $('#fh5co-featured');
		if ( feature.length > 0 ) {

			feature.waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						feature.find('.to-animate').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 200);

					setTimeout(function() {
						feature.find('.to-animate-2').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('bounceIn animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 500);


					$(this.element).addClass('animated');

				}
			} , { offset: '80%' } );

		}
	};

	var typeAnimate = function() {
		var type = $('#fh5co-type');
		if ( type.length > 0 ) {

			type.waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						type.find('.to-animate').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 200);

					$(this.element).addClass('animated');

				}
			} , { offset: '80%' } );

		}
	};

	var menusAnimate = function() {
		var menus = $('#fh5co-menus');
		if ( menus.length > 0 ) {

			menus.waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						menus.find('.to-animate').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 200);

					setTimeout(function() {
						menus.find('.to-animate-2').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeIn animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 500);

					$(this.element).addClass('animated');

				}
			} , { offset: '80%' } );

		}
	};


	var eventsAnimate = function() {
		var events = $('#fh5co-events');
		if ( events.length > 0 ) {

			events.waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						events.find('.to-animate').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeIn animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 200);

					setTimeout(function() {
						events.find('.to-animate-2').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 500);

					$(this.element).addClass('animated');

				}
			} , { offset: '80%' } );

		}
	};

	var reservationAnimate = function() {
		var contact = $('#fh5co-contact');
		if ( contact.length > 0 ) {

			contact.waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						contact.find('.to-animate').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeIn animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 200);

					setTimeout(function() {
						contact.find('.to-animate-2').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 500);

					$(this.element).addClass('animated');

				}
			} , { offset: '80%' } );

		}
	};

	var footerAnimate = function() {
		var footer = $('#fh5co-footer');
		if ( footer.length > 0 ) {

			footer.waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						footer.find('.to-animate').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeIn animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 200);

					setTimeout(function() {
						footer.find('.to-animate-2').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 500);

					$(this.element).addClass('animated');

				}
			} , { offset: '80%' } );

		}
	};

	var header = function() {
    		$(window).scroll(function(){
    			var st = $(window).scrollTop();
    			if (st > 50) {
    				$('.gtco-nav').addClass('scrolled');
    			} else {
    				$('.gtco-nav').removeClass('scrolled');
    			}
    		});
    	};

	var parallax = function () {
		$(window).stellar({
			responsive: true,
			horizontalScrolling: false,
			verticalScrolling: true
		});
	};

// go to top button
  document.addEventListener("DOMContentLoaded", function () {
      const scrollBtn = document.querySelector(".sp-scroll-up");

      window.addEventListener("scroll", function () {
          if (window.scrollY > 100) {
              scrollBtn.classList.add("show");
          } else {
              scrollBtn.classList.remove("show");
          }
      });

      scrollBtn.addEventListener("click", function (e) {
          e.preventDefault();
          window.scrollTo({
              top: 0,
              behavior: "smooth"
          });
      });
  });


var btn = $('#button-up');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});
	// Document on load.
	$(function(){

		fullHeight();
		sliderMain();
		sliderSayings();
		offcanvasMenu();
		mainMenuSticky();
		mobileMenu();
		scrolledWindow();
		clickMenu();
		navigationSection();
		goToTop();
		header();
		parallax();


		// Animations
		homeAnimate();
		aboutAnimate();
		sayingsAnimate();
		featureAnimate();
		typeAnimate();
		menusAnimate();
		eventsAnimate();
		reservationAnimate();
		footerAnimate();
	});

}());