import { useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import SectionTag, { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"
import { resolveSrc } from "../../utils/url.js"

function LogoSlot({ partner }) {
  const [failed, setFailed] = useState(false)
  const src = partner.logo && !failed ? resolveSrc(partner.logo) : ''
  if (!src) {
    return (
      <span
        data-logo-placeholder
        aria-hidden="true"
        className="flex h-12 w-28 shrink-0 items-center justify-center rounded border border-dashed border-shell-gray-300 bg-white">
        <svg className="h-6 w-6 text-shell-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="4.5" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="8.5" cy="10" r="1.6" fill="currentColor" />
          <path d="M4.5 17l4.5-4.5 3.5 3.5 2.5-2.5 4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </span>
    )
  }
  return (
    <span className="flex h-12 w-28 shrink-0 items-center justify-center">
      <img
        src={src}
        alt={partner.name}
        aria-hidden="true"
        loading="lazy"
        onError={() => setFailed(true)}
        className="max-h-12 w-full object-contain"
      />
    </span>
  )
}

function VendorTile({ partner }) {
  return (
    <div className="flex h-full min-h-[6.5rem] items-center gap-4 rounded-xl border border-white/15 bg-white/5 px-5 py-4 transition-colors duration-300 hover:border-white/30 hover:bg-white/10">
      <LogoSlot partner={partner} />
      <span className="h-10 w-px shrink-0 bg-white/20" aria-hidden="true" />
      <span className="flex flex-1 items-center justify-center text-center text-sm font-bold leading-snug text-white">
        {partner.name}
      </span>
    </div>
  )
}

export default function PartnerStrip() {
  const { partners, partnerStrip, sectionIds } = useContent()

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
    <section id={sectionIds.partners} className="bg-shell-black py-16 md:py-24">
      <div className="shell-container">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <Reveal variant="fade">
            <SectionTag>{partnerStrip.tag}</SectionTag>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              {partnerStrip.title}
            </h2>
            <div className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"><Rich as="p">{partnerStrip.text}</Rich></div>
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
                className="min-w-0 flex-[0_0_80%] sm:flex-[0_0_calc(50%-10px)] lg:flex-[0_0_calc(33.333%-14px)] xl:flex-[0_0_calc(20%-16px)]">
                <VendorTile partner={partner} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}