// Vendor platforms — the named technologies from the "Our Technology Stack"
// section of the client-supplied Home Page document.
//
// The client lists these as platforms they "use and support", not as certified
// partnerships, so every entry is a platform rather than a partnership claim.
// `group` is the stack area the vendor belongs to, which is what the
// homepage strip and the technology-stack page both render.
import { stackGroups } from './stack.js'

export const partners = stackGroups.flatMap((group) =>
  group.vendors.map((name) => ({ name, area: group.title, group: group.id })),
)

/** Stack areas with their descriptions, for the technology-stack page. */
export const stack = stackGroups

export const partnerNames = partners.map((p) => p.name)
