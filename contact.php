<?php
declare(strict_types=1);
// Euro Nexusion inquiries for Hostinger PHP hosting.
// Uses the hosting mail transport; switch to authenticated SMTP before high-volume production.
header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');

function reply(int $code, string $message): never {
    http_response_code($code);
    echo json_encode(['ok' => $code === 200, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    reply(405, 'method_not_allowed');
}
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 12000) reply(413, 'too_large');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $host = strtolower((string)parse_url($origin, PHP_URL_HOST));
    $serverHost = strtolower(preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? ''));
    if ($host === '' || $host !== $serverHost) reply(403, 'invalid_origin');
}
$get = static function (string $key, int $max): string {
    $value = $_POST[$key] ?? '';
    if (!is_string($value)) return '';
    $value = trim(strip_tags(str_replace("\0", '', $value)));
    if (strlen($value) > $max) return '';
    return $value;
};
if ($get('bot-field', 400) !== '') reply(400, 'invalid_request');
if ($get('form-name', 60) !== 'inquiry') reply(400, 'invalid_form');
if ($get('privacy_read', 10) !== 'yes') reply(400, 'privacy_ack_required');
$name = $get('name', 100);
$company = $get('company', 120);
$email = $get('email', 200);
$subject = $get('subject', 140);
$message = $get('message', 4000);
if (strlen($name) < 2 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($message) < 10) reply(422, 'validation_failed');
if (preg_match('/[\r\n]/', $email)) reply(422, 'invalid_email');
if ($subject === '') $subject = 'B2B-Anfrage über die Website';
$subject = trim(preg_replace('/[\r\n]+/', ' ', $subject));
$name = trim(preg_replace('/[\r\n]+/', ' ', $name));
$company = trim(preg_replace('/[\r\n]+/', ' ', $company));

// Throttle repeated requests from the same client without storing raw IP addresses.
$key = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . '|euro-nexusion-inquiry');
$path = sys_get_temp_dir() . '/en-inquiry-' . $key . '.lock';
$handle = @fopen($path, 'c+');
if ($handle !== false) {
    flock($handle, LOCK_EX);
    $last = (int)stream_get_contents($handle);
    if (time() - $last < 90) {
        flock($handle, LOCK_UN);
        fclose($handle);
        reply(429, 'slow_down');
    }
    rewind($handle);
    ftruncate($handle, 0);
    fwrite($handle, (string)time());
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
}

$body = "Neue Anfrage über Euro Nexusion\n\n"
      . "Name: {$name}\n"
      . "Unternehmen: {$company}\n"
      . "E-Mail: {$email}\n"
      . "Betreff: {$subject}\n\n"
      . "Nachricht:\n{$message}\n";
$headers = [
    'From' => 'Euro Nexusion Website <info@euro-nexusion.de>',
    'Reply-To' => $email,
    'Content-Type' => 'text/plain; charset=UTF-8',
    'X-Mailer' => 'Euro Nexusion Website',
];
if (!function_exists('mail')) reply(503, 'mail_unavailable');
$accepted = @mail('info@euro-nexusion.de', '[Euro Nexusion] ' . $subject, $body, $headers);
if (!$accepted) reply(503, 'mail_failed');
// Acceptance by the mail transport is not a guarantee of inbox delivery.
reply(200, 'accepted_for_delivery');
