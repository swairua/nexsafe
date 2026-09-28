import SectionTag from '../ui/SectionTag.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import Reveal from '../ui/Reveal.jsx'
import { picturesRow } from '../../data/content.js'

/**
 * Pictures band that sits directly under the services grid (doc brief: "the
 * Pictures … should come right after our services"). Four image tiles that
 * zoom on hover, each linking into the matching service page.
 */
export default function PicturesRow() {
  return (
    <section id="pictures" className="bg-white py-16 md:py-20">
      <div className="shell-container">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <Reveal variant="fade">
            <SectionTag>Inside nexsate</SectionTag>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-shell-gray-900 sm:text-3xl md:text-4xl">
              The people and platforms behind the services
            </h2>
          </Reveal>
          <Reveal as="a" href="#/our-work" delay={2} className="arrow-link">
            See our work <span className="arrow">→</span>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {picturesRow.map((pic, idx) => (
            <Reveal
              key={pic.id}
              as="a"
              href={pic.href}
              variant="zoom"
              delay={(idx % 4) + 1}
              className="group relative block overflow-hidden rounded-2xl"
            >
              <SmartImage
                src={pic.image}
                alt={pic.title}
                fallback={pic.fallback}
                className="aspect-[4/5] w-full"
                imgClassName="transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-shell-black/85 via-shell-black/25 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="text-lg font-bold leading-snug">{pic.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/80">{pic.caption}</p>
                <span className="arrow-link mt-3 text-sm text-shell-yellow">
                  Read more <span className="arrow">→</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
