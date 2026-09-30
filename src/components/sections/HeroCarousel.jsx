import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useContent } from "../../content/ContentContext.jsx"

/** Full-bleed hero carousel with autoplay, arrows and dots (full-bleed banner style). */
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
              {/* Background image with gradient overlay + fallback */}
              <div
                className="absolute inset-0"
                style={{ background: slide.fallback }}
                aria-hidden="true"
              />
              <img
                src={slide.image}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover ${selected === i ? 'hero-zoom' : ''}`}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <div className="absolute inset-0" style={{ background: slide.gradient }} aria-hidden="true" />
              {/* Top scrim so the transparent floating nav always reads over imagery */}
              <div
                className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-black/45 to-transparent md:h-72"
                aria-hidden="true"
              />

              {/* Content — layers replay via .is-active whenever the slide is selected */}
              <div className="shell-container relative flex min-h-[28rem] items-center pb-20 pt-28 sm:min-h-[34rem] md:min-h-[40rem] md:pb-24 md:pt-36 lg:min-h-[44rem]">
                <div className={`hero-copy max-w-2xl text-white ${selected === i ? 'is-active' : ''}`}>
                  <span className="hero-kicker mb-4 inline-block border-l-4 border-shell-yellow pl-3 text-sm font-bold uppercase tracking-[0.16em] text-shell-yellow">
                    {slide.kicker}
                  </span>
                  <h1 className="hero-title mb-5 text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem]">
                    {slide.title.split(' ').map((word, wi) => (
                      <span key={`${slide.id}-w${wi}`}>
                        {wi > 0 ? ' ' : ''}
                        <span className="hero-word" style={{ '--wi': wi }}>
                          {word}
                        </span>
                      </span>
                    ))}
                  </h1>
                  <p className="hero-text mb-8 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
                    {slide.text}
                  </p>
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

      {/* Arrows */}
      <button
        type="button"
        onClick={scrollPrev}
        aria-label={uiLabels.previousSlide}
        className="glass-chip absolute bottom-4 left-4 flex h-9 w-9 items-center justify-center rounded-full text-white active:scale-95 md:bottom-auto md:left-3 md:top-1/2 md:h-11 md:w-11 md:-translate-y-1/2"
      >
        <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={scrollNext}
        aria-label={uiLabels.nextSlide}
        className="glass-chip absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-white active:scale-95 md:bottom-auto md:right-3 md:top-1/2 md:h-11 md:w-11 md:-translate-y-1/2"
      >
        <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-2.5">
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
              className={`h-2.5 rounded-full transition-all duration-300 ${
                selected === i ? 'w-8 bg-shell-yellow' : 'w-2.5 bg-white/60 group-hover/dot:bg-white'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
