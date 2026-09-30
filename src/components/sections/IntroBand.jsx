import Reveal from "../ui/Reveal.jsx"
import SectionTag from "../ui/SectionTag.jsx"
import SmartImage from "../ui/SmartImage.jsx"
import { useContent } from "../../content/ContentContext.jsx"

export default function IntroBand() {
  const { introBand, introCards, benefits, navItems, sectionIds, uiLabels } = useContent()
  return (
    <section id={sectionIds.company} className="bg-[#eef1f5]">
      <div className="bg-[#1e1432]">
        <div className="shell-container grid gap-8 px-6 pb-28 pt-14 md:grid-cols-2 md:gap-16 md:pb-36 md:pt-20">
          <Reveal delay={1} variant="fade">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#3aa9e0]">{introBand.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-white md:text-[2.6rem]">{introBand.title}</h2>
          </Reveal>
          <Reveal delay={2} variant="fade" className="flex items-start md:pt-8">
            <p className="text-[15px] leading-relaxed text-white/60 md:text-base">{introBand.text}</p>
          </Reveal>
        </div>
      </div>
      <div className="shell-container px-6">
        <div id={sectionIds.about} className="-mt-20 grid gap-10 scroll-mt-28 md:-mt-24 md:grid-cols-3 md:gap-8">
          {introCards.map((card, idx) => (
            <Reveal key={card.id} delay={idx + 1} variant="up">
              <a href={card.href} className="group block" aria-label={`${card.eyebrow} - ${card.title}`}>
                <SmartImage src={card.src} alt={card.alt} fallback={card.fallback} className="aspect-[16/11] w-full" imgClassName="transition-transform duration-500 group-hover:scale-105" />
                <div className="relative mx-auto -mt-14 w-[86%] bg-white px-6 py-6 text-center shadow-[0_18px_50px_-12px_rgba(0,0,0,0.28)]">
                  <p className="text-[15px] font-medium text-[#2aa5de]">{card.eyebrow}</p>
                  <p className="mt-1.5 text-xl font-bold leading-snug text-[#0a1a3c] transition-colors group-hover:text-shell-red">{card.title}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
          {benefits.map((benefit, idx) => (
            <Reveal key={benefit.id} as="li" variant="up" delay={(idx % 4) + 1} className="rounded-2xl border border-shell-gray-300 bg-white p-6">
              <SectionTag>{benefit.title}</SectionTag>
              <p className="mt-3 text-sm leading-relaxed text-shell-gray-700">{benefit.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
      <div className="shell-container max-w-4xl flex justify-center pb-14 pt-4 md:pb-20">
        <Reveal delay={2} variant="fade">
          <nav aria-label={uiLabels.onThisPage} className="inline-flex flex-wrap justify-center gap-1 rounded-[2rem] bg-white p-2 shadow-[0_10px_40px_-12px_rgba(14,17,20,0.25)] ring-1 ring-black/5">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="rounded-full px-4 py-2 text-sm font-medium text-shell-gray-700 transition-colors hover:bg-shell-gray-100 hover:text-shell-gray-900">{item.label}</a>
            ))}
          </nav>
        </Reveal>
      </div>
    </section>
  )
}

