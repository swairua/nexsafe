// Footer + homepage-bottom content. Links resolve through slug.js so labels,
// slugs and the page registry stay in lockstep with the client pages.
import { pageHref } from './slug.js'

const link = (label) => ({ label, href: pageHref(label) })

// Closing CTA banner, built from the client's own positioning line.
export const promo = {
  tag: 'Simply enabling IT for a complex world',
  title: 'We take care of your IT, so you can take care of your customers.',
  text: 'Tell us about your environment, your users, and the technology challenges affecting daily operations — we will come back to you with a practical way forward.',
  cta: { label: 'Talk to an expert', href: pageHref('Contact us') },
  image: '/uploads/office-space.jpg',
  fallback: 'linear-gradient(120deg, #070e40 0%, #010ed0 55%, #00a1e0 135%)',
}

export const footerColumns = [
  {
    heading: 'Contact',
    links: [
      { label: 'Talk to an expert', href: pageHref('Contact us') },
      { label: 'Help and FAQ', href: pageHref('Help and FAQ') },
    ],
  },
  {
    heading: 'Services',
    links: [
      link('Services & Solutions'),
      link('Managed IT Services'),
      link('Cloud Services'),
      link('Cybersecurity'),
    ],
  },
  {
    heading: 'More services',
    links: [
      link('Network Management'),
      link('Backup & Disaster Recovery'),
      link('Software Development, ERP & CRM Solutions'),
      link('ERP Solutions'),
    ],
  },
  {
    heading: 'Industries',
    links: [
      link('Banks & Insurance'),
      link('Healthcare'),
      link('Industrial & Manufacturing'),
      link('Transportation & Logistics'),
    ],
  },
  {
    heading: 'Company',
    links: [
      link('About Us'),
      link('Our Mission'),
      link('Core Values'),
      link('Our Process'),
    ],
  },
]

export const footerLegal = [
  link('Privacy Policy'),
  link('Cookie policy'),
  link('Terms & Conditions'),
  link('Contact us'),
]
