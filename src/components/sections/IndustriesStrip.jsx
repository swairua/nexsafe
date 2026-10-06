import { useRef } from 'react'
import Reveal from '../ui/Reveal.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import { useContent } from "../../content/ContentContext.jsx"

/** Industry tile art: the five NanoSoft reference SVGs render as images;
 *  the four extra Nexsate sectors use inline line icons drawn in the same
 *  two-tone cyan style (bright #24ccfd + pale #8fc3e0). */
function IndustryIcon({ icon, label }) {
  if (typeof icon === 'string' && icon.startsWith('/uploads/')) {
    return (
      <img src={icon} alt="" aria-hidden="true" width={64} height={64} className="h-16 w-16" loading="lazy" />
    )
  }
  const common = {
    className: 'h-16 w-16',
    viewBox: '0 0 64 64',
    fill: 'none',
    'aria-hidden': 'true',
  }
  const bright = '#24ccfd'
  const pale = '#8fc3e0'
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
  // lock (default — fintech)
  return (
    <svg {...common}>
      <rect x="16" y="27" width="32" height="25" rx="3" stroke={pale} strokeWidth="2.5" />
      <path d="M22 27v-7a10 10 0 0 1 20 0v7" stroke={pale} strokeWidth="2.5" />
      <circle cx="32" cy="39" r="3.5" stroke={bright} strokeWidth="2.5" />
    </svg>
  )
}

/**
 * Dark industries band: split header (eyebrow + H2 left, supporting copy
 * right) above a manual-scroll tile strip — same interaction as the services
 * strip above. Owns the `#industries` anchor used by the primary nav.
 */
export default function IndustriesStrip() {
  const { industriesStrip, caseCards, sectionIds } = useContent()
  const trackRef = useRef(null)

  const nudge = (dir) => {
    const el = trackRef.current
    if (!el) return
    const reduce = typeof window !== 'undefined'
      && typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // One "page" = the visible width, so arrows page through the tiles.
    el.scrollBy({ left: dir * el.clientWidth * 0.92, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section
      id={sectionIds.industries}
      className="bg-[#1e1432] pb-24 pt-16 md:pb-32 md:pt-24"
    >
      <div className="shell-container">
        <div className="grid items-end gap-6 lg:grid-cols-2 lg:gap-12">
          <Reveal variant="fade">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-shell-yellow">
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
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-shell-yellow hover:text-shell-yellow active:scale-95"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                aria-label="Scroll industries right"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-shell-yellow hover:text-shell-yellow active:scale-95"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </Reveal>
        </div>

        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label={industriesStrip.title}
          tabIndex={0}
          className="no-scrollbar -mx-1 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-3"
        >
          {(industriesStrip.items || []).map((item, idx) => (
            <Reveal
              key={item.label}
              delay={(idx % 5) + 1}
              className="w-[68%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(20%-16px)]"
            >
              <a
                href={item.href}
                className="group flex h-full min-h-[15rem] flex-col items-center rounded-lg border border-white/10 bg-white/[0.03] px-6 py-8 text-center transition-colors duration-300 hover:border-shell-yellow/60 hover:bg-white/[0.06]"
              >
                <IndustryIcon icon={item.icon} label={item.label} />
                <span className="mt-5 text-base font-bold text-white">
                  {item.label}
                </span>
                {item.note ? (
                  <span className="mt-2 text-sm leading-relaxed text-white/60">
                    {item.note}
                  </span>
                ) : null}
              </a>
            </Reveal>
          ))}
        </div>

        {(caseCards?.items || []).length ? (
          <div className="mt-14 md:mt-16">
            <Reveal variant="fade" className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-shell-yellow">
                {caseCards.tag}
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {caseCards.title}
              </h3>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {(caseCards.items || []).map((card, idx) => (
                <Reveal
                  key={card.title + idx}
                  variant="up"
                  delay={idx + 1}
                >
                  <a
                    href={card.href}
                    className="group relative flex h-full min-h-[19rem] flex-col justify-end overflow-hidden rounded-xl p-6 text-left shadow-[0_24px_60px_-24px_rgba(0,0,0,0.65)] md:min-h-[21rem] md:p-7"
                  >
                    <SmartImage
                      src={card.image}
                      alt=""
                      aria-hidden="true"
                      fallback={card.fallback || card.tint}
                      className="absolute inset-0 h-full w-full"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{ backgroundColor: card.tint, opacity: 0.72, mixBlendMode: 'multiply' }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                    />
                    <span className="relative text-2xl font-extrabold lowercase tracking-tight text-white md:text-[1.7rem]">
                      {card.brand}
                      <span className="text-shell-yellow">.</span>
                    </span>
                    <span className="relative mt-2 max-w-[16rem] text-sm font-semibold leading-snug text-white md:text-base">
                      {card.title}
                    </span>
                    <span className="relative mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white/85 transition-colors group-hover:text-shell-yellow">
                      Read story <span aria-hidden="true">→</span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}

      </div>
    </section>
  )
}
