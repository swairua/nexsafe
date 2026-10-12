<?php

/**
 * Reconciles the "Our technology stack" section with the source doc.
 *
 * The client doc (`.docx-text/Home Page.txt` -> "Our Technology Stack") lists
 * exactly four groups with fixed vendor rosters. Commit a0f47c9/source edits to
 * `src/data/stack.js` already added the three vendors the doc specifies but the
 * DB was missing (Office Apps, Trend Micro Apex One, Dell) - those landed in the
 * DB earlier. The only remaining drift is the **Cloud & hosting** group: the DB
 * carries a stray **Salesforce** entry the doc never lists, and uses "Google
 * Cloud"/"RackSpace" spellings while an interim edit had left "Google"/"Rackspace".
 *
 * `npm run seed` cannot fix this: nx_merge_defaults() (api/db.php:84-86) returns
 * $stored wholesale whenever either side array_is_list, and `stackGroups` is a
 * list. mergeContent() (ContentContext.jsx) likewise lets the DB array win. So
 * the DB has to be written directly.
 *
 * This script replaces the DB's `stackGroups` with the canonical roster below -
 * the exact source doc order, spellings and icon paths. It is fully idempotent:
 * once the DB matches, a second run changes nothing.
 */

declare(strict_types=1);
require_once __DIR__ . '/../api/db.php';

// Canonical roster - mirrors `src/data/stack.js` (which mirrors the source doc).
$icon = fn(string $f): string => '/uploads/stack-icons/' . $f;

$canonical = [
    [
        'id'      => 'cloud-hosting',
        'title'   => 'Cloud & hosting platforms',
        'text'    => 'Trusted cloud and hosting platforms that support secure access, reliable infrastructure, data availability, and scalable business operations.',
        'vendors' => [
            ['name' => 'Amazon Web Services', 'logo' => $icon('amazon-web-services.svg')],
            ['name' => 'Microsoft Azure',      'logo' => $icon('microsoft-azure.svg')],
            ['name' => 'Google Cloud',         'logo' => $icon('google-cloud.svg')],
            ['name' => 'Digital Ocean',        'logo' => $icon('digital-ocean.svg')],
            ['name' => 'RackSpace',            'logo' => $icon('rackspace.svg')],
        ],
    ],
    [
        'id'      => 'collaboration',
        'title'   => 'Collaboration & productivity',
        'text'    => 'Tools for email, meetings, file sharing, teamwork, and document collaboration, helping employees stay connected and productive from anywhere.',
        'vendors' => [
            ['name' => 'Microsoft 365',   'logo' => $icon('microsoft-365.svg')],
            ['name' => 'Teams',           'logo' => $icon('teams.svg')],
            ['name' => 'Exchange Online', 'logo' => $icon('exchange-online.svg')],
            ['name' => 'SharePoint',      'logo' => $icon('sharepoint.svg')],
            ['name' => 'OneDrive',        'logo' => $icon('onedrive.svg')],
            ['name' => 'Office Apps',     'logo' => $icon('office-apps.svg')],
        ],
    ],
    [
        'id'      => 'security',
        'title'   => 'Security & endpoint protection',
        'text'    => 'Platforms we use and support for endpoint security, identity protection, device management, firewall security, and threat monitoring.',
        'vendors' => [
            ['name' => 'Microsoft Defender',   'logo' => $icon('microsoft-defender.svg')],
            ['name' => 'CrowdStrike',          'logo' => $icon('crowdstrike.svg')],
            ['name' => 'Sophos',               'logo' => $icon('sophos.svg')],
            ['name' => 'SentinelOne',          'logo' => $icon('sentinelone.svg')],
            ['name' => 'Bitdefender',          'logo' => $icon('bitdefender.svg')],
            ['name' => 'Trend Micro Apex One', 'logo' => $icon('trend-micro-apex-one.svg')],
        ],
    ],
    [
        'id'      => 'network',
        'title'   => 'Network & connectivity',
        'text'    => 'Networking and connectivity platforms for firewalls, routers, switches, Wi-Fi, structured cabling, fibre connectivity, and secure business network access.',
        'vendors' => [
            ['name' => 'Cisco',      'logo' => $icon('cisco.svg')],
            ['name' => 'Fortinet',   'logo' => $icon('fortinet.svg')],
            ['name' => 'Sophos',     'logo' => $icon('sophos.svg')],
            ['name' => 'Ubiquiti',   'logo' => $icon('ubiquiti.svg')],
            ['name' => 'Dell',       'logo' => $icon('dell.svg')],
            ['name' => 'WatchGuard', 'logo' => $icon('watchguard.svg')],
        ],
    ],
];

// Fail before touching the DB if any referenced icon is missing from disk.
$uploadRoot = rtrim(UPLOAD_URL, '/');           // e.g. /uploads
$diskRoot   = __DIR__ . '/../public' . $uploadRoot;
$missing = [];
foreach ($canonical as $g) {
    foreach ($g['vendors'] as $v) {
        $file = $diskRoot . '/stack-icons/' . basename($v['logo']);
        if (!is_file($file)) {
            $missing[] = basename($v['logo']);
        }
    }
}
if ($missing) {
    fwrite(STDERR, 'Missing stack icon(s) on disk: ' . implode(', ', array_unique($missing)) . PHP_EOL);
    exit(1);
}

$current = nx_content_get('stackGroups');
if (!is_array($current) || $current === []) {
    fwrite(STDERR, "content.stackGroups is empty - run: npm run seed" . PHP_EOL);
    exit(1);
}

if ($current === $canonical) {
    echo "stackGroups already matches the source doc (4 groups, canonical rosters)." . PHP_EOL;
    echo "Nothing to change - already applied." . PHP_EOL;
    exit(0);
}

// Report the concrete diff so the change is auditable.
$summarize = fn(array $groups): array => array_map(
    fn($g) => ($g['title'] ?? '?') . ' [' . implode(', ', array_map(fn($v) => $v['name'] ?? '?', $g['vendors'] ?? [])) . ']',
    $groups
);
$before = $summarize($current);
$after  = $summarize($canonical);
foreach ($after as $i => $line) {
    printf("  after  [%d] %s\n", $i, $line);
}
foreach ($before as $i => $line) {
    printf("  before [%d] %s\n", $i, $line);
}

nx_content_set('stackGroups', $canonical);
echo "Applied stackGroups reconciliation." . PHP_EOL;
