// Industry vertical pages (eyebrow: Industries).
const eyebrow = 'Industries'

export const sustainabilityPages = [
  {
    slug: 'banking',
    title: 'Banking',
    eyebrow,
    intro:
      'Always-on banking infrastructure with the controls auditors expect and the resilience customers do.',
    sections: [
      {
        heading: 'IT that passes the audit',
        body: [
          'Banks and fintechs run on uptime, ledger integrity and airtight controls. nexsate delivers managed infrastructure with segregation, encryption and audit-ready logging baked in — plus the patch discipline and DR testing that regulators ask about first.',
        ],
      },
      {
        heading: 'What we deliver',
        list: [
          'Hardened environments with least-privilege access',
          '24/7 monitoring aligned to change and incident processes',
          'Tested disaster recovery with documented RPO/RTO',
          'Evidence packs for audits and regulatory reviews',
        ],
      },
    ],
    related: ['insurance', 'capital-markets', 'cyber-security', 'compliance-and-standards'],
  },
  {
    slug: 'capital-markets',
    title: 'Capital markets',
    eyebrow,
    intro:
      'Low-latency platforms, strict retention and no room for downtime during trading hours.',
    sections: [
      {
        heading: 'Performance under pressure',
        body: [
          'Trading and settlement platforms need speed, observability and exact change control. We manage the underlying compute and networks, keep environments current between windows, and watch performance metrics that matter to desks — not just CPU graphs.',
        ],
      },
      {
        heading: 'Focus areas',
        list: [
          'Change-controlled maintenance around market hours',
          'Latency and capacity monitoring with alerting',
          'Retention and archiving aligned to regulation',
          'Resilient connectivity and failover design',
        ],
      },
    ],
    related: ['banking', 'insurance', 'network-management', 'managed-it'],
  },
  {
    slug: 'insurance',
    title: 'Insurance',
    eyebrow,
    intro:
      'Policy systems, claims workflows and customer data — kept available, protected and ready for scrutiny.',
    sections: [
      {
        heading: 'Reliable core systems',
        body: [
          'We support the platforms underwriting and claims depend on, with monitoring, backup and controlled change around policy cycles. Customer data gets classification, encryption and access reviews as standard.',
        ],
      },
      {
        heading: 'What matters in insurance IT',
        list: [
          'Availability around renewal and catastrophe peaks',
          'Data protection and privacy-aligned controls',
          'Documented recovery for core policy systems',
          'Integration support for broker and partner systems',
        ],
      },
    ],
    related: ['banking', 'healthcare', 'data-protection', 'backup-and-recovery'],
  },
  {
    slug: 'enterprise-technology',
    title: 'Enterprise technology',
    eyebrow,
    intro:
      'Complex estates, many sites, one operating picture — managed IT for scale.',
    sections: [
      {
        heading: 'Operating at scale',
        body: [
          'Multi-site organisations need consistency: standard builds, unified identity, clear ownership. nexsate brings every site, cloud subscription and remote worker under one management plane with reporting that rolls up cleanly for leadership.',
        ],
      },
      {
        heading: 'Built for complexity',
        list: [
          'Standardised configurations across sites and regions',
          'Central identity, policy and device management',
          'Asset and license visibility in one dashboard',
          'Vendor coordination for hardware and telco services',
        ],
      },
    ],
    related: ['manufacturing', 'it-services', 'vendor-management', 'managed-accounts'],
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing',
    eyebrow,
    intro:
      'Keeping production lines, plant networks and supply-chain systems running — downtime here counts in real money.',
    sections: [
      {
        heading: 'IT meets OT',
        body: [
          'Plant floors mix ageing machines with modern systems, so we segment IT from operational technology, monitor both sides, and plan maintenance around production windows — never during them. Spares, vendors and lifecycles are tracked so no critical device fails as a surprise.',
        ],
      },
      {
        heading: 'Priorities for plants',
        list: [
          'Segmented networks protecting control systems',
          'Change windows aligned to production schedules',
          'Resilient connectivity between sites and suppliers',
          'Lifecycle planning for hardware and licenses',
          'Support for warehouse and barcode systems',
        ],
      },
    ],
    related: ['logistics', 'enterprise-technology', 'network-management', 'managed-it'],
  },
  {
    slug: 'logistics',
    title: 'Logistics',
    eyebrow,
    intro:
      'Warehouses, fleets and portals that never stop — supported around the clock, not just nine to five.',
    sections: [
      {
        heading: 'Always moving',
        body: [
          'Distribution businesses run shifts, scanners, transport systems and customer portals that sleep when the trucks do. We provide follow-the-sun support, resilient site connectivity and monitoring tuned to the applications that keep goods moving.',
        ],
      },
      {
        heading: 'What we cover',
        list: [
          'Warehouse, scanning and telemetry systems',
          'Site-to-site connectivity and failover',
          'Shift-aligned support windows',
          'Customer and partner portal availability',
        ],
      },
    ],
    related: ['manufacturing', 'retail', 'support-coverage-and-hours', 'network-management'],
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    eyebrow,
    intro:
      'Clinical and administrative systems where availability and confidentiality are non-negotiable.',
    sections: [
      {
        heading: 'Care cannot wait for IT',
        body: [
          'We support the systems teams depend on — records, scheduling, imaging, communications — with monitoring, patching and recovery designed around clinical priorities. Privacy controls and audit trails are built in, not bolted on.',
        ],
      },
      {
        heading: 'Healthcare essentials',
        list: [
          'High-availability design for critical applications',
          'Strict access control and session auditing',
          'Encrypted data at rest and in transit',
          'Tested recovery for patient-facing services',
          'Staff training that fits clinical schedules',
        ],
      },
    ],
    related: ['insurance', 'higher-education', 'data-protection', 'cyber-security'],
  },
  {
    slug: 'higher-education',
    title: 'Higher education',
    eyebrow,
    intro:
      'Campuses of students, researchers and devices at scale — open by nature, defended by design.',
    sections: [
      {
        heading: 'Open networks, controlled risk',
        body: [
          'Universities and colleges must stay welcoming while protecting research and personal data. We run segmented campus networks, generous-but-monitored Wi-Fi, device options for students and security controls that tolerate academic freedom without becoming a soft target.',
        ],
      },
      {
        heading: 'Campus IT',
        list: [
          'High-density Wi-Fi across buildings and grounds',
          'Identity-based access for students and staff',
          'Research data protection and backup options',
          'Semester-aligned maintenance and onboarding',
          'Support desks for high-volume user bases',
        ],
      },
    ],
    related: ['government', 'healthcare', 'cyber-security', 'managed-it'],
  },
  {
    slug: 'government',
    title: 'Government',
    eyebrow,
    intro:
      'Public-sector IT delivered with the transparency, security and procurement discipline it demands.',
    sections: [
      {
        heading: 'Serving citizens online',
        body: [
          'We help public bodies run accessible, resilient digital services with supply chains that satisfy assurance requirements. Reporting is clear enough for oversight, security controls are documented, and everything is priced openly.',
        ],
      },
      {
        heading: 'Public sector fit',
        list: [
          'Assurance-aligned security and supplier controls',
          'Accessible, resilient citizen-facing services',
          'Transparent pricing and contract reporting',
          'Continuity planning for essential operations',
        ],
      },
    ],
    related: ['healthcare', 'banking', 'compliance-and-standards', 'data-protection'],
  },
  {
    slug: 'retail',
    title: 'Retail',
    eyebrow,
    intro:
      'Stores, e-commerce and stock systems that have to work on the busiest day of the year.',
    sections: [
      {
        heading: 'Peak-proof IT',
        body: [
          'We keep point-of-sale, stock and online channels resilient through seasonal spikes: monitoring tuned to trading hours, failover for connectivity, and change freezes when footfall matters most.',
        ],
      },
      {
        heading: 'Retail priorities',
        list: [
          'POS and payment environment support',
          'Store connectivity with 4G/5G failover',
          'E-commerce platform monitoring',
          'Cardholder data handled to PCI DSS habits',
          'Rollout support for new sites and devices',
        ],
      },
    ],
    related: ['logistics', 'banking', 'network-management', 'managed-it'],
  },
  {
    slug: 'energy-and-utilities',
    title: 'Energy and utilities',
    eyebrow,
    intro:
      'Critical operations demand disciplined change, tight access control and total accountability.',
    sections: [
      {
        heading: 'Resilience by default',
        body: [
          'Utilities cannot experiment with downtime. We support business systems with hardened configurations, segmented networks and documented continuity arrangements, and we coordinate closely with operational teams before anything changes.',
        ],
      },
      {
        heading: 'What we provide',
        list: [
          'Change control aligned to operational calendars',
          'Enhanced monitoring with clear escalation',
          'Supplier code and access governance',
          'Continuity and crisis exercise support',
        ],
      },
    ],
    related: ['government', 'manufacturing', 'compliance-and-standards', 'cyber-security'],
  },
  {
    slug: 'media-and-entertainment',
    title: 'Media and entertainment',
    eyebrow,
    intro:
      'Big files, tight deadlines and public launches — infrastructure that keeps content moving.',
    sections: [
      {
        heading: 'Move content fast, safely',
        body: [
          'Production and distribution rely on throughput and access at the right moments. We build high-performance storage and transfer paths, protect pre-release material with strict access controls, and keep publishing pipelines monitored through launch windows.',
        ],
      },
      {
        heading: 'Focus areas',
        list: [
          'High-throughput storage and accelerated transfer',
          'Water-tight access control for unreleased content',
          'Publishing pipeline monitoring',
          'Burst capacity for campaign and release peaks',
        ],
      },
    ],
    related: ['enterprise-technology', 'cloud-computing', 'data-protection', 'professional-services'],
  },
  {
    slug: 'telecommunications',
    title: 'Telecommunications',
    eyebrow,
    intro:
      'Support for the operators and resellers who keep everyone else connected.',
    sections: [
      {
        heading: 'Behind the signal',
        body: [
          'We manage the business systems, field tools and customer platforms around connectivity services: provisioning workflows, partner integrations and NOC-adjacent tooling — monitored and supported to carrier-grade expectations.',
        ],
      },
      {
        heading: 'Where we help',
        list: [
          'Provisioning and billing system support',
          'Field workforce tooling',
          'Partner and wholesale integrations',
          'Customer portal availability monitoring',
        ],
      },
    ],
    related: ['network-management', 'enterprise-technology', 'logistics'],
  },
  {
    slug: 'construction',
    title: 'Construction',
    eyebrow,
    intro:
      'Sites, offices and contractors connected — even when the building does not exist yet.',
    sections: [
      {
        heading: 'IT that moves with the project',
        body: [
          'Temporary sites, changing teams and heavy data from design tools: we provide rapid connectivity, secure file exchange with partners, and device management that survives dirt, travel and reassignment between projects.',
        ],
      },
      {
        heading: 'Site-to-office support',
        list: [
          'Rapid site connectivity with failover options',
          'Secure collaboration with design partners',
          'Rugged device provisioning and tracking',
          'Central records for drawings and documents',
        ],
      },
    ],
    related: ['manufacturing', 'professional-services', 'network-management'],
  },
  {
    slug: 'professional-services',
    title: 'Professional services',
    eyebrow,
    intro:
      'For firms where time is the product, IT should create hours — not consume them.',
    sections: [
      {
        heading: 'Client work without friction',
        body: [
          'Firms depend on document systems, communication tools and airtight confidentiality. We keep those fast and secure, automate the onboarding of new matters and staff, and make sure client data never leaks through convenience.',
        ],
      },
      {
        heading: 'Priorities',
        list: [
          'Document management and matter-level access',
          'Confidential communication with clients',
          'Rapid joiner/leaver workflows',
          'Billable-time systems kept available',
        ],
      },
    ],
    related: ['banking', 'hospitality', 'data-protection', 'managed-it'],
  },
  {
    slug: 'hospitality',
    title: 'Hospitality',
    eyebrow,
    intro:
      'Guest Wi-Fi, property systems and booking platforms — invisible when they work.',
    sections: [
      {
        heading: 'Hospitality without hiccups',
        body: [
          'We keep guest connectivity fast and separated from payment and property systems, monitor booking channels through peak seasons, and support property teams with hardware that survives 24-hour front desks.',
        ],
      },
      {
        heading: 'What we cover',
        list: [
          'Guest Wi-Fi designed for density and privacy',
          'Property and booking system support',
          'Payment terminal network segmentation',
          'Seasonal capacity planning',
        ],
      },
    ],
    related: ['retail', 'logistics', 'network-management', 'cyber-security'],
  },
]
