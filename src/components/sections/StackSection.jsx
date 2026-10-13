import { useRef } from 'react'
import { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"
import { resolveSrc } from "../../utils/url.js"

export default function StackSection() {
  const { stackGroups, stackSection, partnerStrip, sectionIds } = useContent()
  const trackRef = useRef(null)

  const nudge = (direction) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('[data-stack-card]')
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: direction * ((card?.getBoundingClientRect().width || track.clientWidth) + gap), behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <section id={sectionIds.capabilities} className="bg-[#f4f6f8] py-16 md:py-24">
      <div className="shell-container">
        <Reveal variant="fade">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-ink md:text-sm">
            {stackSection.tag}
          </p>
          <h2 className="mt-3 max-w-5xl text-3xl font-bold tracking-tight text-shell-gray-900 sm:text-4xl md:text-5xl">
            {stackSection.title}
          </h2>
          {partnerStrip?.text ? (
            <div className="mt-4 max-w-3xl text-base leading-relaxed text-shell-gray-700 md:text-lg">
              <Rich as="p">{partnerStrip.text}</Rich>
            </div>
          ) : null}
        </Reveal>

        <div className="mx-auto mt-8 flex w-fit items-center gap-4 rounded-full border border-shell-gray-300/80 bg-white px-4 py-2 shadow-sm" role="group" aria-label="Technology stack carousel controls">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Show previous technology category"
            className="flex h-9 w-9 items-center justify-center rounded-full text-shell-gray-900 transition-colors hover:bg-shell-gray-100 active:scale-95"
          >
            <span aria-hidden="true">←</span>
          </button>
          <span className="text-sm font-bold text-shell-gray-900">Our Technology Stack</span>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Show next technology category"
            className="flex h-9 w-9 items-center justify-center rounded-full text-shell-gray-900 transition-colors hover:bg-shell-gray-100 active:scale-95"
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
          className="no-scrollbar -mx-1 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-3"
        >
          {stackGroups.map((group, idx) => (
            <Reveal
              key={group.id}
              variant="up"
              delay={(idx % 3) + 1}
              data-stack-card
              className="flex w-[88%] shrink-0 snap-start flex-col rounded-2xl border border-shell-gray-300/80 bg-white p-6 shadow-[0_14px_36px_-24px_rgba(14,17,20,0.25)] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] md:p-7"
            >
              <h3 className="text-lg font-bold leading-snug text-shell-gray-900 md:text-xl">
                {group.title}
              </h3>
              <div className="mt-3 min-h-16 text-sm leading-relaxed text-shell-gray-700"><Rich as="p">{group.text}</Rich></div>
              <ul className="mt-4 divide-y divide-shell-gray-300/80">
                {group.vendors.map((vendor) => {
                  const name = typeof vendor === 'string' ? vendor : vendor?.name
                  const logo = typeof vendor === 'string' ? '' : vendor?.logo
                  if (!name) return null
                  return (
                    <li key={name} className="flex min-h-10 items-center gap-3 py-2 text-sm font-medium text-shell-gray-900">
                      {logo ? <img src={resolveSrc(logo)} alt="" className="h-4 w-4 shrink-0 object-contain" loading="lazy" /> : null}
                      <span>{name}</span>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
