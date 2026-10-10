<?php

declare(strict_types=1);
require_once __DIR__ . '/../api/db.php';

$mapFile = DATA_DIR . '/image-map.json';
if (!is_file($mapFile)) {
    fwrite(STDERR, "Missing {$mapFile} - run: node scripts/localize-images.mjs\n");
    exit(1);
}
$map = json_decode((string) file_get_contents($mapFile), true);
if (!is_array($map)) {
    fwrite(STDERR, "Could not parse {$mapFile}\n");
    exit(1);
}

$ids = [];
foreach ($map as $id => $local) {
    $ids[(string) $id] = (string) $local;
}
$pattern = '#https://images\.unsplash\.com/([a-z0-9-]+)\?[^"\s]*#';

$changed = 0;
foreach (nx_db()->query('SELECT key, value FROM content') as $row) {
    $value = (string) $row['value'];
    if (strpos($value, 'images.unsplash.com') === false) {
        continue;
    }
    $next = preg_replace_callback($pattern, static function (array $m) use ($ids): string {
        return $ids[$m[1]] ?? $m[0];
    }, $value);
    if ($next !== null && $next !== $value) {
        $st = nx_db()->prepare('UPDATE content SET value = ?, updated_at = ? WHERE key = ?');
        $st->execute([$next, date('c'), (string) $row['key']]);
        $left = substr_count($next, 'images.unsplash.com');
        echo "  updated '{$row['key']}'" . ($left ? " ({$left} remote URL(s) still unmapped)" : '') . PHP_EOL;
        $changed++;
    }
}

$remaining = 0;
foreach (nx_db()->query('SELECT value FROM content') as $row) {
    $remaining += substr_count((string) $row['value'], 'images.unsplash.com');
}
echo "Content rows updated: {$changed}; remote URLs remaining: {$remaining}\n";
exit($remaining === 0 ? 0 : 1);
