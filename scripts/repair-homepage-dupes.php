<?php

/**
 * One-off repair for duplicated homepage copy.
 *
 * Four strings were rendered twice on the homepage:
 *
 *   "Using trusted technology to solve your IT challenges"
 *     -> partnerStrip.title (pinned by scripts/smoke.mjs:111) and
 *        stackSection.title
 *   "We take care of your IT, so you can take care of your customers."
 *     -> heroSlides[0].title (pinned by scripts/smoke.mjs:80) and promo.title
 *   "Simply enabling IT for a complex world"
 *     -> heroSlides[1].title, servicesSection.title and promo.tag
 *   "Empowering businesses with transformative technology solutions"
 *     -> heroSlides[0].kicker and inside introBand.text
 *
 * `npm run seed` cannot fix this: nx_merge_defaults() (api/db.php:81-83) returns
 * `$stored` wholesale when the incoming default is a scalar, so the live rows in
 * `content` always win over src/data/*.js. The smoke suite only exercises the
 * code defaults, so it would silently pass on the new copy while the site kept
 * serving the old strings.
 *
 * Only the duplicate fields listed below are rewritten - everything else in
 * those rows is preserved. Idempotent: a second run is a no-op. Fails loudly if
 * a row is missing rather than writing a partial edit.
 */

declare(strict_types=1);
require_once __DIR__ . '/../api/db.php';

// key => [field => replacement copy]. Field 'introBand.text' is dotted for
// readability only; the script walks the real object below.
$replacements = [
    'introBand' => [
        'text' => 'We manage the technology behind daily operations so your team can stay focused — responsive support, stronger security, and systems that scale as you grow.',
    ],
    'servicesSection' => [
        'title' => 'Everything we do to keep your business running',
    ],
    'stackSection' => [
        'title' => 'The platforms we deploy, secure, and support',
    ],
    'promo' => [
        'tag' => "Let's talk",
        'title' => 'Tell us where IT is getting in the way',
    ],
];

$changed = 0;
foreach ($replacements as $key => $fields) {
    $row = nx_content_get($key);
    if (!is_array($row)) {
        fwrite(STDERR, "content.{$key} is missing or not an object - run: npm run seed" . PHP_EOL);
        exit(1);
    }
    foreach ($fields as $field => $value) {
        $current = $row[$field] ?? null;
        if ($current === $value) {
            continue;
        }
        if ($current !== null && trim((string) $current) === trim((string) $value)) {
            continue;
        }
        $row[$field] = $value;
        printf(
            "content.%s.%s\n  - %s\n  + %s\n",
            $key,
            $field,
            $current === null ? '<<missing>>' : $current,
            $value
        );
        $changed++;
    }
    nx_content_set($key, $row);
}

echo $changed === 0
    ? 'No duplicated homepage copy found - already applied.' . PHP_EOL
    : "Deduplicated {$changed} homepage field(s)." . PHP_EOL;
