import Reveal from "../ui/Reveal.jsx"
import SectionTag, { Rich } from "../ui/SectionTag.jsx"
import SectionHeading from "../ui/SectionHeading.jsx"
import SmartImage from "../ui/SmartImage.jsx"
import { useContent } from "../../content/ContentContext.jsx"

export default function IntroBand() {
  const { introBand, statement, introCards, pillars, sectionIds } = useContent()
  return (
    <>
    <section id={sectionIds.company} className="bg-shell-black pb-4 md:pb-6">
      
      <div className="bg-shell-black">
        <div className="shell-container grid gap-3 px-4 pb-10 pt-8 md:gap-4 md:pb-14 md:pt-10">
          <Reveal delay={1} variant="fade">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#3aa9e0]">{introBand.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-[1.12] tracking-tight text-white md:text-[2.6rem]">{introBand.title}</h2>
          </Reveal>
          <Reveal delay={2} variant="fade" className="flex items-start">
            <div className="text-[15px] leading-relaxed text-white/60 md:text-base"><Rich as="p">{introBand.text}</Rich></div>
          </Reveal>
        </div>
      </div>

      <div className="shell-container px-6">
        <div id={sectionIds.about} className="grid gap-10 scroll-mt-28 md:grid-cols-3 md:gap-8">
          {introCards.map((card, idx) => (
            <Reveal key={card.id} delay={idx + 1} variant="up" className="h-full">
              <a href={card.href} className="group flex h-full flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_34px_rgba(255,153,0,0.55)]" aria-label={`${card.eyebrow} - ${card.title}`}>
                <SmartImage src={card.src} alt={card.alt} fallback={card.fallback} className="aspect-[16/11] w-full overflow-hidden rounded-2xl" imgClassName="transition-transform duration-500 group-hover:scale-105" />
                <div className="relative z-10 mx-auto -mt-8 flex min-h-[4.5rem] w-[88%] flex-col justify-center rounded-sm bg-white px-4 py-3 text-center ring-1 ring-transparent shadow-[0_18px_50px_-12px_rgba(0,0,0,0.28)] transition-all duration-300 group-hover:ring-2 group-hover:ring-[#ff9900]/40 group-hover:shadow-[0_0_30px_rgba(255,153,0,0.5)]">
                  <p className="text-[15px] font-medium text-[#2aa5de]">{card.eyebrow}</p>
                  <p className="mt-1.5 text-xl font-bold leading-snug text-[#0a1a3c] transition-colors group-hover:text-[#ff9900]">{card.title}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
      </section>
      <div className="shell-container px-6 pt-6 md:pt-8">
        <Reveal variant="fade" className="text-left">
          <SectionHeading title={statement.title} />
          <p className="mt-3 text-[15px] leading-relaxed text-shell-gray-700 md:text-base">{statement.text}</p>
        </Reveal>
      </div>
      <div className="mt-8 md:mt-10">
        <div className="values-cycle-bg w-full">
          <div className="shell-container px-6">
            <ul className="grid gap-5 py-8 sm:grid-cols-2 lg:grid-cols-4 md:py-10">
              {pillars.map((pillar, idx) => (
                <Reveal key={pillar.id} as="li" variant="up" delay={(idx % 4) + 1} className="rounded-2xl border border-shell-gray-300 bg-[#f3f4f6] p-6 shadow-sm">
                  <SectionTag>{pillar.title}</SectionTag>
                  <div className="mt-3 text-sm leading-relaxed text-shell-gray-700"><Rich as="p">{pillar.text}</Rich></div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
