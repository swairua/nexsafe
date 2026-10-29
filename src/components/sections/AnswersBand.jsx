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
    <section id={sectionIds.support} className="bg-shell-gray-100 py-6 md:py-8">
      <div className="shell-container">
        <div>
          <Reveal variant="right" className="mb-5">
            <span className="inline-flex items-center rounded-full bg-[#7c5cff]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#b19cd9] ring-1 ring-[#7c5cff]/25 shadow-[0_0_14px_2px_rgba(124,92,255,0.25)]">
              {copy.tag}
            </span>
            <h3 className="mt-2 bg-gradient-to-r from-[#0a1440] via-[#7c5cff] to-[#0a1440] bg-clip-text text-xl font-bold tracking-tight text-transparent drop-shadow-[0_0_18px_rgba(124,92,255,0.25)] md:text-2xl">
              {copy.title}
            </h3>
          </Reveal>
          <div className="grid grid-cols-2 items-start gap-3">
            {[limitedItems.slice(0, half), limitedItems.slice(half)].map((column, c) => (
              <div key={c} className="space-y-3">
                {column.map((item, i) => (
                  <Reveal key={item.title + i} delay={c * half + i + 1}>
                    <details className="faq-item group rounded-2xl border border-shell-gray-300 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#7c5cff] hover:shadow-[inset_0_0_0_1px_rgba(124,92,255,0.5),0_0_0_3px_rgba(124,92,255,0.15),0_0_24px_3px_rgba(124,92,255,0.35),0_14px_30px_-12px_rgba(124,92,255,0.35)] open:border-[#7c5cff]">
                      <summary className="flex min-h-[3.5rem] cursor-pointer list-none items-center justify-between gap-4 p-5 text-left font-bold text-shell-gray-900 [&::-webkit-details-marker]:hidden">
                        {item.title}
                        <span aria-hidden="true" className="faq-plus flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-shell-gray-100 text-lg leading-none transition-all duration-300 group-hover:scale-110 group-hover:text-[#7c5cff] group-open:rotate-45">+</span>
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
                <a href={copy.cta.href} className="arrow-link relative inline-flex items-center gap-1 mt-6 rounded px-3 py-2 text-[0.95rem] font-medium normal-case tracking-normal text-[#1a1d21] transition-colors hover:text-[#0b1fb3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b1fb3]/50">
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
