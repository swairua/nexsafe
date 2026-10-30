import { useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import SectionHeading from '../ui/SectionHeading.jsx'
import { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"

function CountUp({
  value,
  suffix = '',
  duration = 1600,
  prefix = '',
}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return undefined
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.4, triggerOnce: true },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const num = parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0
  const fractional = num % 1 !== 0
  const decimals = fractional ? 1 : 0
  const startVal = 0

  const [display, setDisplay] = useState(prefix + num + suffix)

  useEffect(() => {
    if (!inView) return

    let frame = 0
    const startTime = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startVal + (num - startVal) * eased

      if (fractional) {
        setDisplay(prefix + current.toFixed(decimals) + suffix)
      } else {
        setDisplay(prefix + Math.round(current) + suffix)
      }

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setDisplay(prefix + num + suffix)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, num, prefix, suffix, duration, fractional, decimals])

  return (
    <span
      ref={ref}
      className={`stat-value ${inView ? 'is-animated' : ''}`}
    >
      {display}
    </span>
  )
}

export default function ProofBand() {
  const content = useContent()
  const copy = content.awardsBand || {}
  const stats = (content.statsBand && content.statsBand.items) || []
  const certs = (content.certStrip && content.certStrip.items) || []
  const about = (content.pages || {})['about-us']
  const badges = (about && about.logos) || []
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 36 })

  const scrollBy = (dir) => {
    if (!emblaApi) return
    if (dir < 0) emblaApi.scrollPrev()
    else emblaApi.scrollNext()
  }

  if (!stats.length && !certs.length && !badges.length) return null

  return (
    <section className="relative isolate grid grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr_1fr_auto] overflow-hidden">
      <div aria-hidden="true" className="z-0 col-start-1 row-start-1 row-end-3 bg-shell-black" />
      <div aria-hidden="true" className="z-0 col-start-1 row-start-3 row-end-5 bg-white" />
      <div className="shell-container relative z-10 col-start-1 row-start-1 pb-4 pt-8 md:pb-6 md:pt-10">
        <Reveal variant="fade">
          <SectionHeading eyebrow={copy.tag} title={copy.title} light titleClassName="text-2xl sm:text-3xl md:text-4xl" />
          <div className="mt-4 text-base font-medium leading-relaxed text-white md:text-lg"><Rich as="p">{copy.text}</Rich></div>
        </Reveal>

        {stats.length ? (
          <div className="stats-grid mt-10">
            {stats.map((s, i) => (
              <div key={s.label + i} className="text-center">
                <div className="rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-center shadow-sm">
                  <div className="text-3xl font-extrabold tracking-tight text-white">
                    <Reveal variant="fade" delay={i + 1}>
                      <CountUp value={s.value} />
                    </Reveal>
                  </div>
                  <dt className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/70">{s.label}</dt>
                </div>
              </div>
            ))}
          </div>
        ) : null }

        {certs.length ? (
          <div className="relative isolate mt-8">
             <ul className="flex flex-wrap items-stretch justify-center gap-3">
              {certs.map((c, i) => (
                <Reveal
                  key={c.name + i}
                  as="li"
                  delay={i + 1}
                  className="flex min-w-[12rem] flex-1 flex-col items-center rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-ink hover:shadow-[inset_0_0_0_1px_rgba(1,116,164,0.5),0_0_0_3px_rgba(1,116,164,0.2),0_0_24px_3px_rgba(1,116,164,0.4),0_14px_30px_-12px_rgba(1,116,164,0.4)] sm:flex-none sm:basis-56"
                >
                  <span className="text-base font-extrabold tracking-tight text-white">{c.name}</span>
                  <span className="mt-1 text-xs text-white/70">{c.note}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        ) : null }
      </div>

      <div className="shell-container relative z-10 col-start-1 row-start-2 row-end-4">
        <section className="bg-transparent pt-2 pb-2 md:pt-4 md:pb-3">
          <div className="shell-container">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center rounded-full bg-[#7c5cff]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#b19cd9] ring-1 ring-[#7c5cff]/25 shadow-[0_0_14px_2px_rgba(124,92,255,0.25)]">
                Awards &amp; recognition
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => scrollBy(-1)}
                  aria-label="Previous awards"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-shell-red text-white transition-all duration-300 btn-lift-glow hover:bg-shell-red-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/50"
                >
                  <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => scrollBy(1)}
                  aria-label="Next awards"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-shell-red text-white transition-all duration-300 btn-lift-glow hover:bg-shell-red-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/50"
                >
                  <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
            <div
              ref={emblaRef}
              role="region"
              aria-roledescription="carousel"
              aria-label="Awards & recognition"
              tabIndex={0}
              className="overflow-hidden"
            >
              <div className="flex gap-5 px-1 pb-6 pt-2">
                {badges.map((b, i) => (
                  <div
                    key={b.src + i}
                    className="min-w-0 shrink-0 flex-[0_0_70%] sm:flex-[0_0_50%] md:flex-[0_0_calc(33.333%-14px)] lg:flex-[0_0_calc(25%-15px)]"
                  >
                    <div className="flex h-full flex-col rounded-xl bg-[#f5f3ff] p-5 text-left shadow-[inset_0_0_0_2px_rgba(1,116,164,0.72),0_0_10px_rgba(1,116,164,0.16),0_14px_36px_-16px_rgba(14,17,20,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[inset_0_0_0_2px_rgba(1,116,164,1),0_0_0_4px_rgba(1,116,164,0.25),0_0_28px_4px_rgba(1,116,164,0.45),0_18px_44px_-12px_rgba(1,116,164,0.35)]">
                      <span className="text-xs font-extrabold tracking-widest text-shell-red">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="mt-3 flex h-24 items-center justify-center">
                        <img
                          src={b.src}
                          alt={b.alt || ''}
                          loading="lazy"
                          className="max-h-24 w-auto max-w-full object-contain"
                          onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
                        />
                      </span>
                      <span className="mt-3 text-center text-xs font-semibold leading-snug text-shell-gray-700">
                        {b.alt || ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div aria-hidden="true" className="z-0 col-start-1 row-start-4 h-4 md:h-6" />
    </section>
  )
}
