import { useRef, useState } from 'react'
import { pageHref } from '../../data/slug.js'
import SectionTag, { Rich } from '../ui/SectionTag.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from '../../content/ContentContext.jsx'

export default function CardGrid() {
  const { featuredCards, servicesSection, sectionIds } = useContent()
  const trackRef = useRef(null)

  const allCards = featuredCards || []
  const tabCards = {
    core: allCards.filter((c) =>
      ['Managed IT', 'Cloud', 'Network'].includes(c.tag)
    ),
    security: allCards.filter((c) =>
      !['Managed IT', 'Cloud', 'Network'].includes(c.tag)
    ),
  }

  const [activeTab, setActiveTab] = useState('core')

  const tabs = [
    { id: 'core', label: 'Core IT' },
    { id: 'security', label: 'Security & Recovery' },
  ]

  const selected = tabCards[activeTab]
  if (selected.length === 0) return null

  return (
    <section id={sectionIds.itSolutions} className="relative overflow-hidden bg-shell-gray-100 py-20 md:py-28">
      <div className="shell-container relative">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <Reveal variant="fade">
            <SectionTag>{servicesSection.tag}</SectionTag>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-shell-gray-900 sm:text-3xl md:text-4xl">
              {servicesSection.title}
            </h2>
          </Reveal>
          <div className="flex items-center gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Reveal variant="fade" delay={2}>
                <a
                  href={pageHref('Services & Solutions')}
                  className="arrow-link"
                >
                  {servicesSection.linkLabel} <span className="arrow">→</span>
                </a>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="mb-12 flex flex-wrap gap-3" role="tablist" aria-label={servicesSection.title}>
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={activeTab === t.id}
              aria-controls={`panel-${t.id}`}
              id={`tab-${t.id}`}
              onClick={() => setActiveTab(t.id)}
              className={`relative rounded-full px-6 py-2.5 text-sm font-bold tracking-wide transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-shell-red/50 ${
                activeTab === t.id
                  ? 'bg-shell-red text-white'
                  : 'bg-white text-shell-gray-600 hover:bg-shell-gray-100'
              }`}
            >
              {t.label}
              {activeTab === t.id && (
                <span
                  className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-shell-red/40"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>

        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {selected.map((card, idx) => (
            <Reveal key={card.id} delay={(idx % 3) + 1}>
              <a
                href={card.href}
                className="group flex h-full flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_8px_24px_-12px_rgba(10,20,64,0.18)] ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-[0_18px_44px_-12px_rgba(10,20,64,0.28)]"
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
                  <span className="arrow-link mt-auto text-sm">
                    {card.linkLabel} <span className="arrow">→</span>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
