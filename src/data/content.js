// Homepage section content: hero slides, featured service cards, the pictures
// row, split sections and stats. Copy follows the "Our Company.docx" brief
// (services first, pictures straight after, technology stack in place of the
// old "Why nexsate" block) with the navy/blue corporate palette.
import { pageHref } from './slug.js'

const office = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'
const meeting = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40'
const img = (id, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

// Navy scrim over photography + brand-blue gradient fallback (used if the
// remote image is unavailable) — keeps every dark surface on-palette.
const navyScrim =
  'linear-gradient(90deg, rgba(7,14,64,.86) 0%, rgba(7,14,64,.45) 60%, rgba(7,14,64,.16) 100%)'
const navyFallback = 'linear-gradient(135deg, #070e40 0%, #0b45f5 130%)'
const navyFallbackSoft = 'linear-gradient(135deg, #070e40 0%, #0a7ffa 130%)'
const navyTile = 'linear-gradient(135deg, #070e40 0%, #0b45f5 140%)'

export const heroSlides = [
  {
    id: 'our-company',
    kicker: 'Simply enabling IT for a complex world',
    title: 'Technology that works as one.',
    text: 'Nexsate brings together managed IT, cloud, cybersecurity, infrastructure, data protection and disaster recovery, software development, systems integration and technology consulting to simplify complexity and transform operations.',
    cta: { label: 'Discover our company', href: pageHref('Our Company') },
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=80',
    gradient: navyScrim,
    fallback: navyFallback,
  },
  {
    id: 'managed-it-services',
    kicker: 'Managed IT services',
    title: 'Let us provide the support you deserve.',
    text: 'Partner with us for IT management services to grow your existing IT infrastructure — 24/7 monitoring, a service desk your people will enjoy using, and one monthly invoice.',
    cta: { label: 'Explore managed IT', href: pageHref('Managed IT services') },
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=2000&q=80',
    gradient: navyScrim,
    fallback: navyFallbackSoft,
  },
  {
    id: 'cybersecurity',
    kicker: 'Cybersecurity',
    title: 'Make IT stress free with a security partner.',
    text: 'Layered defence for identities, endpoints, email and data — monitored and managed by engineers who respond, not just alert.',
    cta: { label: 'Explore cybersecurity', href: pageHref('Cybersecurity') },
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80',
    gradient: navyScrim,
    fallback: navyTile,
  },
]

// The seven services from the doc's "IT Solutions home menu", in doc order.
export const featuredCards = [
  {
    id: 'card-managed-it-services',
    tag: 'Managed IT',
    title: 'Managed IT services',
    text: '24/7 maintenance and monitoring that keeps your computers, servers, and systems up and running.',
    linkLabel: 'Stay up and running',
    image: img('photo-1516321318423-f06f85e504b3', 1200),
    fallback: navyFallback,
    href: pageHref('Managed IT services'),
  },
  {
    id: 'card-cloud-services',
    tag: 'Cloud',
    title: 'Cloud Services',
    text: 'Migrate, run and optimise cloud platforms that scale with you — without the runaway bill.',
    linkLabel: 'Move to the cloud',
    image: img('photo-1451187580459-43490279c0fa', 1200),
    fallback: navyFallbackSoft,
    href: pageHref('Cloud Services'),
  },
  {
    id: 'card-cybersecurity',
    tag: 'Security',
    title: 'Cybersecurity',
    text: 'Protect your business from malware, hackers, viruses and the most common security threats.',
    linkLabel: 'Protect your business',
    image: img('photo-1550751827-4bd374c3f58b', 1200),
    fallback: navyTile,
    href: pageHref('Cybersecurity'),
  },
  {
    id: 'card-networking',
    tag: 'Infrastructure',
    title: 'Networking',
    text: 'Wired, wireless and WAN — designed, documented and watched so connectivity stays boring.',
    linkLabel: 'Review your network',
    image: img('photo-1518770660439-4636190af475', 1200),
    fallback: navyFallback,
    href: pageHref('Networking'),
  },
  {
    id: 'card-software-integration',
    tag: 'Integration',
    title: 'Software Integration',
    text: 'Connect the systems you already own — integrations, APIs and data flows that make technology work as one.',
    linkLabel: 'Join up your systems',
    image: img('photo-1519389950473-47ba0277781c', 1200),
    fallback: navyFallbackSoft,
    href: pageHref('Software Integration'),
  },
  {
    id: 'card-software-development',
    tag: 'Software',
    title: 'Software development',
    text: 'Small, focused applications that fit how your business actually works — built to be maintained.',
    linkLabel: 'Build something better',
    image: img('photo-1487058792275-0ad4aaf24ca7', 1200),
    fallback: navyTile,
    href: pageHref('Software development'),
  },
  {
    id: 'card-data-protection',
    tag: 'Continuity',
    title: 'Data protection & disaster recovery',
    text: 'Prevent data loss with encrypted storage and virtualized recovery, then enjoy increased productivity.',
    linkLabel: 'Defend your data',
    image: img('photo-1544197150-b99a580bb7a8', 1200),
    fallback: navyFallback,
    href: pageHref('Data protection & disaster recovery'),
  },
]

export const splitSections = [
  {
    id: 'who-we-serve',
    reversed: false,
    tag: 'Who we serve',
    title: 'Managed IT services customized for your industry',
    text: 'Our vertical solutions expertise allows your business to streamline workflow, and increase productivity. Rather than list every sector here, we pick the ones where our compliance, uptime and security work runs deepest — then tailor the rest to your needs.',
    cta: { label: 'See who we serve', href: pageHref('Who We Serve') },
    image: `${office}?auto=format&fit=crop&w=1400&q=80`,
    fallback: navyFallback,
  },
  {
    id: 'technology-stack',
    reversed: true,
    tag: 'Our technology stack',
    title: 'The stack behind technology that works as one.',
    text: 'Cloud landing zones with cost guardrails, monitored networks, hardened endpoints, encrypted backup with tested recovery, and the integrations and applications that tie it all together — run by certified engineers and reported on every month.',
    cta: { label: 'Explore our expertise', href: pageHref('Technology Stack') },
    image: `${meeting}?auto=format&fit=crop&w=1400&q=80`,
    fallback: navyFallbackSoft,
  },
]

// A short "pictures" band that sits directly below the services grid
// (doc brief: the pictures should come right after our services).
export const picturesRow = [
  {
    id: 'pic-service-desk',
    title: 'Service desk',
    caption: 'Engineers who pick up with full context of your estate.',
    image: img('photo-1552664730-d307ca884978', 900),
    fallback: navyFallback,
    href: pageHref('IT support'),
  },
  {
    id: 'pic-cloud',
    title: 'Cloud and infrastructure',
    caption: 'Landing zones, networks and endpoints under one SLA.',
    image: img('photo-1518770660439-4636190af475', 900),
    fallback: navyFallbackSoft,
    href: pageHref('Cloud Services'),
  },
  {
    id: 'pic-security',
    title: 'Security operations',
    caption: 'Monitoring and response, not just alerting.',
    image: img('photo-1600880292203-757bb62b4baf', 900),
    fallback: navyTile,
    href: pageHref('Cybersecurity'),
  },
  {
    id: 'pic-recovery',
    title: 'Recovery, rehearsed',
    caption: 'Verified backups with tested, documented restores.',
    image: img('photo-1544197150-b99a580bb7a8', 900),
    fallback: navyFallback,
    href: pageHref('Data protection & disaster recovery'),
  },
]

// Not every industry makes the homepage — six recognisable starting points
// plus a link through to the full Who We Serve list.
export const industriesStrip = {
  tag: 'Industries we serve',
  title: 'Six sectors, one accountable IT partner',
  text: 'Compliance-aware, uptime-obsessed support for the industries where our engineers already work every day.',
  cta: { label: 'All industries', href: pageHref('Who We Serve') },
  items: [
    { label: 'Banking', href: pageHref('Banking'), note: 'Audit-ready controls' },
    { label: 'Healthcare', href: pageHref('Healthcare'), note: 'Clinical uptime' },
    { label: 'Manufacturing', href: pageHref('Manufacturing'), note: 'Plant-level reliability' },
    { label: 'Logistics', href: pageHref('Logistics'), note: 'Always-on dispatch' },
    { label: 'Government', href: pageHref('Government'), note: 'Public-sector standards' },
    { label: 'Professional services', href: pageHref('Professional services'), note: 'Confidential by default' },
  ],
}

export const stats = [
  { value: '24/7', label: 'monitoring and support' },
  { value: '99.9%', label: 'guaranteed uptime SLA' },
  { value: '500+', label: 'businesses protected' },
  { value: '10+', label: 'years of IT expertise' },
]
