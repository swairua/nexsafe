<?php
/**
 * API-only router for the Render PHP service.
 *
 * Serves:
 *   /api/*.php  -> the JSON API
 *   /uploads/*  -> uploaded media
 *
 * The static frontend (Render Static Site or another container) owns the SPA
 * fallback and admin.html, so this router returns 404 for anything else.
 */
declare(strict_types=1);

require_once __DIR__ . '/config.php';

$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$uri = '/' . ltrim(rawurldecode((string) $uri), '/');

// 1) API endpoints
static $endpoints = ['auth.php', 'content.php', 'media.php', 'messages.php'];
if (preg_match('#^/api/([A-Za-z0-9_-]+\.php)$#', $uri, $m)) {
    if (in_array($m[1], $endpoints, true)) {
        $script = __DIR__ . $uri;
        if (is_file($script)) {
            $_SERVER['SCRIPT_NAME'] = $uri;
            require $script;
            exit;
        }
    }
    http_response_code(404);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['ok' => false, 'error' => 'Not found']);
    exit;
}

// 2) Uploaded media
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
        exit;
    }
    http_response_code(404);
    exit;
}

// 3) Block access to private repo paths
if (preg_match('#^/(api/data|api/seed\.json|\.git|node_modules|scripts|src)(/|$)#', $uri)) {
    http_response_code(404);
    exit;
}

// 4) API health-check alias
if ($uri === '/health' || $uri === '/api/health') {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['ok' => true]);
    exit;
}

// 5) Everything else is not served by this container
http_response_code(404);
header('Content-Type: text/plain; charset=utf-8');
echo "Not found. This service only serves /api/* and /uploads/*.\n";
exit;
