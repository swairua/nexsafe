export const navItems = [
  {
    label: 'Home',
    href: '#top',
    layout: 'simple',
    links: [{ label: 'IT Services', href: '#/managed-it-services' }],
  },
  {
    label: 'Solutions',
    href: '#it-solutions',
    layout: 'solutions',
    columns: [
      {
        heading: 'Services',
        links: [
          { label: 'Managed IT Services', href: '#/managed-it-services' },
          { label: 'Cloud Services', href: '#/cloud-services' },
          { label: 'Software Development', href: '#/software-erp-app-development' },
          { label: 'Network Management', href: '#/network-management' },
          { label: 'Cyber Security', href: '#/cybersecurity' },
          { label: 'Backup & Disaster Management', href: '#/backup-disaster-recovery' },
        ],
      },
      {
        heading: 'Business Challenges',
        tiles: [
          {
            label: 'Digital Transformation',
            href: '#/digital-transformation',
            icon: 'transform',
          },
          {
            label: 'Security',
            href: '#/cybersecurity',
            icon: 'shield',
          },
          {
            label: 'Automation',
            href: '#/automation',
            icon: 'gear',
          },
          {
            label: 'Gaining Efficiency',
            href: '#/gaining-efficiency',
            icon: 'gauge',
          },
        ],
      },
      {
        heading: 'Industry Focus',
        links: [
          { label: 'Industry Manufacturing', href: '#/industrial-manufacturing' },
          { label: 'Transportation & Logistics', href: '#/transportation-logistics' },
          { label: 'Healthcare', href: '#/healthcare' },
          { label: 'Banking, Finance & Insurance', href: '#/banks-insurance' },
          { label: 'Consulting Providers', href: '#/consulting-providers' },
          { label: 'Non Profit', href: '#/non-profit' },
        ],
        viewAll: { label: 'View all', href: '#industries' },
      },
    ],
  },
  {
    label: 'Company',
    href: '#company',
    layout: 'company',
    headline: 'Simplifying IT\nfor a complex world.',
    links: [
      { label: 'About us', href: '#/about-us' },
      { label: 'Why us', href: '#/why-us' },
      { label: 'Careers', href: '#/careers' },
    ],
    partners: {
      heading: 'Platform partnerships',
      href: '#/partners-certifications',
      items: [
        { label: 'AWS', href: '#/partners-certifications', logo: '/uploads/stack-icons/amazon-web-services.svg' },
        { label: 'Google Cloud', href: '#/partners-certifications', logo: '/uploads/stack-icons/google-cloud.svg' },
        { label: 'Microsoft', href: '#/partners-certifications', logo: '/uploads/stack-icons/microsoft.svg' },
        { label: 'Salesforce', href: '#/partners-certifications', logo: '/uploads/stack-icons/salesforce.svg' },
      ],
    },
  },
  {
    label: 'Resources',
    href: '#insights',
    layout: 'simple',
    links: [
      { label: 'Schedule a Consultation', href: '#/contact-us' },
      { label: 'FAQ', href: '#/help-and-faq' },
    ],
  },
]
