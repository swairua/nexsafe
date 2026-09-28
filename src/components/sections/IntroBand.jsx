import Reveal from '../ui/Reveal.jsx'
import { pageHref } from '../../data/slug.js'
import { navItems } from '../../data/navItems.js'

/**
 * Editorial row directly below the hero: a borderless 3-column grid
 * (eyebrow + headline / statement / chevron link) with a floating pill
 * section-nav beneath it. Content is the doc-approved company statement;
 * pill labels/hrefs are reused from the primary nav items.
 */
export default function IntroBand() {
  return (
    <section id="company" className="bg-white">
      <div className="shell-container py-14 md:py-20">
        <div id="about" className="grid gap-8 md:grid-cols-3 lg:gap-16">
          {/* Column 1 — eyebrow + headline */}
          <Reveal delay={1}>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-shell-gray-900">
              Our company
            </p>
            <h2 className="mt-3 text-2xl font-normal leading-[1.15] tracking-tight text-shell-gray-900 md:text-3xl lg:text-4xl">
              Simply enabling IT for a complex world
            </h2>
          </Reveal>

          {/* Column 2 — statement paragraph (doc-approved company statement) */}
          <Reveal delay={2}>
            <p className="text-base leading-relaxed text-shell-gray-700 md:text-lg">
              Nexsate brings together managed IT, cloud, cybersecurity, infrastructure, data
              protection and disaster recovery, software development, systems integration and
              technology consulting to simplify complexity, transform operations and empower
              organizations with technology that works as one.
            </p>
          </Reveal>

          {/* Column 3 — chevron link, bottom-aligned like the reference row */}
          <Reveal delay={3} className="flex items-start md:items-end">
            <a
              href={pageHref('How we Work')}
              className="group inline-flex items-center gap-1.5 text-base font-medium text-shell-gray-900 transition-colors hover:text-shell-red"
            >
              Discover how we work
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                ›
              </span>
            </a>
          </Reveal>
        </div>
      </div>

      {/* Floating pill section nav */}
      <div className="shell-container max-w-4xl flex justify-center pb-14 md:pb-20">
        <Reveal delay={2} variant="fade">
          <nav
            aria-label="On this page"
            className="inline-flex flex-wrap justify-center gap-1 rounded-[2rem] bg-white p-2 shadow-[0_10px_40px_-12px_rgba(14,17,20,0.25)] ring-1 ring-black/5"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-shell-gray-700 transition-colors hover:bg-shell-gray-100 hover:text-shell-gray-900"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </Reveal>
      </div>
    </section>
  )
}
