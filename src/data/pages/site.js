// Contact + FAQ + legal pages — the non-editorial routes the header, footer and
// CTA buttons link to.
//
// The Contact and FAQ pages are ported from nexsate.com/contact/ and
// nexsate.com/faq/: the wording, the contact details and the questions/answers
// are the source site's own. The legal pages keep their existing plain copy.
const support = 'Support'
const legal = 'Legal'

export const sitePages = [
  {
    slug: 'contact-us',
    title: 'Contact',
    eyebrow: support,
    intro: 'We’re here to help',
    // Hero image carried over from the source Contact page.
    image: {
      src: '/uploads/contact-hero.jpg',
      alt: 'Support consultant on a call in a modern office',
    },
    sections: [
      {
        heading: 'Get in touch',
        list: [
          'Call us at: 1-825-570-4550',
          'Email us: service@nexsate.com',
          'Schedule a free consultation',
        ],
      },
      {
        heading: 'Our locations',
        body: [
          'We have offices in Alberta, Edmonton — we’d love to show you around sometime. Don’t see an office in your area? We have the power to support your business, no matter the location.',
        ],
      },
      {
        heading: 'What happens next',
        body: [
          'Every engagement starts the same way — no pressure, no obligation:',
        ],
        list: [
          'We schedule a call at your convenience',
          'We hold a discovery and consulting meeting',
          'We prepare a proposal',
        ],
      },
      {
        heading: 'Your benefits',
        body: [
          'Working with Nexsate means a partner that is:',
        ],
        list: [
          'Client-oriented',
          'Independent',
          'Competent',
          'Results-driven',
          'Problem-solving',
          'Transparent',
        ],
      },
    ],
    related: ['services-solutions', 'help-and-faq', 'about-us'],
  },
{
    slug: 'help-and-faq',
    title: 'FAQ',
    eyebrow: support,
    intro:
      'Common questions about working with Nexsate, answered as plainly as we answer them in person.',
    sections: [
      {
        heading: 'Our services',
        // Questions and answers as published on nexsate.com/faq/. Answers that
        // are a list on the source site keep their list here.
        items: [
          {
            title: 'What are your two primary services?',
            text: '<p>Fully Managed IT Services – Nexsate monitors, manages, supports, and secures all IT systems and users for a fixed and predictable monthly fee.</p><p>Co-Managed IT Services – We support internal IT as an extension of your team. This role includes patching, repetitive tasks, one-off services, and special projects. We handle the backend while in-house IT manages everything else.</p>',
          },
          {
            title: 'What other services do you offer?',
            text: '<ul><li>Cybersecurity</li><li>IT Consulting</li><li>Cloud Services</li><li>Network Connectivity (ISP Services)</li></ul>',
          },
        ],
      },
      {
        heading: 'What is included',
        items: [
          {
            title: 'What business problems do you solve?',
            text: '<p>By leading with IT strategy and compliance guidance, Nexsate fills two major gaps in the IT provider industry. This expertise helps clients:</p><ul><li>Save time, money, and increase profitability.</li><li>Reduce employee frustration and improve team morale.</li><li>Solidify defenses against data breaches, ransomware attacks, and legal exposure.</li><li>Lower cybersecurity and compliance risk</li></ul>',
          },
          {
            title: 'What are your core services?',
            text: '<p>Core Services are fixed, baseline foundational resources included in every Fully Managed IT Service Level Agreement.</p><ul><li>vCIO – Strategic direction, budgeting, planning, and consulting services with account reviews and IT roadmaps to advance your digital transformation.</li><li>Managed Services Concierge – Your point of contact for all account details. This trusted advisor is the quarterback between your vCIO and the service team, managing questions about IT services, invoices, and every piece of business enabling technology that supports decision making, collaboration, productivity, compliance, business continuity, security, and efficiency.</li><li>Client Management Tools – Professional Services Automation, Ticketing, CRM, Remote Management and Monitoring, Documentation, Communication, Notification, and Data Privacy.</li><li>Vendor Technical Assistance – We interact directly with your other technology vendors for incident remediation, opening tickets, escalating requests, or working to resolve incidents within your IT environment. We will also answer basic questions about your environment or provide access to systems the vendor has requested when approved by the client, such as allocating IP addresses for a copier, a security camera vendor or allowing network traffic for a vendor’s service. This assistance covers hardware manufacturers, software development firms, cloud service providers, ISPs, telecommunication brokers, printer and copier companies, and local couriers.</li><li>Procurement Services – Nexsate sources products exclusively from authorized channels and recommends business-class solutions. We also identify configuration options, ensure proper registration, manage licensing and warranties, and guarantee that all products are genuine.</li><li>Network Management – Monitoring, Administration, Reporting, Domain Name, and SSL Certificate Management, Remote Incident Remediation, and On-site Incident Remediation.</li></ul><p>If a client has more than one location – with expanded Network Management &amp; Vendor Technical Assistance requirements – additional Core Services charges will apply.</p>',
          },
        ],
      },
      {
        heading: 'How we work',
        items: [
          {
            title: 'How are you different?',
            text: '<p>Nexsate selectively partners with growing organizations that like applying strategy and budgets to a proven IT process based on standards and best practices – to improve performance and lower risk.</p><p>Nexsate creates and maintains powerful, quiet, and secure IT systems by actively engaging and advising our clients in regularly scheduled Strategic Business Reviews with a vCIO.</p><p>Most Nexsate locations limit new client onboardings to two per month. This approach allows us to institute comprehensive, data-driven quality controls – on the front end – which create increasing operating leverage for our clients throughout the lifetime of the relationship.</p>',
          },
          {
            title: 'How do you maximize responsiveness?',
            text: '<p>Nexsate is responsive by design. We partner with organizations that appreciate the value of following a standards-based approach to inform the architecture and lifecycle management of their IT systems.</p><p>This alignment allows clients to enjoy business optimizing technology that doesn’t require constant, reactive, emergency intervention – so they have more time to focus on growing their business.</p><p>We give users direct access to support, which eliminates bottlenecks and allows us to collect data and insights to identify training gaps and recommend system improvements.</p><p>Our Service Level Agreement prioritizes client matters and response times by P1, P2, P3, and P4. A significant server or cloud application outage is a P1.</p><p>Assisting with a password reset is a P4. Good news: we can set you up with a self-serve password solution, so you don’t have to open a ticket.</p><p>The outcome is similar to the concept of compound interest. When you invest in the process over time, both quality of service and responsiveness accrue. Failure to invest (or starting late) makes it impossible to catch up.</p>',
          },
        ],
      },
      {
        heading: 'Who we help',
        items: [
          {
            title: 'What is your industry focus?',
            text: '<p>Operationally mature organizations in the following verticals:</p><ul><li>Professional Services</li><li>CPA</li><li>Legal</li><li>Finance</li><li>Insurance</li><li>Real Estate</li><li>Consulting</li><li>Manufacturing</li><li>Healthcare</li><li>Nonprofit</li></ul>',
          },
        ],
      },
    ],
    related: ['contact-us', 'about-us', 'services-solutions'],
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
