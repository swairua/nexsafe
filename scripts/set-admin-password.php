<?php

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit("This tool is command-line only.\n");
}

require_once __DIR__ . '/../api/db.php';

$minLength = 8;
$force = false;
$args = array_slice($argv, 1);

$positional = [];
foreach ($args as $arg) {
    if ($arg === '--force') {
        $force = true;
    } elseif ($arg === '-h' || $arg === '--help') {
        echo "Usage: php scripts/set-admin-password.php [--force] [--min=N] <username> [new-password]\n";
        exit(0);
    } elseif (str_starts_with($arg, '--min=')) {
        $minLength = max(1, (int) substr($arg, 6));
    } else {
        $positional[] = $arg;
    }
}

$username = $positional[0] ?? '';
if ($username === '') {
    fwrite(STDERR, "Usage: php scripts/set-admin-password.php [--force] [--min=N] <username> [new-password]\n");
    exit(1);
}

$password = $positional[1] ?? '';
if ($password === '') {
    echo "New password for '{$username}': ";
    $password = (string) trim((string) fgets(STDIN));
}

if (strlen($password) < $minLength) {
    if (!$force) {
        fwrite(STDERR, sprintf(
            "Password must be at least %d characters (got %d). Re-run with --force to override.\n",
            $minLength,
            strlen($password),
        ));
        exit(1);
    }
    fwrite(STDERR, sprintf(
        "WARNING: password is only %d characters (minimum %d). Weak for anything public.\n",
        strlen($password),
        $minLength,
    ));
}

$pdo = nx_db();
$st = $pdo->prepare('SELECT id FROM admins WHERE username = ?');
$st->execute([$username]);
$id = $st->fetchColumn();
if ($id === false) {
    $existing = $pdo->query('SELECT username FROM admins')->fetchAll(PDO::FETCH_COLUMN);
    fwrite(STDERR, "No admin named '{$username}'. Existing: " . implode(', ', $existing) . "\n");
    exit(1);
}

$hash = password_hash($password, PASSWORD_BCRYPT);
$pdo->prepare('UPDATE admins SET password_hash = ? WHERE id = ?')->execute([$hash, (int) $id]);

$check = $pdo->prepare('SELECT password_hash FROM admins WHERE id = ?');
$check->execute([(int) $id]);
$ok = password_verify($password, (string) $check->fetchColumn());

echo $ok
    ? "Password updated for '{$username}'.\n"
    : "Password update could NOT be verified.\n";
exit($ok ? 0 : 1);
