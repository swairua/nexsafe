import { useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import SectionTag, { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"

/**
 * Logo slot on a technology card: the vendor's mark once the admin uploads
 * one (Content > Home > Partners > Logo), otherwise a dashed placeholder in
 * the same footprint so the row keeps its rhythm while marks are pending.
 * A broken file falls back to the placeholder too.
 */
function LogoSlot({ partner }) {
  const [failed, setFailed] = useState(false)
  const src = partner.logo && !failed ? partner.logo : ''
  if (!src) {
    return (
      <span
        data-logo-placeholder
        aria-hidden="true"
        className="mb-3 flex h-9 w-28 items-center justify-center rounded border border-dashed border-shell-gray-300 bg-white"
      >
        <svg className="h-4 w-4 text-shell-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="4.5" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="8.5" cy="10" r="1.6" fill="currentColor" />
          <path d="M4.5 17l4.5-4.5 3.5 3.5 2.5-2.5 4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </span>
    )
  }
  return (
    <span className="mb-3 flex h-9 items-center">
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        onError={() => setFailed(true)}
        className="max-h-9 max-w-full object-contain"
      />
    </span>
  )
}

/**
 * One technology card: logo slot (vendor mark or placeholder) above the
 * platform name and its capability area.
 */
function VendorTile({ partner }) {
  return (
    <div className="flex h-full min-h-[7rem] flex-col justify-center rounded-xl border border-shell-gray-300 bg-shell-gray-100 px-5 py-5 transition-colors duration-300 hover:border-shell-cyan">
      <LogoSlot partner={partner} />
      <span className="block text-sm font-bold text-shell-gray-900">
        {partner.name}
      </span>
      <span className="mt-1 block text-xs leading-relaxed text-shell-gray-500">
        {partner.area}
      </span>
    </div>
  )
}

/**
 * Technology strip: the platforms Nexsate uses and supports, drawn as an
 * auto-scrolling card row (embla + autoplay, same stack as the hero) that
 * also keeps the manual ←/→ controls — autoplay pauses while the pointer or
 * keyboard focus is over the row. Cards carry the admin-uploaded vendor logo
 * or a placeholder slot. Owns the `#partners` anchor used by the primary nav.
 */
export default function PartnerStrip() {
  const { partners, partnerStrip, sectionIds } = useContent()
  // Autoplay is skipped under prefers-reduced-motion (same gate Reveal uses);
  // the arrows still step the row on click.
  const reduceMotion = typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 36 },
    reduceMotion
      ? []
      : [Autoplay({ delay: 2400, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true })],
  )

  const scrollBy = (dir) => {
    if (!emblaApi) return
    if (dir < 0) emblaApi.scrollPrev()
    else emblaApi.scrollNext()
  }

  return (
    <section id={sectionIds.partners} className="bg-white py-16 md:py-24">
      <div className="shell-container">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <Reveal variant="fade">
            <SectionTag>{partnerStrip.tag}</SectionTag>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-shell-gray-900 sm:text-3xl md:text-4xl">
              {partnerStrip.title}
            </h2>
            <div className="mt-4 max-w-2xl text-base leading-relaxed text-shell-gray-700 md:text-lg"><Rich as="p">{partnerStrip.text}</Rich></div>
          </Reveal>
          <Reveal delay={2} className="flex items-center gap-3">
            <a href={partnerStrip.cta.href} className="arrow-link">
              {partnerStrip.cta.label} <span className="arrow">→</span>
            </a>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Scroll technology left"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-shell-gray-300 bg-white text-shell-gray-900 transition-colors hover:border-shell-red hover:bg-shell-red hover:text-white active:scale-95"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Scroll technology right"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-shell-gray-300 bg-white text-shell-gray-900 transition-colors hover:border-shell-red hover:bg-shell-red hover:text-white active:scale-95"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </Reveal>
        </div>

        <div
          ref={emblaRef}
          role="region"
          aria-roledescription="carousel"
          aria-label={partnerStrip.title}
          tabIndex={0}
          className="overflow-hidden"
        >
          <div className="flex gap-5 pb-3">
            {(partners || []).map((partner) => (
              <Reveal
                key={`${partner.group}-${partner.name}`}
                delay={1}
                className="min-w-0 flex-[0_0_80%] sm:flex-[0_0_calc(50%-10px)] lg:flex-[0_0_calc(33.333%-14px)] xl:flex-[0_0_calc(20%-16px)]"
              >
                <VendorTile partner={partner} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}