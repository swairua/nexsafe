import { useLayoutEffect, useRef, useState } from 'react'
import { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"
import { resolveSrc } from "../../utils/url.js"

// Two-tone treatment per Landing Commentary: the navy band runs from the top of
// the section down to EXACTLY the bottom edge of the card images; below that
// line the section is white and the card text panels hang across the seam.
// The cut can't be hard-coded (image height scales with viewport via
// aspect-[16/10]), so we measure the first image row and expose it as --cut.
export default function CaseStudies() {
  const { caseCards, sectionIds } = useContent()
  const items = caseCards.items || []
  if (!items.length) return null

  return <CaseStudiesInner caseCards={caseCards} sectionIds={sectionIds} items={items} />
}

function CaseStudiesInner({ caseCards, sectionIds, items }) {
  const sectionRef = useRef(null)
  const firstImageRef = useRef(null)
  const [cut, setCut] = useState(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const image = firstImageRef.current
    if (!section || !image) return

    // offsetTop chain ignores CSS transforms (entry animations), so the band
    // lands exactly on the image bottom even while cards are mid-animation.
    const measure = () => {
      let top = 0
      let el = image
      while (el && el !== section) {
        top += el.offsetTop
        el = el.offsetParent
      }
      if (el !== section) return
      setCut(top + image.offsetHeight)
    }

    measure()
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(measure)
      ro.observe(image)
      ro.observe(section)
      return () => ro.disconnect()
    }
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [items])

  return (
    <section
      ref={sectionRef}
      id={sectionIds.caseStudies}
      className="relative bg-white pb-12 md:pb-16"
      style={{ '--cut': cut ? `${cut}px` : '100%' }}
    >
      {/* Navy band behind heading + card image row; ends exactly at the image bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 bg-shell-black"
        style={{ height: 'var(--cut)' }}
      />

      <div className="shell-container relative">
        <Reveal variant="fade">
          <span className="inline-flex items-center rounded-full bg-[#7c5cff]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#b19cd9] ring-1 ring-[#7c5cff]/25 shadow-[0_0_14px_2px_rgba(124,92,255,0.25)]">
            {caseCards.tag}
          </span>
          <Rich as="h2" className="mt-3 text-left text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">{caseCards.title}</Rich>
        </Reveal>

        <div className="no-scrollbar -mx-1 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-6">
          {items.map((card, idx) => (
            <Reveal
              key={card.brand + idx}
              variant="up"
              delay={(idx % 3) + 1}
              className="flex w-[88%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl shadow-[0_18px_44px_-12px_rgba(10,20,64,0.45)] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
            >
              <div ref={idx === 0 ? firstImageRef : undefined} className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={resolveSrc(card.image)}
                  alt={card.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  style={{ filter: `brightness(0.85) saturate(1.1) hue-rotate(-10deg)` }}
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ backgroundColor: card.tint, opacity: 0.35, mixBlendMode: 'multiply' }}
                />
              </div>
              {/* Text panel rides the seam: same color as the notice bar (brand-ink/90) */}
              <div className="flex flex-1 flex-col bg-brand-ink/90 p-6 md:p-7">
                <span className="text-sm font-bold uppercase tracking-wider text-white/60">{card.brand}</span>
                <h3 className="mt-2 text-lg font-bold leading-snug text-white">{card.title}</h3>
                <a
                  href={card.href}
                  className="mt-4 inline-flex items-center gap-1 self-start text-sm font-bold text-white transition-colors hover:text-shell-yellow"
                >
                  Read story
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
