import SectionTag, { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"

/**
 * Two-router splitter (Nanosoft pattern, nexsate.com substance): fully
 * managed vs co-managed, taken straight from FAQ Q1 ("What are your two
 * primary services?"). Routes visitors to the right next step before the
 * contact form.
 */
export default function DeptSplit() {
  const { deptSplit } = useContent()
  if (!deptSplit) return null
  const cards = [deptSplit.outsource, deptSplit.extend].filter(Boolean)
  if (!cards.length) return null
  return (
    <section className="bg-white">
      <div className="shell-container py-16 md:py-20">
        <Reveal variant="fade" className="mx-auto max-w-3xl text-center">
          <SectionTag>{deptSplit.tag}</SectionTag>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-shell-gray-900 sm:text-3xl md:text-4xl">
            {deptSplit.title}
          </h2>
          <div className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-shell-gray-700 md:text-lg"><Rich as="p">{deptSplit.text}</Rich></div>
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
          {cards.map((card, i) => (
            <Reveal
              key={card.title + i}
              variant="up"
              delay={i + 1}
              className="flex flex-col rounded-2xl border border-shell-gray-300 bg-shell-gray-100 p-6 transition-colors duration-300 hover:border-shell-cyan md:p-8"
            >
              <h3 className="text-lg font-bold leading-snug text-shell-gray-900 md:text-xl">
                {card.title}
              </h3>
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
      </div>
    </section>
  )
}
