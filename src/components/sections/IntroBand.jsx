import Reveal from '../ui/Reveal.jsx'
import SectionTag from '../ui/SectionTag.jsx'
import { benefits } from '../../data/content.js'
import { pageHref } from '../../data/slug.js'
import { navItems } from '../../data/navItems.js'

/**
 * Editorial row directly below the hero: the client principle and promise,
 * then the four benefits from the Home Page document as a 4-up grid, with
 * the floating pill section nav beneath (labels reused from the primary nav).
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

          {/* Column 2 — the client's own promise from the Home Page document */}
          <Reveal delay={2}>
            <p className="text-base leading-relaxed text-shell-gray-700 md:text-lg">
              We take care of your IT, so you can take care of your customers. Empowering
              businesses with transformative technology solutions.
            </p>
          </Reveal>

          {/* Column 3 — chevron link, bottom-aligned like the reference row */}
          <Reveal delay={3} className="flex items-start md:items-end">
            <a
              href={pageHref('Our Process')}
              className="group inline-flex items-center gap-1.5 text-base font-medium text-shell-gray-900 transition-colors hover:text-shell-red"
            >
              Discover how we work
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                ›
              </span>
            </a>
          </Reveal>
        </div>

        {/* The four benefits from the Home Page document */}
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
          {benefits.map((benefit, idx) => (
            <Reveal
              key={benefit.id}
              as="li"
              variant="up"
              delay={(idx % 4) + 1}
              className="rounded-2xl border border-shell-gray-300 bg-white p-6"
            >
              <SectionTag>{benefit.title}</SectionTag>
              <p className="mt-3 text-sm leading-relaxed text-shell-gray-700">{benefit.text}</p>
            </Reveal>
          ))}
        </ul>
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
