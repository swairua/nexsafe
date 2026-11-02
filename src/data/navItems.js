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
          { label: 'Our Philosophy', href: '#about' },
          { label: 'Our People', href: pageHref('Team') },
          { label: 'Why Nexsate', href: pageHref('Why Us') },
          { label: 'Our Partners', href: pageHref('Partners & Certifications') },
        ],
      },
      {
        heading: 'Our Work',
        links: [
          { label: 'What We Do', href: pageHref('Services & Solutions') },
          { label: 'How we Work', href: '#it-solutions' },
          { label: 'Who We Serve', href: '#industries' },
          { label: 'Customer Success', href: pageHref('Case Studies') },
          { label: 'Our Expertise', href: '#capabilities' },
        ],
      },
      {
        heading: 'People and Impact',
        links: [
          { label: 'Careers', href: pageHref('Careers') },
          { label: 'Innovation & Research', href: '#insights' },
          { label: 'Communities Impact', href: '#partners' },
          { label: 'Corporate Responsibility', href: '#company' },
        ],
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
      },
      {
        heading: 'Business challenges',
        tiles: challengeTiles,
      },
    ],
  },
]
