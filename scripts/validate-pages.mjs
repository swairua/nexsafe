// Cross-reference validation for the deep-link content system.
// Run: node scripts/validate-pages.mjs   (plain ESM data — no bundler needed)
import { allPages, pages } from '../src/data/pages.js'
import { navItems } from '../src/data/navItems.js'
import { footerColumns, footerLegal, newsItems, promo } from '../src/data/footerContent.js'
import { featuredCards, splitSections, heroSlides } from '../src/data/content.js'
import { slugify } from '../src/data/slug.js'

const errors = []
const knownAnchors = new Set([
  '#top',
  '#about',
  '#company',
  '#it-solutions',
  '#pictures',
  '#industries',
  '#who-we-serve',
  '#technology-stack',
  '#capabilities',
  '#insights',
  '#support',
])

const checkRoute = (where, href) => {
  if (!href.startsWith('#/')) {
    errors.push(`${where}: not a page route (${href})`)
  } else if (!pages[href.slice(2)]) {
    errors.push(`${where}: unknown page ${href}`)
  }
}

// 1) Registry: duplicates, schema, title↔slug invariant, related integrity.
const seen = new Set()
for (const p of allPages) {
  if (seen.has(p.slug)) errors.push(`duplicate slug: ${p.slug}`)
  seen.add(p.slug)
  if (!p.title || !p.eyebrow || !p.intro) errors.push(`${p.slug}: missing title/eyebrow/intro`)
  if (!Array.isArray(p.sections) || !p.sections.length) errors.push(`${p.slug}: empty sections`)
  for (const s of p.sections || []) {
    if (!s.heading) errors.push(`${p.slug}: section without heading`)
    if (!s.body?.length && !s.list?.length) errors.push(`${p.slug}: section '${s.heading}' has no content`)
  }
  if (slugify(p.title) !== p.slug) {
    errors.push(`${p.slug}: slug != slugify(title) → ${slugify(p.title)}`)
  }
  for (const r of p.related || []) {
    if (!pages[r]) errors.push(`${p.slug}: related → missing '${r}'`)
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
for (const c of [...heroSlides.map((s) => s.cta), ...splitSections.map((s) => s.cta), promo.cta]) {
  if (c.href.startsWith('#/')) checkRoute(`cta '${c.label}'`, c.href)
  else if (!knownAnchors.has(c.href)) errors.push(`cta '${c.label}': unknown anchor ${c.href}`)
}
for (const n of newsItems) checkRoute(`news '${n.title}'`, n.href)
for (const card of featuredCards) checkRoute(`card '${card.id}'`, card.href)

// 5) No placeholder '#' hrefs anywhere in data.
const blob = JSON.stringify({ navItems, footerColumns, footerLegal, newsItems, promo, featuredCards, splitSections })
if (blob.includes('"#"')) errors.push(`placeholder href '#' still present in data`)

// 6) Coverage: every menu label resolves to a real page.
const menuLabels = navItems.flatMap((i) => i.columns.flatMap((c) => c.links.map((l) => l.label)))
for (const label of menuLabels) {
  if (!pages[slugify(label)]) errors.push(`nav label without page: '${label}' → ${slugify(label)}`)
}

console.log(`Pages: ${allPages.length} total, ${Object.keys(pages).length} unique`)
console.log(`Nav leaves checked: ${menuLabels.length}; footer links: ${footerColumns.flatMap((c) => c.links).length + footerLegal.length}`)
if (errors.length) {
  for (const e of errors) console.log(`FAIL - ${e}`)
  process.exit(1)
}
console.log('PAGES VALIDATION: ALL PASSED')
