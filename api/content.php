<?php
declare(strict_types=1);
require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/truth.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    nx_json(['ok' => true, 'version' => CONTENT_VERSION, 'readonly' => nx_structural_keys(), 'content' => nx_content_all()]);
}

if ($method === 'POST' || $method === 'PUT') {
    nx_require_auth();
    nx_check_csrf();
    $b = nx_body();
    if (isset($b['content']) && is_array($b['content'])) {
        foreach ($b['content'] as $k => $v) {
            if (nx_is_structural((string) $k)) {
                nx_fail('Content key "' . (string) $k . '" is managed in code (frontend source of truth)', 403);
            }
            nx_content_set((string) $k, $v);
        }
        nx_json(['ok' => true, 'version' => CONTENT_VERSION, 'readonly' => nx_structural_keys(), 'content' => nx_content_all()]);
    }
    if (array_key_exists('key', $b)) {
        if (nx_is_structural((string) $b['key'])) {
            nx_fail('Content key "' . (string) $b['key'] . '" is managed in code (frontend source of truth)', 403);
        }
        nx_content_set((string) $b['key'], $b['value'] ?? null);
        nx_json(['ok' => true, 'version' => CONTENT_VERSION, 'readonly' => nx_structural_keys(), 'content' => nx_content_all()]);
    }
    nx_fail('Nothing to save');
}

nx_fail('Method not allowed', 405);
