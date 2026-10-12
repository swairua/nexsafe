<?php

/**
 * One-off repair for the "Our technology stack" section.
 *
 * Commit e46e8d2 replaced the flat `public/uploads/logo-*.svg` vendor marks with
 * `public/uploads/stack-icons/*.svg`, but the `content.stackGroups` row was never
 * re-pointed. All 24 vendor entries still reference the deleted files, so
 * VendorChip's `onError={visibility:hidden}` renders a ~16px invisible gap and
 * the section looks like it has placeholder logos.
 *
 * `npm run seed` cannot fix this: nx_merge_defaults() (api/db.php:84-85) returns
 * `$stored` wholesale when either side is a list, and `stackGroups` is a list.
 *
 * Only `logo` fields are rewritten - titles, texts and vendor order are preserved.
 * Idempotent: a second run is a no-op. Fails loudly rather than writing a fourth
 * broken path if an icon is missing from disk.
 */

declare(strict_types=1);
require_once __DIR__ . '/../api/db.php';

$prefix = rtrim(UPLOAD_URL, '/') . '/stack-icons/';

// Keyed on the vendor names currently stored in the DB.
$iconForName = [
    'Amazon Web Services'     => 'amazon-web-services.svg',
    'Microsoft Azure'         => 'microsoft-azure.svg',
    'Google Cloud'            => 'google-cloud.svg',
    'Digital Ocean'           => 'digital-ocean.svg',
    'RackSpace'               => 'rackspace.svg',
    'Salesforce'              => 'salesforce.svg',
    'Microsoft 365'           => 'microsoft-365.svg',
    'Teams'                   => 'teams.svg',
    'Exchange Online'         => 'exchange-online.svg',
    'SharePoint'              => 'sharepoint.svg',
    'OneDrive'                => 'onedrive.svg',
    'Office Apps'             => 'office-apps.svg',
    'Microsoft Defender'      => 'microsoft-defender.svg',
    'CrowdStrike'             => 'crowdstrike.svg',
    'Sophos'                  => 'sophos.svg',
    'SentinelOne'             => 'sentinelone.svg',
    'Bitdefender'             => 'bitdefender.svg',
    'Trend Micro Apex One'    => 'trend-micro-apex-one.svg',
    'Cisco'                   => 'cisco.svg',
    'Fortinet'                => 'fortinet.svg',
    'Ubiquiti'                => 'ubiquiti.svg',
    'Dell'                    => 'dell.svg',
    'WatchGuard'              => 'watchguard.svg',
];

$groups = nx_content_get('stackGroups');
if (!is_array($groups) || $groups === []) {
    fwrite(STDERR, "content.stackGroups is empty - run: node api/seed.mjs" . PHP_EOL);
    exit(1);
}

// Fail before touching the DB if any target icon is missing from disk.
$missing = [];
foreach ($iconForName as $name => $file) {
    if (!is_file(UPLOAD_DIR . DIRECTORY_SEPARATOR . 'stack-icons' . DIRECTORY_SEPARATOR . $file)) {
        $missing[] = 'stack-icons/' . $file . "  ({$name})";
    }
}
if ($missing !== []) {
    fwrite(STDERR, "Aborting - icons missing from " . UPLOAD_DIR . ':' . PHP_EOL);
    foreach ($missing as $m) {
        fwrite(STDERR, '  - ' . $m . PHP_EOL);
    }
    exit(1);
}

$fixed = 0;
$already = 0;
$unknown = [];

foreach ($groups as &$group) {
    if (!is_array($group) || !isset($group['vendors']) || !is_array($group['vendors'])) {
        continue;
    }
    foreach ($group['vendors'] as &$vendor) {
        if (is_string($vendor)) {
            $vendor = ['name' => $vendor];
        }
        if (!is_array($vendor)) {
            continue;
        }
        $name = (string) ($vendor['name'] ?? '');
        if ($name === '') {
            continue;
        }
        if (!isset($iconForName[$name])) {
            $unknown[] = $name;
            continue;
        }
        $want = $prefix . $iconForName[$name];
        if (($vendor['logo'] ?? '') === $want) {
            $already++;
            continue;
        }
        $vendor['logo'] = $want;
        $fixed++;
    }
    unset($vendor);
}
unset($group);

if ($unknown !== []) {
    fwrite(STDERR, 'Aborting - no icon mapped for: ' . implode(', ', array_unique($unknown)) . PHP_EOL);
    exit(1);
}

if ($fixed > 0) {
    nx_content_set('stackGroups', $groups);
    echo "Repaired {$fixed} vendor logo path(s); {$already} already correct." . PHP_EOL;
} else {
    echo "Nothing to do - all {$already} vendor logo path(s) already point at stack-icons/." . PHP_EOL;
}
exit(0);
