import SectionTag, { Rich, RichText } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"

/**
 * Answers band: the promo CTA beside the FAQ accordion in one section.
 * Merges the former PromoBanner and FaqTeaser — the accordion answers read
 * live from the help-and-faq page, so the two can never drift apart.
 */
export default function AnswersBand() {
  const content = useContent()
  const promo = content.promo || {}
  const copy = content.faqTeaser || {}
  const faq = (content.pages || {})['help-and-faq']
  const first = faq && Array.isArray(faq.sections) && faq.sections[0]
  const items = (first && Array.isArray(first.items) ? first.items : []).slice(0, 5)
  return (
    <section className="bg-shell-gray-100 py-16 md:py-24">
      <div className="shell-container grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <Reveal variant="fade" className="lg:sticky lg:self-start lg:top-24">
          <span className="mb-4 inline-block border-l-4 border-shell-yellow pl-3 text-sm font-bold uppercase tracking-[0.16em] text-shell-gray-900">
            {promo.tag}
          </span>
          <h2 className="max-w-xl text-2xl font-bold leading-tight tracking-tight text-shell-gray-900 sm:text-3xl md:text-4xl">
            {promo.title}
          </h2>
          <div className="mt-4 max-w-xl text-base leading-relaxed text-shell-gray-700 md:text-lg"><Rich as="p">{promo.text}</Rich></div>
          {promo.cta ? (
            <a href={promo.cta.href} className="btn-pill mt-8 bg-white text-shell-gray-900 hover:bg-shell-gray-100">
              {promo.cta.label}
              <span aria-hidden="true">→</span>
            </a>
          ) : null}
        </Reveal>
        <div>
          <Reveal variant="fade" className="mb-5">
            <SectionTag>{copy.tag}</SectionTag>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-shell-gray-900 md:text-2xl">
              {copy.title}
            </h3>
          </Reveal>
          <div className="space-y-3">
            {items.map((item, i) => (
              <Reveal key={item.title + i} delay={i + 1}>
                <details className="group rounded-2xl border border-shell-gray-300 bg-white open:shadow-[0_18px_44px_-16px_rgba(14,17,20,0.25)]">
                  <summary className="flex min-h-[3.5rem] cursor-pointer list-none items-center justify-between gap-4 p-5 text-left font-bold text-shell-gray-900 [&::-webkit-details-marker]:hidden">
                    {item.title}
                    <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-shell-gray-100 text-lg leading-none transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm leading-relaxed text-shell-gray-700 md:text-base">
                    <RichText value={item.text} />
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
          {copy.cta ? (
            <Reveal delay={items.length + 1}>
              <a href={copy.cta.href} className="arrow-link mt-6 inline-block">
                {copy.cta.label} <span className="arrow">→</span>
              </a>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  )
}
