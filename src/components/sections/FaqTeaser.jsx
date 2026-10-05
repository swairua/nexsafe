import SectionTag, { Rich, RichText } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"

/**
 * Homepage FAQ teaser (Kyndryl pattern): the first answers straight from the
 * FAQ page in a native accordion, so the two can never drift apart — plus a
 * through-link to the full list.
 */
export default function FaqTeaser() {
  const content = useContent()
  const copy = content.faqTeaser || {}
  const faq = (content.pages || {})['help-and-faq']
  const first = faq && Array.isArray(faq.sections) && faq.sections[0]
  const items = (first && Array.isArray(first.items) ? first.items : []).slice(0, 5)
  if (!items.length) return null
  return (
    <section className="bg-shell-gray-100 py-16 md:py-24">
      <div className="shell-container grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <Reveal variant="fade" className="lg:sticky lg:self-start lg:top-24">
          <SectionTag>{copy.tag}</SectionTag>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-shell-gray-900 sm:text-3xl md:text-4xl">
            {copy.title}
          </h2>
          <div className="mt-4 max-w-2xl text-base leading-relaxed text-shell-gray-700 md:text-lg"><Rich as="p">{copy.text}</Rich></div>
          {copy.cta ? (
            <a href={copy.cta.href} className="arrow-link mt-6 inline-block">
              {copy.cta.label} <span className="arrow">→</span>
            </a>
          ) : null}
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
      </div>
    </section>
  )
}
