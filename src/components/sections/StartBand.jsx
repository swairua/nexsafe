import SectionTag, { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"

/**
 * Start band: values words plus the fully/co-managed router cards in one dark
 * section. Merges the former ValuesStrip and DeptSplit — value names read
 * live from the about-us page, router copy quotes FAQ Q1, so neither half
 * can drift apart.
 */
const FALLBACK_VALUES = ['Integrity', 'Dependability', 'Customer-Centric', 'Innovative']

export default function StartBand() {
  const content = useContent()
  const values = content.valuesStrip || {}
  const split = content.deptSplit || {}
  const about = (content.pages || {})['about-us']
  const section = about && Array.isArray(about.sections)
    ? about.sections.find((s) => /core value/i.test(s.heading || ''))
    : null
  const words = section && Array.isArray(section.items) && section.items.length
    ? section.items.map((it) => it.title).filter(Boolean)
    : FALLBACK_VALUES
  const cards = [split.outsource, split.extend].filter(Boolean)
  return (
    <section className="overflow-hidden bg-shell-black py-16 text-white md:py-24">
      <div className="shell-container">
        <Reveal variant="fade" className="max-w-3xl">
          <SectionTag light>{values.tag}</SectionTag>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            {values.title}
          </h2>
          <div className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"><Rich as="p">{values.text}</Rich></div>
        </Reveal>
        {words.length ? (
          <ul className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            {words.map((w, i) => (
              <Reveal as="li" key={w + i} delay={i + 1}>
                <span className="text-3xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-4xl">
                  {w}
                </span>
                {i < words.length - 1 ? (
                  <span aria-hidden="true" className="ml-8 hidden text-2xl font-extrabold text-shell-red sm:inline">·</span>
                ) : null}
              </Reveal>
            ))}
          </ul>
        ) : null}
        {split.title && cards.length ? (
          <div className="mt-12">
            <Reveal variant="fade" className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-wider text-shell-green">{split.tag}</p>
              <h3 className="mt-2 text-xl font-bold tracking-tight md:text-2xl">{split.title}</h3>
              <div className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base"><Rich as="p">{split.text}</Rich></div>
            </Reveal>
            <div className="mt-7 grid max-w-4xl gap-5 md:grid-cols-2">
              {cards.map((card, i) => (
                <Reveal
                  key={card.title + i}
                  variant="up"
                  delay={i + 1}
                  className="flex flex-col rounded-2xl bg-white p-6 transition-transform duration-300 hover:-translate-y-1 md:p-8"
                >
                  <h4 className="text-lg font-bold leading-snug text-shell-gray-900 md:text-xl">
                    {card.title}
                  </h4>
                  <div className="mt-3 flex-1 text-sm leading-relaxed text-shell-gray-700 md:text-base"><Rich as="p">{card.text}</Rich></div>
                  {card.cta ? (
                    <a href={card.cta.href} className="btn-pill btn-sweep mt-6 self-start">
                      {card.cta.label}
                      <span className="arrow" aria-hidden="true">→</span>
                    </a>
                  ) : null}
                </Reveal>
              ))}
            </div>
            <Reveal delay={cards.length + 1} className="mt-8">
              <a href="#/about-us" className="btn-pill btn-pill--primary">
                About us <span aria-hidden="true">→</span>
              </a>
            </Reveal>
          </div>
        ) : null}
      </div>
    </section>
  )
}
