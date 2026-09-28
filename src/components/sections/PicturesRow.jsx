import SectionTag from '../ui/SectionTag.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import Reveal from '../ui/Reveal.jsx'
import { picturesRow } from '../../data/content.js'

/**
 * Pictures band that sits directly under the services grid (doc brief: "the
 * Pictures … should come right after our services"). Three image tiles, each
 * with a white caption card overlapping the image base — the reference
 * "Our Company" row. Kicker in corporate cyan-blue, title in navy, caption in
 * grey; the whole card links into the matching page.
 */
export default function PicturesRow() {
  return (
    <section id="pictures" className="bg-shell-gray-100 py-16 md:py-20">
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

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {picturesRow.map((pic, idx) => (
            <Reveal
              key={pic.id}
              as="a"
              href={pic.href}
              variant="up"
              delay={idx + 1}
              className="group relative block focus-visible:outline-offset-4"
            >
              <SmartImage
                src={pic.image}
                alt={pic.title}
                fallback={pic.fallback}
                className="aspect-[4/3] w-full rounded-2xl object-cover shadow-[0_18px_40px_-24px_rgba(7,14,64,0.5)]"
                imgClassName="transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="relative z-10 mx-auto -mt-16 w-[92%] rounded-xl bg-white p-6 text-center shadow-[0_18px_40px_-18px_rgba(7,14,64,0.35)] ring-1 ring-black/5 transition-transform duration-300 group-hover:-translate-y-1"
              >
                <p className="text-sm font-semibold text-shell-red">{pic.kicker}</p>
                <h3 className="mt-1 text-lg font-bold leading-snug text-shell-gray-900 md:text-xl">
                  {pic.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-shell-gray-500">{pic.caption}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
