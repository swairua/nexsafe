import Reveal from '../ui/Reveal.jsx'
import { stakeholderCards } from '../../data/content.js'
import { useContent } from '../../content/ContentContext.jsx'

export default function StakeholderCards() {
  const content = useContent()
  const copy = content.stakeholderCards || stakeholderCards
  if (!copy) return null

  return (
    <section className="bg-shell-gray-100 py-20 md:py-28">
      <div className="shell-container">
        <Reveal variant="fade" className="mb-12 max-w-2xl">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.14em] text-shell-red">
            {copy.tag}
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-shell-gray-900 sm:text-3xl md:text-4xl">
            {copy.title}
          </h2>
          <div className="mt-4 text-base leading-relaxed text-shell-gray-700">
            {copy.text}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {copy.cards.map((card, idx) => (
            <Reveal key={card.title} delay={idx + 1}>
              <a
                href={card.href}
                className="group flex flex-col rounded-[16px] bg-white p-7 shadow-[0_8px_24px_-12px_rgba(10,20,64,0.18)] ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-[0_18px_44px_-12px_rgba(10,20,64,0.28)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-shell-red/10">
                  <span className="text-xl font-extrabold tracking-wide text-shell-red">
                    {card.initial}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold leading-snug text-shell-gray-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-shell-gray-700">
                  {card.text}
                </p>
                <span className="arrow-link mt-auto text-sm">
                  {card.linkLabel} <span className="arrow">&#8594;</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
