import { useRef } from 'react'
import { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"

function iconGlyph(name) {
  const glyphs = {
    factory: '🏭',
    heart: '❤️',
    bank: '🏦',
    book: '📚',
    truck: '🚚',
    gear: '⚙️',
    briefcase: '💼',
    landmark: '🏛️',
  }
  return glyphs[name] || '🏢'
}

export default function IndustriesStrip() {
  const { industriesStrip, sectionIds } = useContent()
  const trackRef = useRef(null)
  const items = industriesStrip.items || []

  const nudge = (direction) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('[data-industry-card]')
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: direction * ((card?.getBoundingClientRect().width || track.clientWidth) + gap), behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  if (!items.length) return null

  return (
    <section id={sectionIds.industries} className="bg-shell-black pb-8 pt-10 md:pb-10 md:pt-14">
      <div className="shell-container">
        <Reveal variant="fade">
          <span className="inline-flex items-center rounded-full bg-[#7c5cff]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#b19cd9] ring-1 ring-[#7c5cff]/25 shadow-[0_0_14px_2px_rgba(124,92,255,0.25)]">
            {industriesStrip.tag}
          </span>
          <Rich as="h2" className="mt-4 text-left text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">{industriesStrip.title}</Rich>
          {industriesStrip?.text ? (
            <div className="mt-4 text-left text-base leading-relaxed text-white/80 md:text-lg">
              <Rich as="p">{industriesStrip.text}</Rich>
            </div>
          ) : null}
        </Reveal>

        <div className="mx-auto mt-8 flex w-fit items-center gap-4 rounded-full border border-white/15 bg-white/5 px-4 py-2 shadow-sm" role="group" aria-label="Industry carousel controls">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Show previous industries"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-shell-red text-white transition-all duration-300 btn-lift-glow hover:bg-shell-red-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/50"
          >
            <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="text-sm font-bold text-white">Industries</span>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Show next industries"
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
          aria-label={industriesStrip.title}
          tabIndex={0}
          className="no-scrollbar -mx-1 mt-6 flex snap-x snap-mandatory items-start gap-5 overflow-x-auto scroll-smooth px-1 pb-6"
        >
          {items.map((item, idx) => (
            <Reveal
              key={item.label + idx}
              as="a"
              href={item.href || '#industries'}
              variant="up"
              delay={(idx % 3) + 1}
              data-industry-card
              className="group flex w-[88%] shrink-0 snap-start flex-col items-center rounded-2xl border border-white/15 bg-white/5 p-6 shadow-[0_14px_36px_-24px_rgba(124,92,255,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-ink/60 hover:bg-white/10 sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] md:p-7"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl text-white">
                {iconGlyph(item.icon)}
              </div>
              <h3 className="mt-4 text-lg font-bold leading-snug text-white md:text-xl">
                {item.label}
              </h3>
              {item.note ? (
                <div className="mt-3 text-sm leading-relaxed text-white/70"><Rich as="p">{item.note}</Rich></div>
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}