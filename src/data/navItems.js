// Primary site navigation — derived from the client documents in
// logoandcontent/ rather than a menu spec. Top-level hrefs are homepage
// section anchors; every leaf resolves through pageHref() to its page slug.
import { pageHref } from './slug.js'

const links = (...labels) => labels.map((label) => ({ label, href: pageHref(label) }))

const serviceLinks = [
  { label: 'Managed IT Services', href: pageHref('Managed IT Services') },
  { label: 'Cloud Services', href: pageHref('Cloud Services') },
  { label: 'Software Development', href: '#/software-erp-app-development' },
  { label: 'Network Management', href: pageHref('Network Management') },
  { label: 'Cyber Security', href: pageHref('Cybersecurity') },
  { label: 'Backup & Disaster Management', href: '#/backup-disaster-recovery' },
]

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
    columns: [
      {
        heading: 'About us',
        links: links('About Us'),
      },
      {
        heading: 'What we bring together',
        links: links('Services & Solutions', 'Managed IT Services', 'Cloud Services', 'Cybersecurity'),
      },
      {
        heading: 'Business services',
        links: [
          ...links('Network Management', 'Backup & Disaster Recovery'),
          { label: 'Software Development, ERP & CRM Solutions', href: '#/software-erp-app-development' },
        ],
      },
    ],
  },
  {
    label: 'What We Do',
    href: '#it-solutions',
    layout: 'solutions',
    columns: [
      {
        heading: 'Services',
        links: serviceLinks,
      },
      {
        heading: 'Business Challenges',
        tiles: challengeTiles,
      },
      {
        heading: 'Industry Focus',
        links: industryLinks,
        viewAll: { label: 'View all', href: '#industries' },
      },
    ],
  },
  {
    label: 'Who We Serve',
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
      {
        heading: 'What we do for them',
        links: links('Managed IT Services', 'Network Management', 'Cybersecurity', 'Backup & Disaster Recovery'),
      },
    ],
  },
  {
    label: 'Success Stories',
    href: '#insights',
    columns: [
      {
        heading: 'Client outcomes',
        // Explicit href: the page's slug is a short, stable 'success-story'
        // rather than a slug derived from its very long case-study title.
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
        links: links('Help and FAQ', 'Contact us'),
      },
      {
        heading: 'Legal',
        links: links('Privacy Policy', 'Cookie policy', 'Terms & Conditions'),
      },
    ],
  },
]
