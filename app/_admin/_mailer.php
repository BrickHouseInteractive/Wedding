<?php
	date_default_timezone_set('Etc/UTC');
	require 'phpmailer/PHPMailerAutoload.php';

	/*$response = file_get_contents('http://localhost:8888/_guests.php');
	$response = json_decode($response,true);

	foreach ($response as $guest){
		sendMail($guest["name"], $guest["email"]);
	}*/

	foreach ($_POST as $id => $email){
		if(!empty($email)){
			sendMail($id, $email);
		}
	}
	
	function sendMail($id, $email){
		$message = file_get_contents('phpmailer/save-date.html'); 
		$messageFinal = str_replace('%id%', $id, $message);
		//Create a new PHPMailer instance
		$mail = new PHPMailer;
		//Tell PHPMailer to use SMTP
		$mail->isSMTP();
		//Enable SMTP debugging
		// 0 = off (for production use)
		// 1 = client messages
		// 2 = client and server messages
		$mail->SMTPDebug = 2;
		//Ask for HTML-friendly debug output
		$mail->Debugoutput = 'html';
		//Set the hostname of the mail server
		$mail->Host = "ssl://smtp.gmail.com";
		//Set the SMTP port number - likely to be 25, 465 or 587
		$mail->Port = 465;
		//Whether to use SMTP authentication
		$mail->SMTPAuth = true;
		//Username to use for SMTP authentication
		$mail->Username = "wedding@sarahanderik.ch";
		//Password to use for SMTP authentication
		$mail->Password = "Wiseguy@948";
		//Set who the message is to be sent from
		$mail->setFrom('wedding@sarahanderik.ch', 'Sarah and Erik');
		//Set who the message is to be sent to
		foreach(explode(",",$email) as $recipient){
			$mail->addAddress($recipient);
		}
		//Set the subject line
		$mail->Subject = 'You are invited to the wedding of Sarah Kemp and Erik Sundberg';
		//Read an HTML message body from an external file, convert referenced images to embedded,
		//convert HTML into a basic plain-text alternative body
		$mail->msgHTML($messageFinal);
		//Replace the plain text body with one created manually
		$mail->AltBody = 'If you are having trouble viewing this email, please visit http://sarahanderik.ch/#/save/$id to view your Save the Date.';

		//send the message, check for errors
		if (!$mail->send()) {
		    echo "Mailer Error: " . $mail->ErrorInfo;
		} else {
		    echo "Email sent to ".$email."<br/>";
		}
	}


?>
