<?php
declare(strict_types=1);

function redirect_with_status(string $status): never {
    header('Location: /contact/?status=' . rawurlencode($status), true, 303);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    exit('Method Not Allowed');
}

if (!empty($_POST['website'] ?? '')) {
    redirect_with_status('success');
}

$name = trim(preg_replace('/[\r\n]+/', ' ', (string) ($_POST['name'] ?? '')));
$email = trim((string) ($_POST['email'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));
$selectedSubject = trim((string) ($_POST['subject'] ?? 'General inquiry'));

$name = mb_substr($name, 0, 100);
$email = mb_substr($email, 0, 160);
$message = mb_substr($message, 0, 5000);

$allowedSubjects = [
    'General inquiry',
    'Music collaboration',
    'Booking or performance',
    'Press or media',
    'Writing or photography',
];
$subject = in_array($selectedSubject, $allowedSubjects, true)
    ? $selectedSubject
    : 'General inquiry';

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    redirect_with_status('error');
}

$to = 'info@taylonearle.com';
$mailSubject = '[Taylon James Website] ' . $subject;
$body = "Name: {$name}\nEmail: {$email}\nSubject: {$subject}\n\nMessage:\n{$message}\n";
$headers = [
    'From: Taylon James Website <info@taylonearle.com>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . PHP_VERSION,
];

$sent = mail($to, $mailSubject, $body, implode("\r\n", $headers));
redirect_with_status($sent ? 'success' : 'error');