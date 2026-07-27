<?php
declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /contact');
    exit;
}

function redirectWithStatus(string $status): never {
    header('Location: /contact?status=' . $status, true, 303);
    exit;
}

function clientIp(): string {
    return (string)($_SERVER['REMOTE_ADDR'] ?? 'unknown');
}

// Silently accept obvious bot submissions so automated tools do not learn
// which protection caught them.
if (!empty($_POST['website'] ?? '') || !empty($_POST['fax_number'] ?? '')) {
    redirectWithStatus('success');
}

$startedAt = filter_var($_POST['form_started_at'] ?? null, FILTER_VALIDATE_INT);
$elapsedMs = $startedAt ? ((int)round(microtime(true) * 1000) - $startedAt) : 0;
if ($elapsedMs < 2500 || $elapsedMs > 7200000) {
    redirectWithStatus('error');
}

// Reject cross-site form posts when the browser supplies origin information.
$origin = (string)($_SERVER['HTTP_ORIGIN'] ?? '');
$referer = (string)($_SERVER['HTTP_REFERER'] ?? '');
$allowedHosts = ['taylonearle.com', 'www.taylonearle.com'];
$sourceUrl = $origin !== '' ? $origin : $referer;
if ($sourceUrl !== '') {
    $sourceHost = strtolower((string)parse_url($sourceUrl, PHP_URL_HOST));
    if (!in_array($sourceHost, $allowedHosts, true)) {
        redirectWithStatus('error');
    }
}

// Limit each address to three messages per 15 minutes. The small state file
// contains only hashes and timestamps and cleans itself as requests arrive.
$rateFile = sys_get_temp_dir() . '/taylon-contact-rate-limit.json';
$rateHandle = @fopen($rateFile, 'c+');
if ($rateHandle !== false && flock($rateHandle, LOCK_EX)) {
    $raw = stream_get_contents($rateHandle);
    $rates = is_string($raw) ? json_decode($raw, true) : [];
    if (!is_array($rates)) $rates = [];

    $now = time();
    $windowStart = $now - 900;
    foreach ($rates as $key => $timestamps) {
        $rates[$key] = array_values(array_filter(
            is_array($timestamps) ? $timestamps : [],
            static fn($timestamp): bool => is_int($timestamp) && $timestamp >= $windowStart
        ));
        if ($rates[$key] === []) unset($rates[$key]);
    }

    $ipKey = hash('sha256', clientIp());
    $attempts = $rates[$ipKey] ?? [];
    if (count($attempts) >= 3) {
        flock($rateHandle, LOCK_UN);
        fclose($rateHandle);
        redirectWithStatus('error');
    }

    $attempts[] = $now;
    $rates[$ipKey] = $attempts;
    rewind($rateHandle);
    ftruncate($rateHandle, 0);
    fwrite($rateHandle, json_encode($rates, JSON_UNESCAPED_SLASHES));
    fflush($rateHandle);
    flock($rateHandle, LOCK_UN);
    fclose($rateHandle);
}

$name = trim(strip_tags((string)($_POST['name'] ?? '')));
$email = filter_var(trim((string)($_POST['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$subjectChoice = trim(strip_tags((string)($_POST['subject'] ?? 'General inquiry')));
$message = trim((string)($_POST['message'] ?? ''));

$allowedSubjects = ['General inquiry', 'Music collaboration', 'Booking or performance', 'Press or media', 'Writing or photography'];
if (!in_array($subjectChoice, $allowedSubjects, true)) $subjectChoice = 'General inquiry';

if (
    $name === '' ||
    strlen($name) > 100 ||
    !$email ||
    $message === '' ||
    strlen($message) > 5000 ||
    preg_match('/[\r\n]/', (string)$email)
) {
    redirectWithStatus('error');
}

// Most contact-form spam is link-heavy or repeats the same phrase many times.
$linkCount = preg_match_all('~(?:https?://|www\.)~i', $message);
$normalizedMessage = strtolower(preg_replace('/\s+/', ' ', $message) ?? $message);
$spamPhrases = ['guest post', 'seo service', 'search engine optimization', 'crypto investment', 'casino bonus'];
foreach ($spamPhrases as $phrase) {
    if (strpos($normalizedMessage, $phrase) !== false) {
        redirectWithStatus('success');
    }
}
if ($linkCount > 2) {
    redirectWithStatus('success');
}

$to = 'info@taylonearle.com';
$subject = '[TaylonJames.com] ' . $subjectChoice;
$safeMessage = "Name: {$name}\nEmail: {$email}\nSubject: {$subjectChoice}\n\nMessage:\n{$message}\n";
$headers = [
    'From: Taylon James Website <noreply@taylonearle.com>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion()
];

$sent = mail($to, $subject, $safeMessage, implode("\r\n", $headers));
redirectWithStatus($sent ? 'success' : 'error');
?>
