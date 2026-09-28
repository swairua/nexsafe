// Vendor partnerships, as confirmed by Nexsate. Single source of truth for the
// homepage partner strip, the "Our Partners" page and the "Partner ecosystem"
// page — add or retire a vendor here and every surface follows.
//
// `status: 'partner'` means an agreement is in place today. SAP and Oracle are
// agreements in progress: until their status flips to 'partner', copy must not
// describe them as held or certified.

export const partners = [
  { name: 'Microsoft', area: 'Cloud, licensing and Microsoft 365', status: 'partner' },
  { name: 'ServiceNow', area: 'Service management and workflow automation', status: 'partner' },
  { name: 'Enboarder', area: 'Employee experience and onboarding', status: 'partner' },
  { name: 'SAP', area: 'Enterprise resource planning', status: 'in-progress' },
  { name: 'Oracle', area: 'Databases and enterprise applications', status: 'in-progress' },
  { name: 'Cisco', area: 'Networking, switching and wireless', status: 'partner' },
  { name: 'Fortinet', area: 'Secure networking and firewalls', status: 'partner' },
  { name: 'Veeam', area: 'Backup and disaster recovery', status: 'partner' },
  { name: 'SentinelOne', area: 'Endpoint and workload protection', status: 'partner' },
  { name: 'Dell', area: 'Servers, storage and workstations', status: 'partner' },
  { name: 'Lenovo', area: 'Notebooks and managed endpoints', status: 'partner' },
  { name: 'HP', area: 'PCs, notebooks and managed print', status: 'partner' },
]

export const activePartners = partners.filter((p) => p.status === 'partner')
export const upcomingPartners = partners.filter((p) => p.status === 'in-progress')

/** "Microsoft — Cloud, licensing and Microsoft 365" bullets for page sections. */
const bullets = (list) => list.map((p) => `${p.name} — ${p.area}`)
export const partnerBullets = bullets(activePartners)
export const upcomingBullets = bullets(upcomingPartners)

/** Plain name lists, e.g. for prose sentences. */
export const partnerNames = activePartners.map((p) => p.name)
export const upcomingNames = upcomingPartners.map((p) => p.name)