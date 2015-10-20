(function($){

	// Check for jQuery...

	if(typeof $ == "undefined") return false;

	// Sticky Branding Bar

	var StickyOffset = 50;

	function StickyBranding() {
		var eOriginal = $('.Sticky-Original');
		$('.Sticky-Clone').css({
			'display' : ( $(window).scrollTop() >= eOriginal.offset().top - StickyOffset ? 'block' : 'none' ),
			'left' : eOriginal.offset().left,
			'width' : eOriginal.css('width')
		});
	}

	$(window).on({
		'load' : function() {
			$('.Theme-BrandingBar')
				.addClass('Sticky-Original')
				.clone()
				.insertAfter('.Theme-BrandingBar')
				.removeClass('Sticky-Original')
				.addClass('Sticky-Clone')
				.css({
					'position' : 'fixed',
					'z-index' : 9997,
					'top' : StickyOffset
				});
			StickyBranding();
		}
	});

	$(document).on({
		'touchmove' : function() { StickyBranding(); },
		'scroll' : function() { StickyBranding(); }
	});

})(jQuery);

(function($){

	var Mantra;
	var Header, HeaderClone;
	var Offset = 50;

	$(document).on({
		'ready' : function() {
			Mantra = $('#Grafik-Navbar .Mantra');
			Header = $( $('h1.Heading').get(0) );
			HeaderClone = Header.clone().appendTo('#Grafik-Navbar .Branding').css({
				'display' : 'inline-block',
				'margin' : '0 0 0 1rem',
				'line-height' : '50px',
				'vertical-align' : 'top',
				'color' : '#999999'
			}).hide();
		},
		'scroll touchmove' : function() {
			if( Header.offset().top - Offset < $(document).scrollTop() ) {
				Mantra.fadeOut(250, function() { HeaderClone.fadeIn(250); });
			} else {
				HeaderClone.fadeOut(250, function() { Mantra.fadeIn(250); });
			}
		}
	});

	$(document).on({
		'touchmove' : function() { StickyBranding(); },
		'scroll' : function() { StickyBranding(); }
	});

})(jQuery);