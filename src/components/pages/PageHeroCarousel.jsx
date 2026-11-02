import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useContent } from '../../content/ContentContext.jsx'

export default function PageHeroCarousel({ images }) {
  const { uiLabels } = useContent()
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

  return (
    <>
      <div className="absolute inset-0 overflow-hidden" ref={emblaRef} aria-hidden="true">
        <div className="flex h-full">
          {images.map((src, i) => (
            <div key={`${src}-${i}`} className="relative h-full min-w-0 flex-[0_0_100%] overflow-hidden bg-shell-black">
              <img
                src={src}
                alt=""
                className={`hero-feather absolute inset-0 h-full w-full object-cover ${selected === i ? 'hero-zoom' : ''}`}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" aria-hidden="true" />
      {images.length > 1 && (
        <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-end gap-2 pr-6 md:pr-12">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi && emblaApi.scrollTo(i)}
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
      )}
    </>
  )
}
