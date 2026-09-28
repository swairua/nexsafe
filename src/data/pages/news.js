// Insights pages: case studies, blog posts, subscriptions and media (eyebrow: Insights).
const eyebrow = 'Insights'

export const newsPages = [
  {
    slug: 'case-studies',
    title: 'Case studies',
    eyebrow,
    intro:
      'Real engagements, real constraints, real numbers — how nexsate clients cut cost, risk and downtime.',
    sections: [
      {
        heading: 'Proof, not promises',
        body: [
          'Each case study documents the starting point, the approach and the measured outcome: migrations completed over weekends, audits passed first time, support bills flattened. Names are changed where clients prefer; numbers are not.',
        ],
      },
      {
        heading: 'Browse by theme',
        list: [
          'Cloud and cost optimisation',
          'Security and compliance programmes',
          'Service desk transformation',
          'Resilience and disaster recovery',
        ],
      },
    ],
    related: ['cloud-migration-saves-money-for-health-insurer', 'remote-support-centre-for-semiconductor-provider', 'subscription-licensing-unlocks-spike-in-it-orders', 'it-blog'],
  },
  {
    slug: 'cloud-migration-saves-money-for-health-insurer',
    title: 'Cloud migration saves money for health insurer',
    eyebrow,
    intro:
      'How a mid-sized insurer moved core workloads off ageing hardware and cut infrastructure spend by a third.',
    sections: [
      {
        heading: 'The challenge',
        body: [
          'A health insurer ran its policy platform on end-of-support servers in a single data centre. Renewals were at risk, DR was untested, and capital refreshes ate the IT budget every three years.',
        ],
      },
      {
        heading: 'What we did',
        list: [
          'Mapped dependencies and staged a weekend-by-weekend migration plan',
          'Rebuilt the platform in cloud landing zones with cost guardrails',
          'Replaced tape backup with automated, tested snapshots',
          'Trained internal staff on the new operating model',
        ],
      },
      {
        heading: 'The outcome',
        body: [
          'Infrastructure spend fell by roughly a third in year one, recovery objectives dropped from days to hours, and the audit that followed closed with no findings.',
        ],
      },
    ],
    related: ['cloud-services', 'case-studies', 'insurance', 'data-protection-disaster-recovery'],
  },
  {
    slug: 'remote-support-centre-for-semiconductor-provider',
    title: 'Remote support centre for semiconductor provider',
    eyebrow,
    intro:
      'Unifying three regional helpdesks into one 24/7 remote support centre — without interrupting the fab.',
    sections: [
      {
        heading: 'The challenge',
        body: [
          'A semiconductor supplier supported its sites through three separate local teams with different tools, no common reporting and no night coverage. Mean time to resolve had crept past a working day.',
        ],
      },
      {
        heading: 'What we did',
        list: [
          'Consolidated tooling into a single monitoring and ticketing stack',
          'Stood up a follow-the-sun support desk with clear escalation',
          'Documented critical systems and built runbooks with site engineers',
          'Introduced monthly service reviews with site leadership',
        ],
      },
      {
        heading: 'The outcome',
        body: [
          'First response dropped to minutes, resolution times halved, and sites gained a single number to call — with the fab floor never seeing a planned outage slip.',
        ],
      },
    ],
    related: ['support-centre', 'managed-it-services', 'enterprise-technology', 'case-studies'],
  },
  {
    slug: 'subscription-licensing-unlocks-spike-in-it-orders',
    title: 'Subscription licensing unlocks spike in IT orders',
    eyebrow,
    intro:
      'When headcount doubled overnight, flexible licensing kept every new joiner productive on day one.',
    sections: [
      {
        heading: 'The challenge',
        body: [
          'A fast-growing manufacturer won a large contract and needed 150 extra users equipped and licensed within three weeks — a spike their perpetual licensing model could never absorb.',
        ],
      },
      {
        heading: 'What we did',
        list: [
          'Right-sized subscription licenses to actual usage',
          'Pre-staged devices with golden images for day-one handover',
          'Set automated true-up alerts to avoid over-licensing later',
          'Documented a repeatable onboarding runbook',
        ],
      },
      {
        heading: 'The outcome',
        body: [
          'All users were productive on day one, costs tracked headcount instead of estimates, and the same playbook now handles every cohort that follows.',
        ],
      },
    ],
    related: ['software-licensing', 'onboarding-and-migration', 'manufacturing', 'case-studies'],
  },
  {
    slug: 'it-blog',
    title: 'IT blog',
    eyebrow,
    intro:
      'Practical notes from the service desk and security team — written for people who run businesses, not just basements.',
    sections: [
      {
        heading: 'What we write about',
        body: [
          'Short, useful pieces on the things that actually move the needle: patching routines, backup discipline, security habits, smarter licensing and choosing partners. No vendor fluff, no 1,000-word intros.',
        ],
      },
      {
        heading: 'Latest posts',
        list: [
          'Partnering with IT provider helps erie manufacturing company thrive in 21st century',
          'Improving lives with technology – HSE lighthouse project',
          'Dynamics 365: a game changer for dairygold operations',
          'Tips to make your workforce a security front line',
          '4 ways compsec pros protect their computers',
        ],
      },
    ],
    related: ['case-studies', 'email-alerts', 'choosing-a-managed-it-partner'],
  },
  {
    slug: 'patch-management-for-busy-teams',
    title: 'Patch management for busy teams',
    eyebrow,
    intro:
      'Unpatched systems are the easiest door left open. Here is how to close it without pausing the business.',
    sections: [
      {
        heading: 'Why it slips',
        body: [
          'Patching fails when it is manual, unplanned or invisible: someone forgets a server, a reboot lands mid-shift, and nobody notices the gap until an exploit does. The fix is a routine, not heroics.',
        ],
      },
      {
        heading: 'A routine that works',
        list: [
          'Inventory everything with an operating system',
          'Group devices by risk and business hours',
          'Schedule windows with automatic verification',
          'Report exceptions weekly — no silent drift',
          'Pair patches with vulnerability scans to prove coverage',
        ],
      },
    ],
    related: ['cybersecurity', 'managed-it-services', 'it-blog'],
  },
  {
    slug: 'tips-to-make-your-workforce-a-security-front-line',
    title: 'Tips to make your workforce a security front line',
    eyebrow,
    intro:
      'Cyber security is something that is constantly on our mind here at nexsate. This is because, according to Bloomberg, cyber security related issues costs companies around $400 Billion a year on average.',
    sections: [
      {
        heading: 'Why the workforce matters',
        body: [
          'One of the easiest ways to curb these losses in your business is to train your employees to create a more secure email environment.',
          'Staff plays a crucial part in the security of your company, and employees who are unaware of the onslaught of cyber threats are a liability to the safety of your company’s data.',
          'It is therefore of utmost importance that they are always up-to-date on the best procedures to keep the company safe.',
          'In an effort to save you and your company from the horrors of a cyber-attack, here is a list of tips that help safeguard your business.',
        ],
      },
      {
        heading: 'Email rules that help safeguard your business',
        list: [
          'Never open links or attachments from unknown persons.',
          'Don’t respond to emails that request a password change and require you to divulge personal information — no matter how official the source appears.',
          'Ensure antivirus and anti-spy software is updated on your computer.',
          'Encrypt any emails containing sensitive data before sending.',
          'Don’t use your company email address to send and receive personal emails.',
          'Don’t automatically forward company emails to a third-party email system.',
        ],
      },
      {
        heading: 'Create strict standards for company-related Mobile Device usage',
        body: [
          'Mobile Devices have become an important tool of the workforce, and with them comes another wave of cyber threats.',
          'Making sure your employees have password-protected devices, encrypt emails, and download approved security applications to help keep the mobile data safe is very important.',
          'nexsate offers Mobile Device Management that will help with many of these safety features, including the ability to remotely wipe mobile devices.',
          'Contact us for all your security or Office 365 needs.',
        ],
      },
    ],
    related: ['cybersecurity', 'phishing-and-scam-alerts', 'training-and-enablement', 'it-blog'],
  },
  {
    slug: 'cloud-backup-done-right',
    title: 'Cloud backup done right',
    eyebrow,
    intro:
      'Copying data to the cloud is easy. Getting it back at 2 a.m. during an incident is the part that matters.',
    sections: [
      {
        heading: 'Beyond "it is in the cloud"',
        body: [
          'Real backup means immutability, separation and proof. Ransomware reaches into connected accounts, so copies need to be locked, monitored and restored on a schedule you have actually tested.',
        ],
      },
      {
        heading: 'Checklist',
        list: [
          'Immutable or air-gapped copies of critical data',
          'Retention aligned to compliance needs',
          'Alerting on failed jobs within the hour',
          'Documented, timed restore tests each quarter',
          'Encryption in transit and at rest',
        ],
      },
    ],
    related: ['data-protection-disaster-recovery', 'cybersecurity', 'it-blog'],
  },
  {
    slug: 'choosing-a-managed-it-partner',
    title: 'Choosing a managed IT partner',
    eyebrow,
    intro:
      'The questions that separate a real partner from a ticket queue — ask them before you sign.',
    sections: [
      {
        heading: 'What to look for',
        body: [
          'References in your industry, engineers who will meet you, and reporting you can read. Ask who answers at 2 a.m., how many clients each engineer carries, and what happens when they miss a target. Vague answers are answers.',
        ],
      },
      {
        heading: 'Ten questions worth asking',
        list: [
          'What are your published response times, and can clients see them?',
          'Who owns our account day to day?',
          'How do you handle out-of-hours escalations?',
          'Is security included or priced later?',
          'What does onboarding actually cost and take?',
        ],
      },
    ],
    related: ['managed-it-services', 'why-choose-us', 'service-level-agreements', 'it-blog'],
  },
  {
    slug: 'five-signs-it-is-time-to-upgrade-your-hardware',
    title: 'Five signs it is time to upgrade your hardware',
    eyebrow,
    intro:
      'Ageing machines rarely fail all at once — they warn you first. Here is what to watch for.',
    sections: [
      {
        heading: 'The warning signs',
        list: [
          'Boot times and patch cycles keep stretching',
          'Vendor support and security updates have ended',
          'Unexplained crashes, especially after restarts',
          'Repair costs approaching replacement cost',
          'Devices no longer meet application requirements',
        ],
      },
      {
        heading: 'What to do next',
        body: [
          'Inventory what you have, model a refresh on a sensible lifecycle — typically three to five years for workstations — and plan replacements in waves instead of emergencies. A planned refresh is always cheaper than a forced one.',
        ],
      },
    ],
    related: ['managed-it-services', 'software-integration', 'it-blog'],
  },
  {
    slug: 'what-zero-trust-means-for-small-business',
    title: 'What zero trust means for small business',
    eyebrow,
    intro:
      'It is not a product you buy. It is a habit: verify everything, grant little, review often.',
    sections: [
      {
        heading: 'Zero trust in practice',
        body: [
          'For smaller organisations, zero trust starts with identity: multi-factor everywhere, conditional access by device and location, and least privilege on files and admin tools. Each step reduces blast radius without slowing people down.',
        ],
      },
      {
        heading: 'A pragmatic sequence',
        list: [
          'Enforce multi-factor authentication across the business',
          'Segment who can reach what — including admin systems',
          'Check device health before granting access',
          'Log and review privileged activity',
          'Revoke access automatically when someone leaves',
        ],
      },
    ],
    related: ['cybersecurity', 'managed-accounts', 'data-protection', 'it-blog'],
  },
  {
    slug: 'email-alerts',
    title: 'Email alerts',
    eyebrow,
    intro:
      'New posts and case studies in your inbox — a short digest, sent when there is something worth reading.',
    sections: [
      {
        heading: 'What you get',
        body: [
          'Subscribe with your email address to receive a monthly digest of blog posts and newly published case studies. We do not share subscriber lists, and every message carries a one-click unsubscribe.',
        ],
      },
      {
        heading: 'Promise',
        list: [
          'Monthly cadence — no daily blasts',
          'Content only: no third-party marketing',
          'One-click unsubscribe in every email',
          'Preferences manageable any time',
        ],
      },
    ],
    related: ['it-blog', 'case-studies', 'privacy-policy'],
  },
  {
    slug: 'media-contacts',
    title: 'Media contacts',
    eyebrow,
    intro:
      'Journalists and analysts — reach our press desk directly, without the switchboard.',
    sections: [
      {
        heading: 'Press desk',
        body: [
          'For comment, briefings or fact-checks, email the press desk with your deadline and topic. We can provide spokesperson interviews, anonymised usage statistics and background briefings on managed IT and security trends.',
        ],
      },
      {
        heading: 'Working with us',
        list: [
          'Responses within one business day, faster for deadlines',
          'Spokespeople across IT operations and security',
          'Brand assets available via the image library',
          'Client references arranged through account teams',
        ],
      },
    ],
    related: ['image-library', 'case-studies', 'about-nexsate'],
  },
  {
    slug: 'image-library',
    title: 'Image library',
    eyebrow,
    intro:
      'Logos, screenshots and photography for editorial use — current versions, clearly licensed.',
    sections: [
      {
        heading: 'What is available',
        body: [
          'The library includes the nexsate logo in light and dark variants, product screenshots and generic photography. Assets are free for editorial use with attribution; commercial use needs written permission — just ask.',
        ],
      },
      {
        heading: 'Guidelines',
        list: [
          'Keep clear space around the logo',
          'Do not recolour or stretch marks or wordmarks',
          'Caption screenshots with the product name as shown',
          'Link permissions requests to the press desk',
        ],
      },
    ],
    related: ['media-contacts', 'about-nexsate', 'careers'],
  },
  {
    slug: 'partnering-with-it-provider-helps-erie-manufacturing-company-thrive-in-21st-century',
    title: 'Partnering with IT provider helps erie manufacturing company thrive in 21st century',
    eyebrow,
    intro:
      'Berman Bedding, Inc. has been in business since 1912. But when this mattress manufacturer started producing medical pads in the 1950s, it realized the need for efficient technology solutions to keep its factories humming.',
    sections: [
      {
        heading: 'The situation',
        body: [
          'Operations have changed drastically in the last 60 years, and when Berman President Robert Unger realized he couldn’t be the company’s IT guy anymore, he called nexsate.',
        ],
      },
      {
        heading: 'The rescue',
        body: [
          'With so much at stake, they turned to nexsate to handle their IT needs. nexsate not only created detailed plan to upgrade MCMS systems, but when an old modem died over a weekend, putting in jeopardy the MCMS e-mail capabilities, it was nexsate who came to the rescue.',
        ],
      },
      {
        heading: 'In their words',
        body: [
          'As Christopher Bell from MCMS says: “I called nexsate when I was no longer good enough to be the IT guy for the company”',
          'It’s that 24 hour/7 day a week support and commitment to service that keeps the MCMS from worrying anymore about their IT.',
        ],
      },
    ],
    related: ['managed-it-services', 'case-studies', 'it-blog'],
  },
  {
    slug: 'improving-lives-with-technology-hse-lighthouse-project',
    title: 'Improving lives with technology – HSE lighthouse project',
    eyebrow,
    intro:
      'The ‘Lighthouse Projects’ are in the clinical disciplines of the chronic diseases Epilepsy, Haemophilia and Bipolar Disorder.',
    sections: [
      {
        heading: 'The partnership',
        body: [
          'The epilepsy Lighthouse project is a partnership between a number of organisations – RSCI, HSE, eHealth Ireland, Epilepsy Ireland, Beaumont Hospital and Ergo.',
          'There are many positive outcomes and benefits for patients as well as healthcare professionals associated with using information technology within health.',
        ],
      },
      {
        heading: 'The Challenge',
        body: [
          'Providing Individualised Services and Care in Epilepsy (PISCES) is a Lighthouse Project with a number of partners including HSE, eHealth Ireland, Epilepsy Ireland, RCSI and Beaumont.',
          'In the past there was no way for patients, academics or clinicians around Ireland to record their medical details electronically which created numerous problems.',
        ],
      },
      {
        heading: 'The Solution',
        body: [
          'The PISCES Project is about using technologies to promote a model of precision, proactive and personalised healthcare for the more than 40,000 people with epilepsy across Ireland.',
          'The solution developed is an Electronic Patient Record (EPR) and Patient Portal App focused exclusively on the needs of epilepsy patients. The patient portal is a mobile-first, cloud-based solution.',
          'No matter where care is delivered, information can be collected, added to the care record and accessed by the care team regardless of geographic location or care setting.',
          'The project also involves the development of a BI solution which enables clinicians to securely use aggregated patient data to analyse and gather insights for the wider patient community to inform future care and population health.',
        ],
      },
      {
        heading: 'Patient voice',
        body: [
          '“I think it definitely is a step of independence for a lot of people that don’t have that at all. They feel like they are kind of controlling in some way an illness that you can’t control at all.”',
        ],
      },
      {
        heading: 'The outcome',
        body: [
          'Clinicians now have a streamlined view of patient information through the Electronic Patient Record (EPR) – a single source of truth where all patient medical information can be recorded and accessed from anywhere nationwide.',
          'As part of the EPR, genetic data can be easily interpreted, and documenting decisions and agreed actions has been simplified.',
        ],
      },
    ],
    related: ['healthcare', 'cloud-services', 'it-blog'],
  },
  {
    slug: 'dynamics-365-a-game-changer-for-dairygold-operations',
    title: 'Dynamics 365: a game changer for dairygold operations',
    eyebrow,
    intro:
      'Located in the rich fertile Golden Valleys of Munster, Dairygold has a long and proud history of producing quality-assured, sustainable gold standard cheese and dairy ingredients.',
    sections: [
      {
        heading: 'The background',
        body: [
          'With three imperative divisions that drive and support our farmers and business, Dairygold are able to offer clients and consumers full traceability, unrivalled quality and product excellence.',
        ],
      },
      {
        heading: 'The Challenge',
        body: [
          'The central focus of a new CRM system was to allow Dairygold to improve customer and supplier relationships.',
          'The Co-Operative was previously dependent of on field staff returning to the office to file a paper-based records of customer interactions.',
        ],
      },
      {
        heading: 'The Solution',
        body: [
          'Designed and delivered by Ergo, the Customer Relationship Management (CRM) components in Microsoft Dynamics 365 were identified as the best way to meet Dairygold’s requirements and to garner a better understanding of farmers and their needs.',
          'The new CRM system provides Dairygold with relevant information in a timely manner helping to overcome some of the challenges the teams have encountered when working remotely in rural Ireland.',
          '“CRM allows us to improve the service and support we provide to our member owned and controlled supplier base. It has helped to increase customer satisfaction levels and to strengthen our relationships with farmers”',
          'Ergo’s CRM solution has allowed Dairygold to record important items of information, enabling a more enhanced service. All the information is uploaded directly by their staff from any location, solving the challenge of working with customers and suppliers in remote areas.',
        ],
      },
    ],
    related: ['enterprise-technology', 'managed-it-services', 'it-blog'],
  },
  {
    slug: '4-ways-compsec-pros-protect-their-computers',
    title: '4 ways compsec pros protect their computers',
    eyebrow,
    intro:
      'Computer and network security: Everyone knows they should be doing it better, but no one really knows all the best ways to do it.',
    sections: [
      {
        heading: 'Take online security seriously and respond quickly',
        body: [
          'News outlets were buzzing after an article published on medium.com nailed Panera Bread to the wall for failing to address a massive user data breach for eight months. That breach allowed anyone to view customers’ full names, addresses, dietary preferences, and email addresses.',
          'Their IT team didn’t fix it and their leadership didn’t handle it when it was brought to their attention. That’s not exactly the example to follow.',
          'Whether you’re speaking in terms of public relations, data security, or loss of productivity, there’s never been a more important time to take digital security seriously.',
          'You wouldn’t leave your car running in a parking lot while you went inside for half an hour, so don’t leave your (and potentially your customers’) data vulnerable online.',
        ],
      },
      {
        heading: 'Update your software — now, not later!',
        body: [
          'We were actually surprised by this consensus opinion. It’s so simple, yet, we’ve all been guilty of clicking “Remind me Later” when some program wants to update.',
          'There’s a reason that software is updating: Its team of dedicated, expert programmers have patched something. Many times, it’s a security loophole or some part of the program that allows a vulnerability into your system.',
          'With that said, do something you might never have done — read the release notes. Figure out exactly what the update intends to fix, and then head to the forums. See what other people are saying about the risks involved with the update.',
          'If you’re already behind a version, then take a moment to weigh whether or not to update to, yes, yet, another version that might also have holes. That’s what the pros do.',
          'Remember when security experts found a flaw in High Sierra? That’s the perfect example. You might have dodged a bullet by not updating, but not without checking the news.',
          'It may be hard to believe that one of the most important lessons of online and network security is performing software updates as soon as possible, but it’s one of the best ways to keep your computer and network safe. It’s almost always a hassle, but it’s definitely always worth it.',
        ],
      },
      {
        heading: 'Be miserly with your permissions!',
        body: [
          'Every CompSec pro is privy to the basic, fundamental rule of network security: The Principle of Least Privilege, which basically asks “how few permissions can you give each user?” Yeah, needing to ask your IT team to turn on your speakers because of insufficient permissions is incredibly annoying — no one knows better than the IT team. But by keeping everyone’s permissions as restricted as possible, you minimize potential problems, including your own.',
          'Imagine your network like a house and a hack like a break-in.',
          'Example 1: You have valuables in every room of the house, but there are no doors to those rooms. Whether a thief breaks in through the window, the garage, or by picking the front door, they can get at everything by breaking in once.',
          'Example 2: Every room in the house has a locked door, and all valuables are placed inside safes. If our thief gets into one room, they can’t get to the hallway and into another room, and they might not even get anything out of that room.',
          'Obviously, it seems a little paranoid to live that way. But, let’s face it, CompSec pros are a little paranoid. Keep your “rooms” locked, put your valuables in a safe place, and when you throw a party, close it all up. In other words, administer your network with multiple user permission levels and restrict accesses carefully, based on how few permissions can be doled out.',
        ],
      },
      {
        heading: 'Prepare for the worst: Do your backups',
        body: [
          'You know what the scariest part of working in 2018 is? It’s entirely possible that next time you turn on your computer, every file on it could be lost.',
          'There are hacks that hold your hard drive irretrievably hostage, there are environmental disasters that ruin your servers… even a simple burglary can make accessing your data impossible. Are you prepared for that?',
          'Performing a backup of essential files and storing that backup somewhere geographically different from your hard drive could mitigate most security failures.',
          'There’s a lot to learn about how to keep computers and networks safe, but knowing how to retrieve stolen, lost or hacked files could be a lot easier and maybe just as important.',
          'Update software, backup your data, and restrict user accesses – those three steps alone could potentially save you and your company hundreds of hours and millions of dollars.',
          'But in all of these examples, what you and your network security team should be asking is, “Do we even know what our company’s policy is?”',
          'These tips don’t even scratch the surface of everything there is to learn about computer and network security, but good security starts by asking questions and finding out the answers.',
        ],
      },
      {
        heading: 'Last tip:',
        body: [
          'With all that said, don’t feel bad if you’re doubting your company or team is doing enough with security measures. When asked, “What do security professionals do to secure their personal computers?,” almost all network security professionals have the same answer: Not enough.',
          'You can always do more, so get started today!',
        ],
      },
    ],
    related: ['cybersecurity', 'training-and-enablement', 'it-blog'],
  },
]
