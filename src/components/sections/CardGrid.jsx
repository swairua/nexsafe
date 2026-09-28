import { pageHref } from '../../data/slug.js'
import SectionTag from '../ui/SectionTag.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import Reveal from '../ui/Reveal.jsx'
import { featuredCards } from '../../data/content.js'

/** 3-up service card grid with image zoom, arrow-link hover, scroll reveals
 *  and staggered card entrances. Cards come from the Home Page document's
 *  own six-service list. */
export default function CardGrid() {
  return (
    <section id="it-solutions" className="relative overflow-hidden bg-shell-gray-100 py-16 md:py-24">
      {/* Soft colour pools — give the glass cards' backdrop-blur something to mirror */}
      <div className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-shell-green/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-20 bottom-16 h-64 w-64 rounded-full bg-shell-red/10 blur-3xl" aria-hidden="true" />
      <div className="shell-container relative">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <Reveal variant="fade">
            <SectionTag>Services</SectionTag>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-shell-gray-900 sm:text-3xl md:text-4xl">
              Simply enabling IT for a complex world
            </h2>
          </Reveal>
          <Reveal as="a" href={pageHref('Services & Solutions')} delay={2} className="arrow-link">
            Find your solution <span className="arrow">→</span>
          </Reveal>
        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featuredCards.map((card, idx) => (
            <Reveal
              key={card.id}
              as="a"
              href={card.href}
              delay={(idx % 3) + 1}
              className="glass-card group flex flex-col rounded-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <SmartImage
                  src={card.image}
                  alt={card.title}
                  fallback={card.fallback}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-shell-red px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  {card.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-3 text-lg font-bold leading-snug text-shell-gray-900 group-hover:text-shell-red md:text-xl">
                  {card.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-shell-gray-700">{card.text}</p>
                <span className="arrow-link mt-auto text-sm">
                  {card.linkLabel} <span className="arrow">→</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
