import SectionTag, { RichText } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"

export default function AnswersBand() {
  const content = useContent()
  const copy = content.faqTeaser || {}
  const sectionIds = content.sectionIds || {}
  const faq = (content.pages || {})['help-and-faq']
  const first = faq && Array.isArray(faq.sections) && faq.sections[0]
  const items = (first && Array.isArray(first.items) ? first.items : []).slice(0, 4)
  return (
    <section id={sectionIds.support} className="bg-shell-gray-100 py-16 md:py-24">
      <div className="shell-container max-w-5xl">
        <div>
          <Reveal variant="right" className="mb-5">
            <SectionTag>{copy.tag}</SectionTag>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-shell-gray-900 md:text-2xl">
              {copy.title}
            </h3>
          </Reveal>
          <div className="grid items-start gap-3 md:grid-flow-col md:grid-rows-2">
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
