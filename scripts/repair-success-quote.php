<?php

/**
 * Surfaces the success story's customer quote as a dedicated pull-quote block,
 * matching the AWS case-study design (aws/ references).
 *
 *  - success-story: add a top-level `quote` field (text + attribution) so
 *    PageView renders the featured AWS-style pull quote.
 *  - Remove the quote sentence that was previously buried as the first body
 *    paragraph of the "Technology aligned with business growth" section, so it
 *    is not rendered twice.
 *
 * `npm run seed` cannot do this: content.pages is an OBJECT keyed by slug and
 * nx_merge_defaults()/mergeContent() let the stored `sections` list win. The
 * new `quote` key would come from the default, but the old body paragraph
 * would still render from the stored sections - hence the direct DB write.
 *
 * Targeted mutations (add key + drop one exact paragraph). Idempotent. Fails
 * loudly if the page is missing.
 */

declare(strict_types=1);
require_once __DIR__ . '/../api/db.php';

$pages = nx_content_get('pages');
if (!is_array($pages) || $pages === []) {
    fwrite(STDERR, "content.pages missing or empty - run: npm run seed" . PHP_EOL);
    exit(1);
}

if (!isset($pages['success-story'])) {
    fwrite(STDERR, "page 'success-story' not present in DB - aborting" . PHP_EOL);
    exit(1);
}

$changed = 0;
$save = false;
$ss = &$pages['success-story'];

// 1. Add the pull-quote field.
$quote = [
    'text' => 'The goal was not just to fix IT problems. The goal was to create a technology environment that helped the business work better, stay protected, and grow with more confidence.',
    'attribution' => 'Nexsate Technologies',
];
if (($ss['quote'] ?? null) != $quote) {
    $ss['quote'] = $quote;
    echo "[success-story] added pull-quote field." . PHP_EOL;
    $changed++;
    $save = true;
}

// 2. Drop the old buried quote paragraph from the narrative section.
$oldQuotePara = '“The goal was not just to fix IT problems. The goal was to create a technology environment that helped the business work better, stay protected, and grow with more confidence.”';
foreach ($ss['sections'] ?? [] as $i => $sec) {
    if (!isset($sec['body']) || !is_array($sec['body'])) {
        continue;
    }
    $before = count($sec['body']);
    $kept = array_values(array_filter($sec['body'], static fn($p) => $p !== $oldQuotePara));
    if (count($kept) !== $before) {
        $ss['sections'][$i]['body'] = $kept;
        printf("[success-story] removed %d buried quote paragraph(s) from '%s'.%s", $before - count($kept), (string) ($sec['heading'] ?? ''), PHP_EOL);
        $changed++;
        $save = true;
    }
}
unset($ss);

if ($save) {
    nx_content_set('pages', $pages);
}
echo $changed === 0
    ? "Nothing to change - already applied." . PHP_EOL
    : sprintf("Applied %d change(s).%s", $changed, PHP_EOL);