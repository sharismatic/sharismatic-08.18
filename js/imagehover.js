$(document).ready(function(){
	initWorkEffects();
	ajaxText();
});

function initWorkEffects() {
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


	console.log( work )
}




function ajaxText() {
	var work = $('.work1');
	work.click( function() {
		$('this').find('data-url');
		//find('data-url')
		console.log('this');
		
		// make the request to THAT url
		// once you get back the data, empty out the container and replace
		// remove #work-wrapper
		// you can expect project wrapper, append that to .float_full
		// "DUMMY" -> have one $project-wrapper display:none
		$.ajax(
	{
		url: 'http://mottaquikarim.com/services/fragments/?url=http://mottaquikar.im/shar/modules/float_container_anne.html',
		type: 'GET',
		dataType: 'jsonp',
		success: function( data ) {
			$('body').html( data.html )
			console.log( data );
		}		
	}
);
	})
}

