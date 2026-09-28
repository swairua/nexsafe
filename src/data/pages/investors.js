// Support pages: help, service desk, onboarding and accounts (eyebrow: Support).
const eyebrow = 'Support'

export const investorPages = [
  {
    slug: 'help-and-faq',
    title: 'Help and FAQ',
    eyebrow,
    intro:
      'Quick answers about contacting us, opening tickets and how our support works.',
    sections: [
      {
        heading: 'Frequently asked',
        list: [
          'How do I raise a ticket? — use the support centre portal, email, or call the service desk',
          'What are support hours? — service desk staffed for business hours with 24/7 on-call cover',
          'How fast is response? — priorities and target times are listed on each plan and in our SLAs',
          'Can you support remote staff? — yes, remote users are covered by the same tooling and SLAs',
        ],
      },
      {
        heading: 'Still stuck?',
        body: [
          'Email hello@nexsate.com or open a ticket in the support centre. If something is down for the whole business, call — phone tickets are always faster than email for urgent issues.',
        ],
      },
    ],
    related: ['support-centre', 'support-coverage-and-hours', 'contact-us', 'service-status'],
  },
  {
    slug: 'support-forum',
    title: 'Support forum',
    eyebrow,
    intro:
      'Ask questions, share fixes and follow known issues with the nexsate support community.',
    sections: [
      {
        heading: 'What the forum is for',
        body: [
          'Clients and their IT staff can post questions, search answered threads and track known issues. Every thread is watched by the support team, so anything urgent still belongs in a ticket — the forum is for knowledge that helps everyone.',
        ],
      },
      {
        heading: 'Community guidelines',
        list: [
          'Search before posting — most how-tos are already answered',
          'Never include passwords, keys or personal data in a thread',
          'Tag threads by product so the right engineer sees them',
          'Mark the reply that solved your problem as the answer',
        ],
      },
    ],
    related: ['support-centre', 'help-and-faq', 'service-status'],
  },
  {
    slug: 'support-centre',
    title: 'Support centre',
    eyebrow,
    intro:
      'One place to raise, track and review every support request with the nexsate team.',
    sections: [
      {
        heading: 'What the support centre does',
        body: [
          'Existing clients sign in to raise tickets, attach screenshots and follow progress in real time. Every request carries an owner, a priority and an SLA clock — and closes only when you confirm it is resolved.',
        ],
      },
      {
        heading: 'Features',
        list: [
          'Ticket creation with automatic acknowledgement and triage',
          'Live status and full conversation history',
          'Knowledge-base suggestions before you finish typing',
          'Satisfaction rating on every closed ticket',
        ],
      },
    ],
    related: ['help-and-faq', 'it-support', 'service-status', 'knowledge-base'],
  },
  {
    slug: 'service-status',
    title: 'Service status',
    eyebrow,
    intro:
      'Live view of nexsate-managed platforms — check here before you raise a ticket.',
    sections: [
      {
        heading: 'Current status',
        body: [
          'All managed services, monitoring pipelines and the support portal are operating normally. Any active incidents are posted here with updates at least every thirty minutes until resolution.',
        ],
      },
      {
        heading: 'How we communicate',
        list: [
          'Incident banner published at detection',
          'Timestamped updates while impact continues',
          'Post-incident review published after resolution',
          'Optional email and SMS subscriptions for status changes',
        ],
      },
    ],
    related: ['support-centre', 'help-and-faq', 'email-alerts'],
  },
  {
    slug: 'knowledge-base',
    title: 'Knowledge base',
    eyebrow,
    intro:
      'Self-service articles written by the same engineers who answer your tickets.',
    sections: [
      {
        heading: 'Fix it yourself, faster',
        body: [
          'Step-by-step guides cover the issues we see most: password resets, VPN and mail setup, printer quirks, device replacement and security how-tos. Each article ends with "still stuck?" that opens a ticket pre-filled with context.',
        ],
      },
      {
        heading: 'Popular categories',
        list: [
          'Accounts, passwords and multi-factor sign-in',
          'Email, calendar and collaboration tools',
          'Remote access and VPN',
          'Devices, peripherals and printing',
          'Security alerts and safe working',
        ],
      },
    ],
    related: ['support-centre', 'help-and-faq', 'training-and-enablement'],
  },
  {
    slug: 'training-and-enablement',
    title: 'Training and enablement',
    eyebrow,
    intro:
      'Security-aware users and confident IT teams — training that sticks beyond the slide deck.',
    sections: [
      {
        heading: 'Programmes we run',
        body: [
          'From phishing simulations for all staff to deep-dives for your internal IT team, sessions are hands-on and mapped to your tooling. We measure behaviour change, not attendance.',
        ],
      },
      {
        heading: 'Options',
        list: [
          'Awareness training and simulated phishing campaigns',
          'Administrator workshops on identity, backup and security tooling',
          'Onboarding sessions for new joiners',
          'Executive briefings on risk and compliance',
        ],
      },
    ],
    related: ['tips-to-make-your-workforce-a-security-front-line', 'knowledge-base', 'managed-it-services'],
  },
  {
    slug: 'support-coverage-and-hours',
    title: 'Support coverage and hours',
    eyebrow,
    intro:
      'When we are open, how urgent issues escalate, and what happens outside business hours.',
    sections: [
      {
        heading: 'Coverage model',
        body: [
          'The service desk is staffed during business hours in your region, with an on-call rotation covering nights, weekends and public holidays. Monitoring never sleeps: alerts raised out of hours are triaged by the on-call engineer and escalated by impact.',
        ],
      },
      {
        heading: 'At a glance',
        list: [
          'Business-hours desk with sub-15-minute first response',
          '24/7 on-call for severity-one incidents',
          'Defined escalation paths into vendor support when needed',
          'Holiday cover published in advance',
          'Coverage extensions available for shift operations',
        ],
      },
    ],
    related: ['help-and-faq', 'service-level-agreements', 'locations'],
  },
  {
    slug: 'getting-started-with-nexsate',
    title: 'Getting started with nexsate',
    eyebrow,
    intro:
      'Your first thirty days with nexsate — what we need, what you get, and who does what.',
    sections: [
      {
        heading: 'Onboarding in four steps',
        body: [
          'We agree scope and access, discover and document the environment, onboard tooling (monitoring, backup, security), then go live on the service desk with agreed SLAs. Most clients complete the journey inside a month without disrupting their teams.',
        ],
      },
      {
        heading: 'What we need from you',
        list: [
          'A single point of contact for decisions',
          'Read-only access to core systems for discovery',
          'Existing documentation, contracts and vendor details',
          'A one-hour workshop with the people who use IT daily',
        ],
      },
    ],
    related: ['onboarding-and-migration', 'support-centre', 'managed-it-services'],
  },
  {
    slug: 'managed-accounts',
    title: 'Managed accounts',
    eyebrow,
    intro:
      'Admin access, identities and privileged sessions — the keys to the kingdom, kept under control.',
    sections: [
      {
        heading: 'Privilege with receipts',
        body: [
          'We manage administrative identities with hardware-backed multi-factor, just-in-time elevation and full session logging. Standing privilege is the exception, documented and reviewed — never the default.',
        ],
      },
      {
        heading: 'Controls',
        list: [
          'Separate admin identities, never shared logins',
          'Just-in-time elevation with expiry',
          'Session recording for sensitive systems',
          'Quarterly access recertification with owners',
          'Break-glass procedures tested and audited',
        ],
      },
    ],
    related: ['cybersecurity', 'data-protection', 'compliance-and-standards'],
  },
  {
    slug: 'feedback-and-complaints',
    title: 'Feedback and complaints',
    eyebrow,
    intro:
      'If we got it wrong, we want to hear it — and we will tell you exactly what happens next.',
    sections: [
      {
        heading: 'How complaints are handled',
        body: [
          'Send feedback to hello@nexsate.com or raise it in the support centre. You receive an acknowledgement within one business day, an owner for the investigation, and a written response with findings and actions. Serious complaints are reviewed by leadership.',
        ],
      },
      {
        heading: 'Our commitments',
        list: [
          'Acknowledgement within one business day',
          'Named owner while the complaint is open',
          'Root cause, not just a surface apology',
          'Follow-up after remediation to confirm it held',
        ],
      },
    ],
    related: ['contact-us', 'why-choose-us', 'help-and-faq'],
  },
]
