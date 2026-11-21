import { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { useContent } from "../../content/ContentContext.jsx"

const FALLBACK_VALUES = [
  { title: 'Integrity', text: 'We believe trust is earned through honesty, transparency, and responsible action. Nexsate communicates clearly about system issues, pricing, project timelines, and service expectations.' },
  { title: 'Dependability', text: 'We take ownership of the outcomes we deliver. When issues arise, we focus on resolving them quickly, professionally, and without shifting responsibility.' },
  { title: 'Customer-Centric', text: 'Technology support should make work easier, not more frustrating. We take time to understand each client\'s operations, challenges, and priorities so we can provide patient, practical, and responsive support.' },
  { title: 'Innovative', text: 'Technology is always changing, and businesses need a partner that can adapt with them. Nexsate stays current with emerging tools, cloud solutions, cybersecurity trends, automation, and AI-supported technologies.' },
]

export default function StartBand() {
  const content = useContent()
  const values = content.valuesStrip || {}
  const split = content.deptSplit || {}
  const about = (content.pages || {})['about-us']
  const section = about && Array.isArray(about.sections)
    ? about.sections.find((s) => /core value/i.test(s.heading || ''))
    : null
  const valuesData = section && Array.isArray(section.items) && section.items.length
    ? section.items
    : FALLBACK_VALUES
  const cards = [split.outsource, split.extend].filter(Boolean)
  return (
    <section className="overflow-hidden bg-brand-ink pt-2 pb-16 text-white md:pt-4 md:pb-24">
      <div className="shell-container">
        <Reveal variant="fade" className="max-w-3xl">
          <SectionHeading eyebrow={values.tag} title={values.title} light titleClassName="text-2xl sm:text-3xl md:text-4xl" />
          <div className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"><Rich as="p">{values.text}</Rich></div>
        </Reveal>
        {valuesData.length ? (
          <div className="mt-8 grid md:grid-cols-2 gap-6 md:gap-8">
            {valuesData.map((v, i) => (
              <Reveal
                key={v.title + i}
                variant="up"
                delay={i + 1}
                className="flex flex-col rounded-2xl bg-[rgba(255,255,255,0.08)] p-5 transition-transform duration-300 hover:bg-[rgba(255,255,255,0.12)] md:p-6"
              >
                <span className="text-xs uppercase tracking-wider text-shell-yellow mb-3 block">
                  {i + 1}
                </span>
                <h4 className="text-lg font-bold leading-snug text-white md:text-xl">
                  {v.title}
                </h4>
                <div className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
                  {v.text}
                </div>
              </Reveal>
            ))}
          </div>
        ) : null}
        {split.title && cards.length ? (
          <div className="mt-12">
            <Reveal variant="fade" className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-wider text-shell-yellow">{split.tag}</p>
              <h3 className="mt-2 text-xl font-bold tracking-tight md:text-2xl">{split.title}</h3>
              <div className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base"><Rich as="p">{split.text}</Rich></div>
            </Reveal>
            <div className="mt-7 grid max-w-4xl gap-5 md:grid-cols-2">
              {cards.map((card, i) => (
                <Reveal
                  key={card.title + i}
                  variant="up"
                  delay={i + 1}
                  className="flex flex-col rounded-2xl bg-[#f5f3ff] p-6 transition-transform duration-300 md:p-8"
                >
                  <h4 className="text-lg font-bold leading-snug text-shell-gray-900 md:text-xl">
                    {card.title}
                  </h4>
                  <div className="mt-3 flex-1 text-sm leading-relaxed text-shell-gray-700 md:text-base"><Rich as="p">{card.text}</Rich></div>
                  {card.cta ? (
                    <a href={card.cta.href} className="btn-pill btn-sweep mt-6 self-end">
                      {card.cta.label}
                      <span className="arrow" aria-hidden="true">→</span>
                    </a>
                  ) : null}
                </Reveal>
              ))}
            </div>
            <Reveal delay={cards.length + 1} className="mt-8 flex justify-end">
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
