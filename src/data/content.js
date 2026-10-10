// Homepage section content — copy taken from the client-supplied Home Page
// document. The document sets the order: hero, four benefits, the six
// services, the industries line, the technology stack, then the success
// story. Section components render these exports unchanged.
import { pageHref } from './slug.js'
import { blogIndex } from './posts.js'

// Re-exported so siteContent (and the CMS seed) carry the blog page copy.
export { blogIndex }

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
    alt: 'Server racks glowing blue inside a modern data centre',
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
    alt: 'Colleagues planning around a table with laptops and notes',
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
    alt: 'Diverse team collaborating together in a bright office',
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
    alt: 'IT technician supporting a workstation',
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
    alt: 'Data centre corridor with server cabinets',
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
    alt: 'Close-up of a circuit board with glowing traces',
    fallback: navyTile,
    href: pageHref('Software, ERP & App Development'),
  },
  {
    id: 'card-network-management',
    tag: 'Network',
    title: 'Network Management',
    text: 'Reliable network support that keeps your business connected, secure, and well supported through monitoring, maintenance, and troubleshooting.',
    linkLabel: 'Stay connected',
    image: '/uploads/hero-network-servers.jpg',
    alt: 'Server racks glowing blue inside a modern data centre',
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
    alt: 'Padlock security overlay on a laptop',
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
    alt: 'Data centre corridor with server cabinets',
    fallback: navyTile,
    href: pageHref('Backup & Disaster Recovery'),
  },
]


// Audience-specific cards: frames Nexsate's services around who they're
// for — Business Leaders, IT Teams, Employees, Growing Companies. Renders
// live in the new StakeholderCards section.
export const stakeholderCards = {
  tag: 'Who Nexsate is for',
  title: 'Managed IT services built around you',
  text: 'One partner. Every department. We align technology to the way each team actually works — so your people spend less time fighting IT and more time doing their best work.',
  cards: [
    {
      initial: 'BL',
      title: 'Business Leaders',
      text: 'Reduce downtime, improve reliability, and plan technology investment with confidence.',
      linkLabel: 'Explore for leaders',
      href: pageHref('Services & Solutions'),
    },
    {
      initial: 'IT',
      title: 'IT Teams',
      text: 'Extend your capacity with expert backup, proactive monitoring, and specialised skills you can call on 24/7.',
      linkLabel: 'Explore for IT teams',
      href: pageHref('Services & Solutions'),
    },
    {
      initial: 'E',
      title: 'Employees',
      text: 'Fewer disruptions, faster support, and tools that just work — so you can focus on your work, not your workstation.',
      linkLabel: 'Explore for employees',
      href: pageHref('Services & Solutions'),
    },
    {
      initial: 'G',
      title: 'Growing Companies',
      text: 'Scale your IT without scaling your overhead — flexible, transparent pricing designed for mid-market businesses.',
      linkLabel: 'Explore for growing companies',
      href: pageHref('Services & Solutions'),
    },
  ],
}

export const partnerStrip = {
  tag: 'Using trusted technology',
  title: 'Using trusted technology to solve your IT challenges',
  text: 'Nexsate uses proven platforms and technology partners to deliver reliable support, stronger security, better visibility, and smoother day-to-day IT performance.',
  cta: { label: 'Explore our services', href: pageHref('Services & Solutions') },
}

// Blog copy. The cards themselves render from the insight pages (the case
// study plus newer posts), so the roster and the teaser can never drift apart.
export const blogRow = {
  tag: 'From our blog',
  title: 'Case studies and insights from the field',
  text: 'How better IT alignment helps growing businesses — plus practical guidance on security, cloud, and everyday IT.',
  cta: { label: 'View all articles', href: '#/blog' },
}

// Suggested searches shown in the empty search panel (Kyndryl pattern).
// Queries are plain words the local index is guaranteed to match.
export const searchSuggestions = {
  title: 'Suggested searches',
  items: [
    'cloud services',
    'cybersecurity',
    'managed IT support',
    'backup and recovery',
  ],
}

// Homepage FAQ teaser copy. The answers themselves render live from the
// help-and-faq page, so the teaser and the page can never drift apart.
export const faqTeaser = {
  tag: 'Common questions',
  title: 'Answers, before you even ask',
  text: 'How managed IT works, what it costs, and what happens when something breaks — straight from our FAQ.',
  cta: { label: 'View all FAQs', href: '#/help-and-faq' },
}

// Awards band copy. The badges themselves render live from the about-us
// page logos, so the band and the page can never drift apart.
export const awardsBand = {
  tag: 'Industry recognition',
  title: 'Recognized. Awarded. Trusted.',
  text: 'Independent analysts, client-review platforms, and technology partners have recognized the work behind our client outcomes.',
}

// Notice bar copy. Seeded with the live site's own consultation CTA line;
// the live "Now Hiring" strip is excluded (it points at wrong-brand filler).
export const noticeBar = {
  enabled: true,
  text: 'Schedule a Free Consultation',
  href: '#/contact-us',
}

// Dept splitter copy. Both routes quote FAQ Q1 ("What are your two primary
// services?"): fully managed vs co-managed, in the FAQ's own words.
export const deptSplit = {
  tag: 'Two ways to work with us',
  title: 'Fully managed or co-managed — your call',
  text: 'Two primary services, one goal: technology that supports the way your business works.',
  outsource: {
    title: 'Outsource all your IT',
    text: 'Fully Managed IT Services — Nexsate monitors, manages, supports, and secures all IT systems and users for a fixed and predictable monthly fee.',
    cta: { label: 'Explore managed IT', href: '#/managed-it-services' },
  },
  extend: {
    title: 'Extend your internal IT',
    text: 'Co-Managed IT Services — We support internal IT as an extension of your team. This role includes patching, repetitive tasks, one-off services, and special projects. We handle the backend while in-house IT manages everything else.',
    cta: { label: 'Talk to an expert', href: '#/contact-us' },
  },
}

// Values strip copy. The value names themselves render live from the
// about-us "Our Core Values" items; this key only owns the heading.
export const valuesStrip = {
  tag: 'Our Core Values',
  title: 'What we stand by, on every engagement',
  text: 'Our culture is built around four core values that differentiate us from our competition.',
}

// Trust blocks ported from nexsate.com/reviews-awards and the homepage.
// Quotes are verbatim from the live reviews page; stats match the live
// homepage and client-support figures (20 years, 98%, 3-min response).
export const testimonials = {
  tag: 'Testimonials',
  title: 'What our customers say',
  text: 'Rated 4.9 out of 5 across client reviews.',
  items: [
    {
      quote:
        "I've been a customer for more than a decade. Nexsate is an example of the way Managed Services should be done. They do their very best to make sure you succeed. If there's an issue, they step in immediately. We will continue to be a customer for years to come.",
      name: 'John Labkins',
      role: 'Partner & CEO, Telecommunication Company',
    },
    {
      quote:
        'Nexsate has been an outstanding partner. Their team is professional, knowledgeable and customer-service driven. Nexsate proactive collaborative approach has been critical in helping us build an IT infrastructure that enables our success today and supports our long-term positioning strategy.',
      name: 'Amanda Parks',
      role: 'Network Manager, Healthcare Organization',
    },
    {
      quote:
        'Nexsate implemented such a powerful platform that we had no break in service when our employees had to work from home due to the COVID-19 pandemic. We weren\'t concerned about how to shift to a remote working environment because Nexsate facilitated a seamless transition.',
      name: 'Amanda Parks',
      role: 'Network Manager, Healthcare Organization',
    },
  ],
}

export const statsBand = {
  items: [
    { value: '20+', label: 'Years of experience' },
    { value: '98%', label: 'Client satisfaction' },
    { value: '3 min', label: 'Average response time' },
    { value: '21+', label: 'Projects delivered' },
  ],
}

// Certifications named on nexsate.com/partnerships. Text badges only — no
// badge artwork is fabricated or implied beyond the names themselves.
export const certStrip = {
  tag: 'Certifications & partnerships',
  title: 'Credentials you can verify',
  items: [
    { name: 'CISSP', note: 'Security-certified professionals' },
    { name: 'SOC 2 Type II', note: 'Independently audited controls' },
    { name: 'Microsoft Partner', note: 'Cloud and Modern Work ecosystem' },
  ],
}

// Homepage contact section copy. The left column carries the partner pitch,
// benefits, and process steps from nexsate.com; the right column renders the
// consultation form (no priority/consent on the homepage).
export const homeContact = {
  tag: 'Contact us',
  title: 'Partner with Us for Comprehensive IT',
  text: "We're happy to answer any questions you may have and help you determine which of our services best fit your needs.",
  phoneLabel: 'Call us at:',
  benefits: [
    'Client-oriented',
    'Independent',
    'Competent',
    'Results-driven',
    'Problem-solving',
    'Transparent',
  ],
  steps: [
    'We Schedule a call at your convenience',
    'We do a discovery and consulting meeting',
    'We prepare a proposal',
  ],
}

// The Home Page document names six sectors and the live site lists five
// more (consulting, non-profit, telemedicine, fintech, education), all given
// compact pages here. Professional Services still has no source document or
// page, so it stays unlisted rather than invented.
//
// Icon art mirrors the NanoSoft reference: cyan line icons, five downloaded
// from the live theme into public/uploads (banking, capital-markets,
// manufacturing, healthcare, higher-education) and four drawn in the same
// two-tone style for the extra Nexsate sectors (logistics, consulting,
// non-profit, fintech).
export const industriesStrip = {
  tag: 'Industries we serve',
  title: 'Managed IT services customized for your industry',
  text: 'Our vertical solutions expertise allows your business to streamline workflow, and increase productivity. No matter the business, Nexsate has you covered with industry compliant solutions, customized to your company\u2019s specific needs.',
  cta: { label: 'All our services', href: pageHref('Services & Solutions') },
  items: [
    { label: 'Banking & Insurance', href: pageHref('Banks & Insurance'), note: 'Let us show you how our experience.', icon: '/uploads/industry-banking.svg' },
    { label: 'Capital Markets', href: pageHref('Banks & Insurance'), note: 'Banking and capital-markets IT.', icon: '/uploads/industry-capital-markets.svg' },
    { label: 'Manufacturing', href: pageHref('Industrial & Manufacturing'), note: 'Production-floor continuity.', icon: '/uploads/industry-manufacturing.svg' },
    { label: 'Healthcare', href: pageHref('Healthcare'), note: 'Patient-service systems.', icon: '/uploads/industry-healthcare.svg' },
    { label: 'Higher Education', href: pageHref('Education'), note: 'Connected campus learning.', icon: '/uploads/industry-higher-education.svg' },
    { label: 'Transportation & Logistics', href: pageHref('Transportation & Logistics'), note: 'Dispatch and fleet', icon: 'truck' },
    { label: 'Consulting Providers', href: pageHref('Consulting Providers'), note: 'Advisory firms', icon: 'briefcase' },
    { label: 'Non-Profit', href: pageHref('Non-Profit'), note: 'Mission-first IT', icon: 'heart' },
    { label: 'Fintech', href: pageHref('Fintech'), note: 'Security-forward', icon: 'lock' },
  ],
}

// Case-study cards mounted at the foot of the industries band (Image 2 lower
// half): tinted photo tiles with a white brand wordmark, sitting at the
// band's foot with no overhang into the next section (the technology strip
// that follows it). Photos + tints reuse the uploads
// roster so the
// site keeps its no-remote-images rule; wordmarks are text since we have no
// client logo files to use.
export const caseCards = {
  tag: 'Case studies',
  title: 'We work with global brands',
  items: [
    {
      title: 'Cloud migration saves money for health insurer',
      brand: 'unilogo',
      href: pageHref('Success Story'),
      image: '/uploads/team-collaboration.jpg',
      alt: 'Two colleagues celebrating a successful project together',
      tint: '#71cbcc',
      fallback: 'linear-gradient(135deg, #0e9f8a 0%, #71cbcc 130%)',
    },
    {
      title: 'Remote support center for semiconductor provider',
      brand: 'jarguar',
      href: pageHref('Success Story'),
      image: '/uploads/business-meeting.jpg',
      alt: 'Business meeting with colleagues reviewing documents',
      tint: '#29b2fe',
      fallback: 'linear-gradient(135deg, #0693e3 0%, #29b2fe 130%)',
    },
    {
      title: 'Subscription licensing unlocks spike in IT orders',
      brand: 'ticketbox',
      href: pageHref('Success Story'),
      image: '/uploads/boardroom-meeting.jpg',
      alt: 'Team meeting around a boardroom table',
      tint: '#8a49a1',
      fallback: 'linear-gradient(135deg, #5b2b82 0%, #8a49a1 130%)',
    },
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
  alt: 'Business meeting with colleagues reviewing documents',
  fallback: navyFallback,
}
