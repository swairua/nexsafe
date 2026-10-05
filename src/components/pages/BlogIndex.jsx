import SectionTag, { Rich } from '../ui/SectionTag.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"

/** Newest-first insight posts (case studies + articles), excluding this index. */
export function insightPosts(pages) {
  return Object.values(pages || {})
    .filter((p) => p && p.eyebrow === 'Insights' && p.slug !== 'blog')
    .sort((a, b) => String(b.date || '') .localeCompare(String(a.date || '')))
}

// Topic accent hues (Nanosoft color-coded case tiles, house palette tones).
// Unknown future topics hash deterministically onto the same palette.
const TOPIC_HUES = {
  'Case Study': '#8a49a1',
  Cybersecurity: '#010ed0',
  Cloud: '#0693e3',
  'Managed IT': '#0e9f8a',
  Startups: '#e07b00',
  ERP: '#0057a9',
  Financials: '#3f7d20',
  News: '#5b6b7f',
  AI: '#b98a1c',
  Company: '#c2255c',
}
const HUE_FALLBACKS = ['#010ed0', '#0693e3', '#0e9f8a', '#8a49a1', '#e07b00', '#c2255c']
export function topicHue(topic) {
  if (TOPIC_HUES[topic]) return TOPIC_HUES[topic]
  let h = 0
  for (const ch of String(topic || '')) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return HUE_FALLBACKS[h % HUE_FALLBACKS.length]
}

export function formatPostDate(iso) {
  if (!iso) return ''
  const d = new Date(String(iso) + 'T00:00:00')
  if (Number.isNaN(d.getTime())) return String(iso)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

/**
 * One insight card: image, date, title, excerpt, read-more. Shared by the
 * blog index page and the homepage blog row so both can never drift apart.
 */
export function PostCard({ post, fallbackImage, fallbackAlt, delay = 0 }) {
  const img = (post.image && post.image.src) || fallbackImage
  const hue = topicHue(post.topic)
  return (
    <Reveal
      as="a"
      href={`#/${post.slug}`}
      delay={delay}
      className="group flex flex-col overflow-hidden rounded-2xl border border-shell-gray-300 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-shell-red hover:shadow-[0_18px_44px_-16px_rgba(14,17,20,0.25)]"
    >
      <span aria-hidden="true" className="block h-1 w-full" style={{ backgroundColor: hue }} />
      <SmartImage
        src={img}
        alt={(post.image && post.image.alt) || fallbackAlt}
        fallback="linear-gradient(135deg, #070e40 0%, #010ed0 140%)"
        className="aspect-[16/9] w-full"
      />
      <span className="flex flex-1 flex-col p-6">
        {(post.topic || post.date) ? (
          <span
            className="inline-block self-start rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider"
            style={{ color: hue, backgroundColor: hue + '1a' }}
          >
            {[post.topic, formatPostDate(post.date)].filter(Boolean).join(' · ')}
          </span>
        ) : null}
        <span className="mt-2 text-lg font-bold leading-snug text-shell-gray-900 group-hover:text-shell-red">
          {post.title}
        </span>
        {post.excerpt ? (
          <span className="mt-2 text-sm leading-relaxed text-shell-gray-700">{post.excerpt}</span>
        ) : null}
        <span className="arrow-link mt-4 text-sm">
          Read more <span className="arrow">›</span>
        </span>
      </span>
    </Reveal>
  )
}

/**
 * Blog index ('#/blog'): dark hero with breadcrumb, then the card grid.
 * Rendered by PageView when the page carries `layout: 'blog-index'`.
 */
export default function BlogIndex({ page, topic }) {
  const content = useContent()
  const pages = content.pages || {}
  const labels = content.pageLabels || {}
  const ui = content.uiLabels || {}
  const copy = content.blogIndex || {}
  const sectionIds = content.sectionIds || {}
  const posts = insightPosts(pages)
  const topics = [...new Set(posts.map((p) => p.topic).filter(Boolean))]
  const activeTopic = topic && topics.includes(topic) ? topic : 'All'
  const shown = activeTopic === 'All' ? posts : posts.filter((p) => p.topic === activeTopic)
  const topicHref = (t) => (t === 'All' ? '#/blog' : `#/blog?topic=${encodeURIComponent(t)}`)
  const relatedPages = (page.related || []).map((slug) => pages[slug]).filter(Boolean)
  const categoryRaw = (content.categoryImages || {}).Insights
  const fallbackImage = typeof categoryRaw === 'string' ? categoryRaw : (categoryRaw && categoryRaw.src) || ''
  const fallbackAlt = typeof categoryRaw === 'string' ? '' : ((categoryRaw && categoryRaw.alt) || '')
  return (
    <article>
      <section className="relative overflow-hidden bg-shell-black text-white">
        <div
          className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-shell-red/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="shell-container relative pb-12 pt-28 md:pb-16 md:pt-36">
          <Reveal as="nav" variant="fade" delay={1} aria-label={ui.breadcrumb} className="flex flex-wrap items-center gap-2 text-sm text-white/60">
            <a href={'#' + sectionIds.top} className="transition-colors hover:text-shell-yellow">
              {labels.home}
            </a>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-white">{page.title}</span>
          </Reveal>
          <Reveal as="p" delay={2} className="mt-8 text-xs font-bold uppercase tracking-wider text-shell-red">
            {copy.tag || page.eyebrow}
          </Reveal>
          <Reveal as="h1" delay={3} className="mt-3 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            {copy.title || page.title}
          </Reveal>
          <Reveal delay={4} className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            <Rich as="p">{copy.text || page.intro}</Rich>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="shell-container py-14 md:py-20">
          {topics.length > 1 ? (
            <div className="mb-8 flex flex-wrap gap-2" role="navigation" aria-label="Filter insights by topic">
              {['All', ...topics].map((t) => (
                <a
                  key={t}
                  href={topicHref(t)}
                  aria-current={t === activeTopic ? 'page' : undefined}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    t === activeTopic
                      ? 'border-shell-gray-900 bg-shell-gray-900 text-white'
                      : 'border-shell-gray-300 bg-white text-shell-gray-700 hover:border-shell-red hover:text-shell-red'
                  }`}
                >
                  {t}
                </a>
              ))}
            </div>
          ) : null}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((post, i) => (
              <PostCard
                key={post.slug}
                post={post}
                fallbackImage={fallbackImage}
                fallbackAlt={fallbackAlt}
                delay={(i % 3) + 1}
              />
            ))}
          </div>
        </div>
      </section>

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
          </div>
        </section>
      )}
    </article>
  )
}
