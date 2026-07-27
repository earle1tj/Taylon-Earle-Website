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
$safeNameHtml = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeEmailHtml = htmlspecialchars((string)$email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeSubjectHtml = htmlspecialchars($subjectChoice, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeMessageHtml = nl2br(htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));
$replySubject = rawurlencode('Re: ' . $subjectChoice);
$boundary = 'taylon-' . bin2hex(random_bytes(12));

$htmlMessage = <<<HTML
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>New website message</title>
</head>
<body style="margin:0;padding:0;background:#111722;color:#f5f2ed;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#111722;padding:32px 14px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#1a2432;border:1px solid #3b4657;">
          <tr>
            <td style="padding:30px 34px;border-bottom:3px solid #e0a4b8;">
              <div style="font-size:12px;line-height:1.4;letter-spacing:2px;text-transform:uppercase;color:#e0a4b8;font-weight:bold;">Taylon James website</div>
              <h1 style="margin:10px 0 0;font-size:28px;line-height:1.2;color:#f5f2ed;font-weight:600;">You have a new message.</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:30px 34px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:0 0 7px;color:#bac6d5;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">From</td>
                </tr>
                <tr>
                  <td style="padding:0 0 5px;color:#f5f2ed;font-size:21px;font-weight:bold;">{$safeNameHtml}</td>
                </tr>
                <tr>
                  <td style="padding:0 0 20px;color:#bac6d5;font-size:15px;"><a href="mailto:{$safeEmailHtml}" style="color:#e0a4b8;text-decoration:none;">{$safeEmailHtml}</a></td>
                </tr>
                <tr>
                  <td style="padding:13px 16px;background:#252f40;border-left:3px solid #e0a4b8;color:#f5f2ed;font-size:14px;">
                    <strong style="color:#bac6d5;">Inquiry type:</strong> {$safeSubjectHtml}
                  </td>
                </tr>
              </table>
              <div style="margin:0 0 9px;color:#bac6d5;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">Message</div>
              <div style="padding:22px;background:#111722;border:1px solid #344052;color:#f5f2ed;font-size:16px;line-height:1.7;">{$safeMessageHtml}</div>
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:26px;">
                <tr>
                  <td style="background:#b56f88;">
                    <a href="mailto:{$safeEmailHtml}?subject={$replySubject}" style="display:inline-block;padding:14px 22px;color:#ffffff;text-decoration:none;font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;">Reply to {$safeNameHtml}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 34px;background:#151d2a;color:#8290a3;font-size:12px;line-height:1.5;">
              Sent securely from the contact form at taylonearle.com.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;

$mailBody = "--{$boundary}\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\n"
    . "Content-Transfer-Encoding: 8bit\r\n\r\n"
    . $safeMessage . "\r\n"
    . "--{$boundary}\r\n"
    . "Content-Type: text/html; charset=UTF-8\r\n"
    . "Content-Transfer-Encoding: 8bit\r\n\r\n"
    . $htmlMessage . "\r\n"
    . "--{$boundary}--\r\n";

$headers = [
    'From: Taylon James Website <noreply@taylonearle.com>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
    'X-Mailer: PHP/' . phpversion()
];

$sent = mail($to, $subject, $mailBody, implode("\r\n", $headers));
redirectWithStatus($sent ? 'success' : 'error');
?>
