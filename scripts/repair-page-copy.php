<?php

/**
 * Aligns three deep pages with the client source docs in `.docx-text/`, per the
 * governing rule in MENU_MAP.md ("every line of page copy traces back to a
 * client document; anything not supplied is flagged TODO(client) rather than
 * invented").
 *
 *  - about-us  "Our Philosophy": "Enable Technology. Transform Processes.
 *    Empower Institutions." -> "EnableIT. Transform. Empower." (About US.txt:4;
 *    matches the site tagline/hero/logoAlt used everywhere else).
 *  - about-us: drop the "Better together" section (in no source doc).
 *  - why-us:   drop the "Our impact" section (in no source doc).
 *  - services-solutions intro: "Take your company to new heights by investing in
 *    our reliable and efficient technology solutions." (invented) -> the doc's
 *    real intro (Services & Solutions.txt:2). The two body paragraphs that
 *    echoed that intro are removed from section 1 so it is not duplicated.
 *
 * `npm run seed` cannot do this: content.pages is an OBJECT keyed by slug and
 * nx_merge_defaults() (api/db.php) lets the stored `sections`/`intro` win, and
 * mergeContent() (ContentContext.jsx) likewise. So the DB must be written.
 *
 * The mutations are targeted (phrase swap + section/paragraph removal) rather
 * than whole-draft replacement, so they survive unrelated edits to the page.
 * Fully self-contained (no external patch file). Idempotent: a second run is a
 * no-op. Fails loudly if a page is missing.
 */

declare(strict_types=1);
require_once __DIR__ . '/../api/db.php';

$pages = nx_content_get('pages');
if (!is_array($pages) || $pages === []) {
    fwrite(STDERR, "content.pages missing or empty - run: npm run seed" . PHP_EOL);
    exit(1);
}

$changed = 0;
$save = false;

// --- 1. about-us: philosophy wording + drop "Better together" ---------------
if (!isset($pages['about-us'])) {
    fwrite(STDERR, "page 'about-us' not present in DB - aborting" . PHP_EOL);
    exit(1);
}
$au = &$pages['about-us'];
foreach ($au['sections'] ?? [] as $i => $sec) {
    if (($sec['heading'] ?? '') === 'Our Philosophy') {
        foreach ($sec['body'] ?? [] as $j => $para) {
            $fixed = str_replace(
                'Enable Technology. Transform Processes. Empower Institutions.',
                'EnableIT. Transform. Empower.',
                $para
            );
            if ($fixed !== $para) {
                $au['sections'][$i]['body'][$j] = $fixed;
                printf("[about-us] philosophy wording corrected (para %d).%s", $j, PHP_EOL);
                $changed++;
                $save = true;
            }
        }
    }
}
$before = count($au['sections'] ?? []);
$au['sections'] = array_values(array_filter(
    $au['sections'] ?? [],
    static fn($s) => ($s['heading'] ?? '') !== 'Better together'
));
if (count($au['sections']) !== $before) {
    printf("[about-us] removed 'Better together' section (%d -> %d sections).%s", $before, count($au['sections']), PHP_EOL);
    $changed++;
    $save = true;
}
unset($au);

// --- 2. why-us: drop "Our impact" -------------------------------------------
if (!isset($pages['why-us'])) {
    fwrite(STDERR, "page 'why-us' not present in DB - aborting" . PHP_EOL);
    exit(1);
}
$wu = &$pages['why-us'];
$before = count($wu['sections'] ?? []);
$wu['sections'] = array_values(array_filter(
    $wu['sections'] ?? [],
    static fn($s) => ($s['heading'] ?? '') !== 'Our impact'
));
if (count($wu['sections']) !== $before) {
    printf("[why-us] removed 'Our impact' section (%d -> %d sections).%s", $before, count($wu['sections']), PHP_EOL);
    $changed++;
    $save = true;
}
unset($wu);

// --- 3. services-solutions: real intro + drop the two echoed paragraphs -----
if (!isset($pages['services-solutions'])) {
    fwrite(STDERR, "page 'services-solutions' not present in DB - aborting" . PHP_EOL);
    exit(1);
}
$sv = &$pages['services-solutions'];
$newIntro = 'Nexsate Technologies is your trusted partner for managed IT, cybersecurity, cloud technology, telecommunications, and fibre connectivity. We enable, transform, and empower businesses with reliable technology solutions designed to improve productivity, strengthen security, reduce downtime, and help your organization save time and money.';
if (($sv['intro'] ?? '') !== $newIntro) {
    $sv['intro'] = $newIntro;
    echo "[services-solutions] intro replaced with the source-doc copy." . PHP_EOL;
    $changed++;
    $save = true;
}
$dup = [
    'Nexsate Technologies is your trusted partner for managed IT, cybersecurity, cloud technology, telecommunications, and fibre connectivity.',
    'We enable, transform, and empower businesses with reliable technology solutions designed to improve productivity, strengthen security, reduce downtime, and help your organization save time and money.',
];
foreach ($sv['sections'] ?? [] as $i => $sec) {
    if (!isset($sec['body']) || !is_array($sec['body'])) {
        continue;
    }
    $beforeParas = count($sec['body']);
    $kept = array_values(array_filter($sec['body'], static fn($p) => !in_array($p, $dup, true)));
    if (count($kept) !== $beforeParas) {
        $sv['sections'][$i]['body'] = $kept;
        printf("[services-solutions] removed %d duplicated intro paragraph(s) from '%s'.%s", $beforeParas - count($kept), (string) ($sec['heading'] ?? ''), PHP_EOL);
        $changed++;
        $save = true;
    }
}
unset($sv);

if ($save) {
    nx_content_set('pages', $pages);
}
echo $changed === 0
    ? "Nothing to change - already applied." . PHP_EOL
    : sprintf("Applied %d change(s).%s", $changed, PHP_EOL);
