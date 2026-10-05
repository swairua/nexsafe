import { useRef } from "react"
import SectionTag, { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"

/**
 * Recognition band (Kyndryl analyst-recognition pattern): the award badges
 * read live from the about-us page logos, numbered 01–05, in a touch-native
 * snap-scroll strip with arrow controls. No autoplay — pause-on-hover and
 * reduced-motion fallbacks come free with manual scroll.
 */
export default function AwardsBand() {
  const content = useContent()
  const copy = content.awardsBand || {}
  const about = (content.pages || {})['about-us']
  const badges = (about && about.logos) || []
  const trackRef = useRef(null)
  if (!badges.length) return null

  const nudge = (dir) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('[data-award-card]')
    const step = card ? card.getBoundingClientRect().width + 16 : 320
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section className="bg-shell-black pb-28 pt-16 text-white md:pb-36 md:pt-20">
      <div className="shell-container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal variant="fade" className="max-w-2xl">
            <SectionTag light>{copy.tag}</SectionTag>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              {copy.title}
            </h2>
            <div className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"><Rich as="p">{copy.text}</Rich></div>
          </Reveal>
          <Reveal delay={2} className="flex gap-2">
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
          </Reveal>
        </div>
      </div>
      <div className="shell-container mt-9">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        >
          {badges.map((b, i) => (
            <Reveal
              key={b.src + i}
              delay={(i % 5) + 1}
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
