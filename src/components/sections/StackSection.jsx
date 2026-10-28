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
    <section id={sectionIds.capabilities} className="bg-shell-black py-6 md:py-8">
      <div className="shell-container">
        <Reveal variant="fade">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b19cd9] md:text-sm">
            {stackSection.tag}
          </p>
          <Rich as="h2" className="mt-3 text-left text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">{stackSection.title}</Rich>
          {stackSection?.text ? (
            <div className="mt-4 text-left text-base leading-relaxed text-white/80 md:text-lg">
              <Rich as="p">{stackSection.text}</Rich>
            </div>
          ) : null}
        </Reveal>

        <div className="mx-auto mt-8 flex w-fit items-center gap-4 rounded-full border border-white/15 bg-white/5 px-4 py-2 shadow-sm" role="group" aria-label="Technology stack carousel controls">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Show previous technology category"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 active:scale-95"
          >
            <span aria-hidden="true">←</span>
          </button>
          <span className="text-sm font-bold text-white">Our Technology Stack</span>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Show next technology category"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 active:scale-95"
          >
            <span aria-hidden="true">→</span>
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
                className="flex w-[88%] shrink-0 snap-start flex-col rounded-2xl border border-white/15 bg-white/5 p-6 shadow-[0_14px_36px_-24px_rgba(124,92,255,0.25)] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] md:p-7"
              >
                <h3 className="text-lg font-bold leading-snug text-white md:text-xl">
                  {group.title}
                </h3>
                <div className="mt-3 text-sm leading-relaxed text-white/70"><Rich as="p">{group.text}</Rich></div>
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  aria-expanded={isOpen}
                  aria-controls={vendorListId}
                  className="mt-4 flex items-center gap-2 self-start text-sm font-bold text-[#b19cd9] transition-colors hover:text-white"
                >
                  <span aria-hidden="true" className={`flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-base leading-none transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                  {isOpen ? 'View less' : 'View more'}
                </button>
                <div
                  id={vendorListId}
                  className={`stack-vendors grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden" aria-hidden={!isOpen}>
                <ul className="mt-4 divide-y divide-white/10">
                  {group.vendors.map((vendor) => {
                    const name = typeof vendor === 'string' ? vendor : vendor?.name
                    const logo = typeof vendor === 'string' ? '' : vendor?.logo
                    if (!name) return null
                    return (
                      <li key={name} className="flex min-h-10 items-center gap-3 py-2 text-sm font-medium text-white">
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