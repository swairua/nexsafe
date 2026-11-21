import { useContent } from '../../content/ContentContext.jsx'
import Reveal from '../ui/Reveal.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import { Rich, RichText } from '../ui/SectionTag.jsx'
import HomeContact from '../sections/HomeContact.jsx'
import ConnectBand from '../sections/ConnectBand.jsx'
import StartBand from '../sections/StartBand.jsx'
import BlogIndex from './BlogIndex.jsx'

function Copy({ para, light = false }) {
  const html = String(para || '')
  const tone = light ? 'text-white' : 'text-shell-gray-700'
  if (/<\s*(p|br|strong|em|ul|ol|li|a|h3|h4|blockquote)[\s/>]/i.test(html)) {
    return <RichText value={html} className={`mt-5 text-base leading-relaxed ${tone} md:text-lg [&_a]:text-shell-red [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-shell-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic`} />
  }
  return <p className={`mt-5 text-base leading-relaxed ${tone} md:text-lg`}>{para}</p>
}

function NotFound(notFound) {
  return (
    <section className='bg-brand-ink text-white'>
      <div className='shell-container py-20 text-center md:py-28'>
        <p className='text-sm font-bold uppercase tracking-wider text-shell-yellow'>{notFound.tag}</p>
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
  const isAbout = slug === 'about-us'
  const isContact = slug === 'contact-us'
  const sectionImages = [
    ...(!isAbout && categoryImage ? [{ src: categoryImage, alt: categoryAlt }] : []),
    ...gallery,
  ].filter((image, index, images) => images.findIndex((item) => item.src === image.src) === index)

  return (
    <article>
      <section className='relative overflow-hidden bg-shell-black text-white'>
        {categoryImage ? (
          <>
            <img src={categoryImage} alt='' aria-hidden='true' className='absolute inset-0 h-full w-full object-cover opacity-55' onError={(e) => { e.currentTarget.style.display = 'none' }} />
            <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25' aria-hidden='true' />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25' aria-hidden='true' />
          </>
        ) : null}
        <div
          className='pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-shell-red/20 blur-3xl'
          aria-hidden='true'
        />
        <div className='shell-container relative z-10 flex min-h-[28rem] flex-col justify-center py-20 md:min-h-[36rem]'>
          <Reveal as='p' delay={2} className='mt-8 mb-3 inline-block border-l-[3px] border-shell-yellow pl-3 text-sm font-bold tracking-[0.02em] text-shell-yellow'>
            {page.eyebrow}
          </Reveal>
          <Reveal as='h1' delay={3} className='mb-4 text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem]'>
            {page.title}
          </Reveal>
          <Reveal as='div' delay={4} className='mb-6 text-base leading-relaxed text-white/90 md:text-lg'>
            <Copy para={page.intro} light />
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

      {page.sections.map((section, sIdx) => {
        const sectionImage = isAbout ? gallery[sIdx - 1] : sectionImages[sIdx]
        const imageFirst = sIdx % 2 === 0
        const darkSection = sIdx % 2 === 0
        return (
        <section key={section.heading} className={darkSection ? 'bg-shell-black text-white' : 'bg-white'}>
          <div className='shell-container py-8 md:py-12 break-words'>
            <Reveal id={`section-${sIdx + 1}`} variant='fade' className={`scroll-mt-40 ${sectionImage ? 'grid gap-8 md:grid-cols-2 md:items-center' : ''}`}>
              {sectionImage ? <SmartImage src={sectionImage.src} alt={sectionImage.alt || ''} fallback='linear-gradient(135deg, #d8dbdd 0%, #f4f5f6 100%)' className={`aspect-[4/3] w-full rounded-2xl ${imageFirst ? 'order-1' : 'order-2'}`} /> : null}
              <div className={sectionImage ? (imageFirst ? 'order-2' : 'order-1') : ''}>
              <h2 className={`mt-0 text-2xl font-extrabold tracking-tight md:text-3xl lg:text-4xl ${darkSection ? 'text-white' : 'text-[#0a1a3c]'}`}>
                {section.heading}
              </h2>
              {(section.body || []).map((para, pi) => (
                <Copy key={String(para).slice(0, 60) + pi} para={para} light={darkSection} />
              ))}
              {section.list && (
                <ul className='mt-6 grid gap-4 sm:grid-cols-2'>
                  {section.list.map((item, idx) => (
                    <Reveal as='li' variant='up' delay={(idx % 4) + 1}
                      key={item}
                      className={`flex gap-3 rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:border-brand-ink hover:shadow-[inset_0_0_0_1px_rgba(1,116,164,0.6),0_0_0_3px_rgba(1,116,164,0.15),0_0_24px_3px_rgba(1,116,164,0.35),0_14px_30px_-12px_rgba(1,116,164,0.35)] ${darkSection ? 'border-white/15 bg-white/5' : 'border-shell-gray-300 bg-[#f3f4f6]'}`}
                    >
                      <span className='mt-1.5 h-2 w-2 shrink-0 rounded-[2px] bg-shell-red' aria-hidden='true' />
                      <span className={`text-base leading-relaxed md:text-lg ${darkSection ? 'text-white/85' : 'text-shell-gray-700'}`}>{item}</span>
                    </Reveal>
                  ))}
                </ul>
              )}
              {section.items && slug === 'help-and-faq' && (
                <div className='mt-6 space-y-3'>
                  {section.items.map((item) => (
                    <details
                      key={item.title}
                      className='faq-item group rounded-2xl border border-shell-gray-300 bg-white transition-all duration-300 hover:border-brand-ink hover:shadow-[inset_0_0_0_1px_rgba(1,116,164,0.5),0_0_0_3px_rgba(1,116,164,0.15),0_0_24px_3px_rgba(1,116,164,0.35),0_14px_30px_-12px_rgba(1,116,164,0.35)]'
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
                  {section.items.map((item, idx) => (
                    <Reveal as='li' variant='up' delay={(idx % 4) + 1}
                      key={item.title}
                      className={`rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:border-brand-ink hover:shadow-[inset_0_0_0_1px_rgba(1,116,164,0.6),0_0_0_3px_rgba(1,116,164,0.15),0_0_24px_3px_rgba(1,116,164,0.35),0_14px_30px_-12px_rgba(1,116,164,0.35)] ${darkSection ? 'border-white/15 bg-white/5' : 'border-shell-gray-300 bg-[#f3f4f6]'}`}
                    >
                      <h3 className={`flex gap-3 text-base font-bold leading-snug md:text-lg ${darkSection ? 'text-white' : 'text-shell-gray-900'}`}>
                        <span className='mt-2 h-2 w-2 shrink-0 rounded-[2px] bg-shell-red' aria-hidden='true' />
                        {item.title}
                      </h3>
                      <div className={`mt-2 pl-5 text-sm leading-relaxed md:text-base ${darkSection ? 'text-white/80' : 'text-shell-gray-700'}`}>
                        <Copy para={item.text} light={darkSection} />
                      </div>
                      {item.href ? (
                        <a href={item.href} className='mt-3 ml-auto flex w-fit items-center rounded-full bg-shell-red px-6 py-2.5 text-sm font-bold tracking-wide text-white transition-all duration-300 btn-lift-glow hover:bg-shell-red-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/50'>
                          {labels.learnMore || 'Learn more'} <span className='arrow'>›</span>
                        </a>
                      ) : null}
                    </Reveal>
                  ))}
                </ul>
              )}
              </div>
            </Reveal>
          </div>
        </section>
        )
      })}

      {page.quote && page.quote.text ? (
        <section className='bg-shell-black text-white'>
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

      {logos.length > 0 && (
        <section className='bg-shell-black'>
          <div className='shell-container py-8 md:py-12'>
            <div className='flex flex-wrap items-center justify-center gap-4 md:gap-5'>
              {logos.map((logo) => (
                <Reveal key={logo.src} variant='fade' className='flex h-36 w-36 items-center justify-center rounded-xl border border-white/15 bg-white/5 p-5 shadow-sm transition-all duration-300 hover:border-brand-ink hover:shadow-[0_0_14px_1px_rgba(1,116,164,0.7),0_0_36px_8px_rgba(1,116,164,0.3)]'>
                  <img
                    src={logo.src}
                    alt={logo.alt || ''}
                    loading='lazy'
                    className='max-h-24 w-auto max-w-full object-contain'
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedPages.length > 0 && (
        <section className='bg-white'>
        <div className='shell-container py-8 md:py-12'>
            <Reveal as='h2' variant='fade' className='text-3xl font-extrabold tracking-tight text-[#0a1a3c] md:text-4xl'>
              {labels.exploreMore}
            </Reveal>
            <div className='mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
              {relatedPages.map((rel, idx) => (
                <Reveal
                  key={rel.slug}
                  as='a'
                  href={`#/${rel.slug}`}
                  delay={(idx % 4) + 1}
                  className='group rounded-2xl border border-shell-gray-300 bg-[#f3f4f6] p-6 shadow-sm transition-all duration-300 hover:border-brand-ink hover:shadow-[inset_0_0_0_1px_rgba(1,116,164,0.6),0_0_0_3px_rgba(1,116,164,0.15),0_0_24px_3px_rgba(1,116,164,0.35),0_14px_30px_-12px_rgba(1,116,164,0.35)]'
                >
                  <p className='text-sm font-bold uppercase tracking-wider text-[#0174a4]'>
                    {rel.eyebrow}
                  </p>
                  <h3 className='mt-2 text-lg font-bold leading-snug text-shell-gray-900 group-hover:text-brand-ink'>
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
              className='mt-10 ml-auto flex w-fit items-center rounded-full bg-shell-red px-6 py-2.5 text-sm font-bold tracking-wide text-white transition-all duration-300 btn-lift-glow hover:bg-shell-red-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/50'
            >
              {labels.backToTop} <span className='arrow'>↑</span>
            </button>
          </div>
        </section>
      )}

      {isContact ? <HomeContact /> : null}

      {!isContact && <ConnectBand />}
    </article>
  )
}
