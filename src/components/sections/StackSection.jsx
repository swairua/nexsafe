import { useState } from 'react'
import { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"
import { resolveSrc } from "../../utils/url.js"

export default function StackSection() {
  const { stackSection, stackGroups, sectionIds } = useContent()
  const [expandedGroups, setExpandedGroups] = useState({})

  return (
    <section id={sectionIds.capabilities} className="bg-white py-10 md:py-14">
      <div className="shell-container">
        <Reveal variant="fade">
          <span className="text-sm font-bold uppercase tracking-[0.12em] text-brand-ink">
            {stackSection.tag}
          </span>
          <Rich as="h2" className="mt-3 max-w-4xl text-3xl font-bold tracking-tight text-[#161d26] sm:text-4xl md:text-5xl">{stackSection.title}</Rich>
          {stackSection?.text ? (
            <div className="mt-4 max-w-4xl text-base leading-relaxed text-[#232b37] md:text-lg">
              <Rich as="p">{stackSection.text}</Rich>
            </div>
          ) : null}
        </Reveal>

        <div className="my-6 flex justify-center md:my-8">
          <a
            href={stackSection.ctaHref}
            className="inline-flex items-center rounded-full border border-shell-gray-300 bg-white px-6 py-2.5 text-sm font-bold tracking-wide text-brand-ink shadow-sm transition-all duration-300 btn-lift-glow hover:border-brand-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/50"
          >
            {stackSection.ctaLabel}
          </a>
        </div>

        <div className="rounded-2xl bg-[#f2f3f5] p-3 md:p-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stackGroups.map((group, index) => {
              const expanded = Boolean(expandedGroups[group.id])
              const previewVendors = group.vendors.slice(0, 3)

              return (
                <Reveal
                  key={group.id}
                  variant="up"
                  delay={(index % 4) + 1}
                  className="flex min-h-56 flex-col rounded-xl border border-shell-gray-200 bg-white p-4 shadow-sm md:p-5"
                >
                  <h3 className="text-base font-bold leading-snug text-shell-gray-900 md:text-lg">{group.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-shell-gray-700">{group.text}</p>

                  <div className="mt-4 flex min-h-9 flex-wrap items-center gap-4" aria-label={`${group.title} technology partners`}>
                    {previewVendors.map((vendor) => (
                      <img
                        key={vendor.name}
                        src={resolveSrc(vendor.logo)}
                        alt={vendor.name}
                        title={vendor.name}
                        loading="lazy"
                        className="h-8 max-w-20 object-contain"
                      />
                    ))}
                  </div>

                  {group.vendors.length > previewVendors.length ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() => setExpandedGroups((current) => ({ ...current, [group.id]: !current[group.id] }))}
                        className="mt-4 self-start text-xs font-bold text-shell-gray-900 hover:text-brand-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/50"
                      >
                        {expanded ? '− View less' : '+ View more'}
                      </button>
                      {expanded ? (
                        <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-shell-gray-200 pt-3">
                          {group.vendors.slice(previewVendors.length).map((vendor) => (
                            <img
                              key={vendor.name}
                              src={resolveSrc(vendor.logo)}
                              alt={vendor.name}
                              title={vendor.name}
                              loading="lazy"
                              className="h-8 max-w-20 object-contain"
                            />
                          ))}
                        </div>
                      ) : null}
                    </>
                  ) : null}
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
