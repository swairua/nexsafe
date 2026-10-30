import { pageHref } from './slug.js'

const links = (...labels) => labels.map((label) => ({ label, href: pageHref(label) }))

const challengeTiles = [
  {
    label: 'Digital Transformation',
    href: pageHref('Digital Transformation'),
    icon: 'transform',
    blurb: 'Modernize systems and processes',
  },
  {
    label: 'Security',
    href: pageHref('Cybersecurity'),
    icon: 'shield',
    blurb: 'Protect users, devices and data',
  },
  {
    label: 'Automation',
    href: pageHref('Automation'),
    icon: 'gear',
    blurb: 'Remove repetitive manual work',
  },
  {
    label: 'Gaining Efficiency',
    href: pageHref('Gaining Efficiency'),
    icon: 'gauge',
    blurb: 'Get more from your technology',
  },
]

export const navItems = [
  {
    label: 'Company',
    href: '#company',
    columns: [
      {
        heading: 'Our Company',
        links: [
          { label: 'Who We Are', href: pageHref('About Us') },
          { label: 'Our People', href: pageHref('Team') },
          { label: 'Why Nexsate', href: pageHref('Why Us') },
          { label: 'Our Partners', href: pageHref('Partners & Certifications') },
        ],
        viewAll: { label: 'Explore Company', href: '#company' },
      },
      {
        heading: 'Our Work',
        links: [
          { label: 'What We Do', href: pageHref('Services & Solutions') },
          { label: 'Who We Serve', href: '#industries' },
          { label: 'Customers Success', href: pageHref('Case Studies') },
        ],
      },
      {
        heading: 'People and Impact',
        links: links('Careers'),
      },
    ],
  },
  {
    label: 'Who we serve',
    href: '#industries',
    columns: [
      {
        heading: 'Industry focus',
        links: links(
          'Banks & Insurance',
          'Healthcare',
          'Industrial & Manufacturing',
          'Transportation & Logistics',
          'Consulting Providers',
          'Non-Profit',
          'Telemedicine',
          'Fintech',
          'Education',
        ),
        viewAll: { label: 'View all', href: '#industries' },
      },
    ],
  },
  {
    label: 'Solutions',
    href: pageHref('Services & Solutions'),
    layout: 'solutions',
    columns: [
      {
        heading: 'Services',
        links: links(
          'Cybersecurity',
          'Network Management',
          'Backup & Disaster Recovery',
          'Software, ERP & App Development',
          'Automation',
        ),
        viewAll: { label: 'View all solutions', href: pageHref('Services & Solutions') },
      },
      {
        heading: 'Business challenges',
        tiles: challengeTiles,
      },
    ],
  },
]
