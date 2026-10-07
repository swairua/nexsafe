// Client Support page — ported from nexsate.com/client-support/.
const eyebrow = 'Support'

export const clientSupportPages = [
  {
    slug: 'client-support',
    title: 'Client Support',
    eyebrow,
    intro: 'How to get help, open a ticket, and reach the Nexsate support team.',
    sections: [
      {
        heading: 'How to reach us',
        body: [
          'Existing clients can reach the support desk by phone, email, or through the support portal. We prioritise response by impact: a significant service outage receives a faster response than a routine request.',
        ],
        list: [
          'Phone: 1-825-570-4550',
          'Email: service@nexsate.com',
          'Support hours: Monday – Friday, 8:00 AM – 6:00 PM MT',
          'Emergency after-hours support available for managed clients',
        ],
      },
      {
        heading: 'What to expect',
        body: [
          'We track every request, assign ownership, and follow up until the issue is resolved. Complex incidents are escalated through our service co-ordinator so you always have a clear point of contact.',
        ],
      },
      {
        heading: 'Self-service options',
        body: [
          'Many clients use self-service password reset and remote access tools. If you are locked out or need access restored, the support desk can guide you through the fastest path.',
        ],
      },
    ],
    related: ['help-and-faq', 'contact-us', 'managed-it-services'],
  },
]
