import { useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Rich } from '../ui/SectionTag.jsx'
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
        className="max-h-12 w-full object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </span>
  )
}

function VendorTile({ partner }) {
  return (
    <div className="group flex h-full min-h-[6.5rem] items-center justify-center rounded-xl border border-shell-gray-300 bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-ink hover:shadow-[inset_0_0_0_1px_rgba(1,116,164,0.6),0_0_0_3px_rgba(1,116,164,0.15),0_0_24px_3px_rgba(1,116,164,0.35),0_14px_30px_-12px_rgba(1,116,164,0.35)]">
      <LogoSlot partner={partner} />
      <span className="sr-only">{partner.name}</span>
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
    <section id={sectionIds.partners} className="bg-white py-8 md:py-10">
      <div className="shell-container">
        <div className="relative grid gap-6 md:grid-cols-[minmax(0,26%)_minmax(0,1fr)] md:items-center">
          <div className="md:z-10 md:flex md:flex-col md:justify-center md:bg-white md:pr-6 lg:pr-10">
            <Reveal variant="fade">
              <span className="inline-flex items-center rounded-full bg-brand-ink/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-ink ring-1 ring-brand-ink/25 shadow-[0_0_14px_2px_rgba(1,116,164,0.25)]">
                {partnerStrip.tag}
              </span>
              <Rich as="h2" className="mt-3 bg-gradient-to-r from-[#0a1440] via-[#0174a4] to-[#0a1440] bg-clip-text text-2xl font-bold tracking-tight text-transparent drop-shadow-[0_0_18px_rgba(1,116,164,0.25)] sm:text-3xl lg:text-3xl">{partnerStrip.title}</Rich>
              <div className="mt-4 text-base font-medium leading-relaxed text-shell-gray-900"><Rich as="p">{partnerStrip.text}</Rich></div>
            </Reveal>
          </div>

          <div
            ref={emblaRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={partnerStrip.title}
            tabIndex={0}
            className="overflow-hidden md:min-h-0"
          >
            <div className="flex gap-5 px-1 pb-6 pt-2 md:min-h-0 md:items-center">
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
      </div>
    </section>
  )
}
