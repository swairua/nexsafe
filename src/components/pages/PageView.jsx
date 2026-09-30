import { useContent } from '../../content/ContentContext.jsx'
import Reveal from '../ui/Reveal.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import ContactForm from '../sections/ContactForm.jsx'

// Eyebrow → homepage anchor (breadcrumb trail) and the decorative eyebrow →
// image map are both content-driven (admin > "Breadcrumb anchors" /
// "Category images"), so neither is duplicated here.

function NotFound(notFound) {
  return (
    <section className="bg-shell-black text-white">
      <div className="shell-container py-20 text-center md:py-28">
        <p className="text-xs font-bold uppercase tracking-wider text-shell-red">{notFound.tag}</p>
        <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-bold tracking-tight md:text-6xl">
          {notFound.title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
          {notFound.text}
        </p>
        <a href={notFound.cta.href} className="btn-pill btn-pill--green mt-8">
          {notFound.cta.label}
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
export default function PageView({ page, slug }) {
  const content = useContent()
  const pages = content.pages
  const labels = content.pageLabels || {}
  const connect = content.pageConnect || {}
  const ui = content.uiLabels || {}
  const anchors = content.categoryAnchors || {}
  const sectionIds = content.sectionIds || {}
  const settings = content.settings || {}
  if (!page) return <NotFound {...(content.notFound || {})} />

  const sectionHref = anchors[page.eyebrow]
  const relatedPages = (page.related || []).map((slug) => pages[slug]).filter(Boolean)
  const categoryImage = (content.categoryImages || {})[page.eyebrow]
  const isContact = slug === "contact-us"
  const form = content.contactForm || {}
  // Contact details come from Site settings; each row only renders when filled.
  const details = [
    { label: form.emailLabel, value: settings.email, href: settings.email ? "mailto:" + settings.email : "" },
    { label: form.phoneLabel, value: settings.phone, href: settings.phone ? "tel:" + String(settings.phone).replace(/\s+/g, "") : "" },
    { label: form.addressLabel, value: settings.address, href: "" },
  ].filter((d) => d.value)

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
            aria-label={ui.breadcrumb}
            className="flex flex-wrap items-center gap-2 text-sm text-white/60"
          >
            <a href={'#' + sectionIds.top} className="transition-colors hover:text-shell-yellow">
              {labels.home}
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
              aria-label={ui.onThisPage}
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
              {section.items && (
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {section.items.map((item) => (
                    <li
                      key={item.title}
                      className="rounded-2xl border border-shell-gray-300 bg-white p-5"
                    >
                      <h3 className="flex gap-3 text-base font-bold leading-snug text-shell-gray-900 md:text-lg">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-[2px] bg-shell-green" aria-hidden="true" />
                        {item.title}
                      </h3>
                      <p className="mt-2 pl-5 text-sm leading-relaxed text-shell-gray-700 md:text-base">
                        {item.text}
                      </p>
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
                fallback="linear-gradient(135deg, #070e40 0%, #010ed0 130%)"
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
              {labels.exploreMore}
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
                    {labels.readMore} <span className="arrow">›</span>
                  </span>
                </Reveal>
              ))}
            </div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="arrow-link mt-10 text-sm"
            >
              {labels.backToTop} <span className="arrow">↑</span>
            </button>
          </div>
        </section>
      )}

      {isContact ? (
        <section id="contact-form" className="bg-white">
          <div className="shell-container grid gap-10 py-14 md:py-20 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <ContactForm />
            {details.length ? (
              <div className="lg:pt-2">
                <h2 className="text-lg font-bold tracking-tight text-shell-gray-900">{form.detailsHeading}</h2>
                <ul className="mt-4 space-y-3">
                  {details.map((d) => (
                    <li key={d.label} className="rounded-xl border border-shell-gray-300 p-4">
                      <span className="block text-xs font-semibold uppercase tracking-wide text-shell-gray-500">{d.label}</span>
                      {d.href ? (
                        <a href={d.href} className="mt-1 block text-sm font-medium text-shell-gray-900 underline-offset-2 hover:text-shell-red hover:underline">{d.value}</a>
                      ) : (
                        <span className="mt-1 block text-sm font-medium text-shell-gray-900">{d.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
      {/* Connect with us — Kyndryl-style dark CTA band before the footer */}
      <section className="relative overflow-hidden bg-shell-black text-white">
        <div
          className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-shell-green/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="shell-container relative py-16 md:py-20">
          <Reveal variant="fade">
            <p className="text-xs font-bold uppercase tracking-wider text-shell-red">
              {connect.tag}
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
              {connect.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              {connect.text}
            </p>
            <a href={connect.cta.href} className="btn-pill btn-pill--green mt-8">
              {connect.cta.label}
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>
      </section>
    </article>
  )
}
