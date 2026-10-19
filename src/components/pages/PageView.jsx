import { useContent } from '../../content/ContentContext.jsx'
import Reveal from '../ui/Reveal.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import { Rich, RichText } from '../ui/SectionTag.jsx'
import ContactForm from '../sections/ContactForm.jsx'
import ConnectBand from '../sections/ConnectBand.jsx'
import StartBand from '../sections/StartBand.jsx'
import BlogIndex from './BlogIndex.jsx'

function Copy({ para }) {
  const html = String(para || '')
  if (/<\s*(p|br|strong|em|ul|ol|li|a|h3|h4|blockquote)[\s/>]/i.test(html)) {
    return <RichText value={html} className='mt-5 text-base leading-relaxed text-shell-gray-700 md:text-lg [&_a]:text-shell-red [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-shell-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic' />
  }
  return <p className='mt-5 text-base leading-relaxed text-shell-gray-700 md:text-lg'>{para}</p>
}

function NotFound(notFound) {
  return (
    <section className='bg-brand-ink text-white'>
      <div className='shell-container py-20 text-center md:py-28'>
        <p className='text-xs font-bold uppercase tracking-wider text-shell-red'>{notFound.tag}</p>
        <h1 className='mx-auto mt-3 max-w-2xl text-4xl font-bold tracking-tight md:text-6xl'>
          {notFound.title}
        </h1>
        <div className='mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg'>
          <Rich as='p'>{notFound.text}</Rich>
        </div>
        <a href={notFound.cta.href} className='btn-pill btn-pill--green mt-8'>
          {notFound.cta.label}
          <span aria-hidden='true'>→</span>
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
  const sharedImage = typeof categoryRaw === 'string' ? categoryRaw : (categoryRaw && categoryRaw.src) || ''
  const sharedAlt = typeof categoryRaw === 'string' ? '' : ((categoryRaw && categoryRaw.alt) || '')
  const ownImage = page.image || {}
  const categoryImage = ownImage.src || sharedImage
  const categoryAlt = ownImage.src ? (ownImage.alt || '') : sharedAlt
  const gallery = page.gallery || []
  const logos = page.logos || []
  const isContact = slug === 'contact-us'
  const form = content.contactForm || {}
  const copy = content.homeContact || {}

  return (
    <article>
      <section className='relative overflow-hidden bg-brand-ink text-white'>
        <div
          className='pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-shell-red/20 blur-3xl'
          aria-hidden='true'
        />
        {categoryImage && (
          <img
            src={categoryImage}
            alt={categoryAlt}
            aria-hidden={categoryAlt ? undefined : 'true'}
            className='pointer-events-none absolute -right-24 top-0 h-full w-1/2 object-cover opacity-20 [mask-image:linear-gradient(to_left,black,transparent)]'
          />
        )}
        <div className='shell-container relative z-10 py-14 md:py-20'>
          <Reveal as='nav' variant='fade' className='mb-12 text-xs text-white/60' aria-label={ui.breadcrumb}>
            {sectionHref ? (
              <a href={sectionHref} className='underline-offset-2 hover:text-white hover:underline'>
                {page.eyebrow}
              </a>
            ) : (
              <span>{page.eyebrow}</span>
            )}
            <span aria-hidden='true'>/</span>
            <span className='font-semibold text-white'>{page.title}</span>
          </Reveal>
          <Reveal as='p' delay={2} className='mt-8 text-xs font-bold uppercase tracking-wider text-shell-red'>
            {page.eyebrow}
          </Reveal>
          <Reveal as='h1' delay={3} className='mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'>
            {page.title}
          </Reveal>
          <Reveal as='div' delay={4} className='mt-5 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg'>
            <Copy para={page.intro} />
          </Reveal>
        </div>
      </section>

      {page.sections.length > 1 && (
        <div className='sticky top-20 z-30 md:top-24'>
          <div className='shell-container py-3'>
            <nav
              aria-label={ui.onThisPage}
              className='inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full bg-white/95 p-1.5 shadow-[0_10px_36px_-12px_rgba(14,17,20,0.3)] ring-1 ring-black/5 backdrop-blur'
            >
              {page.sections.map((s, i) => (
                <button
                  key={s.heading}
                  type='button'
                  onClick={() =>
                    document
                      .getElementById(`section-${i + 1}`)
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                  className='whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-shell-gray-700 transition-colors hover:bg-shell-gray-100 hover:text-shell-gray-900'
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
          <div className='shell-container py-8 md:py-12 break-words'>
            <Reveal id={`section-${sIdx + 1}`} variant='fade' className='scroll-mt-40'>
              <span className='inline-flex items-center rounded-full bg-brand-ink/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-ink ring-1 ring-brand-ink/25 shadow-[0_0_14px_2px_rgba(1,116,164,0.25)]'>
                {page.eyebrow}
              </span>
              <h2 className='mt-3 bg-gradient-to-r from-[#0a1440] via-[#0174a4] to-[#0a1440] bg-clip-text text-2xl font-bold tracking-tight text-transparent drop-shadow-[0_0_18px_rgba(1,116,164,0.25)] md:text-3xl lg:text-4xl'>
                {section.heading}
              </h2>
              {(section.body || []).map((para, pi) => (
                <Copy key={String(para).slice(0, 60) + pi} para={para} />
              ))}
              {section.list && (
                <ul className='mt-6 grid gap-4 sm:grid-cols-2'>
                  {section.list.map((item) => (
                    <li
                      key={item}
                      className='flex gap-3 rounded-2xl border border-shell-gray-300 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-ink hover:shadow-[inset_0_0_0_1px_rgba(1,116,164,0.6),0_0_0_3px_rgba(1,116,164,0.15),0_0_24px_3px_rgba(1,116,164,0.35),0_14px_30px_-12px_rgba(1,116,164,0.35)]'
                    >
                      <span className='mt-1.5 h-2 w-2 shrink-0 rounded-[2px] bg-shell-red' aria-hidden='true' />
                      <span className='text-base leading-relaxed text-shell-gray-700 md:text-lg'>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.items && slug === 'help-and-faq' && (
                <div className='mt-6 space-y-3'>
                  {section.items.map((item) => (
                    <details
                      key={item.title}
                      className='faq-item group rounded-2xl border border-shell-gray-300 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-ink hover:shadow-[inset_0_0_0_1px_rgba(1,116,164,0.5),0_0_0_3px_rgba(1,116,164,0.15),0_0_24px_3px_rgba(1,116,164,0.35),0_14px_30px_-12px_rgba(1,116,164,0.35)] open:border-brand-ink'
                    >
                      <summary className='flex min-h-[3.5rem] cursor-pointer list-none items-center justify-between gap-4 p-5 text-left text-base font-bold leading-snug text-shell-gray-900 md:text-lg [&::-webkit-details-marker]:hidden'>
                        {item.title}
                        <span aria-hidden='true' className='faq-plus flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-shell-gray-100 text-lg leading-none transition-all duration-300 group-hover:scale-110 group-hover:text-brand-ink group-open:rotate-45'>+</span>
                      </summary>
                      <div className='px-5 pb-5 text-sm leading-relaxed text-shell-gray-700 md:text-base'>
                        <Copy para={item.text} />
                      </div>
                    </details>
                  ))}
                </div>
              )}
              {section.items && slug !== 'help-and-faq' && (
                <ul className='mt-6 grid gap-4 sm:grid-cols-2'>
                  {section.items.map((item) => (
                    <li
                      key={item.title}
                      className='rounded-2xl border border-shell-gray-300 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-ink hover:shadow-[inset_0_0_0_1px_rgba(1,116,164,0.6),0_0_0_3px_rgba(1,116,164,0.15),0_0_24px_3px_rgba(1,116,164,0.35),0_14px_30px_-12px_rgba(1,116,164,0.35)]'
                    >
                      <h3 className='flex gap-3 text-base font-bold leading-snug text-shell-gray-900 md:text-lg'>
                        <span className='mt-2 h-2 w-2 shrink-0 rounded-[2px] bg-shell-red' aria-hidden='true' />
                        {item.title}
                      </h3>
                      <div className='mt-2 pl-5 text-sm leading-relaxed text-shell-gray-700 md:text-base'>
                        <Copy para={item.text} />
                      </div>
                      {item.href ? (
                        <a href={item.href} className='arrow-link inline-flex items-center justify-center gap-0.5 mt-3 rounded-full border border-shell-gray-300 bg-white px-4 py-2 text-sm font-medium text-[#29b2fe] shadow-sm btn-lift-glow hover:border-brand-ink hover:text-brand-ink'>
                          {labels.learnMore || 'Learn more'} <span className='arrow'>›</span>
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
        <section className='bg-brand-ink text-white'>
          <div className='shell-container py-8 md:py-12'>
            <Reveal variant='fade' className='mx-auto max-w-3xl text-center'>
              <svg aria-hidden='true' viewBox='0 0 24 24' className='mx-auto h-9 w-9 text-shell-red' fill='currentColor'>
                <path d='M9.5 5C7 5 5 7.2 5 9.9c0 2.2 1.5 3.9 3.5 4.4.3.1.5-.1.5-.4 0-.2-.1-.4-.3-.5C7.4 13 6.7 12 6.7 10.6c0-1.6 1.3-2.9 3-2.9.3 0 .7.1 1 .2C10.4 6.6 11.4 6 12.6 6H9.5zm9 0c-2.5 0-4.5 2.2-4.5 4.9 0 2.2 1.5 3.9 3.5 4.4.3.1.5-.1.5-.4 0-.2-.1-.4-.3-.5-.6-.5-1.3-1.5-1.3-2.9 0-1.6 1.3-2.9 3-2.9.3 0 .7.1 1 .2-.3-1.5-1.3-2.1-2.5-2.1h-.4z' />
              </svg>
              <blockquote className='mt-6 text-xl font-semibold leading-relaxed tracking-tight md:text-2xl lg:text-3xl'>
                {page.quote.text}
              </blockquote>
              {page.quote.attribution ? (
                <cite className='mt-6 block text-sm font-bold uppercase tracking-wider not-italic text-white/60'>
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
          <div className='shell-container py-8 md:py-12'>
            <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
              {gallery.map((shot) => (
                <Reveal key={shot.src} variant='zoom'>
                  <SmartImage
                    src={shot.src}
                    alt={shot.alt || ''}
                    fallback='linear-gradient(135deg, #070e40 0%, #010ed0 130%)'
                    className='aspect-[4/3] w-full rounded-2xl'
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {categoryImage && (
        <section className={page.sections.length % 2 === 0 ? 'bg-white' : 'bg-shell-gray-100'}>
          <div className='shell-container py-8 md:py-12'>
            <Reveal variant='zoom'>
              <SmartImage
                src={categoryImage}
                alt={categoryAlt}
                fallback='linear-gradient(135deg, #070e40 0%, #010ed0 130%)'
                className='aspect-[16/7] w-full rounded-2xl md:aspect-[21/8]'
              />
            </Reveal>
          </div>
        </section>
      )}

      {logos.length > 0 && (
        <section className='bg-shell-gray-100'>
          <div className='shell-container py-8 md:py-12'>
            <div className='flex flex-wrap items-center justify-center gap-6 md:gap-10'>
              {logos.map((logo) => (
                <Reveal key={logo.src} variant='fade'>
                  <img
                    src={logo.src}
                    alt={logo.alt || ''}
                    loading='lazy'
                    className='h-16 w-auto object-contain opacity-80 transition-opacity hover:opacity-100'
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedPages.length > 0 && (
        <section className={page.sections.length % 2 === 0 ? 'bg-white' : 'bg-shell-gray-100'}>
          <div className='shell-container py-8 md:py-12'>
            <Reveal as='h2' variant='fade' className='text-2xl font-bold tracking-tight text-shell-gray-900 md:text-3xl'>
              {labels.exploreMore}
            </Reveal>
            <div className='mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
              {relatedPages.map((rel, idx) => (
                <Reveal
                  key={rel.slug}
                  as='a'
                  href={`#/${rel.slug}`}
                  delay={(idx % 4) + 1}
                  className='group rounded-2xl border border-shell-gray-300 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-ink hover:shadow-[inset_0_0_0_1px_rgba(1,116,164,0.6),0_0_0_3px_rgba(1,116,164,0.15),0_0_24px_3px_rgba(1,116,164,0.35),0_14px_30px_-12px_rgba(1,116,164,0.35)]'
                >
                  <p className='text-xs font-bold uppercase tracking-wider text-shell-red'>
                    {rel.eyebrow}
                  </p>
                  <h3 className='mt-2 text-base font-bold leading-snug text-shell-gray-900 group-hover:text-brand-ink'>
                    {rel.title}
                  </h3>
                  <span className='arrow-link mt-4 text-sm'>
                    {labels.readMore} <span className='arrow'>›</span>
                  </span>
                </Reveal>
              ))}
            </div>
            <button
              type='button'
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className='arrow-link inline-flex items-center justify-center gap-0.5 mt-10 rounded-full border border-shell-gray-300 bg-white px-3 py-2 text-sm font-medium text-[#29b2fe] shadow-sm btn-lift-glow hover:border-brand-ink hover:text-brand-ink'
            >
              {labels.backToTop} <span className='arrow'>↑</span>
            </button>
          </div>
        </section>
      )}

      {isContact ? (
        <section id='contact-form' className='relative overflow-hidden bg-[#d5deef]'>
          <div className='bg-shell-black'>
            <div className='shell-container relative z-10 flex flex-col justify-end pb-7 pt-10'>
              <Reveal variant='fade'>
                <span className='mb-4 inline-block border-l-4 border-shell-yellow pl-3 text-sm font-bold uppercase tracking-[0.16em] text-white'>Contact Us</span>
                <h2 className='max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl'>{page.title}</h2>
              </Reveal>
            </div>
          </div>
          <div className='shell-container relative z-10 grid gap-10 bg-[#d5deef] pb-16 pt-7 md:pb-24 md:grid-cols-[1.25fr_1fr] md:gap-8 lg:gap-16'>
            <Reveal variant='left' className='space-y-8'>
              <div>
                <p className='max-w-xl text-base leading-relaxed text-shell-gray-900 md:text-lg'>{page.intro}</p>
                {form.detailPhone && (
                  <a href={`tel:${String(form.detailPhone).replace(/[^+\d]/g, '')}`} className='group mt-8 inline-flex max-w-full flex-wrap items-center gap-3 break-words text-base font-bold text-shell-gray-900 transition-transform duration-300 hover:translate-x-0.5 sm:text-lg'>
                    <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-brand-ink/30 shadow-[0_0_12px_2px_rgba(1,116,164,0.35),0_2px_8px_-2px_rgba(1,116,164,0.4)] transition-shadow duration-300 group-hover:shadow-[0_0_18px_4px_rgba(1,116,164,0.5),0_2px_10px_-2px_rgba(1,116,164,0.5)]'>
                      <svg className='h-4 w-4 text-brand-ink' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'><path d='M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.25a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.9z' /></svg>
                    </span>
                    <span>Call us at: <span className='text-brand-ink transition-colors group-hover:text-shell-gray-900'>{form.detailPhone}</span></span>
                  </a>
                )}
              </div>
              {(copy.benefits || []).length > 0 && (
                <div>
                  <h3 className='text-xs font-bold uppercase tracking-[0.18em] text-brand-ink'>Your benefits:</h3>
                  <div className='mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2'>
                    {(copy.benefits || []).map((benefit) => (
                      <span key={benefit} className='group flex items-center gap-3 text-sm font-medium text-shell-gray-900 transition-transform duration-300 hover:translate-x-0.5'>
                        <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-brand-ink/30 shadow-[0_0_12px_2px_rgba(1,116,164,0.35),0_2px_8px_-2px_rgba(1,116,164,0.4)] transition-shadow duration-300 group-hover:shadow-[0_0_18px_4px_rgba(1,116,164,0.5),0_2px_10px_-2px_rgba(1,116,164,0.5)]'>
                          <svg className='h-3.5 w-3.5 text-brand-ink' viewBox='0 0 16 16' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'><path d='M3 8.5l3.2 3.2L13 5' /></svg>
                        </span>
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {(copy.steps || []).length > 0 && (
                <div>
                  <h3 className='text-xs font-bold uppercase tracking-[0.18em] text-brand-ink'>What happens next?</h3>
                  <ol className='mt-5 grid gap-6 sm:grid-cols-3'>
                    {(copy.steps || []).map((step, index) => (
                      <li key={step} className='relative flex items-start gap-4'>
                        <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#070e40] text-sm font-extrabold text-white ring-2 ring-brand-ink/50 shadow-[0_0_18px_3px_rgba(1,116,164,0.45),inset_0_1px_0_rgba(255,255,255,0.25)]'>
                          {index + 1}
                        </span>
                        <p className='pt-1.5 text-sm leading-relaxed text-shell-gray-700'>{step}</p>
                        {index < (copy.steps || []).length - 1 ? (
                          <span aria-hidden='true' className='absolute bottom-0 left-[18px] top-10 hidden w-px bg-gradient-to-b from-brand-ink/50 to-transparent sm:block' />
                        ) : null}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </Reveal>
            <Reveal variant='right' className='md:-mt-[158px] md:w-full md:max-w-md md:justify-self-end'>
              <ContactForm simple />
            </Reveal>
          </div>
        </section>
      ) : null}

      {!isContact && <ConnectBand />}
    </article>
  )
}

