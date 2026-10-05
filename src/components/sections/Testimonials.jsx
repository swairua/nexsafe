import SectionTag, { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"

/**
 * Testimonials: client quotes ported verbatim from nexsate.com/reviews-awards.
 * Owns no anchor.
 */
export default function Testimonials() {
  const { testimonials } = useContent()
  if (!testimonials) return null
  const items = testimonials.items || []
  if (!items.length) return null
  return (
    <section className="bg-shell-gray-100 py-16 md:py-24">
      <div className="shell-container">
        <Reveal variant="fade" className="mx-auto max-w-3xl text-center">
          <SectionTag>{testimonials.tag}</SectionTag>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-shell-gray-900 sm:text-3xl md:text-4xl">
            {testimonials.title}
          </h2>
          <div className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-shell-gray-700 md:text-lg"><Rich as="p">{testimonials.text}</Rich></div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <Reveal
              key={t.name + i}
              variant="up"
              delay={i + 1}
              className="flex flex-col rounded-2xl border border-shell-gray-300 bg-white p-6 md:p-7"
            >
              <div className="flex gap-1 text-shell-yellow" aria-label="5 out of 5 stars">
                {['★', '★', '★', '★', '★'].map((s, j) => (
                  <span key={j} aria-hidden="true" className="text-lg leading-none">{s}</span>
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-shell-gray-700 md:text-base">
                “{t.quote}”
              </blockquote>
              <p className="mt-5 text-sm font-bold text-shell-gray-900">{t.name}</p>
              <p className="mt-0.5 text-xs text-shell-gray-500">{t.role}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
