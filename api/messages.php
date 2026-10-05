<?php
declare(strict_types=1);
require_once __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'POST') {
    $b = nx_body();
    $action = (string) ($b['action'] ?? 'create');
    if ($action === 'delete') {
        nx_require_auth();
        nx_check_csrf();
        nx_db()->prepare('DELETE FROM messages WHERE id = ?')->execute([(int) ($b['id'] ?? 0)]);
        nx_json(['ok' => true]);
    }
    $name = trim((string) ($b['name'] ?? ''));
    $email = trim((string) ($b['email'] ?? ''));
    if ($name === '' || $email === '') {
        nx_fail('Name and email are required');
    }
    $priority = trim((string) ($b['priority'] ?? ''));
    if ($priority !== '' && !in_array($priority, ['Normal', 'High', 'Urgent'], true)) {
        nx_fail('Unknown priority');
    }
    $st = nx_db()->prepare('INSERT INTO messages (name, email, phone, company, subject, body, priority, created_at) VALUES (?,?,?,?,?,?,?,?)');
    $st->execute([
        $name, $email,
        trim((string) ($b['phone'] ?? '')),
        trim((string) ($b['company'] ?? '')),
        trim((string) ($b['subject'] ?? '')),
        trim((string) ($b['message'] ?? $b['body'] ?? '')),
        $priority,
        date('c'),
    ]);
    nx_json(['ok' => true, 'id' => (int) nx_db()->lastInsertId()]);
}

if ($method === 'GET') {
    nx_require_auth();
    $rows = nx_db()->query('SELECT * FROM messages ORDER BY id DESC')->fetchAll();
    nx_json(['ok' => true, 'messages' => $rows]);
}

nx_fail('Method not allowed', 405);

