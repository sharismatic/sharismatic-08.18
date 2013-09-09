<?php

// set up simple emailing
$name = $_POST[ 'name' ];
$email = $_POST[ 'emailFrom' ];
$phone = $_POST[ 'phone' ];
$content = $_POST[ 'emailText' ];

$to = 'shar@sharismatic.com';

$subject = 'NAME: '.$name.' EMAIL: '.$email;
$message = 'PHONE: '.$phone." \r\n".$content;

$headers = 
	'From: inquiry@sharismatic.com'. "\r\n" .
    'X-Mailer: PHP/' . phpversion();

if ( !isset( $email) ) {
	echo "Error: NO EMAIL SET";
	return;
}

mail($to, $subject, $message, $headers);
echo "Success!";