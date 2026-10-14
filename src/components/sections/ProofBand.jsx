import { useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import SectionTag, { Rich } from '../ui/SectionTag.jsx'
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
      <div className="shell-container relative z-10 col-start-1 row-start-1 pb-12 pt-20 md:pb-16 md:pt-28">
        <Reveal variant="fade">
          <SectionTag>{copy.tag}</SectionTag>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            {copy.title}
          </h2>
          <div className="mt-4 text-base leading-relaxed text-white/70 md:text-lg"><Rich as="p">{copy.text}</Rich></div>
        </Reveal>

        {stats.length ? (
          <div className="stats-grid mt-10">
            {stats.map((s, i) => (
              <div key={s.label + i} className="text-center">
                <div className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                  <Reveal variant="fade" delay={i + 1}>
                    <CountUp value={s.value} />
                  </Reveal>
                </div>
                <dt className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/50">{s.label}</dt>
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
                  className="flex min-w-[12rem] flex-1 flex-col items-center rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-center sm:flex-none sm:basis-56"
                >
                  <span className="text-base font-extrabold tracking-tight text-white">{c.name}</span>
                  <span className="mt-1 text-xs text-white/60">{c.note}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        ) : null }
      </div>

      <div className="shell-container relative z-10 col-start-1 row-start-2 row-end-4">
        <section className="bg-white py-12 md:py-16">
          <div className="shell-container">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-wider text-shell-gray-900">Awards &amp; recognition</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => scrollBy(-1)}
                  aria-label="Previous awards"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-shell-gray-300 text-shell-gray-900 transition-colors hover:border-brand-ink hover:text-brand-ink"
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollBy(1)}
                  aria-label="Next awards"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-shell-gray-300 text-shell-gray-900 transition-colors hover:border-brand-ink hover:text-brand-ink"
                >
                  <span aria-hidden="true">→</span>
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
              <div className="flex gap-5 pb-3">
                {badges.map((b, i) => (
                  <div
                    key={b.src + i}
                    className="min-w-0 shrink-0 flex-[0_0_70%] sm:flex-[0_0_50%] md:flex-[0_0_calc(33.333%-14px)] lg:flex-[0_0_calc(25%-15px)]"
                  >
                    <div className="flex h-full flex-col rounded-xl bg-white p-5 text-left shadow-[0_14px_36px_-16px_rgba(14,17,20,0.25)] transition-shadow duration-300 hover:shadow-[inset_0_0_0_1px_rgba(1,116,164,0.45),0_0_16px_rgba(1,116,164,0.22),0_14px_36px_-16px_rgba(14,17,20,0.25)]">
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

      <div aria-hidden="true" className="z-0 col-start-1 row-start-4 h-20 md:h-28" />
    </section>
  )
}
