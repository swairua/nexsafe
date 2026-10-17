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
    heading: 'IT Services',
    links: [
      { label: 'Managed IT', href: '#/managed-it-services' },
      { label: 'IT Support', href: '#/client-support' },
      { label: 'IT Consultancy', href: '#/services-solutions' },
      { label: 'Cloud Computing', href: '#/cloud-services' },
      { label: 'Cyber Security', href: '#/cybersecurity' },
      { label: 'Custom Software', href: '#/software-erp-app-development' },
    ],
  },
  {
    heading: 'Industries',
    links: [
      { label: 'Banking', href: '#/banks-insurance' },
      { label: 'Capital Markets', href: '#/fintech' },
      { label: 'Enterprise Technology', href: '#/consulting-providers' },
      { label: 'Manufacturing', href: '#/industrial-manufacturing' },
      { label: 'Healthcare', href: '#/healthcare' },
      { label: 'Higher Education', href: '#/education' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#/about-us' },
      { label: 'Leadership Team', href: '#/team' },
      { label: 'IT Blog', href: '#/blog' },
      { label: 'Case Studies', href: '#/case-studies' },
      { label: 'Events', href: '#/events' },
      { label: 'Locations', href: '#/contact-us' },
      { label: 'Careers', href: '#/careers' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Forum Support', href: '#/client-support' },
      { label: 'Help & FAQ', href: '#/help-and-faq' },
      { label: 'Contact Us', href: '#/contact-us' },
      { label: 'Pricing and plans', href: '#/services-solutions' },
      { label: 'Cookies Policy', href: '#/cookie-policy' },
      { label: 'Privacy Policy', href: '#/privacy-policy' },
    ],
  },
]

export const footerLegal = [
  link('Privacy Policy'),
  link('Cookie policy'),
  link('Terms & Conditions'),
  link('Contact us'),
]
