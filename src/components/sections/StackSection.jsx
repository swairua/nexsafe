import { useEffect, useState } from 'react'
import SectionHeading from '../ui/SectionHeading.jsx'
import { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"
import { resolveSrc } from "../../utils/url.js"

const GAP_PX = 12

export default function StackSection() {
  const { stackSection, stackGroups, sectionIds } = useContent()
  const [expandedGroups, setExpandedGroups] = useState({})
  const [visible, setVisible] = useState(3)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const update = () => setVisible(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxIndex = Math.max(0, stackGroups.length - visible)
  const current = Math.min(activeIndex, maxIndex)

  return (
    <section id={sectionIds.capabilities} className="values-cycle-bg bg-white pt-2 pb-6 md:pt-4 md:pb-10">
      <div className="shell-container">
        <Reveal variant="fade">
          <div className="grid gap-6 md:grid-cols-2 md:items-center md:gap-12">
            <div>
              <SectionHeading eyebrow={stackSection.tag} title={stackSection.title} titleClassName="max-w-4xl sm:text-4xl md:text-5xl" />
            </div>
            {stackSection?.text ? (
              <div className="text-base leading-relaxed text-[#232b37] md:text-lg">
                <Rich as="p">{stackSection.text}</Rich>
              </div>
            ) : null}
          </div>
        </Reveal>

        <div className="my-6 flex justify-center md:my-8">
          <div className="btn-lift-glow inline-flex items-center gap-1 rounded-full border border-shell-gray-300 bg-white py-1.5 pl-1.5 pr-1.5 text-sm font-bold tracking-wide text-brand-ink shadow-sm transition-all duration-300 hover:border-brand-ink">
            <button
              type="button"
              onClick={() => setActiveIndex(Math.max(0, current - 1))}
              disabled={current === 0}
              aria-label="Previous technologies"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-shell-red text-white transition-all duration-300 btn-lift-glow hover:bg-shell-red-dark disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/50 md:h-11 md:w-11"
            >
              <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="px-3">{stackSection.ctaLabel}</span>
            <button
              type="button"
              onClick={() => setActiveIndex(Math.min(maxIndex, current + 1))}
              disabled={current === maxIndex}
              aria-label="Next technologies"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-shell-red text-white transition-all duration-300 btn-lift-glow hover:bg-shell-red-dark disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/50 md:h-11 md:w-11"
            >
              <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-[#f2f3f5] p-3 md:p-4">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              gap: `${GAP_PX}px`,
              transform: `translateX(calc(-${current} * (100% + ${GAP_PX}px) / ${visible}))`,
            }}
          >
            {stackGroups.map((group, index) => {
              const expanded = Boolean(expandedGroups[group.id])

              return (
                <div
                  key={group.id}
                  className="min-w-0"
                  style={{ flex: `0 0 calc((100% - ${(visible - 1) * GAP_PX}px) / ${visible})` }}
                >
                  <Reveal
                    variant="up"
                    delay={(index % 4) + 1}
                    className="flex h-full min-h-56 flex-col rounded-xl border border-shell-gray-200 bg-white p-4 shadow-sm md:p-5"
                  >
                    <h3 className="text-base font-bold leading-snug text-shell-gray-900 md:text-lg">{group.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-shell-gray-700">{group.text}</p>

                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`vendors-${group.id}`}
                      onClick={() => setExpandedGroups((state) => ({ ...state, [group.id]: !state[group.id] }))}
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
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
