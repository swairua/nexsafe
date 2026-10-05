import { useRef } from "react"
import SectionTag, { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"

/**
 * Proof band: stats + certifications + award badges in one dark section.
 * Merges the former TrustStrip and AwardsBand so the homepage earns its
 * scroll — all three read live sources (statsBand/certStrip keys and the
 * about-us page logos), so nothing here can drift apart.
 */
export default function ProofBand() {
  const content = useContent()
  const copy = content.awardsBand || {}
  const stats = (content.statsBand && content.statsBand.items) || []
  const certs = (content.certStrip && content.certStrip.items) || []
  const about = (content.pages || {})['about-us']
  const badges = (about && about.logos) || []
  const trackRef = useRef(null)
  if (!stats.length && !certs.length && !badges.length) return null

  const nudge = (dir) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('[data-award-card]')
    const step = card ? card.getBoundingClientRect().width + 16 : 320
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section className="bg-shell-black py-16 text-white md:py-20">
      <div className="shell-container">
        <Reveal variant="fade" className="max-w-3xl">
          <SectionTag light>{copy.tag}</SectionTag>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            {copy.title}
          </h2>
          <div className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"><Rich as="p">{copy.text}</Rich></div>
        </Reveal>

        {stats.length ? (
          <dl className="mt-10 grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label + i} variant="fade" delay={i + 1}>
                <dd className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">{s.value}</dd>
                <dt className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/60">{s.label}</dt>
              </Reveal>
            ))}
          </dl>
        ) : null}

        {certs.length ? (
          <ul className="mt-8 flex flex-wrap items-stretch justify-center gap-3">
            {certs.map((c, i) => (
              <Reveal
                key={c.name + i}
                as="li"
                delay={i + 1}
                className="flex min-w-[12rem] flex-1 flex-col items-center rounded-xl bg-white/10 px-5 py-4 text-center sm:flex-none sm:basis-56"
              >
                <span className="text-base font-extrabold tracking-tight text-white">{c.name}</span>
                <span className="mt-1 text-xs text-white/60">{c.note}</span>
              </Reveal>
            ))}
          </ul>
        ) : null}

        {badges.length ? (
          <div className="mt-10">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-wider text-white/60">Awards & recognition</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => nudge(-1)}
                  aria-label="Previous awards"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-shell-red hover:bg-shell-red"
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  type="button"
                  onClick={() => nudge(1)}
                  aria-label="Next awards"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-shell-red hover:bg-shell-red"
                >
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
            <div ref={trackRef} className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
              {badges.map((b, i) => (
                <div
                  key={b.src + i}
                  data-award-card
                  className="flex w-56 shrink-0 snap-start flex-col rounded-2xl bg-white p-5"
                >
                  <span className="text-xs font-extrabold tracking-widest text-shell-red">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-3 flex h-24 items-center justify-center">
                    <img
                      src={b.src}
                      alt={b.alt || ""}
                      loading="lazy"
                      className="max-h-24 w-auto max-w-full object-contain"
                      onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
                    />
                  </span>
                  <span className="mt-3 text-center text-xs font-semibold leading-snug text-shell-gray-700">
                    {b.alt || ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
