import { useContent } from '../../content/ContentContext.jsx'
import Reveal from '../ui/Reveal.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import { Rich, RichText } from '../ui/SectionTag.jsx'
import ContactForm from '../sections/ContactForm.jsx'
import { useContactDetails } from '../sections/contactDetails.js'
import ConnectBand from '../sections/ConnectBand.jsx'
import StartBand from '../sections/StartBand.jsx'
import BlogIndex from './BlogIndex.jsx'

function Copy({ para }) {
  const html = String(para || "")
  if (/<\s*(p|br|strong|em|ul|ol|li|a|h3|h4|blockquote)[\s/>]/i.test(html)) {
    return <RichText value={html} className="mt-5 text-base leading-relaxed text-shell-gray-700 md:text-lg [&_a]:text-shell-red [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-shell-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic" />
  }
  return <p className="mt-5 text-base leading-relaxed text-shell-gray-700 md:text-lg">{para}</p>
}

function NotFound(notFound) {
  return (
    <section className="bg-brand-ink text-white">
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

export default function PageView({ page, slug, params }) {
  const content = useContent()
  const pages = content.pages
  const labels = content.pageLabels || {}
  const ui = content.uiLabels || {}
  const anchors = content.categoryAnchors || {}
  const sectionIds = content.sectionIds || {}
  if (!page) return <NotFound {...(content.notFound || {})} />

  if (page.layout === 'blog-index') return <BlogIndex page={page} topic={params ? params.get('topic') : null} />

  const sectionHref = anchors[page.eyebrow]
  const relatedPages = (page.related || []).map((slug) => pages[slug]).filter(Boolean)

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

      <section className="relative overflow-hidden bg-brand-ink text-white">
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
            className="breadcrumb-nav flex w-fit max-w-full flex-wrap items-center gap-2 rounded-md bg-shell-black px-3 py-2 text-sm text-white"
          >
            <a href={'#' + sectionIds.top} className="text-white transition-colors hover:text-shell-yellow">
              {labels.home}
            </a>
            <span aria-hidden="true">/</span>
            {sectionHref ? (
              <a href={sectionHref} className="text-white transition-colors hover:text-shell-yellow">
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
              {section.items && slug === 'help-and-faq' && (
                <div className="mt-6 space-y-3">
                  {section.items.map((item) => (
                    <details
                      key={item.title}
                      className="group rounded-2xl border border-shell-gray-300 bg-white open:shadow-[0_18px_44px_-16px_rgba(14,17,20,0.25)]"
                    >
                      <summary className="flex min-h-[3.5rem] cursor-pointer list-none items-center justify-between gap-4 p-5 text-left text-base font-bold leading-snug text-shell-gray-900 md:text-lg [&::-webkit-details-marker]:hidden">
                        {item.title}
                        <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-shell-gray-100 text-lg leading-none transition-transform duration-300 group-open:rotate-45">+</span>
                      </summary>
                      <div className="px-5 pb-5">
                        <Copy para={item.text} />
                      </div>
                    </details>
                  ))}
                </div>
              )}
              {section.items && slug !== 'help-and-faq' && (
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

      {page.quote && page.quote.text ? (
        <section className="bg-brand-ink text-white">
          <div className="shell-container py-16 md:py-24">
            <Reveal variant="fade" className="mx-auto max-w-3xl text-center">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="mx-auto h-9 w-9 text-shell-red" fill="currentColor">
                <path d="M9.5 5C7 5 5 7.2 5 9.9c0 2.2 1.5 3.9 3.5 4.4.3.1.5-.1.5-.4 0-.2-.1-.4-.3-.5C7.4 13 6.7 12 6.7 10.6c0-1.6 1.3-2.9 3-2.9.3 0 .7.1 1 .2C10.4 6.6 11.4 6 12.6 6H9.5zm9 0c-2.5 0-4.5 2.2-4.5 4.9 0 2.2 1.5 3.9 3.5 4.4.3.1.5-.1.5-.4 0-.2-.1-.4-.3-.5-.6-.5-1.3-1.5-1.3-2.9 0-1.6 1.3-2.9 3-2.9.3 0 .7.1 1 .2-.3-1.5-1.3-2.1-2.5-2.1h-.4z" />
              </svg>
              <blockquote className="mt-6 text-xl font-semibold leading-relaxed tracking-tight md:text-2xl lg:text-3xl">
                {page.quote.text}
              </blockquote>
              {page.quote.attribution ? (
                <cite className="mt-6 block text-sm font-bold uppercase tracking-wider not-italic text-white/60">
                  {page.quote.attribution}
                </cite>
              ) : null}
            </Reveal>
          </div>
        </section>
      ) : null}

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
                  className="group rounded-2xl border border-shell-gray-300 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-ink hover:shadow-[0_18px_44px_-16px_rgba(14,17,20,0.25)]"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-shell-red">
                    {rel.eyebrow}
                  </p>
                  <h3 className="mt-2 text-base font-bold leading-snug text-shell-gray-900 group-hover:text-brand-ink">
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
        <section id="contact-form" className="relative overflow-hidden bg-[#d5deef]">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[266px] bg-shell-black" />
          <div className="shell-container relative z-10 flex min-h-[266px] flex-col justify-end pb-7 pt-10">
            <Reveal variant="fade">
              <span className="mb-4 inline-block border-l-4 border-shell-yellow pl-3 text-sm font-bold uppercase tracking-[0.16em] text-white">Contact Us</span>
              <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">{page.title}</h2>
            </Reveal>
          </div>
          <div className="shell-container relative z-10 grid gap-10 pb-16 pt-7 md:pb-24 md:grid-cols-[1.25fr_1fr] md:gap-8 lg:gap-16">
            <div>
              <p className="max-w-xl text-base leading-relaxed text-shell-gray-900 md:text-lg">{page.intro}</p>
              {details.length ? (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-shell-gray-900">{form.detailsHeading}</h3>
                  <ul className="mt-3 space-y-3">
                    {details.map((d) => (
                      <li key={d.label} className="text-sm text-shell-gray-700">
                        <span className="font-semibold text-shell-gray-900">{d.label} </span>
                        {d.href ? (
                          <a href={d.href} className="underline-offset-2 hover:text-brand-ink hover:underline">{d.value}</a>
                        ) : (
                          <span>{d.value}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
            <div className="md:-mt-[158px] md:w-full md:max-w-md md:justify-self-end">
              <div className="rounded-sm border border-shell-gray-200 bg-white p-6 shadow-lg md:p-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {!isContact && <ConnectBand />}
    </article>
  )
}
