import { useState, useEffect, useRef } from 'react'
import SectionHeading from '../ui/SectionHeading.jsx'
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
    <span className="flex h-16 w-28 shrink-0 items-center justify-center">
      <img
        src={src}
        alt={partner.name}
        aria-hidden="true"
        loading="lazy"
        onError={() => setFailed(true)}
        className="max-w-16 max-h-16 object-contain"
      />
    </span>
  )
}

function VendorTile({ partner }) {
  return (
    <div className="group flex h-full min-h-[7rem] items-center justify-center rounded-xl border border-shell-gray-300 bg-black/10 px-3 py-4 shadow-sm transition-all duration-300 hover:-translate-y-1">
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

  const items = partners || []
  const n = items.length
  const doubled = n ? [...items, ...items] : []
  const wrapperRef = useRef(null)
  const currentPct = useRef(0)
  const isResetting = useRef(false)

  useEffect(() => {
    if (n === 0 || reduceMotion) {
      const el = wrapperRef.current
      if (el) {
        el.style.transition = 'none'
        el.style.transform = 'translateX(0%)'
      }
      currentPct.current = 0
      return
    }

    let running = true

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    const moveTo = (targetPct, durationMs) => {
      return new Promise((resolve) => {
        const el = wrapperRef.current
        if (!el) { resolve(); return }
        el.style.transition = `transform ${durationMs}ms ease-in-out`
        el.style.transform = `translateX(${targetPct}%)`
        const onEnd = () => {
          el.removeEventListener('transitionend', onEnd)
          resolve()
        }
        el.addEventListener('transitionend', onEnd)
        setTimeout(() => {
          el.removeEventListener('transitionend', onEnd)
          resolve()
        }, durationMs + 120)
      })
    }

    ;(async () => {
      while (running) {
        await sleep(2000) // show current 4 logos for two seconds
        if (!running) break

        const target = currentPct.current - 25 // smoothly hide the most-left logo
        await moveTo(target, 900)

        currentPct.current = target
        if (currentPct.current <= -100) {
          // seamless reset: duplicated logos make -100% identical to 0%
          isResetting.current = true
          const el = wrapperRef.current
          el.style.transition = 'none'
          el.style.transform = 'translateX(0%)'
          currentPct.current = 0
          await sleep(40)
          isResetting.current = false
        }
      }
    })()

    return () => { running = false }
  }, [n, reduceMotion])

  return (
    <section id={sectionIds.partners} className="bg-white pt-2 pb-4 md:pt-4 md:pb-6">
      <div className="shell-container">
        <div className="relative grid gap-6 md:grid-cols-[minmax(0,26%)_minmax(0,1fr)] md:gap-x-20 md:items-stretch">
          <div className="md:z-10 md:flex md:flex-col md:justify-center md:bg-white md:pr-6 lg:pr-10">
            <Reveal variant="fade">
              <SectionHeading eyebrow={partnerStrip.tag} title={partnerStrip.title} size="small" weight="bold" />
              <div className="mt-4 text-base font-normal leading-relaxed text-shell-gray-900 md:text-lg"><Rich as="p">{partnerStrip.text}</Rich></div>
            </Reveal>
          </div>

          <div
            role="region"
            aria-roledescription="carousel"
            aria-label={partnerStrip.title}
            tabIndex={0}
            className="overflow-hidden md:min-h-0 md:self-center"
          >
            <div
              ref={wrapperRef}
              className="flex flex-nowrap px-1 pb-6 pt-2 md:min-h-0 md:items-center md:py-6"
              style={{ transform: `translateX(${currentPct.current}%)` }}
            >
              {doubled.map((partner, i) => (
                <div key={`${partner.group}-${partner.name}-${i}`} className="flex-[0_0_25%]">
                  <VendorTile partner={partner} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
