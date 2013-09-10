function initAll() {
	initHovers();
	initAjax();
	contact();
	setUpForm();
	
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
// GLOBALS
var LOCATION_URL = "http://sharismatic.com/site/fragments/?url=http://www.sharismatic.com/site/modules/";
var EMAIL_URL = "http://sharismatic.com/site/email/app/email_module.php";

function initAjax() {
	// METHOD: init all ajax calls for .work1
	// should ONLY execute IF data-url attr defined
	var work = $(".work1");
	//var myUrl= LOCATION_URL;
	

	if ( work.length == 0 ) return;

	work.click(
		function() {
			var self = $(this);
			if ( typeof self.attr('data-url') == "undefined" ) return;
			
			var myUrl = self.attr('data-url');

			History.pushState( {}, '', myUrl);
			return false;


			 $("html, body").animate({ scrollTop: 0 });
    			return false;


		}
		);

		

}

function close_this(){
	$("#close a").click(function(){
		perform_close();
		return false;

	});
}

function perform_close() {
	//define projectWrapper
	var projectWrapper = $('#project_wrapper');
	//if project wrapper is not there STOP
	if ( !projectWrapper.length ) return false;
	//define workWrapper
	var workWrapper = $('#work_wrapper');
	//if workWrapper is not there STOP
	if ( !workWrapper.length ) return false;

	
	//fade out projectWrapper and then fade in workWrapper
	projectWrapper.fadeOut( 200, function(){
		workWrapper.fadeIn();
		projectWrapper.remove();
		window.location.hash = "";
	});

}
function contact(){
	$("#contact").click(function(){
		$("#form").toggle('slow');

		return false;
	});
}


function validate_form(){
	

	$('#form .contact_form span').hide();

	//save input values as variables
	var name = $("#name").val();
	var email= $ ("#emailFrom").val();
	var phone = $("#phone").val();
	var comments = $("#emailText").val();

	//create variable for the total number of errors
	var num_errors = 0;

	//validate name
	if(name.length < 1){

		$("#name_error").show();
		num_errors = num_errors + 1;

	}

	if(comments.length < 1){

		$("#comment_error").show();
		num_errors ++;

	}



	var regex = /^\d{3}-?\d{3}-?\d{4}$/g;
	if (regex.test(phone) == false){
		$("#user_ph_error").show();
		num_errors ++;
	}

	var email_regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/
	if (email_regex.test(email)== false){
		$("#user_email_error").show();
		num_errors ++;
	}
	console.log( '########## EMAIL HERE')
	console.log( email )

	if(num_errors == 0){
		return {
			name: name,
			email: email,
			phone: phone,
			comments: comments
		};
		//submit_form (name, age ,phone, email);
	} else {
		return -1;
	}
}

function setUpForm() {
	// METHOD: set up contact form ajax
	var form = $('.contact_form');

	if ( form.length == 0 ) return;

	// if we made it here, kosher to send ajax
	form.submit( function() {
		var isValid = validate_form();

		if ( isValid == -1 ) return false;
		
		// if we are here, safe to make AJAX request
		var dataObj = {
			name: isValid.email
			, emailFrom: isValid.email
			, phone: isValid.phone
			, emailText: isValid.comments
		}

		console.log( '######### setUpForm');
		console.log( dataObj )

		$.ajax(
		{
			type: "POST",
			url: EMAIL_URL,
			data: {
				name: isValid.email
				, emailFrom: isValid.email
				, phone: isValid.phone
				, emailText: isValid.comments

			},
			dataType: 'jsonp',
			success: function( data ) {
				console.log( data )
				if ( data == "Success!") {
					$("#form").empty();
				}
			},
			error: function( textStatus ) {
				console.log( textStatus.responseText );
			}
		}
		);	
		return false;
	});

}
// HOW TO SELECT DATA ATTRIBUTE
// $('input[data-url='+URL FRAGMENT+']')

var _check_change = function(){
	if( History.busy()){
		console.log("busy");
		setTimeout( function(){
			_check_change();
		}, 200);
		return;
	}
        //# grab the URL
        var State = History.getState(); // Note: We are using History.getState() instead of event.state
        var url = parseUri( State.hash );

        // find the DOM item with data-url = [ url ]
        var item = $('div[data-url="'+url+'"]');
        console.log( item )
        if ( item.length == 0 ) {
        	perform_close();
        	return;
        }

        //SPINNER

        	$.fn.spin = function(opts) {
			this.each(function() {
				var $this = $(this),
					spinner = $this.data('spinner');
 
				if (spinner) spinner.stop();
				if (opts !== false) {
				  opts = $.extend({color: $this.css('color')}, opts);
				  spinner = new Spinner(opts).spin(this);
				  $this.data('spinner', spinner);
				}
			});
			return this;
		};
		$(function() {
			$(".spinner-link").click(function(e) {
				e.preventDefault();
				$(this).hide();
				var opts = {
				  lines: 12, // The number of lines to draw
				  length: 7, // The length of each line
				  width: 5, // The line thickness
				  radius: 10, // The radius of the inner circle
				  color: '#fff', // #rbg or #rrggbb
				  speed: 1, // Rounds per second
				  trail: 66, // Afterglow percentage
				  shadow: true // Whether to render a shadow
				};
				$("#spin").show().spin(opts);
				
 
				
			});
		});




        // if we are here, it has found the URL 
        $.ajax(
        {
        	url: LOCATION_URL+url, 
        	type: 'GET',
        	dataType: 'jsonp',
        	success: function( data ) {
						//$('body').html( data.html )
						console.log( data );
						var html = data.html;
						var workWrapper = $('.float_work').find('#work_wrapper');
						workWrapper.fadeOut('fast', function() {
							$('.float_work')
							.append( data.html )
							.hide()
							.fadeIn( 200, function() {
								close_this();
							});
						});

					}		
				}
				);

    };

    function parseUri( url ) {
    	var urlBits = url.split('\/');
    	return urlBits.pop();
    }

History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
    //alert( "statechange: " + History.getHash() );
    //var State = History.getState(); // Note: We are using History.getState() instead of event.state
    _check_change();
});
