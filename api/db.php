<?php
declare(strict_types=1);
require_once __DIR__ . '/config.php';

function nx_db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }
    if (!is_dir(DATA_DIR)) {
        @mkdir(DATA_DIR, 0775, true);
    }
    $pdo = new PDO('sqlite:' . DB_FILE);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->exec('PRAGMA journal_mode = WAL');
    nx_migrate($pdo);
    nx_seed($pdo);
    return $pdo;
}

function nx_migrate(PDO $pdo): void
{
    $pdo->exec('CREATE TABLE IF NOT EXISTS content (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL)');
    $pdo->exec('CREATE TABLE IF NOT EXISTS media (id INTEGER PRIMARY KEY AUTOINCREMENT, filename TEXT NOT NULL, url TEXT NOT NULL, mime TEXT, size INTEGER, alt TEXT, width INTEGER, height INTEGER, created_at TEXT NOT NULL)');
    $pdo->exec('CREATE TABLE IF NOT EXISTS admins (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, email TEXT, created_at TEXT NOT NULL)');
    $pdo->exec('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT, company TEXT, subject TEXT, body TEXT, created_at TEXT NOT NULL, seen INTEGER DEFAULT 0)');

    $mcols = [];
    foreach ($pdo->query('PRAGMA table_info(messages)') as $c) { $mcols[(string) $c['name']] = true; }
    if (!isset($mcols['priority'])) { $pdo->exec("ALTER TABLE messages ADD COLUMN priority TEXT NOT NULL DEFAULT ''"); }

    $cols = [];
    foreach ($pdo->query('PRAGMA table_info(media)') as $c) { $cols[(string) $c['name']] = true; }
    if (!isset($cols['description'])) { $pdo->exec("ALTER TABLE media ADD COLUMN description TEXT NOT NULL DEFAULT ''"); }
    if (!isset($cols['locations'])) { $pdo->exec("ALTER TABLE media ADD COLUMN locations TEXT NOT NULL DEFAULT '[]'"); }
    if (!isset($cols['updated_at'])) { $pdo->exec("ALTER TABLE media ADD COLUMN updated_at TEXT NOT NULL DEFAULT ''"); }
}

function nx_seed(PDO $pdo): void
{
    if ((int) $pdo->query('SELECT COUNT(*) FROM admins')->fetchColumn() === 0) {
        $a = nx_default_admin();
        $st = $pdo->prepare('INSERT INTO admins (username, password_hash, email, created_at) VALUES (?,?,?,?)');
        $st->execute([$a['username'], $a['password_hash'], $a['email'], date('c')]);
    }
    if (!is_file(SEED_FILE)) {
        return;
    }
    $seed = json_decode((string) file_get_contents(SEED_FILE), true);
    if (!is_array($seed)) {
        return;
    }

    $select  = $pdo->prepare('SELECT value FROM content WHERE key = ?');
    $insert  = $pdo->prepare('INSERT OR IGNORE INTO content (key, value, updated_at) VALUES (?,?,?)');
    $update  = $pdo->prepare('UPDATE content SET value = ?, updated_at = ? WHERE key = ?');
    $now = date('c');
    foreach ($seed as $key => $default) {
        $select->execute([(string) $key]);
        $stored = $select->fetchColumn();
        if ($stored === false) {
            $insert->execute([(string) $key, nx_encode($default), $now]);
            continue;
        }
        $merged = nx_merge_defaults($default, json_decode((string) $stored, true));
        if (nx_encode($merged) !== (string) $stored) {
            $update->execute([nx_encode($merged), $now, (string) $key]);
        }
    }
}

function nx_encode($value): string
{
    return (string) json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

function nx_merge_defaults($defaults, $stored)
{
    if (!is_array($defaults) || !is_array($stored) || $stored === null) {
        return $stored === null ? $defaults : $stored;
    }
    if (array_is_list($defaults) || array_is_list($stored)) {
        return $stored;
    }
    $out = $stored;
    foreach ($defaults as $k => $v) {
        $out[$k] = array_key_exists($k, $out) ? nx_merge_defaults($v, $out[$k]) : $v;
    }
    return $out;
}

function nx_content_all(): array
{
    $out = [];
    foreach (nx_db()->query('SELECT key, value FROM content') as $r) {
        $out[$r['key']] = json_decode($r['value'], true);
    }
    return $out;
}

function nx_content_get(string $key)
{
    $st = nx_db()->prepare('SELECT value FROM content WHERE key = ?');
    $st->execute([$key]);
    $v = $st->fetchColumn();
    return $v === false ? null : json_decode($v, true);
}

function nx_content_set(string $key, $value): void
{
    $st = nx_db()->prepare('INSERT OR REPLACE INTO content (key, value, updated_at) VALUES (?,?,?)');
    $st->execute([$key, json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), date('c')]);
}

function nx_media_types(): array
{
    return ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif', 'image/svg+xml' => 'svg'];
}

function nx_media_sync(): int
{
    $pdo = nx_db();
    $known = [];
    foreach ($pdo->query('SELECT filename FROM media') as $row) {
        $known[(string) $row['filename']] = true;
    }
    $types = nx_media_types();
    $byExt = ['jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg', 'png' => 'image/png', 'webp' => 'image/webp', 'gif' => 'image/gif', 'svg' => 'image/svg+xml'];
    $finfo = class_exists('finfo') ? new finfo(FILEINFO_MIME_TYPE) : null;
    $ins = $pdo->prepare('INSERT INTO media (filename, url, mime, size, alt, width, height, created_at) VALUES (?,?,?,?,?,?,?,?)');
    $added = 0;
    foreach (is_dir(UPLOAD_DIR) ? (array) scandir((string) UPLOAD_DIR) : [] as $name) {
        if ($name === '.' || $name === '..') {
            continue;
        }
        $f = UPLOAD_DIR . DIRECTORY_SEPARATOR . $name;
        if (!is_file($f)) {
            continue;
        }
        if (isset($known[$name])) {
            continue;
        }
        $ext = strtolower((string) pathinfo($name, PATHINFO_EXTENSION));
        $mime = $finfo ? ((string) $finfo->file($f) ?: '') : '';
        if ($mime === '' || !isset($types[$mime])) {
            $mime = $byExt[$ext] ?? '';
        }
        if (!isset($types[$mime])) {
            continue;
        }
        $w = null; $h = null;
        if ($mime !== 'image/svg+xml') {
            $info = @getimagesize($f);
            if (is_array($info)) { $w = (int) $info[0]; $h = (int) $info[1]; }
        }
        $now = date('c', (int) filemtime($f));
        try {
            $insFull = $pdo->prepare('INSERT INTO media (filename, url, mime, size, alt, width, height, created_at, description, locations, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)');
            $insFull->execute([$name, UPLOAD_URL . '/' . $name, $mime, (int) filesize($f), '', $w, $h, $now, '', '[]', $now]);
        } catch (Throwable $e) {
            $ins->execute([$name, UPLOAD_URL . '/' . $name, $mime, (int) filesize($f), '', $w, $h, $now]);
        }
        $added++;
    }
    return $added;

}

function nx_media_usage(): array
{
    $usage = [];
    foreach (nx_db()->query('SELECT value FROM content') as $row) {
        $value = str_replace('\/', '/', (string) $row['value']);
        if (preg_match_all('#/uploads/([A-Za-z0-9][A-Za-z0-9._-]*)#', $value, $m)) {
            foreach ($m[1] as $file) {
                $usage[$file] = ($usage[$file] ?? 0) + 1;
            }
        }
    }
    return $usage;
}

function nx_media_locations(): array
{
    $out = [];
    foreach (nx_db()->query('SELECT key, value FROM content') as $row) {
        $decoded = json_decode((string) $row['value'], true);
        nx_collect_image_locations($decoded, (string) $row['key'], '', $out);
    }
    foreach ($out as $f => $list) { $out[$f] = array_values(array_unique($list)); }
    return $out;
}

function nx_collect_image_locations($node, string $section, string $path, array &$out): void
{
    if (is_string($node)) {
        if (preg_match_all('#/uploads/([A-Za-z0-9][A-Za-z0-9._-]*)#', $node, $m)) {
            foreach ($m[1] as $file) { $out[$file][] = ($section === $path) ? $section : ($section . ' > ' . $path); }
        }
        return;
    }
    if (is_array($node)) {
        $isList = array_is_list($node);
        foreach ($node as $k => $v) {
            $label = $isList ? ('#' . ((int) $k + 1)) : (string) $k;
            $next = $path === '' ? $label : ($path . ' > ' . $label);
            nx_collect_image_locations($v, $section, $next, $out);
        }
    }
}
