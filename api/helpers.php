<?php
declare(strict_types=1);
require_once __DIR__ . '/config.php';

function nx_json($data, int $code = 200): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');

    if (session_status() === PHP_SESSION_ACTIVE) {
        session_write_close();
    }
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function nx_fail(string $msg, int $code = 400): void
{
    nx_json(['ok' => false, 'error' => $msg], $code);
}

function nx_body(): array
{
    $ct = $_SERVER['CONTENT_TYPE'] ?? '';
    if (stripos($ct, 'application/json') !== false) {
        $j = json_decode((string) file_get_contents('php://input'), true);
        return is_array($j) ? $j : [];
    }
    return $_POST;
}

function nx_slug(string $s): string
{
    $s = strtolower(trim($s));
    $s = preg_replace('/[^a-z0-9]+/', '-', $s) ?? '';
    return trim($s, '-');
}

function nx_is_authed(): bool
{
    nx_session_start();
    return !empty($_SESSION['admin_id']);
}

function nx_require_auth(): void
{
    if (!nx_is_authed()) {
        nx_fail('Unauthorized', 401);
    }
}

function nx_csrf_token(): string
{
    nx_session_start();
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

function nx_check_csrf(): void
{
    nx_session_start();
    $sent = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? ($_POST['csrf'] ?? '');
    if (empty($_SESSION['csrf']) || !hash_equals((string) $_SESSION['csrf'], (string) $sent)) {
        nx_fail('Bad CSRF token', 403);
    }
}
