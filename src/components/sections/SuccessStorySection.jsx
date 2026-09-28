import SectionTag from '../ui/SectionTag.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import Reveal from '../ui/Reveal.jsx'
import { successStory } from '../../data/content.js'

/**
 * Success-story band, built from the case study in the client-supplied Home
 * Page document: the setup, the client's quote, and the seven measured
 * outcomes, with a link through to the full narrative. Owns the `#insights`
 * anchor used by the primary nav.
 */
export default function SuccessStorySection() {
  return (
    <section id="insights" className="bg-shell-gray-100 py-16 md:py-24">
      <div className="shell-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal variant="left">
          <SmartImage
            src={successStory.image}
            alt=""
            fallback={successStory.fallback}
            className="aspect-[4/3] w-full rounded-2xl"
          />
        </Reveal>

        <div>
          <Reveal delay={1} variant="fade">
            <SectionTag>{successStory.tag}</SectionTag>
          </Reveal>
          <Reveal delay={2}>
            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-shell-gray-900 sm:text-3xl md:text-4xl">
              {successStory.title}
            </h2>
          </Reveal>
          <Reveal delay={3}>
            <p className="mt-5 text-base leading-relaxed text-shell-gray-700 md:text-lg">
              {successStory.text}
            </p>
          </Reveal>
          <Reveal delay={4}>
            <blockquote className="mt-6 border-l-4 border-shell-red pl-5 text-base italic leading-relaxed text-shell-gray-700 md:text-lg">
              {successStory.quote}
            </blockquote>
          </Reveal>
          <Reveal delay={5}>
            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {successStory.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 text-sm leading-relaxed text-shell-gray-700">
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-[2px] bg-shell-green"
                    aria-hidden="true"
                  />
                  {outcome}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={6}>
            <a href={successStory.cta.href} className="btn-pill btn-sweep mt-8">
              {successStory.cta.label}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
