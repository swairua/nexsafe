// Service pages. The "Services & Solutions" overview is ported from
// nexsate.com/solutions/ (headline, intro, service cards and closing section are
// the source site's own wording). The remaining pages keep the copy from the
// client-supplied service documents in logoandcontent/.
const eyebrow = 'IT solutions'

export const servicePages = [
  {
    slug: 'services-solutions',
    title: 'Services & Solutions',
    eyebrow,
    intro:
      'Take your company to new heights by investing in our reliable and efficient technology solutions.',
    // Hero image carried over from the source Solutions page.
    image: {
      src: '/uploads/solutions-hero.jpg',
      alt: 'Technology team working together at a long desk in a modern office',
    },
    sections: [
      {
        heading: 'Comprehensive IT services that enable and transform business',
        body: [
          'Nexsate Technologies is your trusted partner for managed IT, cybersecurity, cloud technology, telecommunications, and fibre connectivity.',
          'We enable, transform, and empower businesses with reliable technology solutions designed to improve productivity, strengthen security, reduce downtime, and help your organization save time and money.',
          'When we say comprehensive, we mean end-to-end services and support in your technology environment. Nexsate helps your business stay productive, connected, and secure, so you can operate with confidence, reduce downtime, and focus on growth.',
        ],
      },
      {
        heading: 'Complete integrated solutions that empower the future of business',
        body: [
          'Nexsate turns technology into business advantage through focused solutions that deliver results and solve real-world problems. Our solutions are designed to help businesses grow, adapt, and succeed in a changing digital environment.',
        ],
        // The eight service cards from the source page. Their "Learn more"
        // links are mapped to the matching page in this site; Telecommunication
        // and IT Consulting & Advisory have no counterpart here, so they are
        // shown without a link rather than pointing somewhere unrelated.
        items: [
          {
            title: 'End-user Support',
            text: 'Free up your internal resources to focus on the business by letting us handle day to day support services, management, and monitoring of your IT.',
            href: '#/managed-it-services',
          },
          {
            title: 'Cloud Services',
            text: 'The right technology, implemented properly, appropriately managed and monitored, can lead to significant gains in growth',
            href: '#/cloud-services',
          },
          {
            title: 'Software Development',
            text: 'Smarter digital solutions that streamline operations, connect business systems, and support growth.',
            href: '#/software-erp-app-development',
          },
          {
            title: 'Network Management',
            text: 'Connecting your business and keeping it connected in a secure, reliable, well-managed environment.',
            href: '#/network-management',
          },
          {
            title: 'Cybersecurity',
            text: 'Protecting your business, users, devices, and data in a secure and well-managed digital environment.',
            href: '#/cybersecurity',
          },
          {
            title: 'Back-up & Disaster Recovery',
            text: 'Protecting critical business data and preparing your organization to recover quickly from disruption.',
            href: '#/backup-disaster-recovery',
          },
          {
            title: 'Telecommunication',
            text: 'Reliable fibre, cabling, and connectivity support that helps your business stay connected, communicate effectively, and operate with confidence.',
          },
          {
            title: 'IT Consulting & Advisory',
            text: 'Strategic IT consulting and advisory support that helps your business plan smarter, reduce risk, improve efficiency, and make confident technology decisions.',
          },
        ],
      },
      {
        heading: 'Why choose services from Nexsate?',
        body: [
          'Nexsate provides businesses with an edge over the competition with a variety of benefits.',
          'Opting for outsourced IT services improve the efficiency of business and build trust with customers and clients.',
          'Our services can be tailored to meet specific needs to match your specific goals.',
        ],
      },
    ],
    related: ['managed-it-services', 'cloud-services', 'cybersecurity', 'network-management'],
  },
  {
    slug: 'managed-it-services',
    title: 'Managed IT Services',
    eyebrow,
    intro:
      'Reliable IT support to your business to reduce downtime, resolve issues, protect users, and keep work moving.',
    sections: [
      {
        heading: 'Managed IT that reduces disruption',
        body: [
          'Technology problems can quickly affect productivity, communication, customer service, and daily operations. Slow devices, email issues, software problems, network interruptions, password challenges, missed updates, and unclear support processes can frustrate employees and pull attention away from important work.',
          'Nexsate manages the IT support your business relies on every day. We support users, devices, Microsoft 365, networks, security tools, backups, cloud platforms, and business systems so your team gets timely help, your technology stays better maintained, and issues are addressed before they cause bigger disruptions.',
        ],
      },
      {
        heading: 'Core service desk and system care',
        items: [
          {
            title: 'Helpdesk & user support',
            text: 'Assist employees with computer issues, email problems, password resets, software access, printing, connectivity, and everyday technology questions.',
          },
          {
            title: 'Device & system management',
            text: 'Manage desktops, laptops, servers, and business devices with proper setup, configuration, updates, performance checks, and ongoing care.',
          },
          {
            title: 'Monitoring & maintenance',
            text: 'Track system health, alerts, device performance, storage, network activity, and service availability so issues can be identified earlier.',
          },
          {
            title: 'Patch & update coordination',
            text: 'Keep software, operating systems, and business devices updated to improve reliability, reduce security gaps, and support smoother performance.',
          },
        ],
      },
      {
        heading: 'IT support with better clarity',
        body: [
          'Managed IT should bring order to everyday technology support. Nexsate helps organize how IT issues are reported, tracked, resolved, and improved over time. This includes user support, device care, vendor coordination, recurring issue management, system maintenance, and better visibility across your IT environment.',
          'When IT is properly managed, employees spend less time dealing with technical problems and more time doing productive work. Nexsate helps create a more reliable technology environment by improving support, reducing recurring issues, strengthening security, organizing systems, and giving your business better visibility over its IT operations.',
        ],
      },
      {
        heading: 'What you get',
        items: [
          {
            title: 'Specialized IT expertise',
            text: 'Access experienced IT professionals across cybersecurity, cloud services, networks, fibre connectivity, Microsoft 365, applications, and daily technical support.',
          },
          {
            title: 'Predictable IT costs',
            text: 'Plan your IT spending with fixed monthly support based on the service level, users, systems, and support needs of your business.',
          },
          {
            title: 'Proactive monitoring & support',
            text: 'Reduce downtime by monitoring systems, identifying issues early, and resolving technology problems before they disrupt daily operations.',
          },
          {
            title: 'Microsoft 365 administration',
            text: 'Manage Microsoft 365 users, email, Teams, SharePoint, OneDrive, licences, permissions, and security settings across your business environment.',
          },
          {
            title: 'Vendor & technology coordination',
            text: 'Coordinate with internet providers, software vendors, hardware suppliers, cloud platforms, and other technology partners when support, changes, or troubleshooting are needed.',
          },
          {
            title: 'IT documentation & improvement',
            text: 'Document your IT environment, track recurring issues, review technology needs, and plan improvements that support business goals and future growth.',
          },
        ],
      },
    ],
    related: ['managed-it-services', 'network-management', 'cloud-services', 'services-solutions'],
  },
  {
    slug: 'cloud-services',
    title: 'Cloud Services',
    eyebrow,
    intro:
      'Secure cloud solutions that help your business work, collaborate, and stay protected from anywhere.',
    sections: [
      {
        heading: 'Cloud services that support modern work',
        body: [
          'Your team needs secure access to email, files, applications, collaboration tools, and business data whether they are in the office, working remotely, or on the move. When cloud tools are poorly managed, file access is confusing, servers are outdated, or data is not properly protected, daily work can become slower, less secure, and harder to control.',
          'Nexsate helps businesses move, manage, secure, and improve their cloud environment. We support cloud setup, migration, Microsoft 365, secure file access, cloud backup, collaboration tools, and ongoing cloud management so your business can work with greater flexibility, stronger protection, and less reliance on physical infrastructure.',
        ],
      },
      {
        heading: 'Core cloud capabilities',
        items: [
          {
            title: 'Cloud migration & setup',
            text: 'Move email, files, applications, or business systems to the cloud with a structured approach that reduces disruption and supports a smoother transition.',
          },
          {
            title: 'Microsoft 365 management',
            text: 'Manage Microsoft 365 users, email, Teams, SharePoint, OneDrive, licences, security settings, and collaboration tools more effectively.',
          },
          {
            title: 'Secure file access & sharing',
            text: 'Give employees safer access to business files while improving how documents are stored, shared, organized, and protected.',
          },
          {
            title: 'Cloud backup & data protection',
            text: 'Protect cloud data with backup, recovery support, access controls, and safeguards against loss or disruption.',
          },
        ],
      },
      {
        heading: 'A cloud setup built around your needs',
        body: [
          'Every business uses cloud technology differently. Nexsate works with you to understand your requirements, review your current setup, and determine the best way forward. The goal is to create a cloud environment that is secure, flexible, manageable, and aligned with how your team works every day.',
          'Cloud services give your business more room to adapt. With the right setup, you can reduce hardware dependency, improve collaboration, support remote work, strengthen data protection, and scale technology as your needs change. Nexsate helps build a cloud environment that is easier to access, easier to manage, and ready to support future growth.',
        ],
      },
      {
        heading: 'Flexible cloud services for growing businesses',
        items: [
          {
            title: 'Remote work support',
            text: 'Giving employees secure access to email, files, applications, and collaboration tools from different locations and devices.',
          },
          {
            title: 'Cloud security controls',
            text: 'Strengthening cloud access with safer sign-ins, multi-factor authentication, user permissions, device controls, and security settings.',
          },
          {
            title: 'Collaboration improvement',
            text: 'Improving teamwork through better use of Microsoft Teams, SharePoint, OneDrive, shared workspaces, and cloud-based communication tools.',
          },
          {
            title: 'Cloud cost & licence review',
            text: 'Reviewing cloud licences, subscriptions, storage usage, and service plans to reduce waste and improve value.',
          },
        ],
      },
    ],
    related: ['managed-it-services', 'cybersecurity', 'backup-disaster-recovery', 'digital-transformation'],
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    eyebrow,
    intro:
      'Protecting your business, users, devices, and data in a secure, resilient, and well-managed digital environment.',
    sections: [
      {
        heading: 'Stronger protection for safer business operations',
        body: [
          'Cybersecurity is now a core part of modern business operations. Your email, devices, cloud platforms, passwords, applications, files, and business data all need protection from threats such as phishing, malware, ransomware, unauthorized access, and data loss.',
          'Nexsate helps businesses strengthen their cybersecurity environment with practical controls that protect users, secure devices, reduce risk, and improve security readiness. Our cybersecurity services focus on prevention, visibility, secure access, threat protection, and structured support across your users, endpoints, cloud platforms, and business systems.',
        ],
      },
      {
        heading: 'Threat protection & prevention',
        items: [
          {
            title: 'Threat protection & prevention',
            text: 'We focus on reducing cybersecurity risks by strengthening protection around email, devices, accounts, cloud platforms, and business applications before threats disrupt daily operations.',
          },
          {
            title: 'Secure access management',
            text: 'We strengthen access to business systems through multi-factor authentication, safer sign-ins, user permissions, administrator controls, and secure remote access.',
          },
          {
            title: 'Endpoint & device security',
            text: 'We protect laptops, desktops, servers, and mobile devices with security controls that reduce exposure to malware, unauthorized access, and unsafe activity.',
          },
          {
            title: 'Security monitoring & response',
            text: 'We monitor security activity, detect potential threats early, and provide timely support to reduce risk, contain issues, and protect business operations.',
          },
        ],
      },
      {
        heading: 'From risk to resilience',
        body: [
          'Nexsate looks beyond basic protection to understand where your business is most exposed and what could be impacted if a cyber incident occurs. We then build a practical cybersecurity approach that prioritizes key risks, strengthens weak points, improves preparedness, and supports a safer, more resilient business environment.',
        ],
        list: [
          'Incident response support with containment guidance and recovery coordination when issues occur',
          'Data protection controls for sensitive information, secure storage, and safer file handling',
          'Vulnerability and patch coordination that closes known gaps before they become risks',
          'Ongoing security improvement as your business, users, systems, and tools change',
        ],
      },
      {
        heading: 'Cybersecurity that protects how your business works',
        items: [
          {
            title: 'Endpoint protection',
            text: 'Protect business devices from malware, ransomware, suspicious activity, and unauthorized access.',
          },
          {
            title: 'Email & phishing protection',
            text: 'Strengthen email security to reduce phishing, malicious links, unsafe attachments, spam, impersonation attempts, and account compromise.',
          },
          {
            title: 'Identity & access control',
            text: 'Manage user accounts, permissions, administrator access, and sign-in controls so the right people have the right level of access.',
          },
          {
            title: 'Security monitoring & alerts',
            text: 'Generate timely alerts when suspicious activity, device threats, account issues, or security risks need attention.',
          },
          {
            title: 'Security risk review',
            text: 'Review your cybersecurity environment to identify gaps, weak controls, exposed accounts, vulnerable devices, and areas that need stronger protection.',
          },
          {
            title: 'Security awareness guidance',
            text: 'Build safer cybersecurity habits through practical training and guidance on phishing awareness, password safety, account protection, and everyday security practices.',
          },
        ],
      },
    ],
    related: ['managed-it-services', 'network-management', 'cloud-services'],
  },
  {
    slug: 'network-management',
    title: 'Network Management',
    eyebrow,
    intro:
      'Connecting your business and keeping it connected in a secure, reliable, and well-managed environment.',
    sections: [
      {
        heading: 'Stronger networks for smoother business operations',
        body: [
          'A strong network is the foundation of modern business operations. It connects your people, devices, cloud platforms, applications, files, and business locations. When the network is slow, unstable, poorly configured, or difficult to troubleshoot, it can disrupt communication, reduce productivity, affect security, and slow down daily work.',
          'Nexsate helps businesses build, manage, and improve network environments that are secure, reliable, and easier to support. Our network management services focus on performance, visibility, connectivity, and structured support across your office, remote users, devices, and business locations, helping your team work with fewer avoidable interruptions.',
        ],
      },
      {
        heading: 'Core network capabilities',
        items: [
          {
            title: 'Reliable network connectivity',
            text: 'We focus on improving uptime, reducing latency and consistent network availability so that access to business systems, tools, and applications with fewer delays and interruptions.',
          },
          {
            title: 'Network protection',
            text: 'We strengthen your network through better access controls, configuration, firewall coordination, and segmentation, reducing risk and creating safer, more reliable connectivity for your business systems, users, and devices.',
          },
          {
            title: 'Proactive network support',
            text: 'We monitor network performance, detect connection issues early, and provide timely troubleshooting to reduce interruptions and support smoother business operations.',
          },
          {
            title: 'Network infrastructure support',
            text: 'We maintain and support the equipment that powers your network, including routers, switches, access points, wired connections, and Wi-Fi coverage across your business environment.',
          },
        ],
      },
      {
        heading: 'From connection to continuity',
        body: [
          'Nexsate begins by understanding how your business uses its network every day, including users, locations, devices, applications, and connectivity needs. From there, we assess, configure, monitor, and improve your network environment to support stronger performance, smoother operations, secure cloud access, and future growth.',
          'When your network is slow, unstable, or unsecured, daily operations can quickly be affected. Nexsate provides structured network management that improves connectivity, strengthens access controls, monitors performance, and reduces interruptions so your business can stay connected where it matters most.',
        ],
      },
      {
        heading: 'Secure networks that keep business connected',
        items: [
          {
            title: 'Remote network monitoring',
            text: 'Tracking network performance, uptime, device health, and connectivity issues so problems can be identified early.',
          },
          {
            title: 'Network device management',
            text: 'Managing servers, routers, switches, access points, firewalls, and other network equipment that support daily business connectivity.',
          },
          {
            title: 'Secure access & MFA',
            text: 'Strengthening network access with multi-factor authentication, safer sign-ins, and better controls for users, administrators, and remote connections.',
          },
          {
            title: 'Traffic & bandwidth management',
            text: 'Monitor usage, reduce congestion, and improve how bandwidth is used across business applications, cloud platforms, and connected devices.',
          },
        ],
      },
    ],
    related: ['managed-it-services', 'cybersecurity', 'cloud-services', 'services-solutions'],
  },
  {
    slug: 'backup-disaster-recovery',
    title: 'Backup & Disaster Recovery',
    eyebrow,
    intro:
      'Protecting your critical business data and preparing your organization to recover quickly from disruption.',
    sections: [
      {
        heading: 'Reliable data protection for business continuity',
        body: [
          'Every business depends on information that must be protected, recoverable, and available when needed. From documents and emails to customer records, financial files, applications, and operating systems, a single loss event can interrupt work, delay service, and create unnecessary cost.',
          'Backup and disaster recovery gives your business a safety net when something goes wrong. Nexsate helps put the right backup processes, recovery priorities, monitoring, and restoration support in place so important data is protected and your business has a clear path to recover after accidental deletion, system failure, ransomware, or other unexpected disruption.',
        ],
      },
      {
        heading: 'Core backup and recovery capabilities',
        items: [
          {
            title: 'Data backup & protection',
            text: 'Create secure backup copies of important business files, systems, applications, and cloud data to reduce the risk of permanent data loss.',
          },
          {
            title: 'Backup monitoring & support',
            text: 'Monitor backup activity, failed jobs, storage capacity, and alerts so backup issues are identified and addressed before recovery is needed.',
          },
          {
            title: 'Recovery readiness',
            text: 'Prepare your business with structured recovery processes so important data and systems can be restored faster after an incident.',
          },
          {
            title: 'Business continuity support',
            text: 'Support continuity planning by identifying critical systems, recovery priorities, and the steps needed to reduce downtime during disruption.',
          },
        ],
      },
      {
        heading: 'Turning data protection into recovery confidence',
        body: [
          'Backup and recovery planning starts with knowing what your business cannot afford to lose. At Nexsate, we work with you to identify critical data, systems, applications, and workflows, then structure how they are backed up, retained, monitored, and restored. This gives your business a clearer recovery path and helps ensure important information is recoverable when needed most.',
          'Nexsate provides backup and recovery support that protects critical information, monitors backup health, improves recovery readiness, and gives your business a clear path to restore important data and systems when data loss, ransomware, equipment failure, or system outages occur.',
        ],
      },
      {
        heading: 'Recovery support when disruption happens',
        items: [
          {
            title: 'Microsoft 365 backup',
            text: 'Protect Microsoft 365 data such as email, OneDrive, SharePoint, and Teams from accidental deletion, user error, retention gaps, and recovery limitations.',
          },
          {
            title: 'Cloud backup management',
            text: 'Manage cloud-based backups for important business data, files, systems, and applications to improve data availability and reduce reliance on local storage only.',
          },
          {
            title: 'Recovery testing',
            text: 'Test restore processes to confirm that backups are usable and important data can be recovered when needed.',
          },
          {
            title: 'Retention & recovery planning',
            text: 'Define how long data should be retained, what should be prioritized for recovery, and how backup policies should support business, operational, and compliance needs.',
          },
        ],
      },
    ],
    related: ['cloud-services', 'cybersecurity', 'managed-it-services'],
  },
  {
    slug: 'automation',
    title: 'Automation',
    eyebrow,
    intro:
      'Reducing manual work, improving consistency, increasing productivity, and helping your team focus on higher-value business activities.',
    sections: [
      {
        heading: 'Smarter workflows for more efficient operations',
        body: [
          'Repetitive tasks, manual approvals, data entry, status updates, reporting, file movement, and follow-ups can take valuable time away from your team. As these tasks grow, work slows down, errors become more likely, and employees spend too much time on processes that could be simplified.',
          'Automation helps your business work faster and more consistently. Nexsate designs automation and AI-supported workflow solutions that reduce manual effort, connect tasks, speed up information flow, and improve productivity across daily operations. This gives your team more time to focus on service, decision-making, customers, and business growth.',
        ],
      },
      {
        heading: 'Core automation capabilities',
        items: [
          {
            title: 'Workflow automation',
            text: 'Automating routine steps such as approvals, notifications, task assignments, reminders, and status updates so work moves forward with fewer manual delays.',
          },
          {
            title: 'Data digitization & process efficiency',
            text: 'Turning manual information into digital records and reduce repetitive data entry by creating automated flows between forms, systems, files, and business applications.',
          },
          {
            title: 'Reporting automation',
            text: 'Automatically delivering reports, updates, and dashboard insights that help your team review performance, track progress, and make better decisions.',
          },
          {
            title: 'System-based triggers',
            text: 'Triggering automatic tasks, alerts, updates, and follow-ups when important business activities or workflow changes occur.',
          },
        ],
      },
      {
        heading: 'From manual tasks to better productivity',
        body: [
          'Automation works best when it removes everyday delays. We at Nexsate work with you to identify repetitive tasks, slow steps, and confusing handoffs, then turns them into practical automation flows that save time, reduce manual effort, and make daily work easier to manage.',
          'Repetitive tasks can slow people down without always being obvious. Nexsate builds automation solutions that reduce unnecessary follow-ups, improve consistency, speed up internal workflows, and help information move more smoothly between teams, departments, and business systems.',
        ],
      },
      {
        heading: 'Automation that removes business friction',
        items: [
          {
            title: 'Approval automation',
            text: 'Create smoother approval processes for requests, documents, expenses, purchases, onboarding, service tasks, and internal workflows.',
          },
          {
            title: 'Form & request automation',
            text: 'Turn submitted forms, inquiries, service requests, and internal requests into organized tasks, notifications, records, or follow-up actions.',
          },
          {
            title: 'Notification & reminder automation',
            text: 'Send automatic alerts, reminders, and updates to the right people when action is required or when important changes happen.',
          },
          {
            title: 'Document & file automation',
            text: 'Organize, route, store, or trigger actions from documents and files to reduce manual handling and improve process consistency.',
          },
          {
            title: 'CRM & ERP workflow automation',
            text: 'Automate selected actions within CRM and ERP systems, including record updates, task creation, approvals, notifications, and process steps.',
          },
          {
            title: 'Automation review & improvement',
            text: 'Review existing workflows, identify manual bottlenecks, and improve automation over time as your business processes change.',
          },
        ],
      },
    ],
    related: ['software-erp-app-development', 'automation', 'digital-transformation', 'gaining-efficiency'],
  },
  {
    slug: 'digital-transformation',
    title: 'Digital Transformation',
    eyebrow,
    intro:
      'Modernizing technology so your business can work smarter, adapt faster, and deliver better experiences for your team and customers.',
    sections: [
      {
        heading: 'Technology that moves your business forward',
        body: [
          'Growth becomes harder when business systems no longer support the way your team works. Outdated tools, disconnected platforms, manual steps, limited visibility, and scattered information can slow decisions, increase costs, affect service delivery, and make it difficult to respond to change.',
          'Digital transformation helps your business use technology with purpose. Nexsate reviews your current environment, identifies where improvement will create the most value, and helps modernize the systems, processes, data, and digital tools that support daily operations. The goal is practical progress: better performance, stronger visibility, smoother experiences, and a technology foundation that supports future growth.',
        ],
      },
      {
        heading: 'Core transformation capabilities',
        items: [
          {
            title: 'Digital strategy & roadmap',
            text: 'Turn business goals into a clear technology plan by reviewing current systems, process gaps, risks, priorities, and opportunities for improvement.',
          },
          {
            title: 'Technology modernization',
            text: 'Upgrade outdated tools, platforms, systems, and workflows so your business can operate with better speed, reliability, flexibility, and control.',
          },
          {
            title: 'Process & system improvement',
            text: 'Improve how people, systems, data, and workflows connect, reducing friction and making daily work easier to manage.',
          },
          {
            title: 'Data, AI & business insight',
            text: 'Use reporting, connected data, dashboards, and AI-supported tools to improve visibility, support better decisions, and uncover smarter ways of working.',
          },
        ],
      },
      {
        heading: 'Practical transformation built around business needs',
        body: [
          'Digital transformation does not have to mean replacing everything at once. The best results come from making the right improvements in the right order. Nexsate focuses on practical steps that match your business priorities, budget, team readiness, and growth plans.',
          'We look at where technology can remove barriers, improve service, reduce risk, support employees, and create stronger business performance over time.',
        ],
      },
      {
        heading: 'Digital transformation that creates real value',
        items: [
          {
            title: 'Cloud & modern workplace',
            text: 'Move toward secure cloud platforms, modern collaboration tools, and flexible work environments that support productivity from anywhere.',
          },
          {
            title: 'System integration',
            text: 'Connect business applications, cloud platforms, ERP, CRM, reporting tools, and workflows so information moves more smoothly across the organization.',
          },
          {
            title: 'Customer & employee experience',
            text: 'Improve digital interactions, service delivery, internal processes, and user experiences for the people who depend on your systems every day.',
          },
          {
            title: 'Digital operations improvement',
            text: 'Use technology to simplify operations, reduce bottlenecks, improve visibility, and help teams execute work faster and more consistently.',
          },
          {
            title: 'AI readiness & adoption',
            text: 'Identify practical areas where AI-supported tools can improve productivity, reporting, customer service, workflow support, and decision-making.',
          },
          {
            title: 'Change management & user adoption',
            text: 'Support employees with planning, guidance, training, and rollout support so new technology is understood, adopted, and used effectively.',
          },
        ],
      },
    ],
    related: ['cloud-services', 'automation', 'software-erp-app-development'],
  },
  {
    slug: 'gaining-efficiency',
    title: 'Gaining Efficiency',
    eyebrow,
    intro:
      'Helping your business save time, reduce waste, improve productivity, and get more value from the technology you already use.',
    sections: [
      {
        heading: 'Less waste. Better work. Stronger results.',
        body: [
          'Efficiency is often lost in small ways. Slow systems, repeated tasks, unused software, unclear processes, delayed support, and poor communication can all affect how well your team works. Over time, these issues can increase costs, frustrate employees, slow down service, and make daily operations harder to manage.',
          'Nexsate works with businesses to improve how technology supports everyday work. We review where time is being lost, where tools are underused, where processes create extra effort, and where better support or configuration can improve performance. The result is a more productive business environment with fewer delays, better use of resources, and technology that works harder for your team.',
        ],
      },
      {
        heading: 'Where we look first',
        items: [
          {
            title: 'Technology efficiency review',
            text: 'Review your systems, tools, workflows, support needs, and daily technology use to identify where productivity, time, or cost savings can be improved.',
          },
          {
            title: 'Tool & licence optimization',
            text: 'Reduce waste by reviewing unused licences, duplicated tools, overlapping platforms, and technology services that may no longer fit your business needs.',
          },
          {
            title: 'Process streamlining',
            text: 'Simplify technology-related tasks, reduce unnecessary steps, and improve how work moves across people, systems, and departments.',
          },
          {
            title: 'Performance & support improvement',
            text: 'Improve reliability, support response, and issue resolution so your team spends less time waiting and more time working.',
          },
        ],
      },
      {
        heading: 'Better results without added complexity',
        body: [
          'Gaining efficiency does not always require major system changes. Sometimes the biggest improvements come from better configuration, clearer processes, stronger support, smarter tool usage, and removing the small barriers that slow people down. Nexsate focuses on targeted improvements that make technology easier to use, easier to manage, and more valuable to the business.',
          'When technology works better, your team works better. Nexsate helps businesses reduce delays, improve collaboration, control technology waste, strengthen productivity, and create a more organized environment that supports growth.',
        ],
      },
      {
        heading: 'Efficiency that supports daily performance',
        items: [
          {
            title: 'Fewer delays',
            text: 'Reduce interruptions caused by slow systems, recurring issues, unclear support processes, and poorly maintained technology.',
          },
          {
            title: 'Better use of existing tools',
            text: 'Get more value from Microsoft 365, cloud platforms, ERP, CRM, collaboration tools, business applications, and other digital systems.',
          },
          {
            title: 'Improved team productivity',
            text: 'Support better productivity with smoother workflows, clearer support, reliable systems, and easier access to the tools employees need.',
          },
          {
            title: 'Lower technology waste',
            text: 'Identify unused software, duplicated services, poor configurations, and avoidable technology costs that may be reducing value.',
          },
          {
            title: 'Stronger collaboration',
            text: 'Improve communication, file sharing, teamwork, and access to information through better use of connected business tools.',
          },
          {
            title: 'Scalable ways of working',
            text: 'Build more efficient technology practices that can support more users, systems, locations, and business activity as your company grows.',
          },
        ],
      },
    ],
    related: ['automation', 'managed-it-services', 'software-erp-app-development', 'digital-transformation'],
  },
]
