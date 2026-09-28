// Central registry of every deep-linkable content page.
// Route: '#/<slug>' (see src/data/slug.js). Rendered by App.jsx → PageView.jsx.
//
// Content comes from the client documents in logoandcontent/. The earlier
// Kyndryl-derived placeholder pages (investors, news, sustainability, the
// generic who-we-are / what-we-do sets) were removed rather than kept, so
// nothing on the site is copy the client did not supply.
import { companyPages } from './pages/company.js'
import { servicePages } from './pages/services.js'
import { industryPages } from './pages/industries.js'
import { successStoryPages } from './pages/successStory.js'
import { sitePages } from './pages/site.js'

export const allPages = [
  ...companyPages,
  ...servicePages,
  ...industryPages,
  ...successStoryPages,
  ...sitePages,
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
