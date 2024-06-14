<?php

$username = $_POST["username"];
$password = $_POST["password"];
$password2 = $_POST["password2"]; // poprawiono nazwę zmiennej
$email = $_POST["email"];
$subject = "Wiadomość z formularza";
$to = "jakubrafalski96@gmail.com";

$txt = "Imię: " . $username . "\r\n" . // dodano kropki do konkatenacji
       "Hasło: " . $password . "\r\n" . 
       "Powtórz hasło: " . $password2 . "\r\n" . 
       "Email: " . $email;

$from = "webmaster@example.com"; // dodano zmienną $from
$headers = "From: " . $from . "\r\n";
$headers .= "Reply-To: " . $from . "\r\n"; // poprawiono "Replay" na "Reply"

$mail_status = mail($to, $subject, $txt, $headers);

if($mail_status) {
    header("Location: /index.html?mail_status=sent");
} else {
    header("Location: /index.html?mail_status=error");
}

?>
