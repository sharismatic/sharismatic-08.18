$(document).ready(function(){
	initWorkEffects();
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

