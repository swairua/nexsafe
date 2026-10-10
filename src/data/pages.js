import { companyPages } from './pages/company.js'
import { servicePages } from './pages/services.js'
import { softwarePages } from './pages/software.js'
import { industryPages } from './pages/industries.js'
import { industryMorePages } from './pages/industries-more.js'
import { successStoryPages } from './pages/successStory.js'
import { sitePages } from './pages/site.js'
import { insightPosts, blogIndexPage } from './posts.js'
import { partnershipPages } from './pages/partnerships.js'
import { reviewsAwardsPages } from './pages/reviews-awards.js'
import { careersPages } from './pages/careers.js'
import { eventPages } from './pages/events.js'
import { teamPages } from './pages/team.js'
import { clientSupportPages } from './pages/client-support.js'
import { caseStudyPages } from './pages/case-studies.js'

export const allPages = [
  ...companyPages,
  ...servicePages,
  ...softwarePages,
  ...industryPages,
  ...industryMorePages,
  ...successStoryPages,
  ...sitePages,
  ...insightPosts,
  ...partnershipPages,
  ...reviewsAwardsPages,
  ...careersPages,
  ...eventPages,
  ...teamPages,
  ...clientSupportPages,
  ...caseStudyPages,
  blogIndexPage,
]

export const pages = {}
for (const page of allPages) {
  if (pages[page.slug]) {
    throw new Error(`Duplicate page slug: ${page.slug}`)
  }
  pages[page.slug] = page
}

export function getPage(slug) {
  return pages[slug]
}
