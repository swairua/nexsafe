// Contact + legal pages — the small set of non-editorial routes the header,
// footer and CTA buttons link to. The client supplied no copy for these, so
// the wording is deliberately plain and factual rather than invented.
const support = 'Support'
const legal = 'Legal'

export const sitePages = [
  {
    slug: 'contact-us',
    title: 'Contact us',
    eyebrow: support,
    intro:
      'Tell us about your environment, your users, and the technology challenges affecting daily operations — we will come back to you with a practical way forward.',
    sections: [
      {
        heading: 'Start a conversation',
        body: [
          'Nexsate works with businesses across a range of industries to improve the technology behind daily operations. Whether you need day-to-day IT support, a security review, a cloud migration, or help connecting the systems you already own, the conversation starts the same way: understanding what you are trying to achieve and what is getting in the way.',
        ],
        list: [
          'Managed IT services and day-to-day support',
          'Cybersecurity, security and compliance readiness',
          'Cloud services, Microsoft 365 and migration',
          'Network management, cabling and connectivity',
          'Backup, disaster recovery and business continuity',
          'Software development, ERP, CRM and automation',
        ],
      },
      {
        heading: 'What to tell us',
        body: [
          'The more we know about your business, the more useful our first response will be. It helps to have an idea of your user numbers, the systems you run, the locations you operate from, and the problems that are costing you the most time.',
        ],
        list: [
          'How many users need support, and from how many locations',
          'Which business systems and applications you depend on',
          'What is currently causing disruption or delay',
          'Whether you are looking for ongoing support or a specific project',
        ],
      },
    ],
    related: ['services-solutions', 'managed-it-services', 'about-us'],
  },
  {
    slug: 'change-country',
    title: 'Change country',
    eyebrow: support,
    intro: 'Select the region you would like to view.',
    sections: [
      {
        heading: 'Regional sites',
        body: [
          'This front-end build hosts a single Nexsate site. Regional content can be added here as additional markets are confirmed.',
        ],
        list: ['nexsate.com — global'],
      },
    ],
    related: ['contact-us'],
  },
  {
    slug: 'help-and-faq',
    title: 'Help and FAQ',
    eyebrow: support,
    intro:
      'Common questions about working with Nexsate, answered as plainly as we answer them in person.',
    sections: [
      {
        heading: 'How we work',
        body: [
          'We begin by understanding your business, your people, your systems, and the technology challenges affecting daily operations. From there, we assess your environment, plan the right approach, provide support, and recommend improvements that align with your goals, budget, and growth plans.',
        ],
      },
      {
        heading: 'Frequently asked questions',
        items: [
          {
            title: 'Do we have to replace everything?',
            text: 'No. Nexsate focuses on improvements that create the most immediate value rather than replacing everything at once. Often the biggest gains come from better configuration, clearer processes, stronger support and smarter use of the tools you already have.',
          },
          {
            title: 'How is pricing structured?',
            text: 'Plan your IT spending with fixed monthly support based on the service level, users, systems and support needs of your business.',
          },
          {
            title: 'Do you provide on-site support?',
            text: 'Yes. Our local service technicians can be on-site when hands-on support is needed for installations, maintenance, hardware setup, software support, cabling and network-related work — in the office, warehouse, yard or on site.',
          },
          {
            title: 'Do you support Microsoft 365?',
            text: 'Yes. We manage Microsoft 365 users, email, Teams, SharePoint, OneDrive, licences, permissions and security settings, and coordinate Microsoft 365 backup for email, OneDrive, SharePoint and Teams.',
          },
          {
            title: 'Can you work with our existing tools?',
            text: 'Yes. We review your current systems first and build around how your business actually operates, including ERP, CRM and line-of-business applications you already own.',
          },
        ],
      },
    ],
    related: ['contact-us', 'about-us', 'our-process'],
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    eyebrow: legal,
    intro: 'How Nexsate handles information provided through this website.',
    sections: [
      {
        heading: 'Information we collect',
        body: [
          'This website is a front-end demonstration build. No accounts are created, no contact form submissions are transmitted, and no analytics or advertising trackers are embedded. If you contact Nexsate through the details published on this site, information you provide is used only to respond to your enquiry.',
        ],
      },
      {
        heading: 'How we protect information',
        body: [
          'Protecting client data with a security-first mindset is one of our core values. Client information is handled confidentially, is not shared with third parties, and is retained only for as long as it is needed to respond to an enquiry or deliver agreed work.',
        ],
      },
      {
        heading: 'Your choices',
        body: [
          'You can ask us at any time what information we hold about you, request its correction, or ask for it to be deleted. Contact details for Nexsate are published on the contact page.',
        ],
      },
    ],
    related: ['contact-us', 'cookie-policy', 'terms-conditions'],
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie policy',
    eyebrow: legal,
    intro: 'What this website stores on your device.',
    sections: [
      {
        heading: 'Cookies in use',
        body: [
          'This site does not use cookies to track you, and it embeds no third-party analytics or advertising scripts. Any browser storage is limited to what is needed for the site to function in the browser you are using.',
        ],
      },
      {
        heading: 'Managing cookies',
        body: [
          'You can clear or block cookies through your browser settings at any time. Because the site does not rely on cookies for tracking, blocking them will not prevent you from reading the content.',
        ],
      },
    ],
    related: ['privacy-policy', 'terms-conditions'],
  },
  {
    slug: 'terms-conditions',
    title: 'Terms & Conditions',
    eyebrow: legal,
    intro: 'The terms that apply to your use of this website.',
    sections: [
      {
        heading: 'Use of this site',
        body: [
          'This website is published by Nexsate Technologies as an information resource about our services, industries and approach. Content is provided for general information. It does not constitute a quote, a contract for services, or technical advice tailored to your specific environment.',
        ],
      },
      {
        heading: 'Accuracy of information',
        body: [
          'We work to keep the information on this site accurate and current, but service scope, availability and platform support can change. Where exact scope, pricing or timings matter, please speak to us directly and we will confirm them in writing.',
        ],
      },
      {
        heading: 'Intellectual property',
        body: [
          'The Nexsate name, logo and site content belong to Nexsate Technologies. You may reference and link to this site; please do not reproduce the branding or substantial content without permission.',
        ],
      },
    ],
    related: ['privacy-policy', 'cookie-policy', 'contact-us'],
  },
]
