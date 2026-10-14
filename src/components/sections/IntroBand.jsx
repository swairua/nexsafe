import Reveal from "../ui/Reveal.jsx"
import SectionTag, { Rich } from "../ui/SectionTag.jsx"
import SmartImage from "../ui/SmartImage.jsx"
import { useContent } from "../../content/ContentContext.jsx"

export default function IntroBand() {
  const { introBand, statement, introCards, pillars, sectionIds } = useContent()
  return (
    <>
    <section id={sectionIds.company} className="bg-shell-black pb-14 md:pb-20">
      
      <div className="bg-shell-black">
        <div className="shell-container grid gap-8 px-6 pb-28 pt-14 md:grid-cols-2 md:gap-16 md:pb-36 md:pt-20">
          <Reveal delay={1} variant="fade">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#3aa9e0]">{introBand.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-white md:text-[2.6rem]">{introBand.title}</h2>
          </Reveal>
          <Reveal delay={2} variant="fade" className="flex items-start md:pt-8">
            <div className="text-[15px] leading-relaxed text-white/60 md:text-base"><Rich as="p">{introBand.text}</Rich></div>
          </Reveal>
        </div>
      </div>

      <div className="shell-container px-6">
        <div id={sectionIds.about} className="-mt-20 grid gap-10 scroll-mt-28 md:-mt-24 md:grid-cols-3 md:gap-8">
          {introCards.map((card, idx) => (
            <Reveal key={card.id} delay={idx + 1} variant="up" className="h-full">
              <a href={card.href} className="group flex h-full flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_34px_rgba(1,116,164,0.55)]" aria-label={`${card.eyebrow} - ${card.title}`}>
                <SmartImage src={card.src} alt={card.alt} fallback={card.fallback} className="aspect-[16/11] w-full overflow-hidden rounded-2xl" imgClassName="transition-transform duration-500 group-hover:scale-105" />
                <div className="relative mx-auto -mt-14 flex w-[86%] flex-1 flex-col justify-center bg-white px-6 py-6 text-center ring-1 ring-transparent shadow-[0_18px_50px_-12px_rgba(0,0,0,0.28)] transition-all duration-300 group-hover:ring-2 group-hover:ring-brand-ink/40 group-hover:shadow-[0_0_30px_rgba(1,116,164,0.5)]">
                  <p className="text-[15px] font-medium text-[#2aa5de]">{card.eyebrow}</p>
                  <p className="mt-1.5 text-xl font-bold leading-snug text-[#0a1a3c] transition-colors group-hover:text-brand-ink">{card.title}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
      </section>
      <div className="shell-container px-6 pt-14 md:pt-20">
        <Reveal variant="fade" className="max-w-3xl text-left">
          <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0a1a3c] md:text-[2.6rem]">{statement.title}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-shell-gray-700 md:text-base">{statement.text}</p>
        </Reveal>
      </div>
      <div className="mt-12 bg-shell-black md:mt-16">
        <div className="shell-container px-6">
          <ul className="grid gap-5 py-10 sm:grid-cols-2 lg:grid-cols-4 md:py-14">
            {pillars.map((pillar, idx) => (
              <Reveal key={pillar.id} as="li" variant="up" delay={(idx % 4) + 1} className="rounded-2xl border border-shell-gray-300 bg-white p-6">
                <SectionTag>{pillar.title}</SectionTag>
                <div className="mt-3 text-sm leading-relaxed text-shell-gray-700"><Rich as="p">{pillar.text}</Rich></div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
