// Primary site navigation — doc-defined menu tree (Our Company.docx).
// Top-level hrefs are homepage section anchors; leaves resolve via pageHref().
import { pageHref } from './slug.js'

const links = (...labels) => labels.map((label) => ({ label, href: pageHref(label) }))

export const navItems = [
  {
    label: 'Our Company',
    href: '#company',
    columns: [
      {
        heading: 'Our company',
        links: links('Our Company', 'Our Work', 'People and Impact', 'Our People'),
      },
      {
        heading: 'Who we are',
        links: links('Our Philosophy', 'Why choose us', 'Our Story', 'Our Partners'),
      },
      {
        heading: 'Responsibility',
        links: links('Corporate Responsibility', 'Communities Impact', 'Innovation & Research', 'Careers'),
      },
      {
        heading: 'More about us',
        links: links('About nexsate', 'Mission, vision and values', 'Leadership team', 'Awards and recognition'),
      },
    ],
  },
  {
    label: 'What We Do',
    href: '#it-solutions',
    columns: [
      {
        heading: 'Our services',
        links: links('What We Do', 'Our Services', 'Managed IT services', 'Cloud Services'),
      },
      {
        heading: 'More services',
        links: links('Cybersecurity', 'Networking', 'Software Integration', 'Software development'),
      },
      {
        heading: 'Protect and recover',
        links: links('Data protection & disaster recovery', 'Data protection', 'Compliance and standards'),
      },
      {
        heading: 'How we work',
        links: links('How we Work', 'Technology Stack', 'Onboarding and migration', 'Service level agreements', 'Pricing and plans'),
      },
    ],
  },
  {
    label: 'Who We Serve',
    href: '#industries',
    columns: [
      {
        heading: 'Who we serve',
        links: links('Who We Serve', 'Banking', 'Capital markets', 'Insurance'),
      },
      {
        heading: 'Enterprise',
        links: links('Enterprise technology', 'Manufacturing', 'Logistics', 'Retail'),
      },
      {
        heading: 'Public sector',
        links: links('Healthcare', 'Higher education', 'Government', 'Energy and utilities'),
      },
      {
        heading: 'Our expertise',
        links: links('Our Expertise', 'Customer Success', 'IT Solutions', 'IT strategy consulting'),
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
