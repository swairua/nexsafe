import { useContent } from '../../content/ContentContext.jsx'
import Reveal from '../ui/Reveal.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import { Rich, RichText } from '../ui/SectionTag.jsx'
import ContactForm from '../sections/ContactForm.jsx'
import { useContactDetails } from '../sections/contactDetails.js'
import ConnectBand from '../sections/ConnectBand.jsx'
import StartBand from '../sections/StartBand.jsx'
import BlogIndex from './BlogIndex.jsx'

// Plain paragraphs render as <p>; HTML saved by the admin rich-text editor
// renders through <RichText> (sanitised), so formatting survives.
function Copy({ para }) {
  const html = String(para || "")
  if (/<\s*(p|br|strong|em|ul|ol|li|a|h3|h4|blockquote)[\s/>]/i.test(html)) {
    return <RichText value={html} className="mt-5 text-base leading-relaxed text-shell-gray-700 md:text-lg [&_a]:text-shell-red [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-shell-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic" />
  }
  return <p className="mt-5 text-base leading-relaxed text-shell-gray-700 md:text-lg">{para}</p>
}

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
        <div className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
          <Rich as="p">{notFound.text}</Rich>
        </div>
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
export default function PageView({ page, slug, params }) {
  const content = useContent()
  const pages = content.pages
  const labels = content.pageLabels || {}
  const ui = content.uiLabels || {}
  const anchors = content.categoryAnchors || {}
  const sectionIds = content.sectionIds || {}
  if (!page) return <NotFound {...(content.notFound || {})} />
  // The blog index ('#/blog') renders the insight card grid instead of prose.
  if (page.layout === 'blog-index') return <BlogIndex page={page} topic={params ? params.get('topic') : null} />

  const sectionHref = anchors[page.eyebrow]
  const relatedPages = (page.related || []).map((slug) => pages[slug]).filter(Boolean)
  // Category images carry alt text ({ src, alt }); legacy string values keep working.
  // A page may ship its own hero image (ported from the previous site), which
  // takes precedence over the shared per-category image.
  const categoryRaw = (content.categoryImages || {})[page.eyebrow]
  const sharedImage = typeof categoryRaw === "string" ? categoryRaw : (categoryRaw && categoryRaw.src) || ""
  const sharedAlt = typeof categoryRaw === "string" ? "" : ((categoryRaw && categoryRaw.alt) || "")
  const ownImage = page.image || {}
  const categoryImage = ownImage.src || sharedImage
  const categoryAlt = ownImage.src ? (ownImage.alt || "") : sharedAlt
  const gallery = page.gallery || []
  const logos = page.logos || []
  const isContact = slug === "contact-us"
  const form = content.contactForm || {}
  const details = useContactDetails()

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
            alt={categoryAlt}
            aria-hidden={categoryAlt ? undefined : "true"}
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
          <Reveal as="div" delay={4} className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg">
            <Copy para={page.intro} />
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
          <div className="shell-container py-16 md:py-24 break-words">
            <Reveal id={`section-${sIdx + 1}`} variant="fade" className="scroll-mt-40">
              <h2 className="text-2xl font-bold tracking-tight text-shell-gray-900 md:text-3xl lg:text-4xl">
                {section.heading}
              </h2>
              {(section.body || []).map((para, pi) => (
                <Copy key={String(para).slice(0, 60) + pi} para={para} />
              ))}
              {section.list && (
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {section.list.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 rounded-2xl border border-shell-gray-300 bg-white p-5"
                    >
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-[2px] bg-shell-red" aria-hidden="true" />
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
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-[2px] bg-shell-red" aria-hidden="true" />
                        {item.title}
                      </h3>
                      <div className="mt-2 pl-5 text-sm leading-relaxed text-shell-gray-700 md:text-base">
                        <Copy para={item.text} />
                      </div>
                      {item.href ? (
                        <a href={item.href} className="arrow-link mt-3 inline-block pl-5 text-sm">
                          {labels.learnMore || 'Learn more'} <span className="arrow">›</span>
                        </a>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </div>
        </section>
      ))}

      {/* Page gallery — photography the page carries itself (About page) */}
      {slug === 'about-us' && <StartBand />}

      {gallery.length > 0 && (
        <section className={page.sections.length % 2 === 0 ? 'bg-shell-gray-100' : 'bg-white'}>
          <div className="shell-container py-16 md:py-24">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((shot) => (
                <Reveal key={shot.src} variant="zoom">
                  <SmartImage
                    src={shot.src}
                    alt={shot.alt || ""}
                    fallback="linear-gradient(135deg, #070e40 0%, #010ed0 130%)"
                    className="aspect-[4/3] w-full rounded-2xl"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category visual — Kyndryl-style imagery block (decorative) */}
      {categoryImage && (
        <section className={page.sections.length % 2 === 0 ? 'bg-white' : 'bg-shell-gray-100'}>
          <div className="shell-container py-16 md:py-24">
            <Reveal variant="zoom">
              <SmartImage
                src={categoryImage}
                alt={categoryAlt}
                fallback="linear-gradient(135deg, #070e40 0%, #010ed0 130%)"
                className="aspect-[16/7] w-full rounded-2xl md:aspect-[21/8]"
              />
            </Reveal>
          </div>
        </section>
      )}

      {/* Awards / certification logos carried by the page itself */}
      {logos.length > 0 && (
        <section className="bg-white">
          <div className="shell-container py-16 md:py-24">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-14">
              {logos.map((badge) => (
                <Reveal key={badge.src} variant="fade">
                  <img
                    src={badge.src}
                    alt={badge.alt || ""}
                    loading="lazy"
                    className="h-20 w-auto object-contain md:h-24"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related pages */}
      {relatedPages.length > 0 && (
        <section className="bg-shell-gray-100">
          <div className="shell-container py-16 md:py-24">
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
          <div className="shell-container grid gap-10 py-16 md:py-24 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
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
      {/* Connect with us — dark CTA band before the footer (shared with homepage). */}
      <ConnectBand />
    </article>
  )
}
