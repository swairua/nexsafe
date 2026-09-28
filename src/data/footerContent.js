// Footer + homepage-bottom content: blog teasers, services promo,
// footer link columns and legal bar. Links resolve through slug.js so labels,
// slugs and the page registry stay in lockstep.
import { pageHref } from './slug.js'

const link = (label) => ({ label, href: pageHref(label) })

export const newsItems = [
  {
    id: 'news-1',
    date: 'May 8, 2018',
    category: 'Success Stories',
    title: 'Partnering with IT provider helps erie manufacturing company thrive in 21st century',
    href: pageHref('Partnering with IT provider helps erie manufacturing company thrive in 21st century'),
  },
  {
    id: 'news-2',
    date: 'May 8, 2018',
    category: 'Success Stories',
    title: 'Improving lives with technology – HSE lighthouse project',
    href: pageHref('Improving lives with technology – HSE lighthouse project'),
  },
  {
    id: 'news-3',
    date: 'May 8, 2018',
    category: 'Success Stories',
    title: 'Dynamics 365: a game changer for dairygold operations',
    href: pageHref('Dynamics 365: a game changer for dairygold operations'),
  },
]

export const promo = {
  tag: 'Discover how we can help your business',
  title: 'WIN with managed IT services.',
  text: 'Partner with us for IT management services to grow your existing IT infrastructure — or work with us as your one-stop shop for IT management and solutions.',
  cta: { label: 'Discover now', href: pageHref('IT services') },
  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80',
  fallback: 'linear-gradient(120deg, #070e40 0%, #010ed0 55%, #00a1e0 135%)',
}

export const footerColumns = [
  {
    heading: 'Contact',
    links: [
      { label: 'Beverley Rd, Brooklyn, New York 1226 US', href: '#/contact-us' },
      { label: 'P: + (0712) 819 79 555', href: '#/contact-us' },
      { label: 'M: info@nexsate.com', href: '#/contact-us' },
    ],
  },
  {
    heading: 'IT Services',
    links: [
      link('IT services'),
      link('Managed IT services'),
      link('IT support'),
      link('Software integration'),
      link('Cloud Services'),
      link('Cybersecurity'),
      link('Software development'),
    ],
  },
  {
    heading: 'Industries',
    links: [
      link('Banking'),
      link('Capital markets'),
      link('Enterprise technology'),
      link('Manufacturing'),
      link('Healthcare'),
      link('Higher education'),
    ],
  },
  {
    heading: 'Company',
    links: [
      link('About nexsate'),
      link('Leadership team'),
      link('IT blog'),
      link('Case studies'),
      link('Locations'),
      link('Careers'),
    ],
  },
  {
    heading: 'Support',
    links: [
      link('Support forum'),
      link('Help and FAQ'),
      link('Contact us'),
      link('Pricing and plans'),
    ],
  },
]

export const footerLegal = [
  link('Privacy Policy'),
  link('Cookie policy'),
  link('Terms & Conditions'),
  link('Accessibility'),
  link('Data protection'),
  link('Phishing and scam alerts'),
  link('Contact us'),
]
