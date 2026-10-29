import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useContent } from "../../content/ContentContext.jsx"
import { Rich } from '../ui/SectionTag.jsx'

const textBearingHeroImages = {
  '/uploads/hero-docx-network-fiber.png': {
    src: '/uploads/hero-city-network.jpg',
    alt: 'City skyline at night with a glowing network of connected nodes spread across it',
  },
  '/uploads/hero-docx-principle-desk.png': {
    src: '/uploads/hero-skyline-dark.jpg',
    alt: 'City skyline at dusk under a heavy blue sky, lights coming on across the towers',
  },
  '/uploads/hero-docx-industry-support.png': {
    src: '/uploads/hero-plant-night.jpg',
    alt: 'Industrial plant with illuminated stacks operating at night',
  },
}

export default function HeroCarousel() {
  const { heroSlides, uiLabels, sectionIds } = useContent()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 38 }, [
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ])
  const [selected, setSelected] = useState(0)

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi, onSelect])

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()
  const goTo = (i) => emblaApi && emblaApi.scrollTo(i)

  return (
    <section id={sectionIds.top} className="relative bg-shell-black" aria-label={uiLabels.heroRegion}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {heroSlides.map((slide, i) => (
            <div key={slide.id} className="relative min-w-0 flex-[0_0_100%]">
              <img
                src={textBearingHeroImages[slide.image]?.src || slide.image}
                alt={textBearingHeroImages[slide.image]?.alt || slide.alt || ""}
                className={`absolute inset-0 h-full w-full object-cover ${selected === i ? 'hero-zoom' : ''}`}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              {/* Legibility scrim — keeps hero copy readable over bright imagery */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" aria-hidden="true" />
              <div className="shell-container relative flex min-h-[24rem] items-center pb-8 pt-16 sm:min-h-[28rem] md:min-h-[30rem] md:pb-10 md:pt-20 lg:min-h-[34rem]">
              <div className={`hero-copy relative z-10 w-full text-white ${selected === i ? 'is-active' : ''}`}>
                <span className="hero-kicker mb-3 inline-block border-l-[3px] border-shell-yellow pl-3 text-[0.8rem] font-bold tracking-[0.02em] text-shell-yellow">
                    {slide.kicker}
                  </span>
                  <h1 className="hero-title mb-4 text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem]">
                    {slide.title.split(' ').map((word, wi) => (
                      <span key={`${slide.id}-w${wi}`}>
                        {wi > 0 ? ' ' : ''}
                        <span className="hero-word" style={{ '--wi': wi }}>
                          {word}
                        </span>
                      </span>
                    ))}
                  </h1>
                  <div className="hero-text mb-6 w-full text-base leading-relaxed text-white/90 md:text-lg">
                    <Rich as="p">{slide.text}</Rich>
                  </div>
                  <a href={slide.cta.href} className="hero-cta btn-pill btn-pill--ghost-light">
                    {slide.cta.label}
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={scrollPrev}
        aria-label={uiLabels.previousSlide}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-shell-red text-white transition-all duration-300 btn-lift-glow hover:bg-shell-red-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/50 absolute bottom-4 left-4 md:bottom-auto md:left-3 md:top-1/2 md:h-11 md:w-11 md:-translate-y-1/2"
      >
        <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={scrollNext}
        aria-label={uiLabels.nextSlide}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-shell-red text-white transition-all duration-300 btn-lift-glow hover:bg-shell-red-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/50 absolute bottom-4 right-4 md:bottom-auto md:right-3 md:top-1/2 md:h-11 md:w-11 md:-translate-y-1/2"
      >
        <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="absolute inset-x-0 bottom-6 flex items-center justify-end gap-2 pr-6 md:pr-12">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${uiLabels.goToSlide} ${i + 1}`}
            aria-current={selected === i}
            className="group/dot flex h-6 w-6 items-center justify-center rounded-full active:scale-90"
          >
            <span
              aria-hidden="true"
              className={`h-2 rounded-full transition-all duration-300 ${
                selected === i ? 'w-7 bg-shell-yellow' : 'w-2 bg-white/60 group-hover/dot:bg-white'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
