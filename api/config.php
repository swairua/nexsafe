<?php
declare(strict_types=1);

// ---- Absolute filesystem paths ---------------------------------------------
define('APP_ROOT',   dirname(__DIR__));
define('API_ROOT',   __DIR__);
define('DATA_DIR',   API_ROOT . '/data');
define('DB_FILE',    DATA_DIR . '/nexsate.sqlite');
define('SEED_FILE',  API_ROOT . '/seed.json');
define('UPLOAD_DIR', APP_ROOT . '/public/uploads');

// ---- Public URL bases (adjust if not served from /nexsate) -------------------
define('UPLOAD_URL', '/uploads');
define('SITE_BASE',  '/nexsate');

// ---- Upload rules -----------------------------------------------------------
define('UPLOAD_MAX_BYTES', 8 * 1024 * 1024);

// ---- Session / cookie (shared by login + admin API) -------------------------
function nx_session_start(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    // The 24-minute default GC window is shorter than a typical editing session,
    // which would sign an admin out mid-edit and lose unsaved field changes.
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

// ---- Default admin account (CHANGE the password after first login) ----------
function nx_default_admin(): array
{
    return [
        'username'      => 'admin',
        // bcrypt hash of "nexsate-admin" (default - change it!)
        'password_hash' => '$2y$10$by.v/Llb7RPuzaLLjRh9H.oxqkNTBdAKRGDB1C.dygdPTrtIx16E.',
        'email'         => 'admin@example.com',
    ];
}

