// IT solutions pages: services, cloud, security, ways of working (eyebrow: IT solutions).
const eyebrow = 'IT solutions'

export const whatWeDoPages = [
  {
    slug: 'it-services',
    title: 'IT services',
    eyebrow,
    intro:
      'The full stack of day-to-day IT — service desk, monitoring, maintenance and projects — delivered as one managed service.',
    sections: [
      {
        heading: 'What we take off your plate',
        body: [
          'nexsate becomes your IT department or the team behind it: we manage infrastructure, respond to users, keep platforms patched and plan the projects that move you forward. You get one queue, one SLA and one monthly invoice.',
        ],
      },
      {
        heading: 'Included',
        list: [
          'Service desk for unlimited support tickets',
          '24/7 monitoring of servers, networks and cloud',
          'Patch, backup and endpoint management',
          'Vendor and license coordination',
          'Quarterly roadmap and cost review',
        ],
      },
    ],
    related: ['managed-it-services', 'it-support', 'software-integration', 'cloud-services'],
  },
  {
    slug: 'managed-it-services',
    title: 'Managed IT services',
    eyebrow,
    intro:
      'Proactive management of your entire environment, with support your team will actually enjoy using.',
    sections: [
      {
        heading: 'Always on, always watched',
        body: [
          'We deploy monitoring across every server, switch and critical endpoint, correlating alerts so our engineers investigate real issues instead of noise. Maintenance windows, patching and backup verification happen on schedule — and are reported to you, not just logged.',
          'When something does go wrong, an engineer picks it up with full context of your estate. No level-one script reading; no explaining the same problem twice.',
        ],
      },
      {
        heading: 'How engagement works',
        list: [
          'Discovery and documentation of your environment',
          'Onboarding onto monitoring, backup and security tooling',
          'Service desk live for your users with agreed SLAs',
          'Monthly reporting and continuous improvement',
        ],
      },
    ],
    related: ['it-support', 'networking', 'device-management', 'service-level-agreements'],
  },
  {
    slug: 'it-support',
    title: 'IT support',
    eyebrow,
    intro:
      'Friendly, fast help for your people — by phone, chat or ticket, whenever work happens.',
    sections: [
      {
        heading: 'Support that stays human',
        body: [
          'Your team reaches engineers who know their machines, their applications and their history. We aim for first-response in minutes and first-contact resolution wherever possible, with clear updates until everything is closed.',
        ],
      },
      {
        heading: 'Ways to reach us',
        list: [
          'Portal and email tickets with full history',
          'Phone and chat for urgent issues',
          'Remote sessions that fix most problems in one call',
          'On-site visits when hands are needed',
        ],
      },
    ],
    related: ['managed-it-services', 'help-and-faq', 'support-centre', 'onboarding-and-migration'],
  },
  {
    slug: 'software-integration',
    title: 'Software integration',
    eyebrow,
    intro:
      'Connect the systems you already own — integrations, APIs and data flows that make technology work as one.',
    sections: [
      {
        heading: 'Guidance before spend',
        body: [
          'Whether you are planning a migration, a refresh or an acquisition, we model the options against your real constraints: budget, skills, risk and timing. You get a written recommendation you could hand to a board — and engineers who can implement it.',
        ],
      },
      {
        heading: 'Typical engagements',
        list: [
          'Infrastructure and cloud architecture reviews',
          'Technology roadmaps and budget planning',
          'Security posture assessments',
          'Vendor selection and second opinions',
          'Post-incident reviews and remediation plans',
        ],
      },
    ],
    related: ['it-strategy-consulting', 'cloud-services', 'cybersecurity', 'compliance-and-standards'],
  },
  {
    slug: 'cloud-services',
    title: 'Cloud services',
    eyebrow,
    intro:
      'Migrate, run and optimise cloud platforms that scale with you — without the runaway bill.',
    sections: [
      {
        heading: 'Cloud that behaves',
        body: [
          'We design and operate cloud environments on the major platforms: landing zones with guardrails, right-sized compute, automated scaling and cost monitoring that flags drift before the invoice lands. Migrations are staged, rehearsed and reversible.',
        ],
      },
      {
        heading: 'Our cloud practice',
        list: [
          'Assessment and migration planning',
          'Landing zones, identity and network design',
          'Cost optimisation and reserved-capacity strategy',
          'Backup, disaster recovery and resilience testing',
          'Ongoing management with 24/7 monitoring',
        ],
      },
    ],
    related: ['data-protection-disaster-recovery', 'networking', 'onboarding-and-migration', 'cloud-migration-saves-money-for-health-insurer'],
  },
  {
    slug: 'software-development',
    title: 'Software development',
    eyebrow,
    intro:
      'Small, focused applications that fit how your business actually works — built to be maintained.',
    sections: [
      {
        heading: 'Software with a purpose',
        body: [
          'When off-the-shelf tools force workarounds, we build the missing piece: portals, integrations, internal dashboards. We start with the process, ship in small releases, and document everything so the code has a life beyond its first developer.',
        ],
      },
      {
        heading: 'How we deliver',
        list: [
          'Discovery workshops that map the real workflow',
          'Incremental delivery with demoable milestones',
          'Integrations with your existing systems and data',
          'Handover with documentation, tests and training',
          'Optional ongoing support and iteration',
        ],
      },
    ],
    related: ['software-integration', 'cloud-services', 'it-services'],
  },
  {
    slug: 'data-protection-disaster-recovery',
    title: 'Data protection & disaster recovery',
    eyebrow,
    intro:
      'Backups that are verified, tested and fast to restore — because having copies is not the same as recovering.',
    sections: [
      {
        heading: '3-2-1, enforced automatically',
        body: [
          'We run the classic discipline at modern speed: at least three copies, on two media types, one off-site — encrypted, monitored and alerted. Failed jobs page us, not you. Restores are rehearsed on a schedule, with evidence you can show an auditor.',
        ],
      },
      {
        heading: 'What you get',
        list: [
          'Daily incremental and full backup cycles with encryption',
          'Off-site and immutable copies for ransomware resilience',
          'Quarterly restore tests with documented timings',
          'RPO/RTO targets agreed per application',
        ],
      },
    ],
    related: ['cloud-services', 'managed-it-services', 'cloud-backup-done-right'],
  },
  {
    slug: 'networking',
    title: 'Networking',
    eyebrow,
    intro:
      'Wired, wireless and WAN — designed, documented and watched so connectivity stays boring.',
    sections: [
      {
        heading: 'Networks you can trust',
        body: [
          'We build segmented, documented networks with monitored links and sensible redundancy, then keep them healthy: firmware on schedule, configuration backed up, capacity reviewed before it becomes an incident.',
        ],
      },
      {
        heading: 'Coverage',
        list: [
          'Design and rollout for LAN, Wi-Fi and SD-WAN',
          'Continuous monitoring of links, latency and errors',
          'Controlled firmware and configuration changes',
          'Guest, IoT and BYOD segmentation',
        ],
      },
    ],
    related: ['managed-it-services', 'cloud-services', 'it-support'],
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    eyebrow,
    intro:
      'Layered defence for identities, endpoints, email and data — monitored by people who respond, not just alert.',
    sections: [
      {
        heading: 'Security as a service',
        body: [
          'nexsate combines prevention and response: endpoint protection with behavioural detection, phishing defence, multi-factor identity, vulnerability scanning and 24/7 monitoring through our security operations centre. When an alert fires, an analyst triages it and acts — escalating to you only when a decision is yours to make.',
        ],
      },
      {
        heading: 'Core capabilities',
        list: [
          'Managed endpoint detection and response',
          'Email filtering, DMARC and impersonation protection',
          'Vulnerability scanning and patch prioritisation',
          'Incident response playbooks and tabletop exercises',
          'Security awareness training and phishing simulations',
        ],
      },
    ],
    related: ['cybersecurity', 'compliance-and-standards', 'managed-it-services', 'phishing-and-scam-alerts', 'cloud-backup-done-right'],
  },
  {
    slug: 'data-protection',
    title: 'Data protection',
    eyebrow,
    intro:
      'Know where your data lives, who can reach it, and how you would prove it in an audit.',
    sections: [
      {
        heading: 'From inventory to control',
        body: [
          'We start by mapping what data you hold and where it flows, then apply the controls that fit: classification, encryption at rest and in transit, least-privilege access, retention rules and monitored sharing. Evidence is collected as a by-product of operation, not as a scramble before audits.',
        ],
      },
      {
        heading: 'Control areas',
        list: [
          'Data discovery and classification workshops',
          'Access reviews and privileged account hygiene',
          'Encryption and secure file-sharing standards',
          'Retention, archiving and defensible deletion',
          'Privacy-aligned processing for client and staff data',
        ],
      },
    ],
    related: ['cybersecurity', 'compliance-and-standards', 'privacy-policy', 'banking'],
  },
  {
    slug: 'compliance-and-standards',
    title: 'Compliance and standards',
    eyebrow,
    intro:
      'Controls, evidence and rhythm — meeting the frameworks your auditors, customers and regulators ask about.',
    sections: [
      {
        heading: 'Compliance as operation',
        body: [
          'We translate requirements into running systems: access reviews that happen, logs that retain, changes that get approved. Whether you are aiming at ISO 27001, SOC 2, PCI DSS or sector rules, we map the gaps, close them and keep the evidence current.',
        ],
      },
      {
        heading: 'How we help',
        list: [
          'Gap assessments against your target framework',
          'Control implementation with named owners',
          'Policy templates that match how you actually work',
          'Evidence collection embedded in operations',
          'Audit preparation and attendee support',
        ],
      },
    ],
    related: ['cybersecurity', 'data-protection', 'banking', 'government'],
  },
  {
    slug: 'onboarding-and-migration',
    title: 'Onboarding and migration',
    eyebrow,
    intro:
      'A staged, rehearsed path from wherever you are now to a managed environment — with no big-bang weekends.',
    sections: [
      {
        heading: 'Migration without drama',
        body: [
          'We inventory, prioritise and sequence: quick wins first, risky systems with rehearsals, decommissioning only after soak time. Every cutover has a tested rollback, and your users get comms before, during and after — never silence.',
        ],
      },
      {
        heading: 'What a migration includes',
        list: [
          'Discovery, dependency mapping and risk register',
          'Staged waves with go/no-go checkpoints',
          'Rollback plans rehearsed before cutover',
          'User communications and training',
          'Hypercare period with extended cover',
        ],
      },
    ],
    related: ['managed-it-services', 'cloud-services', 'getting-started-with-nexsate', 'service-level-agreements'],
  },
  {
    slug: 'service-level-agreements',
    title: 'Service level agreements',
    eyebrow,
    intro:
      'Clear targets for response and resolution, reported against every month — no small print surprises.',
    sections: [
      {
        heading: 'How our SLAs work',
        body: [
          'Priorities are defined by impact and urgency, with published targets for first response and resolution per priority. Missed targets trigger review, not excuses: you see performance in monthly reports, and credits apply where we contract them.',
        ],
      },
      {
        heading: 'What is covered',
        list: [
          'Priority matrix agreed during onboarding',
          'Response targets from 15 minutes for severity one',
          'Resolution targets by priority and scope',
          'Monthly SLA reporting with trend commentary',
          'Quarterly service reviews and improvement plans',
        ],
      },
    ],
    related: ['managed-it-services', 'support-coverage-and-hours', 'why-choose-us', 'pricing-and-plans'],
  },
  {
    slug: 'pricing-and-plans',
    title: 'Pricing and plans',
    eyebrow,
    intro:
      'Fixed monthly pricing, unlimited tickets and security included — pick the cover that fits your team.',
    sections: [
      {
        heading: 'Three simple plans',
        list: [
          'Essentials — monitoring, patching, backup oversight and business-hours support',
          'Complete — everything in Essentials plus 24/7 on-call, security stack and quarterly reviews',
          'Enterprise — multi-site coverage, dedicated engineer and custom SLA targets',
        ],
      },
      {
        heading: 'How pricing stays honest',
        body: [
          'Pricing is per user or per device, agreed up front. Projects and one-off work are quoted separately with fixed scopes. There are no per-ticket charges — raising a request never costs your team money.',
        ],
      },
    ],
    related: ['service-level-agreements', 'why-choose-us', 'managed-it-services', 'it-support'],
  },
  {
    slug: 'device-management',
    title: 'Device management',
    eyebrow,
    intro:
      'Every laptop, phone and tablet — enrolled, encrypted, patched and recoverable.',
    sections: [
      {
        heading: 'Fleet-wide control',
        body: [
          'We enrol devices into central management from day one: enforced encryption, screen locks, malware protection and remote wipe when something is lost. Gold builds keep new machines consistent, and self-service covers the common fixes.',
        ],
      },
      {
        heading: 'Capabilities',
        list: [
          'Zero-touch enrollment and provisioning',
          'Disk encryption and lock-screen enforcement',
          'Automated patching for OS and core apps',
          'Remote lock, wipe and locate for lost devices',
          'Lifecycle tracking from purchase to disposal',
        ],
      },
    ],
    related: ['managed-it-services', 'cybersecurity', 'it-support'],
  },
  {
    slug: 'vendor-management',
    title: 'Vendor management',
    eyebrow,
    intro:
      'One number to call, however many suppliers are involved behind the scenes.',
    sections: [
      {
        heading: 'We hold the thread',
        body: [
          'Hardware, connectivity, line-of-business software — when something spans vendors, we coordinate: raise the tickets, chase the credits, bridge the calls. You get single ownership of the outcome instead of three suppliers pointing sideways.',
        ],
      },
      {
        heading: 'What we take on',
        list: [
          'Single point of contact for multi-vendor issues',
          'Contract, warranty and renewal tracking',
          'Escalation management with vendors',
          'Consolidated asset and license records',
        ],
      },
    ],
    related: ['software-licensing', 'partner-ecosystem', 'it-services'],
  },
  {
    slug: 'software-licensing',
    title: 'Software licensing',
    eyebrow,
    intro:
      'Right licenses, right count, right time — no shelfware, no compliance letters.',
    sections: [
      {
        heading: 'Licenses without guesswork',
        body: [
          'We track what you own, what you use and what is coming up for renewal, then right-size before true-ups rather than after. Subscription or perpetual, we model the cheaper path for how your teams actually work.',
        ],
      },
      {
        heading: 'Services',
        list: [
          'Entitlement and usage inventory',
          'Renewal calendar with budget forecasting',
          'True-up and audit preparation',
          'Subscription right-sizing recommendations',
          'Developer and special-case licensing guidance',
        ],
      },
    ],
    related: ['vendor-management', 'partner-ecosystem', 'subscription-licensing-unlocks-spike-in-it-orders'],
  },
  {
    slug: 'it-strategy-consulting',
    title: 'IT strategy consulting',
    eyebrow,
    intro:
      'A written plan tying technology to business goals — with costs, sequencing and owners.',
    sections: [
      {
        heading: 'Strategy you can execute',
        body: [
          'We build practical roadmaps: where you are, where you need to be, and the shortest responsible route between them. Each initiative carries an estimate, a dependency map and a definition of done — so the plan survives contact with reality.',
        ],
      },
      {
        heading: 'Deliverables',
        list: [
          'Current-state assessment with risk register',
          'Target architecture and rationale',
          'Prioritised initiative list with cost ranges',
          'Governance model for ongoing decisions',
          'Annual review cadence with progress metrics',
        ],
      },
    ],
    related: ['software-integration', 'cloud-services', 'pricing-and-plans'],
  },
]
