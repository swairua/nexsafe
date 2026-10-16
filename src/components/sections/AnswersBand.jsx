import { RichText } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"

export default function AnswersBand() {
  const content = useContent()
  const copy = content.faqTeaser || {}
  const sectionIds = content.sectionIds || {}
  const faq = (content.pages || {})['help-and-faq']
  const allItems = faq && Array.isArray(faq.sections) ? faq.sections.flatMap((s) => (Array.isArray(s.items) ? s.items : [])) : []
  const limitedItems = allItems.slice(0, 4)
  const half = Math.ceil(limitedItems.length / 2)
  return (
    <section id={sectionIds.support} className="bg-shell-gray-100 py-16 md:py-24">
      <div className="shell-container">
        <div>
          <Reveal variant="right" className="mb-5">
            <span className="inline-flex items-center rounded-full bg-brand-ink/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-ink ring-1 ring-brand-ink/25 shadow-[0_0_14px_2px_rgba(1,116,164,0.25)]">
              {copy.tag}
            </span>
            <h3 className="mt-2 bg-gradient-to-r from-[#0a1440] via-[#0174a4] to-[#0a1440] bg-clip-text text-xl font-bold tracking-tight text-transparent drop-shadow-[0_0_18px_rgba(1,116,164,0.25)] md:text-2xl">
              {copy.title}
            </h3>
          </Reveal>
          <div className="grid grid-cols-2 items-start gap-3">
            {[limitedItems.slice(0, half), limitedItems.slice(half)].map((column, c) => (
              <div key={c} className="space-y-3">
                {column.map((item, i) => (
                  <Reveal key={item.title + i} delay={c * half + i + 1}>
                    <details className="faq-item card-glow group rounded-2xl border border-shell-gray-300 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-ink open:border-brand-ink">
                      <summary className="flex min-h-[3.5rem] cursor-pointer list-none items-center justify-between gap-4 p-5 text-left font-bold text-shell-gray-900 [&::-webkit-details-marker]:hidden">
                        {item.title}
                        <span aria-hidden="true" className="faq-plus flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-shell-gray-100 text-lg leading-none transition-all duration-300 group-hover:scale-110 group-hover:text-brand-ink group-open:rotate-45">+</span>
                      </summary>
                      <div className="px-5 pb-5 text-sm leading-relaxed text-shell-gray-700 md:text-base">
                        <RichText value={item.text} />
                      </div>
                    </details>
                  </Reveal>
                ))}
              </div>
            ))}
          </div>
          {copy.cta ? (
            <Reveal delay={limitedItems.length + 1}>
              <div className="text-right">
                <a href={copy.cta.href} className="arrow-link mt-6 inline-block">
                  {copy.cta.label} <span className="arrow">→</span>
                </a>
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  )
}
