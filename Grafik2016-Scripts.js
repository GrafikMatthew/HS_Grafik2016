/*

.o8888 .o8888 8888o. 88 8888o. 888888 .o8888
88     88     88  88 88 88  88   88   88    
'Y88o. 88     8888Y' 88 8888Y'   88   'Y88o.
    88 88     88  88 88 88       88       88
8888Y' 'Y8888 88  88 88 88       88   8888Y'

*/

(function($){

	// Check for jQuery...

	if(typeof $ == "undefined") return false;

	// AudioPlayers

	function Theme_AudioPlayers_Load() {
		$(".AudioPlayer").each(function(i){
			(function(This_AudioPlayer, i){
				This_AudioPlayer.data("progress", 0);
				window.setInterval(function(){
					var Progress = parseFloat(parseFloat(This_AudioPlayer.data("progress")) + ((i + 1) / 10)).toFixed(2);
					if(Progress >= 100) Progress = 0;
					This_AudioPlayer.data("progress", Progress);
					if(Progress < 50) {
						This_AudioPlayer.find(".Progress-1").css({
							"z-index" : "1",
							"-webkit-transform" : "rotate("+(360 * (Progress / 100))+"deg)",
							"-moz-transform" : "rotate("+(360 * (Progress / 100))+"deg)",
							"-ms-transform" : "rotate("+(360 * (Progress / 100))+"deg)",
							"-o-transform" : "rotate("+(360 * (Progress / 100))+"deg)",
							"transform" : "rotate("+(360 * (Progress / 100))+"deg)"
						});
						This_AudioPlayer.find(".Progress-2").css({
							"background-color" : This_AudioPlayer.find(".Track").css("background-color"),
							"z-index" : "2",
							"-webkit-transform" : "rotate(0deg)",
							"-moz-transform" : "rotate(0deg)",
							"-ms-transform" : "rotate(0deg)",
							"-o-transform" : "rotate(0deg)",
							"transform" : "rotate(0deg)"
						});
					} else {
						This_AudioPlayer.find(".Progress-1").css({
							"z-index" : "2",
							"-webkit-transform" : "rotate(180deg)",
							"-moz-transform" : "rotate(180deg)",
							"-ms-transform" : "rotate(180deg)",
							"-o-transform" : "rotate(180deg)",
							"transform" : "rotate(180deg)"
						});
						This_AudioPlayer.find(".Progress-2").css({
							"background-color" : This_AudioPlayer.find(".Progress-1").css("background-color"),
							"z-index" : "1",
							"-webkit-transform" : "rotate("+(360 * (Progress / 100))+"deg)",
							"-moz-transform" : "rotate("+(360 * (Progress / 100))+"deg)",
							"-ms-transform" : "rotate("+(360 * (Progress / 100))+"deg)",
							"-o-transform" : "rotate("+(360 * (Progress / 100))+"deg)",
							"transform" : "rotate("+(360 * (Progress / 100))+"deg)"
						});
					}
				}, 15);
			})($(this), i);
		});
	}

	// ContactForm

	function Theme_ContactForm_Reset() {
		// Reset Selected Path...
		$('.Theme-ContactForm .Step01')
			.removeClass('Selected-HireGrafik')
			.removeClass('Selected-HireMe');
		// Hide Steps...
		$('.Theme-ContactForm .Step02').hide();
		$('.Theme-ContactForm .Step03').hide();
		// Hide Types...
		$('.Theme-ContactForm .Type01').hide();
		$('.Theme-ContactForm .Type02').hide();
		// Reset Radios...
		$('.Theme-ContactForm input[type="radio"]').prop('checked', false);
	}
	function Theme_ContactForm_Load() {
		Theme_ContactForm_Reset();
		// Step01...
		$(".Theme-ContactForm .Step01 .Button01").on("click", function() {
			Theme_ContactForm_Reset();
			$('.Theme-ContactForm .Step01').addClass('Selected-HireGrafik');
			$('.Theme-ContactForm .Type01').show();
			$(".Theme-ContactForm .Step02").fadeIn();
		});
		$(".Theme-ContactForm .Step01 .Button02").on("click", function() {
			Theme_ContactForm_Reset();
			$('.Theme-ContactForm .Step01').addClass('Selected-HireMe');
			$(".Theme-ContactForm .Type02").show();
			$(".Theme-ContactForm .Step02").fadeIn();
		});
		// Step02...
		$(".Theme-ContactForm .Step02 label").on("click", function() {
			setTimeout(function() {
				if($(".Theme-ContactForm .Step02 .Type01:visible").length > 0) {
					if($(".Theme-ContactForm .Step02 .Type01 input[name=ContactForm-Step02-Type01-Radio01]:checked").length > 0) {
						// if($(".Theme-ContactForm .Step02 .Type01 input[name=ContactForm-Step02-Type01-Radio02]:checked").length > 0) {
							$(".Theme-ContactForm .Step03").fadeIn("500", function() {
								try { $(document).foundation('slider', 'reflow'); }
								catch(e) { console.error(e); console.info("$(document).foundation('slider', 'reflow'); was called before Foundation was initialized!"); }
							});
						// }
					}
				} else {
					if($(".Theme-ContactForm .Step02 .Type02 input[name=ContactForm-Step02-Type02-Radio01]:checked").length > 0) {
						$(".Theme-ContactForm .Step03").fadeIn("500", function() {
							try { $(document).foundation('slider', 'reflow'); }
							catch(e) { console.error(e); }
						});
					}
				}
			}, 100);
		});
		// Step03...
		navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
		if (navigator.vibrate) $('.range-slider-handle').on("touchstart", function() { navigator.vibrate(100); });
		$('#ContactForm-Step03-Type01-Slider01-Raw').on('DOMSubtreeModified', function() {
			var ThisHTML = parseFloat($(this).html()).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
			$( "#" + $(this).data("display") ).html( "$" + ThisHTML );
		});
		$('#Attachment-Type02').on("click", function() {
			$('#Grafik2016-EmployeeForm form [name="resume"]').trigger("click");
		});
		// Submit...
		$("#Submit-Type01").on("click", function() {
			$('#Grafik2016-ClientForm form [name="hire_us_for"] option').prop("selected", false);
			$('#Grafik2016-ClientForm form [name="hire_us_for"] [value="'+$('.ContactForm .Step02 .Type01 [name="ContactForm-Step02-Type01-Radio01"]:checked').val()+'"]').prop("selected",true);
			$('#Grafik2016-ClientForm form [name="hire_us_to"] option').prop("selected", false);
			$('#Grafik2016-ClientForm form [name="hire_us_to"] [value="'+$('.ContactForm .Step02 .Type01 [name="ContactForm-Step02-Type01-Radio02"]:checked').val()+'"]').prop("selected", true);
			$('#Grafik2016-ClientForm form [name="firstname"]').val( $('.ContactForm .Step03 .Type01 [name="ContactForm-Step03-Type01-Text01"]').val() );
			$('#Grafik2016-ClientForm form [name="lastname"]').val( $('.ContactForm .Step03 .Type01 [name="ContactForm-Step03-Type01-Text02"]').val() );
			$('#Grafik2016-ClientForm form [name="email"]').val( $('.ContactForm .Step03 .Type01 [name="ContactForm-Step03-Type01-Text03"]').val() );
			$('#Grafik2016-ClientForm form [name="phone"]').val( $('.ContactForm .Step03 .Type01 [name="ContactForm-Step03-Type01-Text04"]').val() );
			$('#Grafik2016-ClientForm form [name="company"]').val( $('.ContactForm .Step03 .Type01 [name="ContactForm-Step03-Type01-Text05"]').val() );
			$('#Grafik2016-ClientForm form [name="website"]').val( $('.ContactForm .Step03 .Type01 [name="ContactForm-Step03-Type01-Text06"]').val() );
			$('#Grafik2016-ClientForm form [name="message"]').val( $('.ContactForm .Step03 .Type01 [name="ContactForm-Step03-Type01-Text07"]').val() );
			$('#Grafik2016-ClientForm form [name="project_details"]').val(
				"Budget: " + $('.ContactForm .Step03 .Type01 .Budget .range-slider').attr('data-slider') +
				"\nTimeline: " + ["Now", "6 Months", "9 Months", "1 Year"][$('.ContactForm .Step03 .Type01 .Timeline .range-slider').attr('data-slider')]
			);
			$('#Grafik2016-ClientForm form').get(0).submit();
		});
		$("#Submit-Type02").on("click", function() {
			$('#Grafik2016-EmployeeForm form [name="hire_me_as"] option').prop("selected", false);
			$('#Grafik2016-EmployeeForm form [name="hire_me_as"] [value="'+$('.ContactForm .Step02 .Type02 [name="ContactForm-Step02-Type02-Radio01"]:checked').val()+'"]').prop("selected", true);
			$('#Grafik2016-EmployeeForm form [name="firstname"]').val( $('.ContactForm .Step03 .Type02 [name="ContactForm-Step03-Type02-Text01"]').val() );
			$('#Grafik2016-EmployeeForm form [name="lastname"]').val( $('.ContactForm .Step03 .Type02 [name="ContactForm-Step03-Type02-Text02"]').val() );
			$('#Grafik2016-EmployeeForm form [name="email"]').val( $('.ContactForm .Step03 .Type02 [name="ContactForm-Step03-Type02-Text03"]').val() );
			$('#Grafik2016-EmployeeForm form [name="phone"]').val( $('.ContactForm .Step03 .Type02 [name="ContactForm-Step03-Type02-Text04"]').val() );
			$('#Grafik2016-EmployeeForm form [name="website"]').val( $('.ContactForm .Step03 .Type02 [name="ContactForm-Step03-Type02-Text05"]').val() );
			$('#Grafik2016-EmployeeForm form [name="message"]').val( $('.ContactForm .Step03 .Type02 [name="ContactForm-Step03-Type02-Text06"]').val() );
			$('#Grafik2016-EmployeeForm form').get(0).submit();
		});
	}

	// Template - Orientation Detection

	function Theme_DetectOrientation() {
		var ThisHTML = $('html');
		var safeWidth = window.innerWidth || document.body.clientWidth;
		var safeHeight = window.innerHeight || document.body.clientHeight;
		if(safeHeight > safeWidth) {
			if(ThisHTML.hasClass('landscape')) ThisHTML.removeClass('landscape');
			if(!ThisHTML.hasClass('portrait')) ThisHTML.addClass('portrait');
		} else {
			if(ThisHTML.hasClass('portrait')) ThisHTML.removeClass('portrait');
			if(!ThisHTML.hasClass('landscape')) ThisHTML.addClass('landscape');
		}
	}

	// Template - NoJS

	function Theme_RemoveNoJS() {
		$("html").removeClass("no-js");
	}

	// Template - Mobile Menu

	function Theme_MobileMenu() {
		$("#Grafik-Navbar .Stack").on("click", function() {
			$(".Theme-TemplateHeader").toggleClass("active");
		});
	}

	// Template - Search Box Placeholder Text

	function Theme_SearchPlaceholder() {
		$("#hs-search-module .hs-input").attr("placeholder", "Search");
	}

	// Template - Branding Bar

	function Theme_BrandingBar() {
		$('.Theme-BrandingBar').remove();
		var SelectSections = $('section.Override-BrandingBar');
		var Section_BrandingBar = $('<section />').insertAfter(SelectSections).addClass( 'Theme-Widget Theme-BrandingBar' );
		var Section_BrandingBar_Interior = $('<div />').appendTo(Section_BrandingBar).addClass( 'row Theme-Interior' );
		$( '<a/>' ).appendTo( Section_BrandingBar_Interior ).addClass( 'column small-6 medium-3' ).attr( 'href', '/branding' ).html( 'Branding' );
		$( '<a/>' ).appendTo( Section_BrandingBar_Interior ).addClass( 'column small-6 medium-3' ).attr( 'href', '/branding/strategy' ).html( 'Strategy' );
		$( '<a/>' ).appendTo( Section_BrandingBar_Interior ).addClass( 'column small-6 medium-3' ).attr( 'href', '/branding/identity' ).html( 'Identity' );
		$( '<a/>' ).appendTo( Section_BrandingBar_Interior ).addClass( 'column small-6 medium-3' ).attr( 'href', '/branding/engagement' ).html( 'Engagement' );
		var Section_BrandingBar_Interval = window.setInterval( function() {
			var ActiveBullet;
			$.each(SelectSections.find( '.orbit-bullets li' ), function( i ) {
				var CurrentAnchor = Section_BrandingBar.find( '.column:eq(' + i + ')' );
				if( $( this ).hasClass( 'active' ) ) {
					if( !CurrentAnchor.hasClass( 'active' ) ) {
						CurrentAnchor.addClass( 'active' );
					}
				} else {
					if( CurrentAnchor.hasClass( 'active' ) ) {
						CurrentAnchor.removeClass( 'active' );
					}
				}
			});
		}, 10);
	}

	// Template - Quote Boxes

	function Theme_QuoteBoxes() {
		$(".Override-QuoteBoxes .FullQuote").hide();
		$(".Override-QuoteBoxes").each(function(i) {
			var This_QuoteBoxes = $(this);
			var This_QuoteBoxes_Index = i;
			This_QuoteBoxes.find(".GridTiles > .column").each(function(ii) {
				var This_GridTile = $(this);
				var This_GridTile_Index = ii;
				This_GridTile.on("click",function() {
					This_QuoteBoxes.find(".FeaturedText").fadeOut({
						duration: 500,
						always: function() {
							This_QuoteBoxes.find(".GridTiles > .column").removeClass("active");
							This_GridTile.addClass("active");
							This_QuoteBoxes.removeClass("Selected-0").removeClass("Selected-1").removeClass("Selected-2").removeClass("Selected-3").removeClass("Selected-4").removeClass("Selected-5").addClass("Selected-"+ii);
							This_QuoteBoxes.find(".FeaturedText").fadeIn("500");
						}
					})
				});
				if(ii == 0) This_GridTile.trigger("click");
			});
		});
	}

	// Template - Fix Slider Videos

	function Theme_AutoplayOrbitVideo() {
		$(".Theme-Slider video").each(function(){
			this.play();
		});
	}

	$(window).on('resize', function() {
		Theme_DetectOrientation();
	});
	$(window).on('load', function() {
		// Theme_ContactForm_Load();
	});
	$(document).on("ready", function() {
		Theme_RemoveNoJS();
		Theme_DetectOrientation();
		Theme_MobileMenu();
		Theme_SearchPlaceholder();
		Theme_BrandingBar();
		Theme_AutoplayOrbitVideo();
		Theme_AudioPlayers_Load();
		Theme_ContactForm_Load();
	});

	console.info(" .o8888  8888o.  .o88o.  888888  88  88  88      .o8888  .o88o.  88888888o. ");
	console.info(" 88      88  88  88  88  88      88  88 .8'      88      88  88  88  88  88 ");
	console.info(" 88  88  8888Y'  888888  8888    88  8888'       88      88  88  88  88  88 ");
	console.info(" 88  88  88  88  88  88  88      88  88 '8.      88      88  88  88  88  88 ");
	console.info(" 'Y8888  88  88  88  88  88      88  88  88  88  'Y8888  'Y88Y'  88  88  88 ");

})(jQuery);