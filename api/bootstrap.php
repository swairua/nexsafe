<?php
declare(strict_types=1);
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/db.php';

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
    header('Vary: Origin');
}
$corsHeaders = [
    'Access-Control-Allow-Headers' => 'Content-Type, X-CSRF-Token',
    'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
];
foreach ($corsHeaders as $k => $v) {
    header($k . ': ' . $v);
}
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}
