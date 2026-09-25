import { pages } from '../../data/pages.js'
import Reveal from '../ui/Reveal.jsx'
import SmartImage from '../ui/SmartImage.jsx'

// Eyebrow → homepage section anchor for the breadcrumb trail.
const SECTION_ANCHORS = {
  Company: '#company',
  'IT solutions': '#it-solutions',
  Industries: '#industries',
  Insights: '#insights',
  Support: '#support',
  'nexsate.com': '#top',
  Legal: '#top',
}

// Eyebrow → decorative Kyndryl-style imagery (visual blocks only; URLs verified live).
const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=80`
const CATEGORY_IMAGES = {
  Company: img('photo-1552664730-d307ca884978'),
  'IT solutions': img('photo-1518770660439-4636190af475'),
  Industries: img('photo-1519389950473-47ba0277781c'),
  Insights: img('photo-1487058792275-0ad4aaf24ca7'),
  Support: img('photo-1600880292203-757bb62b4baf'),
  'nexsate.com': img('photo-1451187580459-43490279c0fa'),
  Legal: img('photo-1451187580459-43490279c0fa'),
}

function NotFound() {
  return (
    <section className="bg-shell-black text-white">
      <div className="shell-container py-20 text-center md:py-28">
        <p className="text-xs font-bold uppercase tracking-wider text-shell-red">404</p>
        <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-bold tracking-tight md:text-6xl">
          Page not found
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
          The page you are looking for does not exist or may have been moved. Try the
          header menu, or head back to the homepage.
        </p>
        <a href="#top" className="btn-pill btn-pill--green mt-8">
          Back to the homepage
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}

/**
 * Inner-page renderer for '#/<slug>' routes: dark hero + breadcrumb,
 * prose sections (body paragraphs + lists), related-page cards, back to top.
 */
export default function PageView({ page }) {
  if (!page) return <NotFound />

  const sectionHref = SECTION_ANCHORS[page.eyebrow]
  const relatedPages = (page.related || []).map((slug) => pages[slug]).filter(Boolean)
  const categoryImage = CATEGORY_IMAGES[page.eyebrow]

  return (
    <article>
      {/* Dark hero with breadcrumb — Kyndryl Page Header */}
      <section className="relative overflow-hidden bg-shell-black text-white">
        <div
          className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-shell-red/20 blur-3xl"
          aria-hidden="true"
        />
        {categoryImage && (
          <img
            src={categoryImage}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-0 hidden h-full w-2/3 object-cover opacity-25 [mask-image:linear-gradient(to_left,black_30%,transparent)] md:block"
          />
        )}
        <div className="shell-container relative pb-12 pt-28 md:pb-16 md:pt-36">
          <Reveal
            as="nav"
            variant="fade"
            delay={1}
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-white/60"
          >
            <a href="#top" className="transition-colors hover:text-shell-yellow">
              Home
            </a>
            <span aria-hidden="true">/</span>
            {sectionHref ? (
              <a href={sectionHref} className="transition-colors hover:text-shell-yellow">
                {page.eyebrow}
              </a>
            ) : (
              <span>{page.eyebrow}</span>
            )}
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-white">{page.title}</span>
          </Reveal>
          <Reveal as="p" delay={2} className="mt-8 text-xs font-bold uppercase tracking-wider text-shell-red">
            {page.eyebrow}
          </Reveal>
          <Reveal as="h1" delay={3} className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {page.title}
          </Reveal>
          <Reveal as="p" delay={4} className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg">
            {page.intro}
          </Reveal>
        </div>
      </section>

      {/* Sticky in-page tabs — Kyndryl page-header tab area */}
      {page.sections.length > 1 && (
        <div className="sticky top-20 z-30 md:top-24">
          <div className="shell-container py-3">
            <nav
              aria-label="On this page"
              className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full bg-white/95 p-1.5 shadow-[0_10px_36px_-12px_rgba(14,17,20,0.3)] ring-1 ring-black/5 backdrop-blur"
            >
              {page.sections.map((s, i) => (
                <button
                  key={s.heading}
                  type="button"
                  onClick={() =>
                    document
                      .getElementById(`section-${i + 1}`)
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                  className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-shell-gray-700 transition-colors hover:bg-shell-gray-100 hover:text-shell-gray-900"
                >
                  {s.heading}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Body content — Kyndryl alternating bands with feature-tile lists */}
      {page.sections.map((section, sIdx) => (
        <section key={section.heading} className={sIdx % 2 === 0 ? 'bg-white' : 'bg-shell-gray-100'}>
          <div className="shell-container max-w-4xl break-words py-12 md:py-16">
            <Reveal id={`section-${sIdx + 1}`} variant="fade" className="scroll-mt-40">
              <h2 className="text-2xl font-bold tracking-tight text-shell-gray-900 md:text-3xl lg:text-4xl">
                {section.heading}
              </h2>
              {(section.body || []).map((para) => (
                <p key={para} className="mt-5 text-base leading-relaxed text-shell-gray-700 md:text-lg">
                  {para}
                </p>
              ))}
              {section.list && (
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {section.list.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 rounded-2xl border border-shell-gray-300 bg-white p-5"
                    >
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-[2px] bg-shell-green" aria-hidden="true" />
                      <span className="text-base leading-relaxed text-shell-gray-700 md:text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </div>
        </section>
      ))}

      {/* Category visual — Kyndryl-style imagery block (decorative) */}
      {categoryImage && (
        <section className={page.sections.length % 2 === 0 ? 'bg-white' : 'bg-shell-gray-100'}>
          <div className="shell-container pb-4 pt-12 md:pb-6 md:pt-16">
            <Reveal variant="zoom">
              <SmartImage
                src={categoryImage}
                alt=""
                fallback="linear-gradient(135deg, #0e1114 0%, #7a1400 130%)"
                className="aspect-[16/7] w-full rounded-2xl md:aspect-[21/8]"
              />
            </Reveal>
          </div>
        </section>
      )}

      {/* Related pages */}
      {relatedPages.length > 0 && (
        <section className="bg-shell-gray-100">
          <div className="shell-container py-14 md:py-16">
            <Reveal as="h2" variant="fade" className="text-2xl font-bold tracking-tight text-shell-gray-900 md:text-3xl">
              Explore more
            </Reveal>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedPages.map((rel, idx) => (
                <Reveal
                  key={rel.slug}
                  as="a"
                  href={`#/${rel.slug}`}
                  delay={(idx % 4) + 1}
                  className="group rounded-2xl border border-shell-gray-300 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-shell-red hover:shadow-[0_18px_44px_-16px_rgba(14,17,20,0.25)]"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-shell-red">
                    {rel.eyebrow}
                  </p>
                  <h3 className="mt-2 text-base font-bold leading-snug text-shell-gray-900 group-hover:text-shell-red">
                    {rel.title}
                  </h3>
                  <span className="arrow-link mt-4 text-sm">
                    Read more <span className="arrow">›</span>
                  </span>
                </Reveal>
              ))}
            </div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="arrow-link mt-10 text-sm"
            >
              Back to top <span className="arrow">↑</span>
            </button>
          </div>
        </section>
      )}

      {/* Connect with us — Kyndryl-style dark CTA band before the footer */}
      <section className="relative overflow-hidden bg-shell-black text-white">
        <div
          className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-shell-green/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="shell-container relative py-16 md:py-20">
          <Reveal variant="fade">
            <p className="text-xs font-bold uppercase tracking-wider text-shell-red">
              Connect with us
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
              Let's talk about your IT
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              Connect with a nexsate expert to discuss how to design, build, manage and
              modernize the mission-critical technology your business runs on.
            </p>
            <a href="#/contact-us" className="btn-pill btn-pill--green mt-8">
              Talk to an expert
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>
      </section>
    </article>
  )
}
