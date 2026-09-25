// Primary site navigation — 5 top-level items with mega-menu columns.
// Top-level hrefs are homepage section anchors; leaves resolve via pageHref().
import { pageHref } from './slug.js'

const links = (...labels) => labels.map((label) => ({ label, href: pageHref(label) }))

export const navItems = [
  {
    label: 'Company',
    href: '#company',
    columns: [
      {
        heading: 'About us',
        links: links('About nexsate', 'Mission, vision and values', 'Why choose us', 'Our story'),
      },
      {
        heading: 'People',
        links: links('Leadership team', 'Careers', 'Diversity and inclusion'),
      },
      {
        heading: 'Locations and contact',
        links: links('Locations', 'Contact us', 'Report an issue with our website'),
      },
    ],
  },
  {
    label: 'IT solutions',
    href: '#it-solutions',
    columns: [
      {
        heading: 'IT services',
        links: links('IT services', 'Managed IT', 'IT support', 'IT consultancy'),
      },
      {
        heading: 'Cloud and software',
        links: links('Cloud computing', 'Custom software', 'Backup and recovery', 'Network management'),
      },
      {
        heading: 'Security',
        links: links('Cyber security', 'Data protection', 'Compliance and standards'),
      },
      {
        heading: 'How we work',
        links: links('Onboarding and migration', 'Service level agreements', 'Pricing and plans'),
      },
    ],
  },
  {
    label: 'Industries',
    href: '#industries',
    columns: [
      {
        heading: 'Financial services',
        links: links('Banking', 'Capital markets', 'Insurance'),
      },
      {
        heading: 'Enterprise',
        links: links('Enterprise technology', 'Manufacturing', 'Logistics'),
      },
      {
        heading: 'Public sector',
        links: links('Healthcare', 'Higher education', 'Government'),
      },
      {
        heading: 'Other sectors',
        links: links('Retail', 'Energy and utilities', 'Media and entertainment'),
      },
    ],
  },
  {
    label: 'Insights',
    href: '#insights',
    columns: [
      {
        heading: 'Case studies',
        links: links(
          'Cloud migration saves money for health insurer',
          'Remote support centre for semiconductor provider',
          'Subscription licensing unlocks spike in IT orders',
        ),
      },
      {
        heading: 'IT blog',
        links: links(
          'Partnering with IT provider helps erie manufacturing company thrive in 21st century',
          'Improving lives with technology – HSE lighthouse project',
          'Dynamics 365: a game changer for dairygold operations',
          'Tips to make your workforce a security front line',
          '4 ways compsec pros protect their computers',
        ),
      },
      {
        heading: 'Resources',
        links: links('IT blog', 'Case studies', 'Email alerts'),
      },
      {
        heading: 'Media',
        links: links('Media contacts', 'Image library'),
      },
    ],
  },
  {
    label: 'Support',
    href: '#support',
    columns: [
      {
        heading: 'Help and support',
        links: links('Help and FAQ', 'Support centre', 'Service status'),
      },
      {
        heading: 'Contact',
        links: links('Contact us', 'Report an issue with our website', 'Change country'),
      },
      {
        heading: 'Legal',
        links: links('Privacy policy', 'Cookie policy', 'Terms of use'),
      },
    ],
  },
]
