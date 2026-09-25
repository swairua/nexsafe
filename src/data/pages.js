// Central registry of every deep-linkable content page.
// Route: '#/<slug>' (see src/data/slug.js). Rendered by App.jsx → PageView.jsx.
import { whoWeArePages } from './pages/whoWeAre.js'
import { whatWeDoPages } from './pages/whatWeDo.js'
import { sustainabilityPages } from './pages/sustainability.js'
import { newsPages } from './pages/news.js'
import { investorPages } from './pages/investors.js'
import { utilityPages } from './pages/utility.js'

export const allPages = [
  ...whoWeArePages,
  ...whatWeDoPages,
  ...sustainabilityPages,
  ...newsPages,
  ...investorPages,
  ...utilityPages,
]

/** slug → page object. Duplicate slugs fail loudly at module load. */
export const pages = {}
for (const page of allPages) {
  if (pages[page.slug]) {
    throw new Error(`Duplicate page slug: ${page.slug}`)
  }
  pages[page.slug] = page
}

/** Look up a page by route slug (undefined → 404 view). */
export function getPage(slug) {
  return pages[slug]
}
