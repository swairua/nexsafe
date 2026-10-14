import { pageHref } from './slug.js'
import { blogIndex } from './posts.js'

export { blogIndex }

const navyFallback = 'linear-gradient(135deg, #070e40 0%, #0a1440 130%)'
const navyFallbackSoft = 'linear-gradient(135deg, #070e40 0%, #0a1440 130%)'
const navyTile = 'linear-gradient(135deg, #070e40 0%, #0a1440 140%)'

export const heroSlides = [
  {
    id: 'managed-services',
    kicker: 'MANAGED SERVICES',
    title: 'We take care of your IT, so you can take care of your customers.',
    text: 'From everyday user support to proactive monitoring, maintenance, and security, Nexsate takes responsibility for keeping your IT environment running smoothly. We help resolve issues before they disrupt operations, giving your people the support they need to stay focused on their work.',
    cta: { label: 'Discover Our Services', href: pageHref('Services & Solutions') },
    image: '/uploads/hero-network-servers.jpg',
    alt: 'Server racks glowing behind mesh doors in a data centre',
    fallback: '#070e40',
  },
  {
    id: 'enable-transform-empower',
    kicker: 'ENABLE. TRANSFORM. EMPOWER',
    title: 'Simplifying IT for a complex world',
    text: 'We believe technology should make business easier, safer, and more productive. At Nexsate, that belief shapes everything we do, from how we understand our customers\' needs to how we design, deliver, and support technology that works for their business.',
    cta: { label: 'Explore Services', href: pageHref('Services & Solutions') },
    image: '/uploads/hero-team-planning.jpg',
    alt: 'Colleagues planning with laptops and hand-written notes at a table',
    fallback: '#070e40',
  },
  {
    id: 'industry-focus',
    kicker: 'INDUSTRY FOCUS',
    title: 'Technology solutions build around the industries we serve.',
    text: 'Different industries depend on technology in different ways. From keeping production systems connected to supporting healthcare teams and business-critical operations, Nexsate delivers IT solutions that reflect the demands, workflows, and priorities of each sector.',
    cta: { label: 'Explore Industries', href: pageHref('Services & Solutions') },
    image: '/uploads/team-collaboration.jpg',
    alt: 'Colleagues wearing headphones while working together on laptops',
    fallback: '#070e40',
  },
]

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

export const pillars = [
  {
    id: 'accountability',
    title: 'ACCOUNTABILITY',
    text: 'One team, one point of contact. We take ownership of your IT needs and see issues through to resolution.',
  },
  {
    id: 'foresight',
    title: 'FORESIGHT',
    text: 'We identify recurring issues, anticipate challenges, and recommend improvements for long-term reliability.',
  },
  {
    id: 'practicality',
    title: 'PRACTICALITY',
    text: 'We focus on what works. Technology that solves real problems without unnecessary cost or complexity.',
  },
  {
    id: 'flexibility',
    title: 'FLEXIBILITY',
    text: 'We work with your existing IT environment, adapt as your needs change, and provide specialist expertise where it matters most.',
  },
]

export const featuredCards = [
  {
    id: 'card-managed-it-services',
    tag: 'IT Support',
    title: 'Managed IT Services',
    text: 'A coordinated helpdesk for user requests, backed by device management, updates, and system maintenance. We track issues through resolution and keep your everyday IT administration organized.',
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
    text: 'We design, migrate, and manage cloud environments, business applications, and data across public, private, and hybrid platforms, covering storage, access, integration, and ongoing administration.',
    linkLabel: 'Move to Cloud',
    image: '/uploads/data-centre.jpg',
    alt: 'Data centre corridor with server cabinets',
    fallback: navyFallbackSoft,
    href: pageHref('Cloud Services'),
  },
  {
    id: 'card-software-development',
    tag: 'Software',
    title: 'Software Development',
    text: 'We develop business applications, implement ERP systems, automate workflows, and integrate software platforms to improve data flow, reduce manual tasks, and simplify business operations.',
    columnText: 'We develop business applications, implement ERP systems, automate workflows, and integrate software platforms to improve data flow, reduce manual tasks, and simplify business operations.',
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
    text: 'We design, configure, and maintain network switches, firewalls, Wi-Fi, and remote access, monitoring performance and investigating connectivity faults across your offices, sites, and remote teams.',
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
    text: 'We protect networks, systems, applications, and data through threat monitoring, access controls, vulnerability management, and incident response to strengthen your organization\'s security.',
    columnText: 'We protect networks, systems, applications, and data through threat monitoring, access controls, vulnerability management, and incident response to strengthen your organization\'s security.',
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
    text: 'We manage backups, test recovery procedures, and plan for restoring critical data and systems, helping businesses recover from outages, data loss, and unexpected disruptions.',
    columnText: 'We manage backups, test recovery procedures, and plan for restoring critical data and systems, helping businesses recover from outages, data loss, and unexpected disruptions.',
    linkLabel: 'Plan your recovery',
    image: '/uploads/data-centre.jpg',
    alt: 'Data centre corridor with server cabinets',
    fallback: navyTile,
    href: pageHref('Backup & Disaster Recovery'),
  },
]

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
  tag: 'What we use',
  title: 'Using Trusted Technology to Solve Your IT Challenges',
  text: 'Nexsate uses proven platforms and technology partners to deliver reliable support, stronger security, better visibility, and smoother day-to-day IT performance.',
  cta: { label: 'Explore our services', href: pageHref('Services & Solutions') },
}

export const blogRow = {
  tag: 'From our blog',
  title: 'Case studies and insights from the field',
  text: 'How better IT alignment helps growing businesses — plus practical guidance on security, cloud, and everyday IT.',
  cta: { label: 'View all articles', href: '#/blog' },
}

export const searchSuggestions = {
  title: 'Suggested searches',
  items: [
    'cloud services',
    'cybersecurity',
    'managed IT support',
    'backup and recovery',
  ],
}

export const faqTeaser = {
  tag: 'Common questions',
  title: 'Answers, before you even ask',
  text: 'How managed IT works, what it costs, and what happens when something breaks — straight from our FAQ.',
  cta: { label: 'View all FAQs', href: '#/help-and-faq' },
}

export const awardsBand = {
  tag: 'Industry recognition',
  title: 'Recognized. Awarded. Trusted.',
  text: 'Independent analysts, client-review platforms, and technology partners have recognized the work behind our client outcomes.',
}

export const noticeBar = {
  enabled: true,
  text: 'Schedule a Free Consultation',
  href: '#/contact-us',
}

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

export const valuesStrip = {
  tag: 'Our Core Values',
  title: 'What we stand by, on every engagement',
  text: 'Our culture is built around four core values that differentiate us from our competition.',
}

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

export const certStrip = {
  tag: 'Certifications & partnerships',
  title: 'Credentials you can verify',
  items: [
    { name: 'CISSP', note: 'Security-certified professionals' },
    { name: 'SOC 2 Type II', note: 'Independently audited controls' },
    { name: 'Microsoft Partner', note: 'Cloud and Modern Work ecosystem' },
  ],
}

export const homeContact = {
  tag: '',
  title: '',
  text: '',
  phoneLabel: '',
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

export const industriesStrip = {
  tag: 'Delivering industry-specific technology solutions',
  title: 'Delivering industry-specific technology solutions',
  text: 'Behind every industry are critical processes, specialized applications, and people who depend on them. Nexsate considers these operational priorities when developing, implementing, and supporting technology across different business environments.',
  cta: { label: 'Explore Industries', href: pageHref('Services & Solutions') },
  items: [
    { label: 'Manufacturing', href: pageHref('Industrial & Manufacturing'), note: '', icon: 'lock' },
    { label: 'Healthcare', href: pageHref('Healthcare'), note: '', icon: 'heart' },
    { label: 'Banking and Finance', href: pageHref('Banks & Insurance'), note: '', icon: 'briefcase' },
    { label: 'Education', href: pageHref('Education'), note: '', icon: 'lock' },
    { label: 'Transport & Logistics', href: pageHref('Transportation & Logistics'), note: '', icon: 'truck' },
    { label: 'Industrial', href: pageHref('Industrial & Manufacturing'), note: '', icon: 'lock' },
    { label: 'Education', href: pageHref('Education'), note: '', icon: 'lock' },
    { label: 'Professional services', href: pageHref('Consulting Providers'), note: '', icon: 'briefcase' },
    { label: 'Public Sector', href: pageHref('Consulting Providers'), note: '', icon: 'lock' },
    { label: 'Non-Profit', href: pageHref('Non-Profit'), note: '', icon: 'heart' },
  ],
}

export const industryClosing = {
  title: 'Delivering industry-specific technology solutions',
  text: 'Behind every industry are critical processes, specialized applications, and people who depend on them. Nexsate considers these operational priorities when developing, implementing, and supporting technology across different business environments.',
}

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
