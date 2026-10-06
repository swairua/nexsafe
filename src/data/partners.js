// Vendor platforms — the named technologies from the "Our Technology Stack"
// section of the client-supplied Home Page document.
//
// The client lists these as platforms they "use and support", never as
// partners, so every entry is a platform capability rather than a
// partnership or endorsement claim. Marks are never hardcoded here: each
// entry carries an empty `logo` that only an admin upload fills
// (Content > Home > Partners > Logo); the strip shows a placeholder until
// then (see the audit note in `stack.js` before approving a mark).
// group is the stack area the vendor belongs to, which is what the
// homepage strip and the technology-stack page both render.
import { stackGroups } from './stack.js'

// Marquee-only consolidation: every Microsoft-family product in the roster
// collapses to a single "Microsoft" card. Product names such as SharePoint
// or Office are licensed individually, so listing them can read as a
// licensing claim we cannot make — naming the company only is the safer
// presentation. This lookup affects the scrolling strip alone; `stack.js`
// keeps the client document's product names for the technology-stack
// section chips and page (both read `stackGroups` directly).
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

// First occurrence wins: a merged vendor keeps the position and stack area
// of its earliest group (Microsoft lands where Microsoft Azure sat, under
// "Cloud & hosting platforms").
const byName = new Map()
for (const group of stackGroups) {
  for (const { name, logo } of group.vendors) {
    const display = MICROSOFT_PRODUCTS.has(name) ? 'Microsoft' : name
    if (!byName.has(display)) {
      // `logo` stays empty by default: the strip shows a placeholder slot
      // until an admin uploads the vendor's mark (Content > Home > Partners >
      // Logo). Never hardcode a mark here — only admin-supplied files render.
      byName.set(display, { name: display, area: group.title, group: group.id, logo: logo || '' })
    }
  }
}

export const partners = [...byName.values()]

/** Stack areas with their descriptions, for the technology-stack page. */
export const stack = stackGroups

export const partnerNames = partners.map((p) => p.name)
