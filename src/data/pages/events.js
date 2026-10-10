const eyebrow = 'Company'

export const eventPages = [
  {
    slug: 'events',
    title: 'Events',
    eyebrow,
    intro: 'Upcoming webinars, workshops, and community events where the Nexsate team shares practical IT guidance.',
    sections: [
      {
        heading: 'Upcoming events',
        body: [
          'We regularly host free webinars and local workshops on managed IT, cybersecurity, cloud adoption, and digital transformation. Check back for new dates and topics.',
        ],
        list: [
          'Managed IT best practices for growing businesses',
          'Cybersecurity readiness: practical controls for small and mid-market teams',
          'Cloud migration without disrupting daily operations',
          'Automation and AI-supported workflows for everyday business',
        ],
      },
      {
        heading: 'Past events',
        body: [
          'Recent sessions have covered IT strategy, backup and recovery planning, Microsoft 365 optimisation, and vendor management for technology teams.',
        ],
      },
    ],
    related: ['blog', 'about-us', 'contact-us'],
  },
]
