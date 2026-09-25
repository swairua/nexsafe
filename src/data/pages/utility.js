// Legal and utility pages (eyebrow: Legal / Support / nexsate.com).
export const utilityPages = [
  {
    slug: 'privacy-policy',
    title: 'Privacy policy',
    eyebrow: 'Legal',
    intro:
      'How nexsate.com collects, uses and protects personal data — written to be read, not just displayed.',
    sections: [
      {
        heading: 'What we collect',
        body: [
          'When you contact us or use this site we may process contact details, correspondence and basic usage data such as pages visited and cookie preferences. Client data handled inside our service platform is governed by your services agreement, not this policy.',
        ],
      },
      {
        heading: 'Your choices',
        list: [
          'Access, correction or deletion of your personal data',
          'Objection to marketing communications at any time',
          'Cookie preferences via your browser or our consent banner',
          'Complaints to your local data protection authority',
        ],
      },
    ],
    related: ['cookie-policy', 'data-protection', 'terms-of-use'],
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie policy',
    eyebrow: 'Legal',
    intro:
      'The cookies and similar technologies used on nexsate.com, and how to control them.',
    sections: [
      {
        heading: 'How we use cookies',
        body: [
          'Essential cookies keep the site working (for example remembering your consent choice). Analytics cookies help us understand which pages help visitors most. You can accept all, or continue with essentials only — the site works either way.',
        ],
      },
      {
        heading: 'Controlling cookies',
        list: [
          'Browser settings let you block or delete cookies',
          'Clearing storage will re-show our consent banner',
          'Advertising cookies are not used on this site',
          'Questions: hello@nexsate.com',
        ],
      },
    ],
    related: ['privacy-policy', 'terms-of-use', 'accessibility'],
  },
  {
    slug: 'terms-of-use',
    title: 'Terms of use',
    eyebrow: 'Legal',
    intro:
      'The ground rules for using nexsate.com and the content published here.',
    sections: [
      {
        heading: 'Using this site',
        body: [
          'Content is provided for general information. You may link to it and quote it with attribution; you may not scrape it at scale, republish it as your own, or use the site to introduce malware or overload it with automated traffic.',
        ],
      },
      {
        heading: 'Good to know',
        list: [
          'Product and service details may change without notice',
          'External links are provided for convenience, not endorsement',
          'Liability for reliance on general site content is limited where law allows',
          'These terms are governed by the laws of our registered jurisdiction',
        ],
      },
    ],
    related: ['privacy-policy', 'cookie-policy', 'accessibility'],
  },
  {
    slug: 'accessibility',
    title: 'Accessibility',
    eyebrow: 'Legal',
    intro:
      'nexsate.com aims to be usable by everyone — including people who browse with assistive technology.',
    sections: [
      {
        heading: 'Our commitment',
        body: [
          'We target WCAG 2.2 AA across this site: semantic structure, keyboard access, visible focus states, sufficient contrast and text that reflows on small screens. We test with automated tooling and screen readers, and review key journeys manually.',
        ],
      },
      {
        heading: 'If something does not work',
        list: [
          'Tell us the page, the problem and what you expected',
          'Email hello@nexsate.com — accessibility reports get priority',
          'We acknowledge within five business days',
          'Workarounds are offered while fixes are scheduled',
        ],
      },
    ],
    related: ['report-an-issue-with-our-website', 'privacy-policy', 'contact-us'],
  },
  {
    slug: 'phishing-and-scam-alerts',
    title: 'Phishing and scam alerts',
    eyebrow: 'Support',
    intro:
      'How to spot attempts to impersonate nexsate — and how to report them before someone clicks.',
    sections: [
      {
        heading: 'Recognising an attempt',
        body: [
          'Attackers spoof sender addresses, clone login pages and pressure you with urgency. nexsate will never ask for passwords by email or phone, and invoices always come from the details on your contract — not a fresh bank account.',
        ],
      },
      {
        heading: 'If you receive something suspicious',
        list: [
          'Do not click links or open attachments',
          'Check the sending domain character by character',
          'Forward the message to hello@nexsate.com',
          'Report it in your mail client to train filtering',
          'If you clicked, call the service desk immediately',
        ],
      },
    ],
    related: ['cyber-security', 'tips-to-make-your-workforce-a-security-front-line', 'data-protection'],
  },
  {
    slug: 'change-country',
    title: 'Change country',
    eyebrow: 'Support',
    intro:
      'nexsate serves clients internationally — pick your region for local contact details and coverage.',
    sections: [
      {
        heading: 'Regional presence',
        body: [
          'Our service desk follows the sun across regional hubs, with field engineers available for on-site work in each market we serve. Contact details, hours and language options vary by region — use the selector in the header or email hello@nexsate.com and we will route you.',
        ],
      },
      {
        heading: 'What follows your choice',
        list: [
          'Local contact numbers and office details',
          'Coverage hours in your time zone',
          'Pricing and contracting in local currency where applicable',
          'Data-residency options for regulated workloads',
        ],
      },
    ],
    related: ['locations', 'contact-us', 'support-coverage-and-hours'],
  },
  {
    slug: 'supplier-code-of-conduct',
    title: 'Supplier code of conduct',
    eyebrow: 'Legal',
    intro:
      'The standards our suppliers meet when they work with, or on behalf of, nexsate.',
    sections: [
      {
        heading: 'What we expect',
        body: [
          'Suppliers share our commitments to lawful, ethical and secure operations. We assess critical suppliers against this code during onboarding and review performance annually, reserving the right to end engagements that fall short.',
        ],
      },
      {
        heading: 'Core requirements',
        list: [
          'Compliance with applicable laws and labour standards',
          'Information security and confidentiality safeguards',
          'Prompt disclosure of incidents affecting our clients',
          'Anti-bribery and transparent dealings',
          'Environmental responsibility in operations and logistics',
        ],
      },
    ],
    related: ['terms-of-use', 'partner-ecosystem', 'data-protection'],
  },
  {
    slug: 'sitemap',
    title: 'Sitemap',
    eyebrow: 'nexsate.com',
    intro:
      'Every page on nexsate.com in one place — start here if you know what you want but not where it lives.',
    sections: [
      {
        heading: 'Browse by section',
        list: [
          'Company — about, values, leadership, careers, contact',
          'IT solutions — managed IT, cloud, security, pricing',
          'Industries — banking to government, vertical by vertical',
          'Insights — case studies, blog, alerts and media',
          'Support — help, service status, legal and policies',
        ],
      },
      {
        heading: 'Fast routes',
        body: [
          'Use the header search for titles you remember, or the menus for browsing. Support issues are fastest through the support centre; sales questions go to hello@nexsate.com.',
        ],
      },
    ],
    related: ['about-nexsate', 'it-services', 'help-and-faq', 'contact-us'],
  },
  {
    slug: 'open-source-licenses',
    title: 'Open source licenses',
    eyebrow: 'Legal',
    intro:
      'Attribution for the open-source software used to build and run nexsate.com.',
    sections: [
      {
        heading: 'With thanks',
        body: [
          'This site is built with React, Vite and Tailwind CSS, with interface components and tooling drawn from the open-source ecosystem. Each dependency remains under its original license; full texts ship with our build artefacts and are available on request.',
        ],
      },
      {
        heading: 'Notices',
        list: [
          'React and Vite — MIT License',
          'Tailwind CSS — MIT License',
          'Embla Carousel — MIT License',
          'Icons drawn from open SVG sets with attribution retained',
        ],
      },
    ],
    related: ['terms-of-use', 'privacy-policy', 'sitemap'],
  },
]
