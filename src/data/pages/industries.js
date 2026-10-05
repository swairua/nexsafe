// Industry pages, ported from nexsate.com/industries/ during the redesign:
// wording, section order, headings and imagery are the source site's own.
//
// Shape on the source, kept here: h1 + subtitle -> "Focus" -> two positioning
// sections -> the services list -> a closing section. Each page also carries its
// own hero background image (page.image), which PageView prefers over the
// shared per-category image.
//
// Source wording is kept verbatim, including its quirks: the "Focus" label,
// Title Case headings, and the repeated "Financial workflows require..."
// paragraph on the banks page. One thing is deliberately NOT copied: the
// source's services heading on the healthcare and banks pages is a copy-paste
// error ("Our IT services for manufacturers"), so each page names its own
// sector instead.
const eyebrow = 'Industries'

export const industryPages = [
  {
    slug: 'banks-insurance',
    title: 'Banking, Finance & Insurance',
    eyebrow,
    intro:
      'Technology services for financial offices, insurance agencies, advisory firms, lending teams, claims departments, and client-facing organizations where confidentiality, uptime, and trust are essential.',
    // Hero image carried over from the source page.
    image: {
      src: '/uploads/industry-banks-hero.jpg',
      alt: 'Advisor reviewing financial documents at a desk in a modern office',
    },
    sections: [
      {
        heading: 'Focus',
        body: [
          'Financial and insurance operations depend on accuracy, privacy, and timely access to information. Client records, applications, policies, claims, approvals, payments, reports, and communication all move through digital systems that must be properly managed.',
          'A delay in access, a failed workstation, a locked account, a misrouted document, or an exposed file can affect client service, internal workflow, and business confidence. Teams need technology that protects sensitive information while keeping work organized and accessible to the right people.',
          'Nexsate works with banks, insurance providers, brokers, and financial service businesses to strengthen the systems behind client service, administration, documentation, reporting, and daily operations.',
        ],
      },
      {
        heading: 'Technology That Builds and Protects Trust',
        body: [
          'In financial services, trust is part of the service experience. Clients expect their information to be handled carefully, staff need controlled access to the right systems, and management needs confidence that technology is not creating unnecessary risk.',
          'Financial workflows require technology that keeps information organized, access controlled, records protected, and business activity moving with fewer interruptions. Nexsate provides the structure, support, and safeguards needed to reduce manual delays and maintain dependable client service.',
          'Our work can support branch offices, brokerage teams, advisory firms, claims teams, administrative departments, remote employees, and client-facing service environments.',
        ],
      },
      {
        heading: 'Digital Systems for Finance, Policies, and Claims',
        body: [
          'Banking and insurance teams work through many moving parts: applications, client files, underwriting documents, payment details, policy updates, claims records, compliance tasks, email communication, and reporting.',
          'Financial workflows require technology that keeps information organized, access controlled, records protected, and business activity moving with fewer interruptions. Nexsate provides the structure, support, and safeguards needed to reduce manual delays and maintain dependable client service.',
          'Our technicians can support secure office technology setup, including workstations, cabling, network equipment, printing, scanning, device deployment, and connectivity, with attention to reliability, access control, and confidentiality.',
        ],
      },
      {
        heading: 'Our IT services for banks & insurance',
        items: [
          {
            title: 'Financial Service Desk Support',
            text: 'Support for advisors, brokers, tellers, claims staff, administrators, managers, and office teams handling daily technical issues.',
          },
          {
            title: 'Office Network & Branch Connectivity',
            text: 'Design and setup of office networks, Wi-Fi, firewalls, workstations, printers, meeting rooms, and multi-location connectivity.',
          },
          {
            title: 'Core Application Support',
            text: 'Support for banking platforms, insurance software, CRM systems, accounting tools, document systems, reporting platforms, and client management applications.',
          },
          {
            title: 'Access Control & Identity Management',
            text: 'User accounts, permission levels, administrator access, multi-factor authentication, password policies, and secure sign-in practices.',
          },
          {
            title: 'Hardware Procurement & Device Setup',
            text: 'Sourcing, configuring, and deploying laptops, desktops, monitors, printers, scanners, phones, tablets, and office technology equipment.',
          },
          {
            title: 'Document Management & Workflow Support',
            text: 'Support for digital files, client records, forms, approvals, shared folders, document routing, and controlled information access.',
          },
          {
            title: 'Cybersecurity & Compliance Readiness',
            text: 'Security reviews, endpoint protection, email safeguards, data handling controls, user awareness, audit preparation, and risk reduction practices.',
          },
          {
            title: 'Automation & AI Administrative Workflows',
            text: 'Automation and AI-supported processes for document sorting, reminders, reporting, approvals, client follow-ups, form handling, and internal task management.',
          },
        ],
      },
      {
        heading: 'Strengthen Trust Across Every Client Interaction',
        body: [
          'Financial and insurance businesses need technology that protects information, improves internal control, and supports dependable client service. A stronger digital environment gives teams better access to records, clearer workflows, safer communication, and more confidence in the systems behind daily business activity.',
        ],
      },
    ],
    related: ['cybersecurity', 'network-management', 'managed-it-services', 'healthcare'],
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    eyebrow,
    intro:
      'Technology support for medical clinics, dental practices, pharmacies, therapy providers, diagnostic centres, and healthcare offices where patient service, privacy, and system access are critical.',
    // Hero image carried over from the source page.
    image: {
      src: '/uploads/industry-healthcare-hero.jpg',
      alt: 'Clinician using a tablet during a patient appointment',
    },
    sections: [
      {
        heading: 'Focus',
        body: [
          'Healthcare environments depend on technology at every stage of the patient experience. Appointment booking, intake forms, digital charts, billing, imaging, prescriptions, referrals, communication, and reporting all rely on systems being available, secure, and easy for staff to use.',
          'When technology is unreliable, the impact is felt quickly. Front desk teams may struggle with scheduling, clinicians may lose access to records, patients may wait longer, and administrative work can pile up behind the scenes.',
          'Nexsate supports healthcare providers by strengthening the digital foundation behind clinical and administrative work. The focus is to keep staff supported, patient information better protected, and daily practice operations easier to manage.',
        ],
      },
      {
        heading: 'Reliable Systems Behind Every Patient Visit',
        body: [
          'Healthcare teams need systems that support the rhythm of a busy practice. Staff must move between patient records, appointment schedules, forms, communication tools, billing platforms, and office devices without unnecessary delays.',
          'Nexsate helps healthcare organizations manage the technology behind patient intake, clinical documentation, staff access, secure communication, and office workflows. We focus on reducing confusion, improving system usability, and creating a more controlled environment for sensitive information.',
          'Our support can cover clinics, treatment rooms, reception areas, administrative offices, remote staff, and connected healthcare workspaces. The goal is simple: keep the technology behind the practice dependable, secure, and easier for the team to use.',
        ],
      },
      {
        heading: 'Technology Behind Better Patient Experience',
        body: [
          'A smooth patient experience depends on more than medical expertise. It also depends on working computers, secure logins, connected printers, reliable Wi-Fi, accessible records, functioning phones, stable applications, and protected data.',
          'Nexsate supports the systems and devices healthcare teams rely on before, during, and after each patient interaction. When hands-on work is required, our local service technicians can assist with workstation setup, cabling, device deployment, connectivity, maintenance, and office technology needs.',
        ],
      },
      {
        heading: 'Our IT services for healthcare',
        items: [
          {
            title: 'Clinical Desk & Staff Support',
            text: 'Support for reception teams, practitioners, administrators, billing staff, and office users dealing with daily technology concerns.',
          },
          {
            title: 'EMR, EHR & Practice Application Support',
            text: 'Support for electronic medical records, scheduling systems, billing platforms, reporting tools, patient portals, and practice management applications.',
          },
          {
            title: 'Secure Access & Privacy Controls',
            text: 'User permissions, account protection, multi-factor authentication, role-based access, and safeguards for sensitive patient and business information.',
          },
          {
            title: 'Medical Office Network & Wi-Fi',
            text: 'Network setup and support for clinics, treatment rooms, reception areas, staff offices, guest access, and connected healthcare workspaces.',
          },
          {
            title: 'Hardware, Printers & Peripheral Setup',
            text: 'Procurement, configuration, and deployment of computers, tablets, printers, scanners, label printers, phones, monitors, and other office technology.',
          },
          {
            title: 'Backup & Record Recovery Readiness',
            text: 'Protection planning for important practice data, digital records, files, cloud platforms, and systems that must be recoverable when problems occur.',
          },
          {
            title: 'Systems Maintenance & Update Coordination',
            text: 'Regular maintenance for devices, applications, operating systems, security updates, performance concerns, and technology health.',
          },
          {
            title: 'Digital Forms, Automation & AI Admin Workflows',
            text: 'Automation and AI-supported administrative workflows for forms, reminders, document routing, reporting, task follow-ups, and non-clinical office processes.',
          },
        ],
      },
      {
        heading: 'Protect the Practice Behind the Patient',
        body: [
          'Healthcare teams need technology that supports trust, privacy, and smooth service delivery. A well-managed digital environment helps staff access the right information, serve patients more efficiently, reduce administrative pressure, and keep the practice prepared for daily demands.',
        ],
      },
    ],
    related: ['cybersecurity', 'managed-it-services', 'backup-disaster-recovery', 'banks-insurance'],
  },
  {
    slug: 'industrial-manufacturing',
    title: 'Industry Manufacturing',
    eyebrow,
    intro:
      'Insightful and reliable manufacturer IT services for productive and effective business',
    // Hero image carried over from the source page.
    image: {
      src: '/uploads/industry-manufacturing-hero.jpg',
      alt: 'Production floor of a manufacturing plant',
    },
    sections: [
      {
        heading: 'Focus',
        body: [
          'You have orders to complete, shipments to move, production schedules to meet, and customers depending on you. Technology should support that work, not slow it down.',
          'Nexsate works with industrial and manufacturing businesses to strengthen the technology behind daily operations, from users and devices to production systems, warehouse connectivity, data access, and operational continuity. The goal is a more secure, organized, and dependable environment that supports productivity today and growth tomorrow.',
        ],
      },
      {
        heading: 'Your Local Industrial Technology Partner',
        body: [
          'Manufacturing and industrial teams need support that understands urgency, schedules, and the cost of disruption. A small technology issue can quickly affect communication, production flow, warehouse activity, shipping, reporting, or customer commitments.',
          'Nexsate provides responsive remote and on-site support for offices, warehouses, and industrial environments. We work with your team to keep users supported, systems organized, access properly managed, and technology issues addressed with clarity and accountability.',
          'Beyond daily support, we help review your current environment, identify gaps, coordinate improvements, and plan technology decisions around how your business operates — whether that work happens on the shop floor, in the field, in the warehouse, or in the office.',
        ],
      },
      {
        heading: 'Industrial Tech Support Built for Operational Continuity',
        body: [
          'Technology disruptions can slow production, delay communication, and affect customer commitments. Nexsate reduces recurring issues, improves system reliability, and creates a more organized technology environment for industrial and manufacturing operations.',
          'Our local service technicians can be on-site when hands-on support is needed, to handle installations, maintenance, hardware setup, software support, and network-related work. We focus on doing the job properly from the start, ensuring you’re your systems work together reliably and support your operations.',
        ],
      },
      {
        heading: 'Our IT services for manufacturers',
        items: [
          {
            title: 'Help Desk & User Support',
            text: 'Responsive support for office staff, warehouse teams, supervisors, and production users experiencing day-to-day technology issues.',
          },
          {
            title: 'System Design & Network Setup',
            text: 'Design and setup of reliable technology environments, including networks, workstations, servers, Wi-Fi, access points, and system connectivity.',
          },
          {
            title: 'Business Software Support',
            text: 'Support for ERP systems, inventory platforms, production software, accounting tools, reporting systems, and other business applications used in daily operations.',
          },
          {
            title: 'Hardware Procurement & Setup',
            text: 'Sourcing, configuring, and deploying laptops, desktops, servers, printers, networking equipment, and other technology hardware required for business operations.',
          },
          {
            title: 'Cabling & Connectivity',
            text: 'Structured cabling, fibre connectivity coordination, network points, equipment connections, and connectivity support for offices, warehouses, and production areas.',
          },
          {
            title: 'Systems Maintenance',
            text: 'Ongoing maintenance of devices, systems, networks, software updates, patches, backups, and performance issues to keep technology operating reliably.',
          },
          {
            title: 'Automation & AI Workflow Support',
            text: 'Automation and AI-supported solutions for repetitive tasks, approvals, reporting, data entry, alerts, inventory updates, document handling, and operational workflows.',
          },
          {
            title: 'Cybersecurity Compliance & Controls',
            text: 'Security reviews, access controls, endpoint protection, data protection, user permissions, and cybersecurity practices that support safer operations and compliance readiness.',
          },
        ],
      },
      {
        heading: 'Reduce technology waste improve performance',
        body: [
          'A well-managed technology environment reduces recurring issues, improves response times, controls costs, and keeps daily operations better connected.',
        ],
      },
    ],
    related: ['network-management', 'managed-it-services', 'erp-solutions', 'transportation-logistics'],
  },
  {
    slug: 'transportation-logistics',
    title: 'Transportation & Logistics',
    eyebrow,
    intro:
      'Technology support for dispatch teams, drivers, fleet operations, warehouses, terminals, and logistics businesses where timing, visibility, and communication matter.',
    // Hero image carried over from the source page.
    image: {
      src: '/uploads/industry-transportation-hero.jpg',
      alt: 'Freight yard and trucks at a logistics terminal',
    },
    sections: [
      {
        heading: 'Focus',
        body: [
          'Transportation and logistics operations move quickly. Dispatchers need accurate information, drivers need dependable access, customers expect timely updates, and every delay can affect the next pickup, delivery, invoice, or service commitment.',
          'Behind every shipment is a chain of technology: dispatch systems, fleet platforms, mobile devices, tracking tools, warehouse scanners, shared documents, customer communication, and reporting. When those systems are not properly supported, teams lose visibility, communication slows down, and operations become harder to control.',
          'Nexsate works with transportation and logistics businesses to improve the technology that connects people, vehicles, freight, documents, and data. The result is a more connected operating environment that supports faster communication, better visibility, and smoother coordination across the business.',
        ],
      },
      {
        heading: 'Connected Systems for Faster Logistics',
        body: [
          'Transportation operations depend on fast communication and accurate information. Dispatchers, drivers, warehouse staff, customer service teams, and managers all rely on connected systems to keep freight moving and customers informed.',
          'When technology falls behind, the impact can show up quickly through missed updates, delayed paperwork, routing confusion, poor device access, tracking gaps, or slower billing. Nexsate supports transportation businesses by keeping the digital tools behind dispatch, fleet coordination, documentation, and communication easier to manage.',
          'Our team can support transportation offices, terminals, warehouses, yards, and mobile users with both remote assistance and on-site technical work when needed. We focus on practical support, clear communication, and technology planning that matches the pace of logistics operations.',
        ],
      },
      {
        heading: 'Technology that makes movement seamless',
        body: [
          'Transportation businesses need technology that keeps pace with dispatch, drivers, warehouses, yards, and management. Nexsate supports the systems behind routing, tracking, communication, documentation, customer updates, and daily administration.',
          'When hands-on work is required, our local service technicians can assist with device setup, cabling, network equipment, workstation deployment, connectivity, and maintenance, whether in the office, warehouse, yard, or field.',
          'Our local service techs can be on-site when needed, handling installations and maintenance. We do the job right the first time, setting your company up with the hardware, software, and networking solutions that seamlessly integrate all your tech.',
        ],
      },
      {
        heading: 'Our IT services for Transporters',
        items: [
          {
            title: 'Dispatch & User Support',
            text: 'Support for dispatchers, office teams, customer service staff, warehouse users, managers, and mobile workers dealing with everyday technical issues.',
          },
          {
            title: 'Network Design & Site Connectivity',
            text: 'Design and setup of networks for offices, warehouses, yards, terminals, remote branches, and connected work areas.',
          },
          {
            title: 'TMS, WMS & Fleet Software Support',
            text: 'Support for transportation management systems, warehouse platforms, fleet tools, routing software, accounting systems, customer portals, and reporting applications.',
          },
          {
            title: 'Hardware Procurement & Device Setup',
            text: 'Sourcing, configuring, and deploying desktops, laptops, tablets, printers, scanners, mobile devices, routers, switches, access points, and fleet-related technology.',
          },
          {
            title: 'Cabling, Wi-Fi & Yard Coverage',
            text: 'Structured cabling, fibre coordination, wireless coverage, network drops, equipment connections, and connectivity support for buildings, warehouses, docks, and yards.',
          },
          {
            title: 'Systems Maintenance & Availability',
            text: 'Ongoing maintenance for workstations, servers, software, updates, patches, device health, access issues, and performance concerns.',
          },
          {
            title: 'Automation & AI Workflow Support',
            text: 'Automation and AI-supported workflows for shipment updates, document handling, reporting, approvals, customer notifications, shared inbox activity, data entry, and operational alerts.',
          },
        ],
      },
      {
        heading: 'Stronger Visibility in Every Shipment',
        body: [
          'A stronger technology setup gives transportation and logistics teams better access to dispatch information, shipment records, customer communication, route data, and business systems. It reduces recurring issues, improves response times, limits avoidable costs, and keeps operations moving with fewer technology-related interruptions',
        ],
      },
    ],
    related: ['network-management', 'managed-it-services', 'industrial-manufacturing', 'erp-solutions'],
  },
]
