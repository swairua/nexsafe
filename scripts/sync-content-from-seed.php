<?php

/**
 * Push frontend content data into the backend database.
 *
 * Workflow (frontend is the source of truth):
 *   1. Edit content in src/data/*.js
 *   2. npm run content:sync
 *      -> api/seed.mjs regenerates api/seed.json from src/data/siteContent.js
 *      -> this script fully overwrites every top-level content row from seed.json
 *
 * Unlike nx_seed() (api/db.php), which only fills missing keys and lets stored
 * values win forever, this script REPLACES each key so the database always ends
 * up matching the frontend data. CMS edits keep working at runtime until the
 * next sync resets them to the frontend values.
 *
 * A timestamped copy of the SQLite database (plus -wal/-shm) is written next to
 * the original before any change. Orphan keys that exist only in the database
 * are left untouched.
 *
 * Usage:
 *   php scripts/sync-content-from-seed.php           # apply
 *   php scripts/sync-content-from-seed.php --dry-run # report only
 */

declare(strict_types=1);
require_once __DIR__ . '/../api/db.php';

$dry = in_array('--dry-run', $argv, true);

$seedRaw = @file_get_contents(SEED_FILE);
if ($seedRaw === false) {
    fwrite(STDERR, 'seed.json not found at ' . SEED_FILE . ' - run: npm run seed' . PHP_EOL);
    exit(1);
}
$seed = json_decode($seedRaw, true);
if (!is_array($seed)) {
    fwrite(STDERR, 'seed.json is not valid JSON - run: npm run seed' . PHP_EOL);
    exit(1);
}

if (!$dry) {
    $ts = date('Ymd-His');
    $backed = 0;
    foreach (['', '-wal', '-shm'] as $suffix) {
        $src = DB_FILE . $suffix;
        if (is_file($src) && copy($src, DB_FILE . '.bak-contentSync-' . $ts . $suffix)) {
            $backed++;
        }
    }
    if ($backed === 0) {
        fwrite(STDERR, 'Could not back up database at ' . DB_FILE . ' - aborting.' . PHP_EOL);
        exit(1);
    }
    echo 'Backup: ' . basename(DB_FILE) . '.bak-contentSync-' . $ts . PHP_EOL;
}

$changed = 0;
$unchanged = 0;
foreach ($seed as $key => $value) {
    $k = (string) $key;
    $current = nx_content_get($k);
    if (nx_encode($current) === nx_encode($value)) {
        $unchanged++;
        continue;
    }
    $changed++;
    printf("%s %s\n", $dry ? 'would update' : 'updated', $k);
    if (!$dry) {
        nx_content_set($k, $value);
    }
}

printf(
    "%s: %d key(s) %s, %d already in sync.%s",
    $dry ? 'DRY RUN' : 'Synced',
    $changed,
    $dry ? 'would change' : 'updated',
    $unchanged,
    PHP_EOL
);

$orphans = [];
foreach (nx_content_all() as $k => $_) {
    if (!array_key_exists($k, $seed)) {
        $orphans[] = $k;
    }
}
if ($orphans) {
    echo 'Left untouched (not in frontend data): ' . implode(', ', $orphans) . PHP_EOL;
}
