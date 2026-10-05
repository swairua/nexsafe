<?php
/**
 * Router for "php -S" (used by the Render container and local runs).
 *
 * One process has to serve three things from a single origin:
 *   /api/*.php  -> the JSON API (run the script)
 *   /uploads/*  -> media (serve from UPLOAD_DIR)
 *   everything else -> the built SPA in dist/ (index.html / admin.html)
 *
 * Render has no native PHP runtime, so the production deploy is this same
 * router behind php -S inside a container — see Dockerfile + render.yaml.
 */
declare(strict_types=1);

require_once __DIR__ . '/api/config.php';

$dist = __DIR__ . '/dist';
$uri  = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$uri  = '/' . ltrim(rawurldecode($uri), '/');

// 1) API endpoints execute as real PHP scripts.
//    Explicit allow-list, not "any .php under /api": config.php, db.php,
//    helpers.php and bootstrap.php are libraries, so hitting them directly
//    just runs a half-initialised file and emits a PHP fatal error that
//    discloses the server's absolute paths.
static $endpoints = ['auth.php', 'content.php', 'media.php', 'messages.php'];
if (preg_match('#^/api/([A-Za-z0-9_-]+\.php)$#', $uri, $m)) {
    if (in_array($m[1], $endpoints, true)) {
        $script = __DIR__ . $uri;
        if (is_file($script)) {
            $_SERVER['SCRIPT_NAME'] = $uri;
            require $script;
            return true;
        }
    }
    http_response_code(404);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['ok' => false, 'error' => 'Not found']);
    return true;
}

// 2) Uploaded media. Served from UPLOAD_DIR so files added through the admin
//    (which may live on a persistent disk) are reachable at their /uploads path.
if (str_starts_with($uri, '/uploads/')) {
    $name = basename($uri);
    $file = UPLOAD_DIR . DIRECTORY_SEPARATOR . $name;
    if ($name !== '' && is_file($file)) {
        $types = [
            'jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg', 'png' => 'image/png',
            'webp' => 'image/webp', 'gif' => 'image/gif', 'svg' => 'image/svg+xml',
        ];
        $ext = strtolower((string) pathinfo($name, PATHINFO_EXTENSION));
        header('Content-Type: ' . ($types[$ext] ?? 'application/octet-stream'));
        header('Content-Length: ' . (string) filesize($file));
        header('Cache-Control: public, max-age=3600');
        readfile($file);
        return true;
    }
    http_response_code(404);
    return true;
}

// 3) Never expose the repo's private files.
if (preg_match('#^/(api/data|api/seed\.json|\.git|node_modules|scripts|src)(/|$)#', $uri)) {
    http_response_code(404);
    return true;
}

// 4) Static build output (hashed assets, brand art, favicon).
//    Read the file here rather than returning false: "return false" hands the
//    request back to the built-in server, which resolves against the document
//    root (the repo root), not dist/ — so /brand/* and /favicon.svg would 404
//    even though dist/brand/* exists.
$candidate = $dist . $uri;
if ($uri !== '/' && is_file($candidate)) {
    static $mime = [
        'html' => 'text/html; charset=utf-8',
        'css'  => 'text/css; charset=utf-8',
        'js'   => 'text/javascript; charset=utf-8',
        'json' => 'application/json',
        'svg'  => 'image/svg+xml',
        'png'  => 'image/png',
        'jpg'  => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'webp' => 'image/webp',
        'gif'  => 'image/gif',
        'ico'  => 'image/x-icon',
        'woff2' => 'font/woff2',
        'map'  => 'application/json',
    ];
    $ext  = strtolower((string) pathinfo($candidate, PATHINFO_EXTENSION));
    $type = $mime[$ext] ?? 'application/octet-stream';
    header('Content-Type: ' . $type);
    header('Content-Length: ' . (string) filesize($candidate));
    // Hashed Vite assets are immutable; everything else revalidates.
    header('Cache-Control: ' . (str_starts_with($uri, '/assets/')
        ? 'public, max-age=31536000, immutable'
        : 'public, max-age=3600'));
    readfile($candidate);
    return true;
}

// 4b) Legacy WordPress cutover: 301 the old nexsate.com URLs to their hash
// routes so bookmarks and search results keep working. Exact paths first
// (trailing slash and case insensitive), then prefix fallbacks for the
// unported archives (events, team, categories, leftover stubs) which land on
// the closest hub. Anything else falls through to the SPA fallback below.
static $legacyExact = [
    // Company
    'about' => '/#/about-us',
    'why-us' => '/#/about-us',
    'partnerships' => '/#/about-us',
    'reviews-awards' => '/#/about-us',
    'careers' => '/#/about-us',
    'contact' => '/#/contact-us',
    'faq' => '/#/help-and-faq',
    'client-support' => '/#support',
    // Hubs
    'solutions' => '/#it-solutions',
    'industries' => '/#industries',
    'app-development' => '/#/app-development',
    'blog' => '/#/blog',
    'events' => '/#/blog',
    // Solutions (live slugs are scrambled vs their titles — each maps to the
    // page whose copy it actually carries, app verticals to the dev hub).
    'solutions/managed-services' => '/#/managed-it-services',
    'solutions/cloud-services' => '/#/backup-disaster-recovery',
    'solutions/software-development' => '/#/managed-it-services',
    'solutions/it-consulting-advisory' => '/#/cloud-services',
    'solutions/web-development' => '/#/network-management',
    'solutions/mobile-development' => '/#/cybersecurity',
    'solutions/digital-transformation' => '/#/digital-transformation',
    'solutions/security' => '/#/security',
    'solutions/automation' => '/#/automation',
    'solutions/gaining-efficiency' => '/#/gaining-efficiency',
    'solutions/erp-solutions' => '/#/erp-solutions',
    'solutions/mobile-app-development' => '/#/app-development',
    'solutions/android-development' => '/#/app-development',
    'solutions/ios-development' => '/#/app-development',
    'solutions/hybrid-app-development' => '/#/app-development',
    'solutions/web-app-development' => '/#/app-development',
    'solutions/custom-software-development' => '/#/app-development',
    'solutions/software-development-2' => '/#/software-development-erp-crm-solutions',
    // Industries
    'industries/industry-manufacturing' => '/#/industrial-manufacturing',
    'industries/transportation-logistics' => '/#/transportation-logistics',
    'industries/healthcare' => '/#/healthcare',
    'industries/banks-insurance' => '/#/banks-insurance',
    'industries/consulting-providers' => '/#/consulting-providers',
    'industries/non-profit' => '/#/non-profit',
    'industries/telemedicine' => '/#/telemedicine',
    'industries/fintech' => '/#/fintech',
    'industries/education' => '/#/education',
    // Retired slugs from the readability merges (internal hash routes).
    'security' => '/#/cybersecurity',
    'software-development-erp-crm-solutions' => '/#/software-erp-app-development',
    'erp-solutions' => '/#/software-erp-app-development',
    // Ported blog posts (dated WP slugs -> new slugs).
    'how-startups-are-cutting-cloud-costs-renegotiating-deals-with-service-providers' => '/#/startups-cutting-cloud-costs',
    'heavy-equipment-manufacturer-finds-concrete-solutions' => '/#/heavy-equipment-manufacturer-concrete-solutions',
    'simplifying-and-securing-attachments-in-sage-x3' => '/#/sage-x3-attachments-simplified-secured',
    'financials-face-off-sage-100-erp-vs-cloud' => '/#/sage-100-erp-vs-cloud',
    'tecnologia-has-been-recognized-as-a-leader-in-the-2022-gartner' => '/#/gartner-2022-leader-recognition',
    'identify-the-best-technologies-for-your-business-with-tecnologias-new-tool' => '/#/identifying-best-technologies-for-your-business',
    'how-chat-gpt-is-revolutionizing-the-way-we-find-information' => '/#/chatgpt-revolutionizing-finding-information',
    'clutch-recognizes-tecnologia-among-new-yorks-top-development-for-2023' => '/#/clutch-top-development-new-york-2023',
    // Ported portfolio case studies (new slugs).
    'delivering-enterprise-wide-efficiencies-at-paysafe-through-intelligent-automation' => '/#/paysafe-intelligent-automation',
    '5-impactful-elements-that-promote-it-and-business-alignment' => '/#/it-business-alignment-five-elements',
    // Unported portfolio/filler posts (titles only, duplicated bodies) land on
    // the blog index rather than 404ing.
    'building-optimising-and-future-proofing-existing-infrastructures-with-payment-gateways' => '/#/blog',
    'online-platform-for-distance-learning' => '/#/blog',
    'private-trust-management-and-trading-platform' => '/#/blog',
    'convenience-savings-and-rewards-at-your-fingertips-2' => '/#/blog',
    'strategic-move-to-an-ai-supported-application-for-public-safety-travel-app-in-london' => '/#/blog',
    'bringing-premium-live-casino-experiences-to-gamers-across-the-globe' => '/#/blog',
    'next-generation-erp-brings-transformational-change-to-dental-insurer' => '/#/blog',
    'healthy-supply-chain-management-positions-uniwell-for-growth' => '/#/blog',
    'what-you-shouldnt-be-doing-with-your-cybersecurity-in-2023' => '/#/blog',
    'top-5-tips-for-solving-the-email-security-problem' => '/#/blog',
    '4-cybersecurity-takeaways-from-chinas-largest-data-breach' => '/#/blog',
];
static $legacyPrefix = [
    'solutions/' => '/#/services-solutions',
    'industries/' => '/#industries',
    'events/' => '/#/blog',
    'team/' => '/#/about-us',
    'category/' => '/#/blog',
    'author/' => '/#top',
    'tag/' => '/#/blog',
    'landing-page' => '/',
    'maintenance-page' => '/',
];
$slug = strtolower(trim($uri, '/'));
if (isset($legacyExact[$slug])) {
    http_response_code(301);
    header('Location: ' . $legacyExact[$slug]);
    return true;
}
foreach ($legacyPrefix as $prefix => $target) {
    if ($prefix !== '' && str_starts_with($slug . '/', $prefix)) {
        http_response_code(301);
        header('Location: ' . $target);
        return true;
    }
}

// 5) SPA fallback. The site uses hash routing (#/slug), so any unknown path that
//    is not a real file should still boot the app.
$page = $candidate;
if (!is_file($page)) {
    $page = is_file($dist . '/index.html') ? $dist . '/index.html' : __DIR__ . '/index.html';
}
if (is_file($page)) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($page);
    return true;
}

http_response_code(404);
header('Content-Type: text/plain');
echo "Not found. Run 'npm run build' so dist/ exists.\n";
return true;