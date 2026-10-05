import SectionTag, { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"
import { vendorLogos } from "../../data/partners.js"

/**
 * One vendor tile: the real brand mark in a white slot, with the red letter
 * badge sitting behind it as the fallback (the mark is layered on top with an
 * opaque background, so if it ever fails to load the letter shows through).
 * CMS-stored entries may predate the logo fields, so the mark is resolved
 * through the canonical name -> logo map when the entry has none.
 */
function VendorTile({ partner, hidden }) {
  const src = partner.logo || vendorLogos[partner.name]
  return (
    <li
      className="mr-4 w-[19rem] shrink-0"
      aria-hidden={hidden ? "true" : undefined}
    >
      <div className="flex h-full items-center gap-4 rounded-xl border border-shell-gray-300 bg-shell-gray-100 px-5 py-5 transition-colors duration-300 hover:border-shell-cyan">
        <span className="relative flex h-[4.5rem] w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-shell-red to-shell-red-dark">
          <span aria-hidden="true" className="text-2xl font-extrabold text-white">
            {partner.name.slice(0, 1)}
          </span>
          {src ? (
            <img
              src={src}
              alt={partner.name}
              width="128"
              height="72"
              loading="lazy"
              className="relative h-full w-full bg-white object-contain p-1.5"
              onError={(e) => {
                // Drop the mark so the letter badge underneath becomes visible.
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : null}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-bold text-shell-gray-900">
            {partner.name}
          </span>
          <span className="block truncate text-xs text-shell-gray-500">
            {partner.area}
          </span>
        </span>
      </div>
    </li>
  )
}

/**
 * Vendor wall: the platforms Nexsate uses and support, drawn as a continuous
 * left-to-right marquee of real brand marks. The roster is rendered twice so
 * the loop is seamless - the second pass is aria-hidden. Owns the `#partners`
 * anchor; hovering the wall pauses it (see .vendor-wall in index.css).
 */
export default function PartnerStrip() {
  const { partners, partnerStrip, sectionIds } = useContent()
  const loop = [...partners, ...partners]
  return (
    <section id={sectionIds.partners} className="bg-white py-16 md:py-20">
      <div className="shell-container">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <Reveal variant="fade">
            <SectionTag>{partnerStrip.tag}</SectionTag>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-shell-gray-900 sm:text-3xl md:text-4xl">
              {partnerStrip.title}
            </h2>
            <div className="mt-4 max-w-2xl text-base leading-relaxed text-shell-gray-700 md:text-lg"><Rich as="p">{partnerStrip.text}</Rich></div>
          </Reveal>
          <Reveal as="a" href={partnerStrip.cta.href} delay={2} className="arrow-link">
            {partnerStrip.cta.label} <span className="arrow">→</span>
          </Reveal>
        </div>
      </div>

      {/* Full-bleed marquee - deliberately outside .shell-container so the
          marks run edge to edge, with the mask softening both ends. */}
      <div className="vendor-wall mt-2" tabIndex={0}>
        <ul className="vendor-wall__track">
          {loop.map((partner, i) => (
            <VendorTile
              key={`${partner.group}-${partner.name}-${i}`}
              partner={partner}
              hidden={i >= partners.length}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}