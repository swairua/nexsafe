import { useRef, useState } from 'react'
import { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"
import { resolveSrc } from "../../utils/url.js"

const VISIBLE_GROUP_IDS = ['cloud-hosting', 'collaboration', 'security', 'network']

export default function StackSection() {
  const { stackGroups, stackSection, sectionIds } = useContent()
  const trackRef = useRef(null)
  const [openIds, setOpenIds] = useState(() => new Set())
  const visibleGroups = stackGroups.filter((group) => VISIBLE_GROUP_IDS.includes(group.id))

  const toggleGroup = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const nudge = (direction) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('[data-stack-card]')
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: direction * ((card?.getBoundingClientRect().width || track.clientWidth) + gap), behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <section id={sectionIds.capabilities} className="bg-[#f5f3ff] py-6 md:py-8">
      <div className="shell-container">
        <Reveal variant="fade">
          <span className="inline-flex items-center rounded-full bg-[#7c5cff]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#b19cd9] ring-1 ring-[#7c5cff]/25 shadow-[0_0_14px_2px_rgba(124,92,255,0.25)]">
            {stackSection.tag}
          </span>
          <Rich as="h2" className="mt-3 text-left text-3xl font-bold tracking-tight text-[#161d26] sm:text-4xl md:text-5xl">{stackSection.title}</Rich>
          {stackSection?.text ? (
            <div className="mt-4 text-left text-base leading-relaxed text-[#232b37] md:text-lg">
              <Rich as="p">{stackSection.text}</Rich>
            </div>
          ) : null}
        </Reveal>

        <div className="mx-auto mt-8 flex w-fit items-center gap-4 rounded-full border border-shell-gray-300 bg-white px-4 py-2 shadow-sm" role="group" aria-label="Technology stack carousel controls">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Show previous technology category"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-shell-red text-white transition-all duration-300 btn-lift-glow hover:bg-shell-red-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/50"
          >
            <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="text-sm font-bold text-[#161d26]">Our Technology Stack</span>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Show next technology category"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-shell-red text-white transition-all duration-300 btn-lift-glow hover:bg-shell-red-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/50"
          >
            <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label={stackSection.title}
          tabIndex={0}
          className="no-scrollbar -mx-1 mt-6 flex snap-x snap-mandatory items-start gap-5 overflow-x-auto scroll-smooth px-1 pb-6"
        >
          {visibleGroups.map((group, idx) => {
            const isOpen = openIds.has(group.id)
            const vendorListId = `stack-vendors-${group.id}`
            return (
              <Reveal
                key={group.id}
                variant="up"
                delay={(idx % 3) + 1}
                data-stack-card
                className="flex w-[88%] shrink-0 snap-start flex-col items-center rounded-2xl border border-shell-gray-300 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-ink hover:shadow-[inset_0_0_0_1px_rgba(1,116,164,0.6),0_0_0_3px_rgba(1,116,164,0.15),0_0_24px_3px_rgba(1,116,164,0.35),0_14px_30px_-12px_rgba(1,116,164,0.35)] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] md:p-7"
              >
                <h3 className="text-lg font-bold leading-snug text-[#161d26] md:text-xl">
                  {group.title}
                </h3>
                <div className="mt-3 text-sm leading-relaxed text-[#232b37]"><Rich as="p">{group.text}</Rich></div>
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  aria-expanded={isOpen}
                  aria-controls={vendorListId}
                  className="mt-4 flex items-center gap-2 self-start text-sm font-bold text-brand-ink transition-colors hover:text-[#7c5cff]"
                >
                  <span aria-hidden="true" className={`flex h-6 w-6 items-center justify-center rounded-full bg-shell-gray-100 text-base leading-none transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                  {isOpen ? 'View less' : 'View more'}
                </button>
                <div
                  id={vendorListId}
                  className={`stack-vendors grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden" aria-hidden={!isOpen}>
                <ul className="mt-4 divide-y divide-shell-gray-300">
                  {group.vendors.map((vendor) => {
                    const name = typeof vendor === 'string' ? vendor : vendor?.name
                    const logo = typeof vendor === 'string' ? '' : vendor?.logo
                    if (!name) return null
                    return (
                      <li key={name} className="flex min-h-10 items-center gap-3 py-2 text-sm font-medium text-[#232b37]">
                        {logo ? <img src={resolveSrc(logo)} alt="" className="h-6 w-6 shrink-0 object-contain" loading="lazy" /> : null}
                        <span>{name}</span>
                      </li>
                    )
                  })}
                </ul>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}