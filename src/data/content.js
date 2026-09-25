// Homepage section content: hero slides, featured cards, split sections, stats.
// All hrefs must be '#/' routes (page registry) or '#…' anchors on the homepage.
const office = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'
const meeting = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40'

export const heroSlides = [
  {
    id: 'it-partner',
    kicker: 'nexsate.com',
    title: 'Every Device managed IT solutions.',
    text: 'IT services built specifically for your business.',
    cta: { label: 'Find your solution', href: '#/it-services' },
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=80',
    gradient:
      'linear-gradient(90deg, rgba(14,17,20,.8) 0%, rgba(14,17,20,.35) 60%, rgba(14,17,20,.12) 100%)',
    fallback: 'linear-gradient(135deg, #0e1114 0%, #a31600 130%)',
  },
  {
    id: 'managed-it',
    kicker: 'Managed IT',
    title: 'Let us provide the support you deserve.',
    text: 'Partner with us for IT management services to grow your existing IT infrastructure.',
    cta: { label: 'Discover US', href: '#about' },
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=2000&q=80',
    gradient:
      'linear-gradient(90deg, rgba(14,17,20,.8) 0%, rgba(14,17,20,.35) 60%, rgba(14,17,20,.12) 100%)',
    fallback: 'linear-gradient(135deg, #0e1114 0%, #7a1400 130%)',
  },
  {
    id: 'cyber-security',
    kicker: 'Cyber security',
    title: 'No.1 Service Provider focus business workplace',
    text: 'Make IT Stress Free technology partner',
    cta: { label: 'Discover now', href: '#/managed-it' },
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80',
    gradient:
      'linear-gradient(90deg, rgba(14,17,20,.8) 0%, rgba(14,17,20,.35) 60%, rgba(14,17,20,.12) 100%)',
    fallback: 'linear-gradient(135deg, #0e1114 0%, #431407 140%)',
  },
]

export const featuredCards = [
  {
    id: 'card-managed-it',
    tag: 'Managed IT',
    title: 'Managed IT services',
    text: '24/7 maintenance and monitoring that keeps your computers, servers, and systems up and running.',
    linkLabel: 'Stay up and running',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    fallback: 'linear-gradient(135deg, #15191d 0%, #a31600 130%)',
    href: '#/managed-it',
  },
  {
    id: 'card-backup',
    tag: 'Continuity',
    title: 'Backup and recovery',
    text: 'Prevent data loss with encrypted storage and virtualized recovery, then enjoy increased productivity.',
    linkLabel: 'Defend your data',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    fallback: 'linear-gradient(135deg, #15191d 0%, #7a1400 130%)',
    href: '#/backup-and-recovery',
  },
  {
    id: 'card-cyber',
    tag: 'Security',
    title: 'Cyber security',
    text: 'Protect your business from malware, hackers, viruses and the most common security threats.',
    linkLabel: 'Protect your business',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    fallback: 'linear-gradient(135deg, #15191d 0%, #1fa452 140%)',
    href: '#/cyber-security',
  },
]

export const splitSections = [
  {
    id: 'industries',
    reversed: false,
    tag: 'Industries we serve',
    title: 'Managed IT services customized for your industry',
    text: 'Our vertical solutions expertise allows your business to streamline workflow, and increase productivity. No matter the business, nexsate has you covered with industry compliant solutions, customized to your company’s specific needs.',
    cta: { label: 'Learn more', href: '#industries' },
    image: `${office}?auto=format&fit=crop&w=1400&q=80`,
    fallback: 'linear-gradient(135deg, #0e1114 0%, #7a1400 130%)',
  },
  {
    id: 'why-nexsate',
    reversed: true,
    tag: 'Why nexsate',
    title: 'Stop wasting time and money on technology.',
    text: 'Stop worrying about technology problems. Focus on your business. Let us provide the support you deserve.',
    cta: { label: 'Explore our company', href: '#/about-nexsate' },
    image: `${meeting}?auto=format&fit=crop&w=1400&q=80`,
    fallback: 'linear-gradient(135deg, #0e1114 0%, #a31600 130%)',
  },
]

export const stats = [
  { value: '24/7', label: 'monitoring and support' },
  { value: '99.9%', label: 'guaranteed uptime SLA' },
  { value: '500+', label: 'businesses protected' },
  { value: '10+', label: 'years of IT expertise' },
]
