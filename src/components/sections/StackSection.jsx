import SectionTag, { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"
import { vendorLogos } from "../../data/partners.js"

/**
 * One vendor chip. CMS-stored groups may carry vendors as plain name strings
 * (predating the logo fields), so both shapes resolve through the canonical
 * name -> logo map. Unknown names render text-only - never a broken image.
 */
function VendorChip({ vendor }) {
  const name = typeof vendor === "string" ? vendor : vendor?.name
  if (!name) return null
  const src = (typeof vendor === "object" && vendor?.logo) || vendorLogos[name]
  return (
    <li className="flex items-center gap-2.5 rounded-full bg-shell-gray-100 py-1.5 pl-2 pr-4 text-sm font-semibold text-shell-gray-700">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
        {src ? (
          <img
            src={src}
            alt=""
            width="24"
            height="24"
            loading="lazy"
            className="max-h-6 max-w-[28px] object-contain"
            onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
          />
        ) : (
          <span aria-hidden="true" className="text-sm font-extrabold text-shell-gray-500">
            {name.slice(0, 1)}
          </span>
        )}
      </span>
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
