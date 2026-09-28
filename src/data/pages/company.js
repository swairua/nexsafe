// Company pages — copy taken from the client-supplied "About US.docx".
// That document is one continuous narrative, so its headings are split across
// pages that mirror the document's own structure. Nothing here is filler copy.
const eyebrow = 'Company'

export const companyPages = [
  {
    slug: 'about-us',
    title: 'About Us',
    eyebrow,
    intro:
      'Nexsate’s underlying principle is simple: EnableIT. Transform. Empower.',
    sections: [
      {
        heading: 'Commitment to delivering excellence',
        body: [
          'This foundation has continued to inspire our raison d’être since 2016, when the vision was first shaped by our Founder. Our believe is technology should make business easier, safer, and more productive. Our role is to help organizations reduce downtime, strengthen security, improve connectivity, support users, and create a more reliable technology environment for daily operations and future growth.',
        ],
      },
      {
        heading: 'Your trusted IT Partner. Earned through service.',
        body: [
          'At Nexsate, our strength is built on people, guided by purpose, and delivered through process. We combine technical expertise, honest guidance, and responsive partnership to help businesses work better, stay supported, and move forward with confidence.',
        ],
      },
      {
        heading: 'Why Us',
        body: [
          'Nexsate is more than a service provider. We partner with you to transform and empower your business with the right technology, resources, and expertise. Through our pool of specialists across various technology stacks, we provide proactive and responsive support that helps reduce disruption, simplify operations, improve efficiency, strengthen security, and deliver dependable guidance for long-term growth.',
        ],
      },
    ],
    related: ['our-mission', 'core-values', 'our-process', 'services-solutions'],
  },
  {
    slug: 'our-mission',
    title: 'Our Mission',
    eyebrow,
    intro:
      'Our mission is to deliver reliable, responsive, and secure IT, software, and telecommunications solutions.',
    sections: [
      {
        heading: 'Our mission',
        body: [
          'Our mission is to deliver reliable, responsive, and secure IT, software, and telecommunications solutions that help businesses improve operations, strengthen security, enhance connectivity, reduce disruption, and move forward with confidence.',
        ],
      },
      {
        heading: 'Community impact',
        body: [
          'We are committed to being more than a service provider. Our goal is to be a trusted technology partner that helps businesses grow sustainably. Beyond the services we deliver, we aim to nurture talent by providing meaningful work experience and creating pathways for young professionals and individuals interested in building careers in IT.',
          'We believe that strengthening the technology foundation of local organizations contributes to stronger businesses, better service delivery, more opportunities, and a more connected community.',
        ],
      },
      {
        heading: 'Our purpose',
        body: [
          'Our purpose is to help businesses use technology with clarity, confidence, and measurable value. Guided by our principle - EnableIT. Transform. Empower. - we work to reduce complexity, strengthen operations, and empower people to do their best work.',
        ],
      },
    ],
    related: ['about-us', 'core-values', 'our-people'],
  },
  {
    slug: 'core-values',
    title: 'Core Values',
    eyebrow,
    intro:
      'Integrity, dependability, customer focus and continuous improvement — the four principles behind every engagement.',
    sections: [
      {
        heading: 'Integrity & Trust (Integrity)',
        body: [
          'We believe trust is earned through honesty, transparency, and responsible action. Nexsate communicates clearly about system issues, pricing, project timelines, and service expectations. We protect client data with a security-first mindset and provide recommendations based on what each business truly needs, not what is most profitable.',
        ],
      },
      {
        heading: 'Responsible & Reliable (Dependable)',
        body: [
          'We take ownership of the outcomes we deliver. When issues arise, we focus on resolving them quickly, professionally, and without shifting responsibility. Our team is committed to meeting service commitments, learning from challenges, improving internal processes, and reducing recurring problems for our clients.',
        ],
      },
      {
        heading: 'Client-Focused Support (Customer-Centric)',
        body: [
          'Technology support should make work easier, not more frustrating. We take time to understand each client’s operations, challenges, and priorities so we can provide patient, practical, and responsive support. Our goal is to empower clients, streamline daily work, and prevent disruptions before they affect the business.',
        ],
      },
      {
        heading: 'Continuous Improvement (Innovative)',
        body: [
          'Technology is always changing, and businesses need a partner that can adapt with them. Nexsate stays current with emerging tools, cloud solutions, cybersecurity trends, automation, and AI-supported technologies. We help clients modernize outdated processes, improve efficiency, and embrace smarter ways of working.',
        ],
      },
    ],
    related: ['about-us', 'our-mission', 'our-process'],
  },
  {
    slug: 'our-people',
    title: 'Our People',
    eyebrow,
    intro:
      'Our people are the heart of Nexsate — skilled, service-focused professionals who care about your business.',
    sections: [
      {
        heading: 'Our people',
        body: [
          'Our people are the heart of Nexsate. From account managers to technicians, we bring together skilled, service-focused professionals who care about your business, listen to your needs, and work with commitment to support your success.',
        ],
      },
      {
        heading: 'Our purpose',
        body: [
          'Our purpose is to help businesses use technology with clarity, confidence, and measurable value. Guided by our principle - EnableIT. Transform. Empower. - we work to reduce complexity, strengthen operations, and empower people to do their best work.',
        ],
      },
    ],
    related: ['about-us', 'our-mission', 'our-process'],
  },
  {
    slug: 'our-process',
    title: 'Our Process',
    eyebrow,
    intro:
      'Our process is simple: understand first, deliver clearly, and keep improving as your business grows.',
    sections: [
      {
        heading: 'How we do it',
        body: [
          'Our process starts with understanding your business. We assess your needs, recommend the right approach, deliver with care, and continue improving your technology environment as your business grows.',
          'We begin by understanding your business, your people, your systems, and the technology challenges affecting daily operations. From there, we assess your environment, plan the right approach, provide support, and recommend improvements that align with your goals, budget, and growth plans.',
          'Our focus is to make technology easier to manage, more effective for your business, and ready to support long-term growth.',
        ],
      },
      {
        heading: 'What that looks like',
        items: [
          {
            title: 'Understand',
            text: 'We assess your business, your people, your systems, and the technology challenges affecting daily operations.',
          },
          {
            title: 'Plan',
            text: 'We plan the right approach around your goals, budget, and growth plans.',
          },
          {
            title: 'Deliver',
            text: 'We provide support and recommend improvements that align with the way your business works.',
          },
          {
            title: 'Improve',
            text: 'We continue improving your technology environment as your business grows.',
          },
        ],
      },
    ],
    related: ['about-us', 'core-values', 'managed-it-services'],
  },
]
