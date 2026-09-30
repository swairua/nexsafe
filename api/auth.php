<?php
declare(strict_types=1);
require_once __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    nx_session_start();
    nx_json([
        'ok'      => true,
        'authed'  => nx_is_authed(),
        'username' => $_SESSION['admin_username'] ?? null,
        'csrf'    => nx_csrf_token(),
    ]);
}

if ($method === 'POST') {
    $b = nx_body();
    $action = (string) ($b['action'] ?? 'login');
    if ($action === 'logout') {
        nx_session_start();
        $_SESSION = [];
        nx_json(['ok' => true, 'authed' => false]);
    }
    $user = (string) ($b['username'] ?? '');
    $pass = (string) ($b['password'] ?? '');
    $st = nx_db()->prepare('SELECT * FROM admins WHERE username = ?');
    $st->execute([$user]);
    $admin = $st->fetch();
    if ($admin && password_verify($pass, (string) $admin['password_hash'])) {
        nx_session_start();
        session_regenerate_id(true);
        $_SESSION['admin_id'] = (int) $admin['id'];
        $_SESSION['admin_username'] = (string) $admin['username'];
        nx_json(['ok' => true, 'authed' => true, 'username' => $admin['username'], 'csrf' => nx_csrf_token()]);
    }
    nx_fail('Invalid username or password', 401);
}

nx_fail('Method not allowed', 405);

