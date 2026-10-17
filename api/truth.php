<?php
declare(strict_types=1);
// Mirror of src/data/contentTruth.js — FRONTEND IS THE SINGLE SOURCE OF TRUTH.
// Keep both files in sync. Content changes = edit src/data/* -> node api/seed.mjs -> rebuild.

define('CONTENT_VERSION', 2);

// Always taken from code. Ignored on read, rejected on write.
function nx_structural_keys(): array
{
    return ['navItems', 'pages', 'sectionIds', 'categoryAnchors', 'uiLabels'];
}

// Backend (admin CMS) may override these via api/content.php.
function nx_editable_keys(): array
{
    return [
        'settings', 'socialLinks', 'introBand', 'statement', 'introCards',
        'pageConnect', 'servicesSection', 'stackSection', 'pageLabels',
        'notFound', 'cookieBanner', 'contactForm', 'categoryImages',
        'heroSlides', 'benefits', 'pillars', 'featuredCards', 'partnerStrip',
        'partners', 'industriesStrip', 'industryClosing', 'caseCards',
        'stackGroups', 'successStory', 'blogRow', 'blogIndex', 'homeContact',
        'testimonials', 'statsBand', 'certStrip', 'searchSuggestions',
        'faqTeaser', 'awardsBand', 'noticeBar', 'deptSplit', 'valuesStrip',
        'promo', 'footerColumns', 'footerLegal',
    ];
}

function nx_top_key(string $key): string
{
    $key = (string) $key;
    $dot = strpos($key, '.');
    if ($dot !== false) {
        $key = substr($key, 0, $dot);
    }
    $br = strpos($key, '[');
    if ($br !== false) {
        $key = substr($key, 0, $br);
    }
    return $key;
}

function nx_is_structural(string $key): bool
{
    return in_array(nx_top_key($key), nx_structural_keys(), true);
}

function nx_is_editable(string $key): bool
{
    return in_array(nx_top_key($key), nx_editable_keys(), true);
}
