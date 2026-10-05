<?php
/**
 * One-shot migration: backfill local brand-mark paths into the SQLite content
 * store for the homepage "Using trusted technology" section.
 *
 * Stored `partners` items and `stackGroups` vendor entries predate the logo
 * fields, so the homepage rendered letter-badge fallbacks instead of the real
 * marks in public/uploads/. This adds the missing `logo` values by vendor
 * name. Safe to re-run (entries that already have a logo, editor-added
 * vendors with no known mark, and custom ordering/removals are untouched).
 *
 *   php scripts/apply-brand-logos.php
 */
declare(strict_types=1);
require_once __DIR__ . '/../api/db.php';

$seed = json_decode((string) file_get_contents(SEED_FILE), true);
if (!is_array($seed)) {
    fwrite(STDERR, "Could not parse " . SEED_FILE . PHP_EOL);
    exit(1);
}

// Canonical vendor name => local logo path, from the refreshed seed.
$logos = [];
foreach ((array) ($seed['partners'] ?? []) as $p) {
    if (is_array($p) && isset($p['name'], $p['logo'])) {
        $logos[(string) $p['name']] = (string) $p['logo'];
    }
}
foreach ((array) ($seed['stackGroups'] ?? []) as $g) {
    foreach ((array) ($g['vendors'] ?? []) as $v) {
        if (is_array($v) && isset($v['name'], $v['logo'])) {
            $logos[(string) $v['name']] = (string) $v['logo'];
        }
    }
}
if ($logos === []) {
    fwrite(STDERR, "No vendor logos found in seed - regenerate it first: node api/seed.mjs" . PHP_EOL);
    exit(1);
}

$get = nx_db()->prepare('SELECT value FROM content WHERE key = ?');
$set = nx_db()->prepare('UPDATE content SET value = ?, updated_at = ? WHERE key = ?');
$changed = ['partners' => 0, 'stackGroups' => 0];

$get->execute(['partners']);
$raw = $get->fetchColumn();
if ($raw !== false) {
    $list = json_decode((string) $raw, true);
    if (is_array($list)) {
        $n = 0;
        // Collapse legacy exact-name duplicates (e.g. Sophos was seeded under
        // both Security and Network), keeping the first occurrence so editor
        // ordering of everything else is preserved.
        $seen = [];
        $deduped = [];
        $dropped = 0;
        foreach ($list as $item) {
            $nm = is_string($item) ? $item : (string) ($item['name'] ?? '');
            if ($nm !== '' && isset($seen[$nm])) {
                $dropped++;
                continue;
            }
            $seen[$nm] = true;
            $deduped[] = $item;
        }
        $list = $deduped;
        foreach ($list as &$item) {
            if (is_string($item)) {
                $item = ['name' => $item];
            }
            if (is_array($item) && empty($item['logo']) && isset($logos[(string) ($item['name'] ?? '')])) {
                $item['logo'] = $logos[(string) $item['name']];
                $n++;
            }
        }
        unset($item);
        if ($n > 0 || $dropped > 0) {
            $set->execute([nx_encode($list), date('c'), 'partners']);
            $changed['partners'] = $n;
        }
    }
}

$get->execute(['stackGroups']);
$raw = $get->fetchColumn();
if ($raw !== false) {
    $groups = json_decode((string) $raw, true);
    if (is_array($groups)) {
        $n = 0;
        foreach ($groups as &$g) {
            if (!is_array($g) || !isset($g['vendors']) || !is_array($g['vendors'])) {
                continue;
            }
            foreach ($g['vendors'] as &$v) {
                if (is_string($v)) {
                    $v = ['name' => $v];
                }
                if (is_array($v) && empty($v['logo']) && isset($logos[(string) ($v['name'] ?? '')])) {
                    $v['logo'] = $logos[(string) $v['name']];
                    $n++;
                }
            }
            unset($v);
        }
        unset($g);
        if ($n > 0) {
            $set->execute([nx_encode($groups), date('c'), 'stackGroups']);
            $changed['stackGroups'] = $n;
        }
    }
}

echo "Logos backfilled - partners: {$changed['partners']}, stackGroups vendors: {$changed['stackGroups']}\n";
if (!empty($dropped)) {
    echo "Duplicate partner entries removed: {$dropped}\n";
}
exit(0);
