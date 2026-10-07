import SectionTag, { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"
import { resolveSrc } from "../../utils/url.js"

/**
 * One vendor chip: the platform name as text only. Logos stay out of the
 * chips until each vendor's approved mark is supplied (see stack.js audit
 * note) — CMS groups may carry vendors as plain strings or { name } objects,
 * so both shapes resolve to the name.
 */
function VendorChip({ vendor }) {
  const name = typeof vendor === "string" ? vendor : vendor?.name
  const logo = typeof vendor === "string" ? "" : vendor?.logo
  if (!name) return null
  return (
    <li className="inline-flex items-center gap-2 rounded-full bg-shell-gray-100 px-3 py-1.5 text-sm font-semibold text-shell-gray-700">
      {logo ? (
        <img src={resolveSrc(logo)} alt="" className="h-4 w-4 shrink-0 rounded object-contain" loading="lazy" />
      ) : null}
      {name}
    </li>
  )
}

/**
 * Technology-stack band: the four platform areas and the named vendors from
 * the client-supplied Home Page document. Owns the `#capabilities` anchor.
 * Rendered on light so it reads as a reference list, not a marketing wall.
 */
export default function StackSection() {
  const { stackGroups, stackSection, sectionIds } = useContent()
  return (
    <section id={sectionIds.capabilities} className="relative bg-white pb-16 md:pb-24">
      <div className="shell-container">
        {/* Heading card straddles the awards band boundary (Nanosoft overlap):
            dark text stays on the white card, never on the dark band. */}
        <Reveal
          variant="fade"
          className="relative -mt-20 max-w-3xl rounded-2xl border border-shell-gray-300 bg-white p-6 shadow-[0_24px_60px_-24px_rgba(14,17,20,0.4)] md:-mt-28 md:p-8"
        >
          <SectionTag>{stackSection.tag}</SectionTag>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-shell-gray-900 sm:text-3xl md:text-4xl">
            {stackSection.title}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {stackGroups.map((group, idx) => (
            <Reveal
              key={group.id}
              variant="up"
              delay={(idx % 2) + 1}
              className="rounded-2xl border border-shell-gray-300 bg-white p-6 shadow-[0_18px_44px_-20px_rgba(14,17,20,0.3)] md:p-7"
            >
              <h3 className="text-lg font-bold leading-snug text-shell-gray-900 md:text-xl">
                {group.title}
              </h3>
              <div className="mt-3 text-sm leading-relaxed text-shell-gray-700 md:text-base"><Rich as="p">{group.text}</Rich></div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.vendors.map((vendor) => (
                  <VendorChip key={typeof vendor === "string" ? vendor : vendor.name} vendor={vendor} />
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
