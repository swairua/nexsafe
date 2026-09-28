import Reveal from '../ui/Reveal.jsx'
import SectionTag from '../ui/SectionTag.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import { benefits } from '../../data/content.js'
import { pageHref } from '../../data/slug.js'
import { navItems } from '../../data/navItems.js'

/**
 * Company intro band — matches the reference layout:
 * dark plum top band (eyebrow + headline left, supporting copy right),
 * then three photos overlapping the dark/light boundary, each with a
 * white caption card pulled up over the photo's bottom edge.
 * The four client-document benefits + pill nav are kept below the cards
 * so no supplied copy is lost.
 */
const companyCards = [
  {
    id: 'our-services',
    eyebrow: 'Our services',
    title: 'How we can help',
    href: pageHref('Services & Solutions'),
    src: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80',
    alt: 'Team meeting in a boardroom',
    fallback: 'linear-gradient(135deg, #070e40 0%, #010ed0 140%)',
  },
  {
    id: 'our-expertise',
    eyebrow: 'Our expertise',
    title: 'Why partner with us',
    href: pageHref('About Us'),
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Diverse team giving thumbs up',
    fallback: 'linear-gradient(135deg, #070e40 0%, #0693e3 130%)',
  },
  {
    id: 'our-customers',
    eyebrow: 'Our customers',
    title: 'Client success stories',
    href: '#/success-story',
    src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Smiling client',
    fallback: 'linear-gradient(135deg, #b98a1c 0%, #e8b93c 100%)',
  },
]

export default function IntroBand() {
  return (
    <section id="company" className="bg-[#eef1f5]">
      {/* Dark plum band — eyebrow + headline left, supporting copy right */}
      <div className="bg-[#1e1432]">
        <div className="shell-container grid gap-8 px-6 pb-28 pt-14 md:grid-cols-2 md:gap-16 md:pb-36 md:pt-20">
          <Reveal delay={1} variant="fade">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#3aa9e0]">
              Our company
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-white md:text-[2.6rem]">
              Nexsate is your trusted source in IT services and support
            </h2>
          </Reveal>

          <Reveal delay={2} variant="fade" className="flex items-start md:pt-8">
            <p className="text-[15px] leading-relaxed text-white/60 md:text-base">
              We take care of your IT, so you can take care of your customers. Empowering
              businesses with transformative technology solutions — reliable, responsive,
              and secure IT that keeps daily operations moving.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Overlapping photo cards */}
      <div className="shell-container px-6">
        <div id="about" className="-mt-20 grid gap-10 scroll-mt-28 md:-mt-24 md:grid-cols-3 md:gap-8">
          {companyCards.map((card, idx) => (
            <Reveal key={card.id} delay={idx + 1} variant="up">
              <a href={card.href} className="group block" aria-label={`${card.eyebrow} — ${card.title}`}>
                <SmartImage
                  src={card.src}
                  alt={card.alt}
                  fallback={card.fallback}
                  className="aspect-[16/11] w-full"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="relative mx-auto -mt-14 w-[86%] bg-white px-6 py-6 text-center shadow-[0_18px_50px_-12px_rgba(0,0,0,0.28)]">
                  <p className="text-[15px] font-medium text-[#2aa5de]">{card.eyebrow}</p>
                  <p className="mt-1.5 text-xl font-bold leading-snug text-[#0a1a3c] transition-colors group-hover:text-shell-red">
                    {card.title}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
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
      <div className="shell-container max-w-4xl flex justify-center pb-14 pt-4 md:pb-20">
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

