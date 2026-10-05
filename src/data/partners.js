// Vendor platforms — the named technologies from the "Our Technology Stack"
// section of the client-supplied Home Page document.
//
// The client lists these as platforms they "use and support", not as certified
// partnerships, so every entry is a platform rather than a partnership claim.
// logo is the brand mark in public/uploads, group is the stack area the
// vendor belongs to, which is what the
// homepage strip and the technology-stack page both render.
import { stackGroups } from './stack.js'

/** Canonical vendor name -> local brand mark. Used as the fallback when
 * CMS-stored content (which may predate the logo fields) lacks `logo`. */
export const vendorLogos = Object.fromEntries(
  stackGroups.flatMap((group) => group.vendors.map(({ name, logo }) => [name, logo])),
)

export const partners = [
  ...new Map(
    stackGroups.flatMap((group) =>
      group.vendors.map(({ name, logo }) => [name, { name, logo, area: group.title, group: group.id }]),
    ),
  ).values(),
]

/** Stack areas with their descriptions, for the technology-stack page. */
export const stack = stackGroups

export const partnerNames = partners.map((p) => p.name)
