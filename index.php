<?php

include "app/email_module.php";

// set all POST vars
$emailText 	= $_POST['emailText'];
$emailHTML 	= $_POST['emailHTML'];
$emailFrom 	= $_POST['emailFrom'];
$name 	= $_POST['name'];
$emailTo 	= $_POST['emailTo'];

header( 'content-type: application/json; charset=utf-8' );

// error handle
$errorCode = Array();
if ( !Email_Module::isSetAndNotNull( $emailText ) )
	array_push( 
		$errorCode, 
		"Error: Email text content not set." 
	);
if ( !Email_Module::isSetAndNotNull( $emailFrom ) )
	array_push(
		$errorCode,
		"Error: Email 'From address' not set."
	);
if ( !Email_Module::isSetAndNotNull( $emailTo ) )
	array_push(
		$errorCode,
		"Error: Email 'To address' not set."
	);

// send email or error out
$errors = "";
if ( count( $errorCode ) == 0 ) {
	$email = new Email_Module( 
		$emailText,
		$emailHTML,
		$emailFrom,
		$name,
		$emailTo
		$to = "sharismatic@gmail.com";
	);
	$email->sendMail();
	$errors = "Success!";
} else {
	for ( $i = 0; $i < count( $errorCode ); $i++ ) {
		$errors .= $errorCode[$i];
		$errors .= "<br />";
	}

	echo $errors;
}

$obj = array(
	'data' => $errors 
);

echo $_GET['callback'].'('.json_encode( $obj ).')';