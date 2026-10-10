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

export const partners = [...byName.values()]

export const stack = stackGroups

export const partnerNames = partners.map((p) => p.name)
