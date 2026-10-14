import { useRef } from 'react'
import Reveal from '../ui/Reveal.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import { useContent } from "../../content/ContentContext.jsx"
import { resolveSrc } from "../../utils/url.js"

function IndustryIcon({ icon, label }) {
  if (typeof icon === 'string' && icon.startsWith('/uploads/')) {
    return (
      <img src={resolveSrc(icon)} alt="" aria-hidden="true" width={64} height={64} className="h-16 w-16" loading="lazy" />
    )
  }
  const common = {
    className: 'h-16 w-16',
    viewBox: '0 0 64 64',
    fill: 'none',
    'aria-hidden': 'true',
  }
  const bright = '#0693e3'
  const pale = '#0a1440'
  if (icon === 'truck') {
    return (
      <svg {...common}>
        <path d="M6 22h30v20H6zM36 29h9l9 8v5H36" stroke={pale} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="15" cy="45" r="4.5" stroke={pale} strokeWidth="2.5" />
        <circle cx="45" cy="45" r="4.5" stroke={pale} strokeWidth="2.5" />
        <path d="M10 22l7-9h13l-4 9" stroke={bright} strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    )
  }
  if (icon === 'briefcase') {
    return (
      <svg {...common}>
        <rect x="10" y="20" width="44" height="28" rx="3" stroke={pale} strokeWidth="2.5" />
        <path d="M24 20v-5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v5M10 31h44" stroke={pale} strokeWidth="2.5" />
        <rect x="27" y="28" width="10" height="6" rx="1.5" stroke={bright} strokeWidth="2.5" />
      </svg>
    )
  }
  if (icon === 'heart') {
    return (
      <svg {...common}>
        <path d="M10 12l22-5 22 5v13c0 14-10 23-22 27C20 48 10 39 10 25V12Z" stroke={pale} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M39 24a6.5 6.5 0 0 0-7 4.5A6.5 6.5 0 0 0 25 24a6.2 6.2 0 0 0-6 6.3c0 5.3 4.4 10.4 13 15.7 8.6-5.3 13-10.4 13-15.7A6.2 6.2 0 0 0 39 24Z" stroke={bright} strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <rect x="16" y="27" width="32" height="25" rx="3" stroke={pale} strokeWidth="2.5" />
      <path d="M22 27v-7a10 10 0 0 1 20 0v7" stroke={pale} strokeWidth="2.5" />
      <circle cx="32" cy="39" r="3.5" stroke={bright} strokeWidth="2.5" />
    </svg>
  )
}

export default function IndustriesStrip() {
  const { industriesStrip, caseCards, sectionIds } = useContent()
  const trackRef = useRef(null)

  const nudge = (dir) => {
    const el = trackRef.current
    if (!el) return
    const reduce = typeof window !== 'undefined'
      && typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    el.scrollBy({ left: dir * el.clientWidth * 0.92, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section
      id={sectionIds.industries}
      className="relative isolate overflow-hidden bg-[#060f3d] pt-20 md:pt-28"
    >
      <div className="shell-container">
        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-12">
          <Reveal variant="fade">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-ink">
              {industriesStrip.tag}
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              {industriesStrip.title}
            </h2>
          </Reveal>

          <Reveal delay={2} className="flex flex-wrap items-end justify-between gap-4 lg:justify-end">
            <p className="max-w-xl text-base leading-relaxed text-white/70">
              {industriesStrip.text}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => nudge(-1)}
                aria-label="Scroll industries left"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-shell-gray-300 bg-white text-shell-gray-900 transition-colors hover:border-brand-ink hover:bg-brand-ink hover:text-white active:scale-95"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                aria-label="Scroll industries right"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-shell-gray-300 bg-white text-shell-gray-900 transition-colors hover:border-brand-ink hover:bg-brand-ink hover:text-white active:scale-95"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </Reveal>
        </div>

        <div className="relative isolate mt-10">
          <div
            ref={trackRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={industriesStrip.title}
            tabIndex={0}
            className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-3"
          >
            {(industriesStrip.items || []).map((item, idx) => (
              <Reveal
                key={item.label}
                delay={(idx % 5) + 1}
                className="w-[68%] shrink-0 snap-start sm:w-[calc(50%-10px)]"
              >
                <a
                  href={item.href}
                  className="group flex h-full min-h-[15rem] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#111c55] px-6 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-[#162366]"
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0a1240] ring-1 ring-[#1fa2e0]/60 transition-colors duration-300 group-hover:bg-[#0d1850]">
                    <span className="icon-draw block transition-transform duration-300 group-hover:-translate-y-1">
                      <IndustryIcon icon={item.icon} label={item.label} />
                    </span>
                  </span>
                  <span className="mt-5 text-base font-bold text-white">
                    {item.label}
                  </span>
                  {item.note ? (
                    <span className="mt-2 text-sm leading-relaxed text-white/70">
                      {item.note}
                    </span>
                  ) : null}
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="relative mt-20 md:mt-24">
          <div aria-hidden="true" className="absolute left-1/2 top-[67%] bottom-[-100vh] w-screen -translate-x-1/2 bg-white" />
          <div className="relative rounded-3xl bg-white p-8 pb-0 md:p-12 md:pb-0">
          <Reveal variant="fade">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-ink">
              {caseCards.tag}
            </p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-shell-gray-900 sm:text-3xl">
              {caseCards.title}
            </h3>
          </Reveal>
          <div className="relative isolate mt-10">
          <div className="grid gap-6 md:grid-cols-3">
            {(caseCards.items || []).map((card, idx) => (
              <Reveal key={card.title + idx} variant="up" delay={idx + 1}>
                <a
                  href={card.href}
                  className="group flex h-full flex-col overflow-hidden glass-brand rounded-2xl border border-white/40 bg-[rgba(1,90,128,0.6)] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_24px_-16px_rgba(1,116,164,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_18px_40px_-16px_rgba(1,116,164,0.7)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <SmartImage src={card.image} alt="" aria-hidden="true" fallback={card.fallback || card.tint} className="absolute inset-0 h-full w-full" imgClassName="transition-transform duration-500 group-hover:scale-105" />
                    <span aria-hidden="true" className="absolute inset-0" style={{ backgroundColor: card.tint, opacity: 0.28, mixBlendMode: 'multiply' }} />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    {card.industry ? (
                      <span className="mb-3 inline-flex w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white">
                        {card.industry}
                      </span>
                    ) : null}
                    <span className="text-2xl font-extrabold lowercase tracking-tight text-white md:text-[1.7rem]">
                      {card.brand}
                      <span className="text-shell-yellow">.</span>
                    </span>
                    <span className="mt-2 max-w-[16rem] text-sm font-semibold leading-snug text-white md:text-base [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]">
                      {card.title}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-bold uppercase tracking-[0.18em] text-white">
                      Read story <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          </div>
          {caseCards.cta ? (
            <a href={caseCards.cta.href} className="arrow-link mt-10 inline-block">
              {caseCards.cta.label} <span className="arrow">→</span>
            </a>
          ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
