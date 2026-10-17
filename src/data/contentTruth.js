// Single source of truth contract — FRONTEND WINS.
// Backend (api/content.php, api/db.php) mirrors these lists in api/truth.php.
// Keep both files in sync. Content changes = edit src/data/* -> run node api/seed.mjs -> rebuild.
//
// STRUCTURAL_KEYS: always taken from code. Backend values are ignored on read
// and rejected on write. Admin editor shows them read-only.
// EDITABLE_KEYS: backend (admin CMS) may override these via api/content.php.
// Any other key defaults to frontend-wins.

export const CONTENT_VERSION = 2

export const STRUCTURAL_KEYS = [
  'navItems',
  'pages',
  'sectionIds',
  'categoryAnchors',
  'uiLabels',
]

export const EDITABLE_KEYS = [
  'settings',
  'socialLinks',
  'introBand',
  'statement',
  'introCards',
  'pageConnect',
  'servicesSection',
  'stackSection',
  'pageLabels',
  'notFound',
  'cookieBanner',
  'contactForm',
  'categoryImages',
  'heroSlides',
  'benefits',
  'pillars',
  'featuredCards',
  'partnerStrip',
  'partners',
  'industriesStrip',
  'industryClosing',
  'caseCards',
  'stackGroups',
  'successStory',
  'blogRow',
  'blogIndex',
  'homeContact',
  'testimonials',
  'statsBand',
  'certStrip',
  'searchSuggestions',
  'faqTeaser',
  'awardsBand',
  'noticeBar',
  'deptSplit',
  'valuesStrip',
  'promo',
  'footerColumns',
  'footerLegal',
]

export function isStructuralKey(key) {
  return STRUCTURAL_KEYS.includes(String(key).split('.')[0].split('[')[0])
}
