import { useRef } from 'react'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"
import { resolveSrc } from "../../utils/url.js"

export default function CaseStudies() {
  const { caseCards, sectionIds } = useContent()
  const items = caseCards.items || []
  if (!items.length) return null

  const emblaRef = useRef(null)

  return (
    <>
      <section id={sectionIds.caseStudies} className="relative isolate bg-white pt-12 pb-6 md:pt-20 md:pb-10">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[calc(100%-16rem)] bg-[#111c55] md:h-[calc(100%-13.5rem)]" />
        <div className="shell-container relative z-10">
          <Reveal variant="fade">
            <SectionHeading eyebrow={caseCards.tag} title={caseCards.title} light titleClassName="sm:text-4xl md:text-5xl" />
          </Reveal>

          <div
            ref={emblaRef}
            className="no-scrollbar -mx-1 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-3"
          >
            {items.map((card, idx) => (
              <Reveal
                key={card.brand + idx}
                variant="up"
                delay={(idx % 3) + 1}
                className="flex w-[88%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-shell-gray-300 bg-white p-6 shadow-[0_14px_36px_-24px_rgba(124,92,255,0.25)] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] md:p-0"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
                  <img
                    src={resolveSrc(card.image)}
                    alt={card.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    style={{ filter: `brightness(0.7) saturate(1.1) hue-rotate(-10deg)` }}
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{ backgroundColor: card.tint, opacity: 0.35, mixBlendMode: 'multiply' }}
                  />
                </div>
<div className="flex min-h-[10rem] flex-1 flex-col bg-[#0972d3]/80 p-6">
                <span className="text-sm font-bold uppercase tracking-wider text-white/80">{card.brand}</span>
                <h3 className="mt-2 text-lg font-bold leading-snug text-white">{card.title}</h3>
                <a
                  href={card.href}
                  className="mt-auto inline-flex items-center gap-2 self-end rounded-full bg-shell-red px-6 py-2.5 text-sm font-bold tracking-wide text-white transition-all duration-300 btn-lift-glow hover:bg-shell-red-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/50"
                >
                  Read story
                  <span className="arrow" aria-hidden="true">→</span>
                </a>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
