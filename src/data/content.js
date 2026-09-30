// Homepage section content — copy taken from the client-supplied Home Page
// document. The document sets the order: hero, four benefits, the six
// services, the industries line, the technology stack, then the success
// story. Section components render these exports unchanged.
import { pageHref } from './slug.js'

// Photography is served from public/uploads (see scripts/localize-images.mjs).

// Navy scrim over photography + brand-blue gradient fallback (used if the
// image file is missing) — keeps every dark surface on-palette.
const navyScrim =
  'linear-gradient(90deg, rgba(7,14,64,.86) 0%, rgba(7,14,64,.45) 60%, rgba(7,14,64,.16) 100%)'
const navyFallback = 'linear-gradient(135deg, #070e40 0%, #010ed0 130%)'
const navyFallbackSoft = 'linear-gradient(135deg, #070e40 0%, #0693e3 130%)'
const navyTile = 'linear-gradient(135deg, #070e40 0%, #010ed0 140%)'

// The document opens on the promise, then the positioning, then the sectors.
export const heroSlides = [
  {
    id: 'promise',
    kicker: 'Empowering businesses with transformative technology solutions',
    title: 'We take care of your IT, so you can take care of your customers.',
    text: 'Nexsate helps businesses reduce downtime, strengthen security, improve connectivity, support users, and create a more reliable technology environment for daily operations and future growth.',
    cta: { label: 'Discover our services', href: pageHref('Services & Solutions') },
    image: '/uploads/hero-network-servers.jpg',
    gradient: navyScrim,
    fallback: navyFallback,
  },
  {
    id: 'principle',
    kicker: 'EnableIT. Transform. Empower.',
    title: 'Simply enabling IT for a complex world',
    text: 'Since 2016 our principle has shaped the business: technology should make business easier, safer, and more productive. We deliver reliable, responsive, and secure IT, software, and telecommunications solutions.',
    cta: { label: 'About Nexsate', href: pageHref('About Us') },
    image: '/uploads/hero-team-planning.jpg',
    gradient: navyScrim,
    fallback: navyFallbackSoft,
  },
  {
    id: 'industries',
    kicker: 'Industry focus',
    title: 'Solving IT challenges for the industries that keep business moving.',
    text: 'Industrial & Manufacturing, Transportation & Logistics, Healthcare, Financial Services, Professional Services, Non-Profit — technology support built around the way your sector actually operates.',
    cta: { label: 'See who we serve', href: pageHref('Services & Solutions') },
    image: '/uploads/team-collaboration.jpg',
    gradient: navyScrim,
    fallback: navyTile,
  },
]

// The four benefits from the document, in its order and wording.
export const benefits = [
  {
    id: 'cost-effectiveness',
    title: 'Cost-effectiveness',
    text: 'Reduce downtime, prevent recurring issues, and access reliable IT expertise without the cost of a full in-house team.',
  },
  {
    id: 'innovative-technology',
    title: 'Innovative technology',
    text: 'Modern tools and solutions that improve productivity, strengthen protection, and support smarter ways of working.',
  },
  {
    id: 'industry-expertise',
    title: 'Industry expertise',
    text: 'Tailored IT solutions designed around your industry, operations, users, and business needs.',
  },
  {
    id: 'scalability',
    title: 'Scalability',
    text: 'Flexible technology solutions that grow with your business and support long-term value from your investment.',
  },
]

// The document's "Services" list — six services, each with its own page.
export const featuredCards = [
  {
    id: 'card-managed-it-services',
    tag: 'Managed IT',
    title: 'Managed IT Services',
    text: 'Reliable IT support that keeps your team productive, resolves issues faster, reduces downtime, and keeps daily operations moving.',
    linkLabel: 'Stay up and running',
    image: '/uploads/service-managed-it.jpg',
    fallback: navyFallback,
    href: pageHref('Managed IT Services'),
  },
  {
    id: 'card-cloud-services',
    tag: 'Cloud',
    title: 'Cloud Services',
    text: 'Secure cloud solutions for working, collaborating, accessing information, and protecting data from anywhere.',
    linkLabel: 'Move to the cloud',
    image: '/uploads/data-centre.jpg',
    fallback: navyFallbackSoft,
    href: pageHref('Cloud Services'),
  },
  {
    id: 'card-software-development',
    tag: 'Software',
    title: 'Software Development',
    text: 'Custom software and ERP solutions designed to automate workflows, connect systems, improve efficiency, and support daily operations.',
    linkLabel: 'Build smarter',
    image: '/uploads/circuit-board.jpg',
    fallback: navyTile,
    href: pageHref('Software Development, ERP & CRM Solutions'),
  },
  {
    id: 'card-network-management',
    tag: 'Network',
    title: 'Network Management',
    text: 'Reliable network support that keeps your business connected, secure, and well supported through monitoring, maintenance, and troubleshooting.',
    linkLabel: 'Stay connected',
    image: '/uploads/hero-network-servers.jpg',
    fallback: navyFallback,
    href: pageHref('Network Management'),
  },
  {
    id: 'card-cybersecurity',
    tag: 'Security',
    title: 'Cybersecurity',
    text: 'Security services that protect your business data, users, devices, systems, and cloud platforms from evolving digital threats.',
    linkLabel: 'Protect your business',
    image: '/uploads/cybersecurity.jpg',
    fallback: navyFallbackSoft,
    href: pageHref('Cybersecurity'),
  },
  {
    id: 'card-backup',
    tag: 'Recovery',
    title: 'Backup & Disaster Recovery',
    text: 'Reliable data protection and recovery services that safeguard critical information, reduce disruption, and prepare your business for unexpected events.',
    linkLabel: 'Plan your recovery',
    image: '/uploads/data-centre.jpg',
    fallback: navyTile,
    href: pageHref('Backup & Disaster Recovery'),
  },
]

// Vendor wall copy. The roster itself lives in `partners.js` and is rendered
// from there, so the headline here and the tiles can never drift apart.
export const partnerStrip = {
  tag: 'Using trusted technology',
  title: 'Using trusted technology to solve your IT challenges',
  text: 'Nexsate uses proven platforms and technology partners to deliver reliable support, stronger security, better visibility, and smoother day-to-day IT performance.',
  cta: { label: 'Explore our services', href: pageHref('Services & Solutions') },
}

// The Home Page document names six sectors:
//
//   Industrial & Manufacturing, Transportation & Logistics, Healthcare,
//   Financial Services, Professional Services, Non-Profit
//
// Only the first four have a dedicated "Industry Focus" document (488-600
// words each), so only those four are listed here and given pages. The other
// two appear nowhere else in the supplied material, so there is nothing to
// write a page from without inventing sector-specific claims.
//
// TODO(client): request "Industry Focus - Professional Services" and
// "Industry Focus - Non-Profit" documents. When they arrive, add a page to
// src/data/pages/industries.js and an entry to `items` below, and re-point
// any existing "Financial Services" label if the client prefers that wording.
export const industriesStrip = {
  tag: 'Industries we serve',
  title: 'Solving IT challenges for the industries that keep business moving',
  text: 'Technology support built around how your sector works — whether that is a clinic, a warehouse, a branch office or a dispatch floor.',
  cta: { label: 'All our services', href: pageHref('Services & Solutions') },
  items: [
    { label: 'Industrial & Manufacturing', href: pageHref('Industrial & Manufacturing'), note: 'Production continuity' },
    { label: 'Transportation & Logistics', href: pageHref('Transportation & Logistics'), note: 'Dispatch and fleet' },
    { label: 'Healthcare', href: pageHref('Healthcare'), note: 'Patient service' },
    { label: 'Financial Services', href: pageHref('Banks & Insurance'), note: 'Confidentiality first' },
  ],
}

// The success story from the Home Page document, reduced to its outcome list
// for the homepage teaser. The full narrative lives on its own page.
export const successStory = {
  id: 'success-story',
  tag: 'Success stories',
  title: 'How better IT alignment helped a growing business improve security, productivity, and daily operations',
  text: 'A growing business had the tools it needed, but they were not properly aligned with the way the team worked. Nexsate reviewed the environment, identified gaps, and created a more reliable, secure, and organized IT foundation.',
  quote:
    'The goal was not just to fix IT problems. The goal was to create a technology environment that helped the business work better, stay protected, and grow with more confidence.',
  cta: { label: 'Read the full story', href: pageHref('Success Story') },
  outcomes: [
    'Faster and more organized IT support',
    'Stronger cybersecurity protection',
    'Better control over user access and permissions',
    'Improved Microsoft 365 and cloud collaboration',
    'More reliable backup and recovery planning',
    'Fewer recurring technology disruptions',
    'A clearer IT roadmap for growth',
  ],
  image: '/uploads/business-meeting.jpg',
  fallback: navyFallback,
}
