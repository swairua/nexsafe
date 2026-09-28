// Company pages: about, values, leadership, careers, contact (eyebrow: Company).
const eyebrow = 'Company'

export const whoWeArePages = [
  {
    slug: 'about-nexsate',
    title: 'About nexsate',
    eyebrow,
    intro:
      'nexsate.com is a full-service IT provider — managed services, cloud, cyber security and consultancy under one roof, delivered by engineers who look after your systems as if they were our own.',
    sections: [
      {
        heading: 'Who we are',
        body: [
          'Founded by engineers who like rolling up their sleeves, nexsate combines a round-the-clock service desk with proactive management and strategic guidance for small and mid-sized organisations across finance, healthcare, manufacturing and the public sector.',
          'One partner covers servers, networks, cloud platforms and end-user devices — so nothing falls between the cracks and nobody plays vendor ping-pong when something breaks.',
        ],
      },
      {
        heading: 'What we stand for',
        list: [
          'Reliability: monitoring and maintenance that prevent incidents, not just react to them',
          'Clarity: fixed monthly pricing and plain-English reporting',
          'Partnership: a named account manager who knows your environment by name',
        ],
      },
    ],
    related: ['our-story', 'why-choose-us', 'managed-it-services', 'leadership-team'],
  },
  {
    slug: 'mission-vision-and-values',
    title: 'Mission, vision and values',
    eyebrow,
    intro:
      'Our mission is simple: make technology the reason businesses move faster, not the reason they stall.',
    sections: [
      {
        heading: 'Mission and vision',
        body: [
          'Mission — give every organisation access to enterprise-grade IT: secure, available and genuinely supportive, without enterprise complexity or surprise invoices.',
          'Vision — become the technology partner companies recommend to their peers, measured not by contracts signed but by incidents prevented and problems quietly solved.',
        ],
      },
      {
        heading: 'How we behave',
        list: [
          'Own the outcome — no blame games, no ticket black holes',
          'Explain in plain language, always',
          'Prefer prevention over firefighting',
          'Keep learning — certifications are part of the job, not a bonus',
        ],
      },
    ],
    related: ['our-values', 'why-choose-us', 'about-nexsate'],
  },
  {
    slug: 'our-values',
    title: 'Our values',
    eyebrow,
    intro:
      'Four values shape how we hire, how we support, and how we answer the phone at three in the morning.',
    sections: [
      {
        heading: 'Reliability, innovation, partnership, excellence',
        list: [
          'Reliability — we commit to what we can measure: uptime, response times and honest status pages',
          'Innovation — we pilot new tooling carefully, then bring what works to our clients first',
          'Partnership — your success is our reference; we invest in long relationships, not short contracts',
          'Excellence — every engineer is certified, mentored and encouraged to improve the way we work',
        ],
      },
      {
        heading: 'Values you can verify',
        body: [
          'Values only matter if they show up in behaviour. We publish our service levels, review satisfaction after every major incident, and run quarterly business reviews where clients tell us what to fix.',
        ],
      },
    ],
    related: ['mission-vision-and-values', 'why-choose-us', 'customer-testimonials'],
  },
  {
    slug: 'why-choose-us',
    title: 'Why choose us',
    eyebrow,
    intro:
      'Because your IT should be the quietest part of your day — monitored, secured and supported by people who already know your setup.',
    sections: [
      {
        heading: 'What working with nexsate feels like',
        body: [
          'Tickets answered in minutes by engineers with context, not scripts. Monthly reports that explain what we did and what it prevented. One invoice instead of a dozen vendor relationships.',
          'We take over the tedious, risky parts — patching, backups, license tracking, endpoint protection — and hand back visibility: a live service dashboard, clear SLAs and a named team.',
        ],
      },
      {
        heading: 'At a glance',
        list: [
          '24/7 monitoring, alerting and incident response',
          'Average first response under 15 minutes',
          'Fixed-price plans with unlimited support tickets',
          'Security tooling included as standard, not as an upsell',
          'Quarterly reviews with a named account manager',
        ],
      },
    ],
    related: ['managed-it-services', 'service-level-agreements', 'pricing-and-plans', 'customer-testimonials'],
  },
  {
    slug: 'our-story',
    title: 'Our story',
    eyebrow,
    intro:
      'nexsate started when a group of fed-up engineers decided support could be done better — faster, friendlier and with the socks kept on.',
    sections: [
      {
        heading: 'From break-fix to partnership',
        body: [
          'The company began as a two-person break-fix shop: called only when something was already broken, paid only when it stayed fixed. That model taught us what clients actually value — prevention, transparency and someone who answers.',
          'Today nexsate runs a 24/7 service desk and manages thousands of endpoints, but the principle is unchanged. We would rather put out fewer fires than bill for more of them.',
        ],
      },
      {
        heading: 'Milestones',
        list: [
          'Founded as an on-site support workshop',
          'Launched round-the-clock remote monitoring for SMEs',
          'Built the first nexsate security operations centre',
          'Extended managed services to regulated industries',
          'Opened cloud and devops practice for hybrid migrations',
        ],
      },
    ],
    related: ['about-nexsate', 'leadership-team', 'awards-and-recognition'],
  },
  {
    slug: 'leadership-team',
    title: 'Leadership team',
    eyebrow,
    intro:
      'A small, technical leadership team that still reads tickets — because strategy without service desk reality is just a slide deck.',
    sections: [
      {
        heading: 'Who leads nexsate',
        body: [
          'Our leadership spans service delivery, security, cloud engineering and client success. Each leader came up through operations: they have carried pagers, walked server rooms and sat with frustrated clients — which is why our plans stay practical and our promises stay measurable.',
        ],
      },
      {
        heading: 'How the team is organised',
        list: [
          'Service delivery — service desk, field engineers and onboarding',
          'Security — monitoring, response and compliance programmes',
          'Cloud and platforms — migrations, licensing and architecture',
          'Client success — account management, reporting and reviews',
        ],
      },
    ],
    related: ['about-nexsate', 'our-values', 'careers', 'customer-testimonials'],
  },
  {
    slug: 'careers',
    title: 'Careers',
    eyebrow,
    intro:
      'We are always looking for curious engineers, calm under pressure, who genuinely like helping people.',
    sections: [
      {
        heading: 'Working at nexsate',
        body: [
          'Expect real ownership: engineers meet clients, see their work through to resolution and help shape the tooling we use. Certification budgets, lab time and mentoring are part of the job — not perks we advertise and skip.',
          'We hire for attitude and train for technology. If you explain technical things clearly and stay kind when systems are on fire, we want to talk.',
        ],
      },
      {
        heading: 'Open profiles',
        list: [
          'Service desk engineers (remote and hybrid)',
          'Field technicians for on-site visits',
          'Security analysts for our monitoring team',
          'Cloud engineers for migration projects',
          'Account managers who speak fluent business',
        ],
      },
    ],
    related: ['leadership-team', 'our-values', 'diversity-and-inclusion'],
  },
  {
    slug: 'diversity-and-inclusion',
    title: 'Diversity and inclusion',
    eyebrow,
    intro:
      'Better IT comes from teams that see problems from more than one angle. We build that on purpose.',
    sections: [
      {
        heading: 'Our commitment',
        body: [
          'We recruit from non-traditional routes — bootcamps, apprenticeships, career changers — and promote on evidence, not tenure. Interview panels are diverse, scorecards are structured, and pay bands are reviewed annually for fairness.',
        ],
      },
      {
        heading: 'In practice',
        list: [
          'Structured interviews with consistent, job-relevant questions',
          'Apprenticeship and returner pathways into technical roles',
          'Flexible working for shifts, caring responsibilities and study',
          'Zero tolerance for harassment — reported, investigated, acted on',
        ],
      },
    ],
    related: ['careers', 'our-values', 'community-commitments'],
  },
  {
    slug: 'locations',
    title: 'Locations',
    eyebrow,
    intro:
      'A distributed team with a central service desk — on-site where it matters, remote where it is faster.',
    sections: [
      {
        heading: 'Where we work',
        body: [
          'nexsate operates a primary service desk alongside regional field engineers who visit client sites for installs, audits and hands-on fixes. Remote tooling means most incidents are being worked before anyone reaches the phone.',
        ],
      },
      {
        heading: 'Coverage',
        list: [
          'Head office and network operations centre',
          'Regional field engineers for on-site support',
          'Remote-first service desk with after-hours rotations',
          'Use change country in the header for your local site',
        ],
      },
    ],
    related: ['contact-us', 'support-coverage-and-hours', 'about-nexsate'],
  },
  {
    slug: 'contact-us',
    title: 'Contact us',
    eyebrow,
    intro:
      'Sales question, existing incident or just curious — reach the right team in one step.',
    sections: [
      {
        heading: 'How to reach us',
        list: [
          'Sales and new enquiries: hello@nexsate.com',
          'Existing clients: raise a ticket in the support centre or call the service desk',
          'Security incidents: mark the subject line URGENT and call the 24/7 line',
          'Post: head office — see Locations for details',
        ],
      },
      {
        heading: 'What happens next',
        body: [
          'We reply to enquiries within one business day. Existing tickets are acknowledged automatically with an owner and an SLA clock — you will always know who is working your issue and when to expect an update.',
        ],
      },
    ],
    related: ['help-and-faq', 'support-centre', 'locations', 'media-contacts'],
  },
  {
    slug: 'report-an-issue-with-our-website',
    title: 'Report an issue with our website',
    eyebrow,
    intro:
      'Broken link, strange layout or an accessibility problem? Tell us — we fix our site the way we fix client systems.',
    sections: [
      {
        heading: 'What to include',
        list: [
          'The page address (URL) where you saw the problem',
          'What you expected to happen and what happened instead',
          'Your browser and device if the issue seems visual',
          'A screenshot if you have one — it speeds things up',
        ],
      },
      {
        heading: 'Where to send it',
        body: [
          'Email the details to hello@nexsate.com with the subject "Website issue". Accessibility reports are triaged with the same priority as functional bugs, and we confirm fixes in our release notes.',
        ],
      },
    ],
    related: ['contact-us', 'accessibility', 'privacy-policy'],
  },
  {
    slug: 'customer-testimonials',
    title: 'Customer testimonials',
    eyebrow,
    intro:
      'What clients say after the migration is done, the audit is passed and the tickets are quiet.',
    sections: [
      {
        heading: 'In their words',
        body: [
          '"Our Monday mornings used to start with three IT complaints. Six months after moving to nexsate, they start with coffee." — operations director, logistics group',
          '"The security audit passed first time. Their team had already closed everything the auditors flagged." — compliance lead, regional bank',
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
    related: ['why-choose-us', 'cloud-migration-saves-money-for-health-insurer', 'about-nexsate'],
  },
  {
    slug: 'partner-ecosystem',
    title: 'Partner ecosystem',
    eyebrow,
    intro:
      'We hold accreditations with the platforms our clients actually run — and we keep them current.',
    sections: [
      {
        heading: 'Technology partners',
        body: [
          'nexsate holds partner status across major cloud, networking, security and productivity vendors. That means better licensing options, faster escalation paths when something breaks at vendor level, and early access to capabilities we can pilot for clients.',
        ],
      },
      {
        heading: 'How partnerships help you',
        list: [
          'Escalation routes that skip generic support queues',
          'Volume licensing and refresh programs',
          'Certified engineers on the tools we recommend',
          'Joint roadmaps for platform migrations',
        ],
      },
    ],
    related: ['software-licensing', 'vendor-management', 'software-integration'],
  },
  {
    slug: 'awards-and-recognition',
    title: 'Awards and recognition',
    eyebrow,
    intro:
      'Nice to be noticed — nicer that the notices come from work clients felt day to day.',
    sections: [
      {
        heading: 'Recognition',
        body: [
          'nexsate has been recognised in managed service and customer satisfaction programmes, and our engineers hold certifications from the platforms we support. Awards go on the wall; the practices behind them go into every contract.',
        ],
      },
      {
        heading: 'Certified where it counts',
        list: [
          'Certified engineers across cloud, network and security stacks',
          'Independently audited service processes',
          'Consistent top-quartile client satisfaction scores',
        ],
      },
    ],
    related: ['our-story', 'compliance-and-standards', 'customer-testimonials'],
  },
  {
    slug: 'community-commitments',
    title: 'Community commitments',
    eyebrow,
    intro:
      'Technology skills are only useful when they are shared — locally, patiently and for free.',
    sections: [
      {
        heading: 'What we give back',
        body: [
          'We run digital-skills workshops for local charities and schools, donate refurbished equipment with secure wiping and fresh licenses, and give every employee paid days for volunteering. Non-profits also qualify for reduced-rate support plans.',
        ],
      },
      {
        heading: 'Commitments',
        list: [
          'Secure refurbishment and donation of retired hardware',
          'Free security health-checks for qualifying non-profits',
          'Paid volunteer days for every employee',
          'Apprenticeship places funded each year',
        ],
      },
    ],
    related: ['our-values', 'diversity-and-inclusion', 'careers'],
  },
]
