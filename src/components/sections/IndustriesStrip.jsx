import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from '../../content/ContentContext.jsx'

export default function IndustriesStrip() {
  const { industriesStrip, sectionIds } = useContent()
  const items = industriesStrip.items || []
  if (!items.length) return null

  return (
    <section id={sectionIds.industries} className="scroll-mt-28 bg-[#0a1a4a] pt-8 pb-10 md:pt-12 md:pb-16">
      <div className="shell-container">
        <Reveal variant="fade">
          <SectionHeading eyebrow={industriesStrip.tag} title={industriesStrip.title} light titleClassName="sm:text-4xl md:text-5xl" />
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">{industriesStrip.text}</p>
        </Reveal>

        <ul className="no-scrollbar -mx-1 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-3">
          {items.map((item, idx) => (
            <Reveal
              key={item.label}
              as="li"
              variant="up"
              delay={(idx % 3) + 1}
              className="flex w-[80%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
            >
              <a
                href={item.href}
                className="group flex w-full flex-col justify-between gap-6 rounded-2xl border border-white/15 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-ink hover:shadow-[0_0_24px_3px_rgba(1,116,164,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/50"
              >
                <span className="text-lg font-bold leading-snug text-white">{item.label}</span>
                <span className="arrow-link self-end text-sm">
                  Explore <span className="arrow" aria-hidden="true">→</span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 flex justify-end">
          <a
            href={industriesStrip.cta.href}
            className="inline-flex items-center rounded-full bg-shell-red px-6 py-2.5 text-sm font-bold tracking-wide text-white transition-all duration-300 btn-lift-glow hover:bg-shell-red-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/50"
          >
            {industriesStrip.cta.label}
          </a>
        </div>
      </div>
    </section>
  )
}
