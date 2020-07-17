<?php
	
	$admin_email = "filatov122013@gmail.com";
	$form_subject = "New message from https://vfilatov.com/";
	$message = "";

    foreach($_POST as $key => $value) {
        $message .= '<tr>
        <tr style="background-color: #f8f8f8;">
				<td style="padding: 10px; border: #e9e9e9 1px solid;"><b>'.$key.'</b></td>
				<td style="padding: 10px; border: #e9e9e9 1px solid;">'.$value.'</td>
			</tr>
		';
    }

    $message .= '<tr>
        <tr style="background-color: #f8f8f8;">
				<td style="padding: 10px; border: #e9e9e9 1px solid;"><b>Ip адрес сервера</b></td>
				<td style="padding: 10px; border: #e9e9e9 1px solid;">'.$_SERVER["REMOTE_ADDR"].'</td>
			</tr>
		<tr>
        <tr style="background-color: #f8f8f8;">
				<td style="padding: 10px; border: #e9e9e9 1px solid;"><b>Ip адрес отправителя</b></td>
				<td style="padding: 10px; border: #e9e9e9 1px solid;">'.$_SERVER["HTTP_X_FORWARDED_FOR"].'</td>
			</tr>';


   
	$message = "<table style='width: 100%;'>$message</table>";

	function adopt($text) {
	    return '=?UTF-8?B?'.Base64_encode($text).'?=';
	}


	$headers = "MIME-Version: 1.0" . PHP_EOL .
    	"Content-Type: text/html; charset=utf-8" . PHP_EOL .
    	'From: '.adopt("Personal Site").' <'.$admin_email.'>' . PHP_EOL .
    	'Reply-To: '.$admin_email.'' . PHP_EOL;
    
    mail($admin_email, adopt($form_subject), $message, $headers);
	
	echo 1;
?>