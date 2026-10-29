import { useState } from 'react'
import SectionHeading from '../ui/SectionHeading.jsx'
import { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"
import { resolveSrc } from "../../utils/url.js"

export default function StackSection() {
  const { stackSection, stackGroups, sectionIds } = useContent()
  const [expandedGroups, setExpandedGroups] = useState({})

  return (
    <section id={sectionIds.capabilities} className="values-cycle-bg bg-white pt-2 pb-10 md:pt-4 md:pb-14">
      <div className="shell-container">
        <Reveal variant="fade">
          <SectionHeading eyebrow={stackSection.tag} title={stackSection.title} titleClassName="max-w-4xl sm:text-4xl md:text-5xl" />
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
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stackGroups.map((group, index) => {
              const expanded = Boolean(expandedGroups[group.id])

              return (
                <Reveal
                  key={group.id}
                  variant="up"
                  delay={(index % 4) + 1}
                  className="flex min-h-56 flex-col rounded-xl border border-shell-gray-200 bg-white p-4 shadow-sm md:p-5"
                >
                  <h3 className="text-base font-bold leading-snug text-shell-gray-900 md:text-lg">{group.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-shell-gray-700">{group.text}</p>

                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`vendors-${group.id}`}
                    onClick={() => setExpandedGroups((current) => ({ ...current, [group.id]: !current[group.id] }))}
                    className="mt-4 self-start text-xs font-bold text-shell-gray-900 hover:text-brand-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/50"
                  >
                    {expanded ? '− View less' : '+ View more'}
                  </button>
                  <div id={`vendors-${group.id}`} className={`stack-vendor-panel ${expanded ? 'is-expanded' : ''}`} aria-hidden={!expanded}>
                    <ul className="stack-vendor-list m-0 list-none pt-2">
                      {group.vendors.map((vendor) => (
                        <li key={vendor.name} className="flex items-center gap-3 py-2 text-sm text-shell-gray-700">
                          <img
                            src={resolveSrc(vendor.logo)}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            className="h-8 w-12 object-contain"
                          />
                          <span>{vendor.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
