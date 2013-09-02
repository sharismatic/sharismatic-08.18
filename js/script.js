function initAll() {
	initHovers();
	initAjax();
}

initAll();

function initHovers() {
	// find all .panels inside .work1 and show/hide
	var work = $(".work1");

	if ( work.length == 0 ) return;
	// if we make it here, we know there is at least one .work1 item

	work.mouseenter(function() {
		$(this).find('.panel').stop().fadeIn();
	});

	work.mouseleave( function() {
		$(this).find('.panel').stop().fadeOut();
	});
}

var LOCATION_URL = "http://mottaquikarim.com/services/fragments/?url=http://mottaquikar.im/shar/modules/";
function initAjax() {
	// METHOD: init all ajax calls for .work1
	// should ONLY execute IF data-url attr defined
	var work = $(".work1");

	if ( work.length == 0 ) return;

	work.click(
		function() {
			var self = $(this);
			// check if data-url is defined
			if ( typeof self.attr('data-url') == "undefined" ) return;
			
			var myUrl = LOCATION_URL+self.attr('data-url');
			// if oyu want to add a spinner, add it here 
			$.ajax(
				{
					url: myUrl, 
					type: 'GET',
					dataType: 'jsonp',
					success: function( data ) {
						//$('body').html( data.html )
						console.log( data );
						var html = data.html;
						var workWrapper = $('.float_work').find('#work_wrapper');
						workWrapper.fadeOut('fast', function() {
							$('.float_work').append( data.html ).hide().fadeIn();
						});
					}		
				}
			);

		}	
	);

}