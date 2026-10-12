<?php

/**
 * Removes the "Your benefits" block from the homepage contact section and
 * prunes the dead/redundant top-level nav items.
 *
 *  - homeContact.benefits -> []  (removes the "Your benefits:" heading + chips;
 *    HomeContact.jsx renders the whole block only when the array is non-empty)
 *  - navItems: drop any top-level "Shop" (dead href "#", no columns) and
 *    "Our People" (duplicate of "Our Company" -> #company) entries if present.
 *
 * `npm run seed` cannot do this: nx_merge_defaults() (api/db.php:84-86) returns
 * $stored wholesale whenever either side array_is_list, and both `benefits` and
 * `navItems` are lists. mergeContent() (ContentContext.jsx:12) likewise lets the
 * DB array win. So the DB has to be written directly.
 *
 * Idempotent: a second run is a no-op. Fails loudly if a row is missing.
 */

declare(strict_types=1);
require_once __DIR__ . '/../api/db.php';

$changed = 0;

// --- 1. Clear homeContact.benefits -----------------------------------------
$home = nx_content_get('homeContact');
if (!is_array($home)) {
    fwrite(STDERR, "content.homeContact is missing or not an object - run: npm run seed" . PHP_EOL);
    exit(1);
}
if (($home['benefits'] ?? null) === []) {
    echo "homeContact.benefits already empty." . PHP_EOL;
} else {
    $removed = $home['benefits'] ?? [];
    $home['benefits'] = [];
    nx_content_set('homeContact', $home);
    printf("homeContact.benefits cleared (%d removed: %s).\n", count($removed), implode(', ', $removed));
    $changed++;
}

// --- 2. Prune dead / redundant top-level nav items -------------------------
$nav = nx_content_get('navItems');
if (!is_array($nav)) {
    fwrite(STDERR, "content.navItems is missing or not an array - run: npm run seed" . PHP_EOL);
    exit(1);
}
$drop = ['Shop', 'Our People'];
$kept = [];
$droppedLabels = [];
foreach ($nav as $item) {
    $label = $item['label'] ?? '';
    if (in_array($label, $drop, true)) {
        $droppedLabels[] = $label;
        continue;
    }
    $kept[] = $item;
}
if ($droppedLabels === []) {
    echo "navItems has no 'Shop' / 'Our People' entries (live menu already clean)." . PHP_EOL;
} else {
    nx_content_set('navItems', array_values($kept));
    printf("navItems: removed top-level '%s'.\n", implode("', '", $droppedLabels));
    $changed++;
}

echo $changed === 0
    ? "Nothing to change - already applied." . PHP_EOL
    : "Applied {$changed} change(s)." . PHP_EOL;
