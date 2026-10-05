import SectionTag, { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"

/**
 * Values strip (Nanosoft giant-words pattern, nexsate.com substance): the
 * core-value names read live from the about-us page, so admin edits flow
 * through — with static fallbacks. Dark band, oversized uppercase words.
 */
const FALLBACK_VALUES = ['Integrity', 'Dependability', 'Customer-Centric', 'Innovative']

export default function ValuesStrip() {
  const content = useContent()
  const copy = content.valuesStrip || {}
  const about = (content.pages || {})['about-us']
  const section = about && Array.isArray(about.sections)
    ? about.sections.find((s) => /core value/i.test(s.heading || ''))
    : null
  const words = section && Array.isArray(section.items) && section.items.length
    ? section.items.map((it) => it.title).filter(Boolean)
    : FALLBACK_VALUES
  if (!words.length) return null
  return (
    <section className="overflow-hidden bg-shell-black py-14 text-white md:py-20">
      <div className="shell-container">
        <Reveal variant="fade" className="max-w-3xl">
          <SectionTag light>{copy.tag}</SectionTag>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            {copy.title}
          </h2>
          <div className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"><Rich as="p">{copy.text}</Rich></div>
        </Reveal>
      </div>
      <div className="shell-container mt-9">
        <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
          {words.map((w, i) => (
            <Reveal as="li" key={w + i} delay={i + 1}>
              <span className="text-3xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-4xl md:text-5xl">
                {w}
              </span>
              {i < words.length - 1 ? (
                <span aria-hidden="true" className="ml-8 hidden text-2xl font-extrabold text-shell-red sm:inline">·</span>
              ) : null}
            </Reveal>
          ))}
        </ul>
      </div>
      <div className="shell-container mt-9">
        <Reveal delay={words.length + 1}>
          <a href="#/about-us" className="btn-pill btn-pill--green">
            About us <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
