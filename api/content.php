<?php
declare(strict_types=1);
require_once __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    nx_json(['ok' => true, 'content' => nx_content_all()]);
}

if ($method === 'POST' || $method === 'PUT') {
    nx_require_auth();
    nx_check_csrf();
    $b = nx_body();
    if (isset($b['content']) && is_array($b['content'])) {
        foreach ($b['content'] as $k => $v) {
            nx_content_set((string) $k, $v);
        }
        nx_json(['ok' => true, 'content' => nx_content_all()]);
    }
    if (array_key_exists('key', $b)) {
        nx_content_set((string) $b['key'], $b['value'] ?? null);
        nx_json(['ok' => true, 'content' => nx_content_all()]);
    }
    nx_fail('Nothing to save');
}

nx_fail('Method not allowed', 405);

