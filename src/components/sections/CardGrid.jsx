import SectionTag, { Rich } from '../ui/SectionTag.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from '../../content/ContentContext.jsx'

const REFERENCE_TAGS = ['Software', 'Security', 'Recovery']

export default function CardGrid() {
  const { featuredCards, servicesSection, sectionIds } = useContent()

  const cards = (featuredCards || []).filter((c) => REFERENCE_TAGS.includes(c.tag))
  if (cards.length === 0) return null

  return (
    <section id={sectionIds.itSolutions} className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="shell-container relative">
        <Reveal variant="fade" className="mb-10">
          <SectionTag>{servicesSection.tag}</SectionTag>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-shell-gray-900 sm:text-3xl md:text-4xl">
            {servicesSection.title}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, idx) => (
            <Reveal key={card.id} delay={(idx % 3) + 1}>
              <a
                href={card.href}
                className="group flex h-full flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_8px_24px_-12px_rgba(10,20,64,0.18)] ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-[0_18px_44px_-12px_rgba(10,20,64,0.28)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SmartImage
                    src={card.image}
                    alt={card.alt || card.title}
                    fallback={card.fallback}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-shell-red px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    {card.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-3 text-lg font-bold leading-snug text-shell-gray-900 md:text-xl">
                    {card.title}
                  </h3>
                  <div className="mb-5 text-sm leading-relaxed text-shell-gray-700">
                    <Rich>{card.text}</Rich>
                  </div>
                  <span className="arrow-link mt-auto text-sm">
                    {card.linkLabel} <span className="arrow">→</span>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, idx) => (
            <Reveal key={card.id} delay={(idx % 3) + 1}>
              <div className="flex h-full flex-col">
                <h3 className="text-base font-bold text-shell-gray-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-shell-gray-700">{card.columnText}</p>
                <div className="mt-auto pt-4 text-right">
                  <a href={card.href} className="arrow-link text-sm">
                    {card.linkLabel} <span className="arrow">→</span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
