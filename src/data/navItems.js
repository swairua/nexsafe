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
    label: 'Our Company',
    href: '#company',
    banner: {
      heading: 'Our Company',
      sub: 'EnableIT. Transform. Empower.',
    },
    columns: [
      {
        heading: 'Our Company',
        links: links('Who We Are', 'Our Philosophy', 'Our People', 'Why Nexsate', 'Our Partner'),
        viewAll: { label: 'Explore Company', href: '#company' },
      },
      {
        heading: 'Our Work',
        links: links('What We Do', 'How We Work', 'Who We Serve', 'Our Expertise', 'Customers Success'),
      },
      {
        heading: 'People and Impact',
        links: links('Careers', 'Innovation & Research', 'Communities Impact', 'Corporate Responsibility'),
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
      {
        heading: 'Business challenges',
        tiles: challengeTiles,
      },
    ],
  },
  {
    label: 'Success Stories',
    href: '#insights',
    columns: [
      {
        heading: 'Client outcomes',
        links: [
          { label: 'View all insights', href: '#/blog' },
          { label: 'IT alignment for a growing business', href: '#/success-story' },
        ],
      },
    ],
  },
  {
    label: 'Support',
    href: '#support',
    columns: [
      {
        heading: 'Help and support',
        links: links('Help and FAQ', 'Client Support', 'Contact us'),
      },
      {
        heading: 'Learn',
        links: links('Events', 'Blog'),
      },
      {
        heading: 'Legal',
        links: links('Privacy Policy', 'Cookie policy', 'Terms & Conditions'),
      },
    ],
  },
]
