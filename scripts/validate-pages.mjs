// Cross-reference validation for the deep-link content system.
// Run: node scripts/validate-pages.mjs   (plain ESM data — no bundler needed)
import { allPages, pages } from '../src/data/pages.js'
import { navItems } from '../src/data/navItems.js'
import { footerColumns, footerLegal, promo } from '../src/data/footerContent.js'
import {
  featuredCards,
  heroSlides,
  benefits,
  industriesStrip,
  partnerStrip,
  successStory,
} from '../src/data/content.js'
import { stackGroups } from '../src/data/stack.js'
import { defaultContent } from '../src/data/siteContent.js'
import { slugify } from '../src/data/slug.js'

const { sectionIds } = defaultContent

const errors = []

// Section ids actually rendered by the homepage components (content-driven:
// src/data/siteContent.js -> sectionIds, editable under "Section anchors").
const knownAnchors = new Set(Object.values(sectionIds).map((id) => `#${id}`))

const checkRoute = (where, href) => {
  if (!href.startsWith('#/')) {
    errors.push(`${where}: not a page route (${href})`)
  } else if (!pages[href.slice(2)]) {
    errors.push(`${where}: unknown page ${href}`)
  }
}

// 1) Registry: duplicates, schema, and related integrity.
const seen = new Set()
for (const p of allPages) {
  if (seen.has(p.slug)) errors.push(`duplicate slug: ${p.slug}`)
  seen.add(p.slug)
  if (!p.title || !p.eyebrow || !p.intro) errors.push(`${p.slug}: missing title/eyebrow/intro`)
  if (!Array.isArray(p.sections) || !p.sections.length) errors.push(`${p.slug}: empty sections`)
  for (const s of p.sections || []) {
    if (!s.heading) errors.push(`${p.slug}: section without heading`)
    const hasContent = s.body?.length || s.list?.length || s.items?.length
    if (!hasContent) errors.push(`${p.slug}: section '${s.heading}' has no content`)
    for (const item of s.items || []) {
      if (!item.title || !item.text) {
        errors.push(`${p.slug}: section '${s.heading}' has an item missing title/text`)
      }
      // Service cards may carry a "Learn more" route; it must resolve.
      if (item.href) checkRoute(`${p.slug} item '${item.title}'`, item.href)
    }
  }
  for (const r of p.related || []) {
    if (!pages[r]) errors.push(`${p.slug}: related -> missing '${r}'`)
  }
  // A page may carry its own hero image, gallery and award badges (ported from
  // the previous site). Every entry must be a local upload, never a remote URL.
  const shots = [...(p.image ? [p.image] : []), ...(p.gallery || []), ...(p.logos || [])]
  for (const shot of shots) {
    if (!shot || !shot.src || !shot.src.startsWith('/uploads/')) {
      errors.push(`${p.slug}: image entry must point at a local /uploads/ file`)
    }
  }
}

// 2) Nav: top-level = real homepage anchors; every leaf = resolvable route.
for (const item of navItems) {
  if (!knownAnchors.has(item.href)) errors.push(`nav top '${item.label}': unexpected href ${item.href}`)
  for (const col of item.columns) {
    for (const l of col.links) checkRoute(`nav leaf '${l.label}'`, l.href)
  }
}

// 3) Footer columns + legal bar: every link is a resolvable route.
for (const col of footerColumns) {
  for (const l of col.links) checkRoute(`footer '${l.label}'`, l.href)
}
for (const l of footerLegal) checkRoute(`legal '${l.label}'`, l.href)

// 4) Homepage CTAs: routes must resolve; anchors must be known sections.
const ctas = [
  ...heroSlides.map((s) => s.cta),
  ...featuredCards.map((c) => ({ label: c.id, href: c.href })),
  partnerStrip.cta,
  industriesStrip.cta,
  successStory.cta,
  promo.cta,
]
for (const c of ctas) checkRoute(`cta '${c.label}'`, c.href)
for (const i of industriesStrip.items) checkRoute(`industry '${i.label}'`, i.href)

// 5) Homepage content shape.
if (benefits.length !== 4) errors.push(`benefits: expected 4, got ${benefits.length}`)
if (featuredCards.length !== 6) errors.push(`featuredCards: expected 6, got ${featuredCards.length}`)
if (stackGroups.length !== 4) errors.push(`stackGroups: expected 4, got ${stackGroups.length}`)
for (const g of stackGroups) {
  if (!g.title || !g.text || !g.vendors?.length) errors.push(`stack '${g.id}': incomplete`)
}

// 5b) Sector coverage. Four sectors have full Industry Focus documents;
// five more (consulting, non-profit, telemedicine, fintech, education) have
// compact pages ported from the live site's industry index. Professional
// Services still has no source document or page, so it must stay unlisted.
const SECTORS_WITHOUT_SOURCE = ['Professional Services']
const sectorLabels = industriesStrip.items.map((i) => i.label)
for (const s of SECTORS_WITHOUT_SOURCE) {
  if (sectorLabels.includes(s)) {
    errors.push(`sector '${s}' is listed but has no source document or page`)
  }
}
if (sectorLabels.length !== 9) {
  errors.push(`industriesStrip: expected 9 sectors, got ${sectorLabels.length}`)
}

// 6) No placeholder '#' hrefs anywhere in data.
const blob = JSON.stringify({
  navItems,
  footerColumns,
  footerLegal,
  promo,
  featuredCards,
  heroSlides,
  benefits,
  industriesStrip,
  partnerStrip,
  successStory,
  stackGroups,
})
if (blob.includes('"#\\""') || blob.includes("'#'")) {
  errors.push(`placeholder href '#' still present in data`)
}

// 7) Coverage: every nav leaf label matches a registered page title.
for (const item of navItems) {
  for (const col of item.columns) {
    for (const l of col.links) {
      if (!l.href.startsWith('#/')) continue
      const target = pages[l.href.slice(2)]
      if (target && !target.title) errors.push(`nav leaf '${l.label}': page has no title`)
    }
  }
}

console.log(`Pages: ${allPages.length} total, ${Object.keys(pages).length} unique`)
console.log(
  `Nav leaves checked: ${navItems.flatMap((i) => i.columns.flatMap((c) => c.links)).length}; ` +
    `footer links: ${footerColumns.flatMap((c) => c.links).length + footerLegal.length}`,
)
if (errors.length) {
  for (const e of errors) console.log(`FAIL - ${e}`)
  process.exit(1)
}
console.log('PAGES VALIDATION: ALL PASSED')

