import SectionTag from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { partners } from '../../data/partners.js'
import { partnerStrip } from '../../data/content.js'

/**
 * Vendor wall: the platforms Nexsate holds partner status with today. Vendors
 * whose agreements are still being finalised (SAP, Oracle) are labelled rather
 * than hidden, so the site never implies a certification we do not yet hold.
 * Owns the `#partners` anchor.
 */
export default function PartnerStrip() {
  return (
    <section id="partners" className="bg-white py-16 md:py-20">
      <div className="shell-container">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <Reveal variant="fade">
            <SectionTag>{partnerStrip.tag}</SectionTag>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-shell-gray-900 sm:text-3xl md:text-4xl">
              {partnerStrip.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-shell-gray-700 md:text-lg">
              {partnerStrip.text}
            </p>
          </Reveal>
          <Reveal as="a" href={partnerStrip.cta.href} delay={2} className="arrow-link">
            {partnerStrip.cta.label} <span className="arrow">→</span>
          </Reveal>
        </div>

        <Reveal delay={2}>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {partners.map((partner) => (
              <li key={`${partner.group}-${partner.name}`}>
                <div className="flex h-full items-center gap-3 rounded-xl border border-shell-gray-300 bg-shell-gray-100 px-4 py-4 transition-colors duration-300 hover:border-shell-cyan">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-shell-red to-shell-red-dark text-sm font-extrabold text-white"
                  >
                    {partner.name.slice(0, 1)}
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
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
