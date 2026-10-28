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

const industryLinks = [
  { label: 'Industry Manufacturing', href: pageHref('Industrial & Manufacturing') },
  { label: 'Transportation & Logistics', href: pageHref('Transportation & Logistics') },
  { label: 'Healthcare', href: pageHref('Healthcare') },
  { label: 'Banking, Finance & Insurance', href: pageHref('Banks & Insurance') },
  { label: 'Consulting Providers', href: pageHref('Consulting Providers') },
  { label: 'Non Profit', href: pageHref('Non-Profit') },
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
        heading: 'Company',
        links: links('About nexsate', 'Mission, vision and values', 'Why choose us', 'Our story'),
        viewAll: { label: 'Explore Company', href: '#company' },
      },
      {
        heading: 'Work',
        links: links('Managed IT Services', 'Cloud Services', 'Cybersecurity', 'Software Development'),
      },
      {
        heading: 'Impact',
        links: links('Client outcomes', 'Case studies', 'Awards', 'Testimonials'),
      },
    ],
  },
  {
    label: 'Industries we serve',
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