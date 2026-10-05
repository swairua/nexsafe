// Primary site navigation — derived from the client documents in
// logoandcontent/ rather than a menu spec. Top-level hrefs are homepage
// section anchors; every leaf resolves through pageHref() to its page slug.
import { pageHref } from './slug.js'

const links = (...labels) => labels.map((label) => ({ label, href: pageHref(label) }))

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
        links: links('Network Management', 'Backup & Disaster Recovery', 'Software Development, ERP & CRM Solutions'),
      },
    ],
  },
  {
    label: 'What We Do',
    href: '#it-solutions',
    columns: [
      {
        heading: 'Core services',
        links: links('Managed IT Services', 'Cloud Services', 'Cybersecurity'),
      },
      {
        heading: 'Connect and protect',
        links: links('Network Management', 'Backup & Disaster Recovery'),
      },
      {
        heading: 'Build and improve',
        links: [
          { label: 'Software & App Development', href: '#/software-erp-app-development' },
          ...links('Automation', 'Digital Transformation', 'Gaining Efficiency'),
        ],
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
