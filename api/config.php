<?php
declare(strict_types=1);

$envOr = static function (string $key, string $fallback): string {
    $v = getenv($key);
    return ($v === false || $v === '') ? $fallback : $v;
};
define('APP_ROOT',   dirname(__DIR__));
define('API_ROOT',   __DIR__);
define('DATA_DIR',   $envOr('NX_DATA_DIR', API_ROOT . '/data'));
define('DB_FILE',    DATA_DIR . '/nexsate.sqlite');
define('SEED_FILE',  API_ROOT . '/seed.json');
define('UPLOAD_DIR', $envOr('NX_UPLOAD_DIR', APP_ROOT . '/public/uploads'));

define('UPLOAD_URL', $envOr('NX_UPLOAD_URL', '/uploads'));
define('SITE_BASE',  $envOr('NX_SITE_BASE', '/'));

define('UPLOAD_MAX_BYTES', 8 * 1024 * 1024);

function nx_session_start(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    ini_set('session.gc_maxlifetime', (string) (6 * 60 * 60));
    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/',
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_name('NEXSATE_ADMIN');
    session_start();
}

function nx_default_admin(): array
{
    return [
        'username'      => 'admin',

        'password_hash' => '$2y$10$by.v/Llb7RPuzaLLjRh9H.oxqkNTBdAKRGDB1C.dygdPTrtIx16E.',
        'email'         => 'admin@example.com',
    ];
}
