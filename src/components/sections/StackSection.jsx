import { useRef } from 'react'
import { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"
import { resolveSrc } from "../../utils/url.js"

const VENDOR_LOGOS = [
  { name: 'AWS', src: '/uploads/stack-icons/amazon-web-services.svg' },
  { name: 'Azure', src: '/uploads/stack-icons/microsoft-azure.svg' },
  { name: 'Google Cloud', src: '/uploads/stack-icons/google-cloud.svg' },
  { name: 'DigitalOcean', src: '/uploads/stack-icons/digital-ocean.svg' },
]

export default function StackSection() {
  const { stackSection, sectionIds } = useContent()
  const trackRef = useRef(null)

  const nudge = (direction) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('[data-vendor-card]')
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 0
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: direction * ((card?.getBoundingClientRect().width || track.clientWidth) + gap), behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <section id={sectionIds.capabilities} className="bg-[#f5f3ff] py-6 md:py-8">
      <div className="shell-container">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-center">
          <div className="w-full flex-shrink-0 md:w-[24%]">
            <Reveal variant="fade">
              <span className="inline-flex items-center rounded-full bg-[#7c5cff]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#b19cd9] ring-1 ring-[#7c5cff]/25 shadow-[0_0_14px_2px_rgba(124,92,255,0.25)]">
                {stackSection.tag}
              </span>
              <Rich as="h2" className="mt-3 text-3xl font-bold tracking-tight text-[#161d26] sm:text-4xl md:text-5xl">{stackSection.title}</Rich>
              {stackSection?.text ? (
                <div className="mt-4 text-base leading-relaxed text-[#232b37] md:text-lg">
                  <Rich as="p">{stackSection.text}</Rich>
                </div>
              ) : null}
            </Reveal>
          </div>

          <div className="hidden w-44 flex-shrink-0 md:block" />

          <div
            ref={trackRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={stackSection.title}
            tabIndex={0}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-6 md:w-[55%]"
          >
            {VENDOR_LOGOS.map((vendor, idx) => (
              <Reveal
                key={vendor.name + idx}
                variant="up"
                delay={(idx % 4) + 1}
                data-vendor-card
                className="flex w-44 shrink-0 snap-start items-center justify-center rounded-2xl border border-shell-gray-300 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-ink hover:shadow-[inset_0_0_0_1px_rgba(1,116,164,0.6),0_0_0_3px_rgba(1,116,164,0.15),0_0_24px_3px_rgba(1,116,164,0.35),0_14px_30px_-12px_rgba(1,116,164,0.35)]"
              >
                <img
                  src={resolveSrc(vendor.src)}
                  alt={vendor.name}
                  loading="lazy"
                  className="max-h-16 w-auto max-w-full object-contain"
                  style={{ filter: 'brightness(0.85) saturate(1.05)' }}
                  onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}