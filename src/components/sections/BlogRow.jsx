import SectionTag, { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"
import { PostCard, insightPosts } from "../pages/BlogIndex.jsx"

/**
 * Homepage blog row: the three newest insight posts (case study first),
 * Nanosoft-style "from our blog" band with a through-link to the full index.
 */
export default function BlogRow() {
  const content = useContent()
  const copy = content.blogRow || {}
  const latest = insightPosts(content.pages).slice(0, 3)
  if (!latest.length) return null
  const categoryRaw = (content.categoryImages || {}).Insights
  const fallbackImage = typeof categoryRaw === 'string' ? categoryRaw : (categoryRaw && categoryRaw.src) || ''
  const fallbackAlt = typeof categoryRaw === 'string' ? '' : ((categoryRaw && categoryRaw.alt) || '')
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="shell-container">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <Reveal variant="fade">
            <SectionTag>{copy.tag}</SectionTag>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-shell-gray-900 sm:text-3xl md:text-4xl">
              {copy.title}
            </h2>
            <div className="mt-4 max-w-2xl text-base leading-relaxed text-shell-gray-700 md:text-lg"><Rich as="p">{copy.text}</Rich></div>
          </Reveal>
          {copy.cta ? (
            <Reveal as="a" href={copy.cta.href} delay={2} className="arrow-link">
              {copy.cta.label} <span className="arrow">→</span>
            </Reveal>
          ) : null}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {latest.map((post, i) => (
            <PostCard
              key={post.slug}
              post={post}
              fallbackImage={fallbackImage}
              fallbackAlt={fallbackAlt}
              delay={i + 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
