import SectionTag from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { newsItems } from '../../data/footerContent.js'

/** Insights row: dated blog/case-study cards + view-all link (staggered reveals). */
export default function NewsRow() {
  return (
    <section id="insights" className="bg-white py-16 md:py-24">
      <div className="shell-container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <Reveal variant="fade">
            <SectionTag>From our blog</SectionTag>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-shell-gray-900 sm:text-3xl md:text-4xl">
              More articles from resource library
            </h2>
          </Reveal>
          <Reveal as="a" href="#/it-blog" delay={2} className="arrow-link">
            View all articles <span className="arrow">→</span>
          </Reveal>
        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item, idx) => (
            <Reveal
              key={item.id}
              as="a"
              href={item.href}
              delay={(idx % 3) + 1}
              className="glass-card group flex flex-col justify-between rounded-2xl p-7"
            >
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider">
                  <span className="text-shell-red">{item.category}</span>
                  <span className="h-1 w-1 rounded-full bg-shell-gray-300" aria-hidden="true" />
                  <span className="text-shell-gray-500">{item.date}</span>
                </div>
                <h3 className="text-lg font-bold leading-snug text-shell-gray-900 group-hover:text-shell-red md:text-xl">
                  {item.title}
                </h3>
              </div>
              <span className="arrow-link mt-6 text-sm">
                Read more <span className="arrow">→</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
