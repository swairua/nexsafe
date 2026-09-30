<?php
declare(strict_types=1);
require_once __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    // The library lists database rows, so files placed in /uploads by other means
    // (image localizer, git, FTP) would never show up. Registered here, but only
    // for a signed-in admin, so an anonymous visitor can't cause DB writes.
    nx_session_start();
    $synced = nx_is_authed() ? nx_media_sync() : 0;
    $usage = nx_media_usage();
    $rows = nx_db()->query('SELECT * FROM media ORDER BY datetime(created_at) DESC, id DESC')->fetchAll();
    foreach ($rows as &$row) {
        $row['used'] = $usage[$row['filename']] ?? 0;
    }
    unset($row);
    nx_json(['ok' => true, 'media' => $rows, 'synced' => $synced]);
}

nx_require_auth();
nx_check_csrf();

if ($method === 'POST') {
    if (empty($_FILES['file']) || (int) ($_FILES['file']['error'] ?? 1) !== UPLOAD_ERR_OK) {
        nx_fail('No file uploaded (or too large for PHP)');
    }
    $f = $_FILES['file'];
    if ((int) $f['size'] > UPLOAD_MAX_BYTES) {
        nx_fail('File exceeds the size limit');
    }
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($f['tmp_name']) ?: ($f['type'] ?? '');
    $allowed = nx_media_types();
    if (!isset($allowed[$mime])) {
        nx_fail('Unsupported image type: ' . $mime);
    }
    $ext = $allowed[$mime];
    $w = null; $h = null;
    if ($mime !== 'image/svg+xml') {
        $info = @getimagesize($f['tmp_name']);
        if ($info !== false) { $w = (int) $info[0]; $h = (int) $info[1]; }
    }
    if (!is_dir(UPLOAD_DIR)) {
        @mkdir(UPLOAD_DIR, 0775, true);
    }
    $base = pathinfo((string) $f['name'], PATHINFO_FILENAME);
    $slug = nx_slug($base) ?: 'image';
    $name = $slug . '-' . date('Ymd-His') . '-' . bin2hex(random_bytes(3)) . '.' . $ext;
    $dest = UPLOAD_DIR . DIRECTORY_SEPARATOR . $name;
    if (!move_uploaded_file($f['tmp_name'], $dest)) {
        nx_fail('Failed to store the uploaded file', 500);
    }
    $url = UPLOAD_URL . '/' . $name;
    $alt = trim((string) ($_POST['alt'] ?? ''));
    $st = nx_db()->prepare('INSERT INTO media (filename, url, mime, size, alt, width, height, created_at) VALUES (?,?,?,?,?,?,?,?)');
    $st->execute([$name, $url, $mime, (int) $f['size'], $alt, $w, $h, date('c')]);
    $id = (int) nx_db()->lastInsertId();
    nx_json(['ok' => true, 'id' => $id, 'url' => $url, 'filename' => $name]);
}

if ($method === 'DELETE') {
    $b = nx_body();
    $id = (int) ($b['id'] ?? 0);
    $st = nx_db()->prepare('SELECT * FROM media WHERE id = ?');
    $st->execute([$id]);
    $m = $st->fetch();
    if ($m) {
        // Deleting an image the site still points at breaks the page silently, so
        // require an explicit force flag once the content references are known.
        $used = (nx_media_usage()[$m['filename']] ?? 0);
        if ($used > 0 && empty($b['force'])) {
            nx_fail("This image is used by {$used} content field(s). Edit those fields first, or confirm the forced delete.", 409);
        }
        $p = UPLOAD_DIR . DIRECTORY_SEPARATOR . basename((string) $m['filename']);
        if (is_file($p)) {
            @unlink($p);
        }
        nx_db()->prepare('DELETE FROM media WHERE id = ?')->execute([$id]);
    }
    nx_json(['ok' => true, 'deleted' => $id]);
}

nx_fail('Method not allowed', 405);

