<?php
declare(strict_types=1);
require_once __DIR__ . '/../api/db.php';
$pdo = nx_db();

// Table check
$table = $pdo->query("SELECT name FROM sqlite_master WHERE type='table' AND name='content'")->fetchAll(PDO::FETCH_ASSOC);

if (!$table) {
    echo "no content table\n";
    exit(0);
}

$row = $pdo->query("SELECT value FROM content WHERE key = 'heroSlides'")->fetch(PDO::FETCH_ASSOC);
if (!$row) {
    echo "no heroSlides row — nothing to sync\n";
    exit(0);
}

$imageMaps = [
    '/uploads/hero-network-servers.jpg' => '/uploads/hero_0.jpg',
    '/uploads/hero-team-planning.jpg'   => '/uploads/hero_1.jpg',
    '/uploads/hero-collaboration.jpg'   => '/uploads/hero_2.jpg',
];
// Also catch the untracked trio from the first extraction pass
$imageMaps += [
    '/uploads/hero-city-network.jpg'    => '/uploads/hero_0.jpg',
    '/uploads/hero-skyline-dark.jpg'    => '/uploads/hero_1.jpg',
    '/uploads/hero-plant-night.jpg'     => '/uploads/hero_2.jpg',
];

$data = json_decode($row['value'], true);
if (!is_array($data)) {
    echo "heroSlides row is not valid JSON: ", substr($row['value'], 0, 200), "\n";
    exit(1);
}

$changed = 0;
foreach ($data as $i => &$slide) {
    if (!isset($slide['image'])) continue;
    $old = $slide['image'];
    if (isset($imageMaps[$old])) {
        if ($slide['image'] !== $imageMaps[$old]) {
            $slide['image'] = $imageMaps[$old];
            $changed++;
            echo "  [$i] {$old} -> {$slide['image']}\n";
        }
    } else {
        echo "  [$i] image '{$old}' unmapped, leaving as-is\n";
    }
}
unset($slide);

// Ensure ordering matches content.js: city+network, dark skyline, plant
$wantedById = ['managed-services' => '/uploads/hero_0.jpg', 'enable-transform-empower' => '/uploads/hero_1.jpg', 'industry-focus' => '/uploads/hero_2.jpg'];
foreach ($data as $i => &$slide) {
    if (isset($slide['id'], $wantedById[$slide['id']]) && $slide['image'] !== $wantedById[$slide['id']]) {
        $slide['image'] = $wantedById[$slide['id']];
        $changed++;
        echo "  reorder-match [$i] {$slide['id']} -> {$slide['image']}\n";
    }
}
unset($slide);

if ($changed > 0) {
    $stmt = $pdo->prepare("UPDATE content SET value = :v, updated_at = CURRENT_TIMESTAMP WHERE key = 'heroSlides'");
    $stmt->execute(['v' => json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)]);
    echo "synced {$changed} image reference(s)\n";
} else {
    echo "heroSlides already in sync\n";
}

// Show final state
$final = json_decode($pdo->query("SELECT value FROM content WHERE key = 'heroSlides'")->fetchColumn(), true);
foreach ($final as $s) {
    echo "  final: id=", ($s['id'] ?? '?'), " image=", ($s['image'] ?? '?'), "\n";
}
