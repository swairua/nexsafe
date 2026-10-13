import { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"
import { resolveSrc } from "../../utils/url.js"

function VendorChip({ vendor }) {
  const name = typeof vendor === "string" ? vendor : vendor?.name
  const logo = typeof vendor === "string" ? "" : vendor?.logo
  if (!name) return null
  return (
    <li className="inline-flex items-center gap-2 rounded-lg bg-white/80 px-3 py-1.5 text-sm font-medium text-shell-gray-900 ring-1 ring-shell-gray-300/70">
      {logo ? (
        <img src={resolveSrc(logo)} alt="" className="h-4 w-4 shrink-0 rounded object-contain" loading="lazy" />
      ) : null}
      {name}
    </li>
  )
}

export default function StackSection() {
  const { stackGroups, stackSection, sectionIds } = useContent()
  return (
    <section id={sectionIds.capabilities} className="relative bg-white pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="shell-container">

        {/* Heading row: eyebrow on the left, title inside a blue-outlined card on the right. */}
        <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-10">
          <Reveal variant="left">
            <p className="text-xl font-bold tracking-tight text-shell-red md:text-2xl">
              {stackSection.tag}
            </p>
          </Reveal>

          <Reveal
            variant="right"
            delay={1}
            className="group rounded-2xl border border-shell-red/45 bg-white p-6 shadow-[0_18px_44px_-20px_rgba(6,147,227,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-ink hover:shadow-[0_18px_44px_-20px_rgba(6,147,227,0.35),0_0_34px_rgba(1,116,164,0.55)] md:p-8"
          >
            <h2 className="text-2xl font-bold tracking-tight text-shell-gray-900 transition-[color,text-shadow] duration-300 group-hover:text-brand-ink group-hover:[text-shadow:0_0_14px_rgba(1,116,164,0.45)] sm:text-3xl md:text-4xl">
              {stackSection.title}
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {stackGroups.map((group, idx) => (
            <Reveal
              key={group.id}
              variant={idx % 2 ? 'right' : 'left'}
              delay={(idx % 2) + 1}
              className="rounded-2xl border border-shell-gray-300/70 bg-[#f8f9fb] p-6 shadow-[0_14px_36px_-24px_rgba(14,17,20,0.35)] md:p-7"
            >
              <h3 className="text-lg font-bold leading-snug text-shell-gray-900 md:text-xl">
                {group.title}
              </h3>
              <div className="mt-3 text-sm leading-relaxed text-shell-gray-700 md:text-base"><Rich as="p">{group.text}</Rich></div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.vendors.map((vendor) => (
                  <VendorChip key={typeof vendor === "string" ? vendor : vendor.name} vendor={vendor} />
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
