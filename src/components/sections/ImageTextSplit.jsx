import SectionTag from '../ui/SectionTag.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import Reveal from '../ui/Reveal.jsx'
import { splitSections } from '../../data/content.js'

/** Alternating full-width image + text split sections with
 *  mirrored reveals (image slides from its side, text staggers in). */
export default function ImageTextSplit() {
  return (
    <>
      {splitSections.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className={s.reversed ? 'bg-shell-gray-100' : 'bg-white'}
        >
          <div className="shell-container grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <Reveal
              className={s.reversed ? 'lg:order-2' : ''}
              variant={s.reversed ? 'right' : 'left'}
            >
              <SmartImage
                src={s.image}
                alt={s.title}
                fallback={s.fallback}
                className="aspect-[4/3] w-full rounded-2xl"
              />
            </Reveal>

            {/* Text */}
            <div className={s.reversed ? 'lg:order-1' : ''}>
              <Reveal delay={1} variant="fade">
                <SectionTag>{s.tag}</SectionTag>
              </Reveal>
              <Reveal delay={2}>
                <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-shell-gray-900 sm:text-3xl md:text-4xl">
                  {s.title}
                </h2>
              </Reveal>
              <Reveal delay={3}>
                <p className="mt-5 text-base leading-relaxed text-shell-gray-700 md:text-lg">
                  {s.text}
                </p>
              </Reveal>
              <Reveal delay={4}>
                <a href={s.cta.href} className="btn-pill btn-sweep mt-8">
                  {s.cta.label}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </Reveal>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
