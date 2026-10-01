<?php
/**
 * Router for "php -S" (used by the Render container and local runs).
 *
 * One process has to serve three things from a single origin:
 *   /api/*.php  -> the JSON API (run the script)
 *   /uploads/*  -> media (serve from UPLOAD_DIR)
 *   everything else -> the built SPA in dist/ (index.html / admin.html)
 *
 * Render has no native PHP runtime, so the production deploy is this same
 * router behind php -S inside a container — see Dockerfile + render.yaml.
 */
declare(strict_types=1);

require_once __DIR__ . '/api/config.php';

$dist = __DIR__ . '/dist';
$uri  = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$uri  = '/' . ltrim(rawurldecode($uri), '/');

// 1) API endpoints execute as real PHP scripts.
//    Explicit allow-list, not "any .php under /api": config.php, db.php,
//    helpers.php and bootstrap.php are libraries, so hitting them directly
//    just runs a half-initialised file and emits a PHP fatal error that
//    discloses the server's absolute paths.
static $endpoints = ['auth.php', 'content.php', 'media.php', 'messages.php'];
if (preg_match('#^/api/([A-Za-z0-9_-]+\.php)$#', $uri, $m)) {
    if (in_array($m[1], $endpoints, true)) {
        $script = __DIR__ . $uri;
        if (is_file($script)) {
            $_SERVER['SCRIPT_NAME'] = $uri;
            require $script;
            return true;
        }
    }
    http_response_code(404);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['ok' => false, 'error' => 'Not found']);
    return true;
}

// 2) Uploaded media. Served from UPLOAD_DIR so files added through the admin
//    (which may live on a persistent disk) are reachable at their /uploads path.
if (str_starts_with($uri, '/uploads/')) {
    $name = basename($uri);
    $file = UPLOAD_DIR . DIRECTORY_SEPARATOR . $name;
    if ($name !== '' && is_file($file)) {
        $types = [
            'jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg', 'png' => 'image/png',
            'webp' => 'image/webp', 'gif' => 'image/gif', 'svg' => 'image/svg+xml',
        ];
        $ext = strtolower((string) pathinfo($name, PATHINFO_EXTENSION));
        header('Content-Type: ' . ($types[$ext] ?? 'application/octet-stream'));
        header('Content-Length: ' . (string) filesize($file));
        header('Cache-Control: public, max-age=3600');
        readfile($file);
        return true;
    }
    http_response_code(404);
    return true;
}

// 3) Never expose the repo's private files.
if (preg_match('#^/(api/data|api/seed\.json|\.git|node_modules|scripts|src)(/|$)#', $uri)) {
    http_response_code(404);
    return true;
}

// 4) Static build output (hashed assets, brand art, favicon).
//    Read the file here rather than returning false: "return false" hands the
//    request back to the built-in server, which resolves against the document
//    root (the repo root), not dist/ — so /brand/* and /favicon.svg would 404
//    even though dist/brand/* exists.
$candidate = $dist . $uri;
if ($uri !== '/' && is_file($candidate)) {
    static $mime = [
        'html' => 'text/html; charset=utf-8',
        'css'  => 'text/css; charset=utf-8',
        'js'   => 'text/javascript; charset=utf-8',
        'json' => 'application/json',
        'svg'  => 'image/svg+xml',
        'png'  => 'image/png',
        'jpg'  => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'webp' => 'image/webp',
        'gif'  => 'image/gif',
        'ico'  => 'image/x-icon',
        'woff2' => 'font/woff2',
        'map'  => 'application/json',
    ];
    $ext  = strtolower((string) pathinfo($candidate, PATHINFO_EXTENSION));
    $type = $mime[$ext] ?? 'application/octet-stream';
    header('Content-Type: ' . $type);
    header('Content-Length: ' . (string) filesize($candidate));
    // Hashed Vite assets are immutable; everything else revalidates.
    header('Cache-Control: ' . (str_starts_with($uri, '/assets/')
        ? 'public, max-age=31536000, immutable'
        : 'public, max-age=3600'));
    readfile($candidate);
    return true;
}

// 5) SPA fallback. The site uses hash routing (#/slug), so any unknown path that
//    is not a real file should still boot the app.
$page = $candidate;
if (!is_file($page)) {
    $page = is_file($dist . '/index.html') ? $dist . '/index.html' : __DIR__ . '/index.html';
}
if (is_file($page)) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($page);
    return true;
}

http_response_code(404);
header('Content-Type: text/plain');
echo "Not found. Run 'npm run build' so dist/ exists.\n";
return true;