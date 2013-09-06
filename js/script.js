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
var LOCATION_URL = "http://mottaquikarim.com/services/fragments/?url=http://mottaquikar.im/shar/modules/";
var EMAIL_TO = 'shar@sharismatic.com';
var EMAIL_URL = "http://mottaquikarim.com/services/email/";

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
		return false;
		}	
		);

}

function close_this(){
	$("#close a").click(function(){
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
		});

		return false;

	});
}
	
function contact(){
	$("#contact").click(function(){
		$("#form").toggle('slow');

		return false;
	});
}


function validate_form(){
	console.log('validating form...');

	$('#form .contact_form span').hide();

	//save input values as variables
	var name = $("#name").val();
	var email= $ ("#email").val();
	var phone = $("#phone").val();
	var comments = $("#comments").val();

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
		if ( isValid == -1 ) return;
		
		// if we are here, safe to make AJAX request
		var dataObj = {
			emailFrom: isValid.email
			, emailTo: EMAIL_TO
			, emailText: "NAME: "+isValid.name+"\n"+
						 "PHONE: "+isValid.phone+"\n"+
						 "COMMENTS: "+isValid.comments
		}

		$.ajax(
			{
				url: EMAIL_URL, 
				type: 'POST',
				dataType: 'jsonp',
				data: dataObj,
				success: function( data ) {
					console.log( data )
				}		
			}
		);

		console.log( dataObj )

		return false;
	})

}


