// Doc-defined Company + IT-solutions hub pages (eyebrows: Company / IT solutions).
const company = 'Company'

export const docPages = [
  {
    slug: 'our-company',
    title: 'Our Company',
    eyebrow: company,
    intro:
      'Nexsate brings together managed IT, cloud, cybersecurity, infrastructure, data protection and disaster recovery, software development, systems integration and technology consulting to simplify complexity and empower organizations with technology that works as one.',
    sections: [
      {
        heading: 'Simply enabling IT for a complex world',
        body: [
          'Nexsate is a full-service technology partner: one team across managed IT services, cloud services, cybersecurity, networking, software integration, software development and data protection & disaster recovery. You get a single accountable partner instead of a patchwork of vendors.',
        ],
      },
      {
        heading: 'What we bring together',
        list: [
          'Managed IT services and responsive IT support',
          'Cloud services, networking and infrastructure',
          'Cybersecurity and data protection & disaster recovery',
          'Software development and systems integration',
        ],
      },
    ],
    related: ['about-nexsate', 'why-choose-us', 'what-we-do', 'managed-it-services'],
  },
  {
    slug: 'our-work',
    title: 'Our Work',
    eyebrow: company,
    intro:
      'Outcomes, not tickets: how Nexsate transforms operations for the organizations we serve.',
    sections: [
      {
        heading: 'How we deliver',
        body: [
          'Every engagement starts with discovery, moves through a planned onboarding and settles into proactive management with clear SLAs. We measure ourselves on uptime, response times and problems prevented — and we report on all three.',
        ],
      },
      {
        heading: 'Proof, not promises',
        list: [
          'Case studies with measured cost, risk and downtime outcomes',
          'Customer success stories across finance, healthcare and manufacturing',
          'Audits passed first time with evidence collected as routine',
        ],
      },
    ],
    related: ['what-we-do', 'how-we-work', 'customer-success', 'case-studies'],
  },
  {
    slug: 'people-and-impact',
    title: 'People and Impact',
    eyebrow: company,
    intro:
      'Engineers who roll up their sleeves — and an impact that reaches beyond our clients.',
    sections: [
      {
        heading: 'Our people',
        body: [
          'A strong team of certified IT engineers who thrive on solving problems and meeting business needs. Named account managers, engineers who know your environment, and support your team will actually enjoy using.',
        ],
      },
      {
        heading: 'Our impact',
        list: [
          'Digital-skills workshops for local charities and schools',
          'Secure refurbishment and donation of retired hardware',
          'Apprenticeship places funded each year',
        ],
      },
    ],
    related: ['our-people', 'leadership-team', 'diversity-and-inclusion', 'community-commitments'],
  },
  {
    slug: 'our-philosophy',
    title: 'Our Philosophy',
    eyebrow: company,
    intro:
      'Technology should work as one — simple to use, simple to manage, simple to trust.',
    sections: [
      {
        heading: 'What we believe',
        body: [
          'Complexity is the enemy of progress. We simplify estates, integrate systems and prevent incidents before they interrupt work — so technology becomes the reason businesses move faster, not the reason they stall.',
        ],
      },
      {
        heading: 'How it shows up',
        list: [
          'Prevention over firefighting, always',
          'Plain-language explanations and transparent pricing',
          'One partner accountable for the whole environment',
        ],
      },
    ],
    related: ['mission-vision-and-values', 'our-values', 'why-choose-us'],
  },
  {
    slug: 'our-people',
    title: 'Our People',
    eyebrow: company,
    intro:
      'Meet the engineers, consultants and support specialists behind Nexsate.',
    sections: [
      {
        heading: 'A team that owns outcomes',
        body: [
          'From the service desk to security operations, our people are certified, mentored and encouraged to improve how we work. When something breaks, an engineer picks it up with full context — no script reading, no ticket black holes.',
        ],
      },
      {
        heading: 'Join us',
        list: [
          'Certification paths funded as part of the job',
          'Mentoring from senior engineers',
          'Open roles on our careers page',
        ],
      },
    ],
    related: ['leadership-team', 'careers', 'people-and-impact'],
  },
  {
    slug: 'how-we-work',
    title: 'How we Work',
    eyebrow: company,
    intro:
      'Discover how we work: from first call to steady-state partnership in about thirty days.',
    sections: [
      {
        heading: 'The journey',
        body: [
          'We agree scope and access, discover and document your environment, onboard monitoring, backup and security tooling, then go live on the service desk with agreed SLAs. Most clients complete the journey inside a month.',
        ],
      },
      {
        heading: 'Working cadence',
        list: [
          'Discovery and documentation up front',
          'Planned onboarding with zero disruption',
          'Monthly reporting and quarterly roadmap reviews',
        ],
      },
    ],
    related: ['our-work', 'onboarding-and-migration', 'service-level-agreements'],
  },
  {
    slug: 'who-we-serve',
    title: 'Who We Serve',
    eyebrow: company,
    intro:
      'Small and mid-sized organizations across finance, healthcare, manufacturing and the public sector.',
    sections: [
      {
        heading: 'Industries we serve',
        body: [
          'Our vertical solutions expertise lets your business streamline workflow and increase productivity — with industry-compliant solutions customized to your needs.',
        ],
      },
      {
        heading: 'Popular starting points',
        list: [
          'Banking, insurance and capital markets',
          'Healthcare and higher education',
          'Manufacturing, logistics and retail',
        ],
      },
    ],
    related: ['banking', 'healthcare', 'manufacturing'],
  },
  {
    slug: 'customer-success',
    title: 'Customer Success',
    eyebrow: company,
    intro:
      'Real engagements, real numbers: how Nexsate clients cut cost, risk and downtime.',
    sections: [
      {
        heading: 'Success stories',
        body: [
          'Each story documents the starting point, the approach and the measured outcome: migrations completed over weekends, audits passed first time, support bills flattened.',
        ],
      },
      {
        heading: 'Why clients stay',
        list: [
          'Fast, human support without script-reading',
          'Predictable costs and transparent reporting',
          'Proactive advice instead of reactive fixes',
        ],
      },
    ],
    related: ['customer-testimonials', 'case-studies', 'why-choose-us'],
  },
  {
    slug: 'our-expertise',
    title: 'Our Expertise',
    eyebrow: company,
    intro:
      'Depth across infrastructure, cloud, security and software — certified where it counts.',
    sections: [
      {
        heading: 'Areas of depth',
        body: [
          'Certified engineers across cloud, network and security stacks, with partner status across the major platforms our clients actually run.',
        ],
      },
      {
        heading: 'How expertise helps you',
        list: [
          'Architecture and roadmaps without a vendor axe to grind',
          'Security and compliance programmes that pass audits',
          'Software and integrations built to be maintained',
        ],
      },
    ],
    related: ['what-we-do', 'software-integration', 'partner-ecosystem'],
  },
  {
    slug: 'our-partners',
    title: 'Our Partners',
    eyebrow: company,
    intro:
      'Partner status across the major cloud, networking, security and productivity vendors.',
    sections: [
      {
        heading: 'Why partnerships matter',
        body: [
          'Better licensing options, faster escalation paths when something breaks at vendor level, and early access to capabilities we can pilot for clients.',
        ],
      },
      {
        heading: 'How partnerships help you',
        list: [
          'Escalation routes that skip generic support queues',
          'Volume licensing and refresh programs',
          'Certified engineers on the tools we recommend',
        ],
      },
    ],
    related: ['partner-ecosystem', 'vendor-management', 'software-licensing'],
  },
  {
    slug: 'what-we-do',
    title: 'What We Do',
    eyebrow: company,
    intro:
      'Managed IT, cloud, cybersecurity, infrastructure, data protection and disaster recovery, software development, systems integration and technology consulting.',
    sections: [
      {
        heading: 'Our services',
        body: [
          'Seven practices, one accountable partner: managed IT services, cloud services, cybersecurity, networking, software integration, software development, and data protection & disaster recovery.',
        ],
      },
      {
        heading: 'Start here',
        list: [
          'Explore our services below',
          'Read how we work and who we serve',
          'Talk to an expert about your environment',
        ],
      },
    ],
    related: ['managed-it-services', 'cloud-services', 'cybersecurity'],
  },
  {
    slug: 'innovation-research',
    title: 'Innovation & Research',
    eyebrow: company,
    intro:
      'We pilot new tooling carefully — then bring what works to our clients first.',
    sections: [
      {
        heading: 'How we innovate',
        body: [
          'Nexsate tracks emerging platforms across cloud, security and AI-assisted operations. Pilots run in our lab first, with rollback plans, before anything touches a client estate.',
        ],
      },
      {
        heading: 'Focus areas',
        list: [
          'AI-assisted service desk and monitoring',
          'Zero-trust architectures for small business',
          'Cost guardrails for cloud estates',
        ],
      },
    ],
    related: ['our-expertise', 'it-blog', 'software-development'],
  },
  {
    slug: 'communities-impact',
    title: 'Communities Impact',
    eyebrow: company,
    intro:
      'Technology skills are only useful when they are shared — locally, patiently and for free.',
    sections: [
      {
        heading: 'What we give back',
        body: [
          'Digital-skills workshops for local charities and schools, donated refurbished equipment with secure wiping, and paid volunteer days for every employee.',
        ],
      },
      {
        heading: 'Commitments',
        list: [
          'Secure refurbishment and donation of retired hardware',
          'Free security health-checks for qualifying non-profits',
          'Paid volunteer days for every employee',
        ],
      },
    ],
    related: ['community-commitments', 'diversity-and-inclusion', 'careers'],
  },
  {
    slug: 'corporate-responsibility',
    title: 'Corporate Responsibility',
    eyebrow: company,
    intro:
      'Lawful, ethical and secure operations — for ourselves and our suppliers.',
    sections: [
      {
        heading: 'Our commitments',
        body: [
          'We assess critical suppliers against our code during onboarding, review performance annually, and run our own operations to the same standard we set for clients.',
        ],
      },
      {
        heading: 'Core requirements',
        list: [
          'Information security and confidentiality safeguards',
          'Prompt disclosure of incidents affecting clients',
          'Environmental responsibility in operations and logistics',
        ],
      },
    ],
    related: ['supplier-code-of-conduct', 'compliance-and-standards', 'community-commitments'],
  },
  {
    slug: 'our-services',
    title: 'Our Services',
    eyebrow: 'IT solutions',
    intro:
      'Seven practices, one accountable partner — explore the services below.',
    sections: [
      {
        heading: 'IT Solutions home menu',
        body: [
          'Managed IT services, cloud services, cybersecurity, networking, software integration, software development, and data protection & disaster recovery — each with its own page, all delivered as one managed service.',
        ],
      },
      {
        heading: 'Browse services',
        list: [
          'Managed IT services and IT support',
          'Cloud services and networking',
          'Cybersecurity and data protection & disaster recovery',
          'Software integration and software development',
        ],
      },
    ],
    related: ['managed-it-services', 'cloud-services', 'what-we-do'],
  },
  {
    slug: 'technology-stack',
    title: 'Technology Stack',
    eyebrow: 'IT solutions',
    intro:
      'The platforms we run, monitor and secure — our technology stack, not a slide deck.',
    sections: [
      {
        heading: 'Around our technology stack',
        body: [
          'Content built around our stack: cloud landing zones with cost guardrails, monitored networks, hardened endpoints, encrypted backup and tested recovery, plus the integrations and applications that tie it together.',
        ],
      },
      {
        heading: 'Stack areas',
        list: [
          'Cloud, network and endpoint platforms',
          'Security, backup and recovery tooling',
          'Productivity, identity and line-of-business integrations',
        ],
      },
    ],
    related: ['cloud-services', 'networking', 'cybersecurity'],
  },
  {
    slug: 'it-solutions',
    title: 'IT Solutions',
    eyebrow: 'IT solutions',
    intro:
      'IT services built specifically for your business — one partner for the whole estate.',
    sections: [
      {
        heading: 'One partner, whole estate',
        body: [
          'Servers, networks, cloud platforms and end-user devices under one SLA: service desk, monitoring, maintenance, security and projects delivered as one managed service.',
        ],
      },
      {
        heading: 'Start here',
        list: [
          'Browse our services for detail',
          'Read how we work for the onboarding journey',
          'See who we serve for industry fit',
        ],
      },
    ],
    related: ['our-services', 'managed-it-services', 'how-we-work'],
  },
]

