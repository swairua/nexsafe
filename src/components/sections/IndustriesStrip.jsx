import SectionTag from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { industriesStrip } from '../../data/content.js'

/**
 * Compact industries band: the doc says we do not need every industry on the
 * homepage, so six recognisable sectors appear as chips with a corporate-blue
 * sweep button through to the full Who We Serve list. Owns the `#industries`
 * anchor used by the primary nav.
 */
export default function IndustriesStrip() {
  return (
    <section id="industries" className="bg-shell-gray-100 py-16 md:py-24">
      <div className="shell-container max-w-4xl text-center">
        <Reveal variant="fade">
          <SectionTag>{industriesStrip.tag}</SectionTag>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-shell-gray-900 sm:text-3xl md:text-4xl">
            {industriesStrip.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-shell-gray-700 md:text-lg">
            {industriesStrip.text}
          </p>
        </Reveal>

        <Reveal delay={2} className="mt-9">
          <ul className="flex flex-wrap justify-center gap-3">
            {industriesStrip.items.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-shell-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-shell-gray-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-shell-red hover:text-shell-red hover:shadow-[0_12px_26px_-14px_rgba(10,127,250,0.7)]"
                >
                  {item.label}
                  <span className="text-xs font-medium text-shell-gray-500 transition-colors group-hover:text-shell-red">
                    {item.note}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={3} className="mt-10">
          <a href={industriesStrip.cta.href} className="btn-pill btn-sweep">
            {industriesStrip.cta.label}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
