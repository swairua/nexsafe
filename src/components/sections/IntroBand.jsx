import Reveal from "../ui/Reveal.jsx"
import { Rich } from "../ui/SectionTag.jsx"
import SmartImage from "../ui/SmartImage.jsx"
import { useContent } from "../../content/ContentContext.jsx"

export default function IntroBand() {
  const { introBand, introCards, benefits, navItems, sectionIds, uiLabels } = useContent()
  return (
    <>
    <section id={sectionIds.company} className="relative isolate overflow-hidden bg-white pb-14 md:pb-20">
      <span aria-hidden="true" className="pointer-events-none absolute -left-24 top-[30%] -z-10 h-80 w-80 rounded-full bg-brand-ink/50 blur-2xl" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-[12%] -z-10 h-80 w-80 rounded-full bg-shell-cyan/45 blur-2xl" />
      <div className="shell-container grid gap-8 px-6 pb-28 pt-14 md:grid-cols-2 md:gap-16 md:pb-36 md:pt-20">
        <Reveal delay={1} variant="fade">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-ink">{introBand.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-shell-gray-900 md:text-[2.6rem]">{introBand.title}</h2>
        </Reveal>
        <Reveal delay={2} variant="fade" className="flex items-start md:pt-8">
          <div className="text-[15px] leading-relaxed text-shell-gray-700 md:text-base"><Rich as="p">{introBand.text}</Rich></div>
        </Reveal>
      </div>
      <div className="shell-container px-6">
        <div id={sectionIds.about} className="-mt-20 grid gap-10 scroll-mt-28 md:-mt-24 md:grid-cols-3 md:gap-8">
          {introCards.map((card, idx) => (
            <Reveal key={card.id} delay={idx + 1} variant="up" className="h-full">
              <a href={card.href} className="group flex h-full flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1" aria-label={`${card.eyebrow} - ${card.title}`}>
                <SmartImage src={card.src} alt={card.alt} fallback={card.fallback} className="aspect-[16/11] w-full overflow-hidden rounded-2xl" imgClassName="transition-transform duration-500 group-hover:scale-105" />
                <div className="relative mx-auto -mt-14 flex w-[86%] flex-1 flex-col justify-center rounded-2xl bg-white px-6 py-6 text-center shadow-[0_12px_32px_-14px_rgba(14,17,20,0.3)] transition-all duration-300 group-hover:shadow-[0_20px_44px_-14px_rgba(14,17,20,0.4)]">
                  <p className="text-[15px] font-semibold text-brand-ink">{card.eyebrow}</p>
                  <p className="mt-1.5 text-xl font-bold leading-snug text-shell-gray-900 transition-colors group-hover:text-brand-ink">{card.title}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="relative isolate mt-12 md:mt-16">
          <span aria-hidden="true" className="pointer-events-none absolute -left-16 -top-6 -z-10 h-64 w-64 rounded-full bg-brand-ink/55 blur-2xl" />
          <span aria-hidden="true" className="pointer-events-none absolute -right-16 bottom-0 -z-10 h-64 w-64 rounded-full bg-shell-cyan/50 blur-2xl" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, idx) => (
              <Reveal key={benefit.id} as="li" variant="up" delay={(idx % 4) + 1} className="glass-brand rounded-2xl border border-white/25 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_8px_24px_-16px_rgba(1,116,164,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_18px_40px_-16px_rgba(1,116,164,0.7)]">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]">{benefit.title}</p>
                <div className="mt-3 text-sm leading-relaxed text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]"><Rich as="p">{benefit.text}</Rich></div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
    <div className="shell-container max-w-4xl flex justify-center py-10 md:py-12">
      <Reveal delay={2} variant="fade">
        <nav aria-label={uiLabels.onThisPage} className="inline-flex flex-wrap justify-center gap-1 rounded-[2rem] bg-white p-2 shadow-[0_10px_40px_-12px_rgba(14,17,20,0.25)] ring-1 ring-black/5">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="rounded-full px-4 py-2 text-sm font-medium text-shell-gray-700 transition-colors hover:bg-shell-gray-100 hover:text-shell-gray-900">{item.label}</a>
          ))}
        </nav>
      </Reveal>
    </div>
    </>
  )
}
