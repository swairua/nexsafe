import { allPages } from '../src/data/pages.js'
import { navItems } from '../src/data/navItems.js'
import { footerColumns, footerLegal, promo } from '../src/data/footerContent.js'
import { heroSlides, featuredCards, partnerStrip, industriesStrip, caseCards, successStory, blogRow } from '../src/data/content.js'
import { pageHref } from '../src/data/slug.js'

const known = new Set(allPages.map((p) => p.slug))
const problems = []
const checkHref = (href, where) => {
  if (typeof href !== 'string' || !href.startsWith('#/')) return
  const slug = href.slice(2)
  if (!known.has(slug)) problems.push(`${where}: no page for ${href}`)
}

for (const item of navItems) {
  for (const col of item.columns) {
    for (const l of col.links || []) checkHref(l.href, `nav "${item.label}" / "${l.label}"`)
    for (const t of col.tiles || []) checkHref(t.href, `nav "${item.label}" / "${t.label}"`)
    if (col.viewAll) checkHref(col.viewAll.href, `nav "${item.label}" / "${col.viewAll.label}"`)
  }
}
for (const col of footerColumns) {
  for (const l of col.links) checkHref(l.href, `footer "${col.heading}" / "${l.label}"`)
}
for (const l of footerLegal) checkHref(l.href, `footer legal / "${l.label}"`)
checkHref(promo.cta.href, 'promo cta')
for (const s of heroSlides) checkHref(s.cta.href, `hero "${s.id}"`)
for (const c of featuredCards) checkHref(c.href, `card "${c.id}"`)
checkHref(partnerStrip.cta.href, 'partner strip cta')
checkHref(industriesStrip.cta.href, 'industries cta')
for (const i of industriesStrip.items) checkHref(i.href, `industry "${i.label}"`)
checkHref(successStory.cta.href, 'success story cta')
for (const c of caseCards.items) checkHref(c.href, `case card "${c.title}"`)
checkHref(blogRow.cta.href, 'blog row cta')

for (const page of allPages) {
  for (const s of page.sections || []) {
    for (const item of s.items || []) checkHref(item.href, `${page.slug} item "${item.title}"`)
  }
  for (const slug of page.related || []) {
    if (!known.has(slug)) problems.push(`${page.slug}: related "${slug}" does not exist`)
  }
}

const linked = new Set()
const collect = (href) => {
  if (typeof href === 'string' && href.startsWith('#/')) linked.add(href.slice(2))
}
for (const item of navItems) item.columns.forEach((c) => {
  ;(c.links || []).forEach((l) => collect(l.href))
  ;(c.tiles || []).forEach((t) => collect(t.href))
  if (c.viewAll) collect(c.viewAll.href)
})
for (const col of footerColumns) col.links.forEach((l) => collect(l.href))
footerLegal.forEach(collect)
for (const page of allPages) (page.related || []).forEach(collect)

if (linked.has('blog')) {
  for (const page of allPages) {
    if (page.eyebrow === 'Insights' && page.slug !== 'blog') linked.add(page.slug)
  }
}

for (const page of allPages) {
  if (!linked.has(page.slug)) problems.push(`${page.slug}: orphaned (not linked from anywhere)`)
}

if (problems.length) {
  console.error('Link check failed:\n' + problems.map((p) => `  - ${p}`).join('\n'))
  process.exit(1)
}
console.log(`Link check passed: ${allPages.length} pages, all links resolve, no orphans.`)
