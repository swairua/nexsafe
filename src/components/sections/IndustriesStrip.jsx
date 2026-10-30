import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from '../../content/ContentContext.jsx'

const ICON_PATHS = {
  factory: 'M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z',
  heart: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z',
  bank: 'M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2 2 7h20L12 2',
  truck: 'M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2M15 18H9M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14',
  briefcase: 'M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16M2 8h20v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
}

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
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#3aa9e0] ring-1 ring-brand-ink/30">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={ICON_PATHS[item.icon] || ICON_PATHS.briefcase} />
                  </svg>
                </span>
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
