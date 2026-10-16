import { pageHref } from './slug.js'

const link = (label) => ({ label, href: pageHref(label) })

export const promo = {
  tag: "Let's talk",
  title: 'Tell us where IT is getting in the way',
  text: 'Tell us about your environment, your users, and the technology challenges affecting daily operations — we will come back to you with a practical way forward.',
  cta: { label: 'Talk to an expert', href: pageHref('Contact us') },
  image: '/uploads/office-space.jpg',
  alt: 'Modern open-plan office space with desks and daylight',
  fallback: 'linear-gradient(120deg, #070e40 0%, #010ed0 55%, #00a1e0 135%)',
}

export const footerColumns = [
  {
    heading: 'Our Company',
    links: [
      { label: 'Who We Are', href: pageHref('About us') },
      { label: 'Our Philosophy', href: pageHref('Our Philosophy') },
      { label: 'Our People', href: pageHref('Team') },
      { label: 'Why Nexsate', href: pageHref('Why Nexsate') },
      { label: 'Our Partners', href: pageHref('Our Partners') },
    ],
  },
  {
    heading: 'Our Work',
    links: [
      { label: 'What We Do', href: pageHref('What We Do') },
      { label: 'How we Work', href: pageHref('How we Work') },
      { label: 'Who We Serve', href: pageHref('Who We Serve') },
      { label: 'Customer Success', href: pageHref('Customer Success') },
      { label: 'Our Expertise', href: pageHref('Our Expertise') },
    ],
  },
  {
    heading: 'People and Impact',
    links: [
      { label: 'Careers', href: pageHref('Careers') },
      { label: 'Innovation & Research', href: pageHref('Innovation & Research') },
      { label: 'Communities Impact', href: pageHref('Communities Impact') },
      { label: 'Corporate Responsibility', href: pageHref('Corporate Responsibility') },
    ],
  },
]

export const footerLegal = [
  link('Privacy Policy'),
  link('Cookie policy'),
  link('Terms & Conditions'),
  link('Contact us'),
]
