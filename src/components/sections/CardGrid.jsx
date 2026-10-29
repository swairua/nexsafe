import { useState } from 'react'
import { Rich } from '../ui/SectionTag.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from '../../content/ContentContext.jsx'

const PAGE_SIZE = 3

export default function CardGrid() {
  const { featuredCards, servicesSection, sectionIds } = useContent()
  const [page, setPage] = useState(0)

  const allCards = featuredCards || []
  if (allCards.length === 0) return null

  const lastPage = Math.max(0, Math.ceil(allCards.length / PAGE_SIZE) - 1)
  const cards = allCards.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  return (
<section id={sectionIds.itSolutions} className="values-cycle-bg relative overflow-hidden bg-white py-6 md:py-8">
      <div className="shell-container relative">
        <Reveal variant="fade" className="mb-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <SectionHeading eyebrow={servicesSection.tag} title={servicesSection.title} titleClassName="text-2xl sm:text-3xl md:text-4xl" />
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                aria-label="Previous services"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-shell-gray-300 bg-[#f5f3ff] text-shell-gray-900 transition-colors hover:border-brand-ink hover:bg-brand-ink hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-shell-gray-300 disabled:hover:bg-[#f5f3ff] disabled:hover:text-shell-gray-900"
              >
                <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
                disabled={page === lastPage}
                aria-label="Next services"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-shell-gray-300 bg-[#f5f3ff] text-shell-gray-900 transition-colors hover:border-brand-ink hover:bg-brand-ink hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-shell-gray-300 disabled:hover:bg-[#f5f3ff] disabled:hover:text-shell-gray-900"
              >
                <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, idx) => (
            <Reveal key={card.id} delay={(idx % 3) + 1}>
              <a
                href={card.href}
                className="group flex h-full flex-col overflow-hidden rounded-[16px] bg-[#f5f3ff] shadow-[0_8px_24px_-12px_rgba(10,20,64,0.18)] ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-[0_18px_44px_-12px_rgba(10,20,64,0.28)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SmartImage
                    src={card.image}
                    alt={card.alt || card.title}
                    fallback={card.fallback}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-shell-red px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    {card.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-3 text-lg font-bold leading-snug text-shell-gray-900 md:text-xl">
                    {card.title}
                  </h3>
                  <div className="mb-5 text-sm leading-relaxed text-shell-gray-700">
                    <Rich>{card.text}</Rich>
                  </div>
                  <span className="arrow-link mt-auto self-end text-sm">
                    {card.linkLabel} <span className="arrow">→</span>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <a
            href={servicesSection.ctaHref}
            className="inline-flex items-center rounded-full bg-shell-red px-6 py-2.5 text-sm font-bold tracking-wide text-white transition-all duration-300 btn-lift-glow hover:bg-shell-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/50"
          >
            {servicesSection.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
