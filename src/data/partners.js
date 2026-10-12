import { stackGroups } from './stack.js'

const MICROSOFT_PRODUCTS = new Set([
  'Microsoft Azure',
  'Microsoft 365',
  'Teams',
  'Exchange Online',
  'SharePoint',
  'OneDrive',
  'Office Apps',
  'Microsoft Defender',
])

const byName = new Map()
for (const group of stackGroups) {
  for (const { name, logo } of group.vendors) {
    const display = MICROSOFT_PRODUCTS.has(name) ? 'Microsoft' : name
    if (!byName.has(display)) {
      byName.set(display, { name: display, area: group.title, group: group.id, logo: logo || '' })
    }
  }
}

// External partners - these would be downloaded from partner sites
// and added here with their logo paths/URLs
const externalPartners = [
  { name: 'HPE', logo: '/uploads/stack-icons/hpe.svg', area: 'HPE Partner Program' },
  { name: 'Dell Technologies', logo: '/uploads/stack-icons/dell.svg', area: 'Dell Technologies Partner' },
  { name: 'Cisco', logo: '/uploads/stack-icons/cisco.svg', area: 'Cisco Partner Network' },
  { name: 'VMware', logo: '/uploads/stack-icons/vmware.svg', area: 'VMware Expert Program' },
]

export const partners = [...byName.values(), ...externalPartners]

export const stack = stackGroups

export const partnerNames = partners.map((p) => p.name)