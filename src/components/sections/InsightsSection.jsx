import SmartImage from '../ui/SmartImage.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"
import { formatPostDate, insightPosts } from "../pages/BlogIndex.jsx"

function Byline() {
  return (
    <span className="absolute bottom-3 left-4 flex items-center gap-2">
      <span
        aria-hidden="true"
        className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7fb539] text-[11px] font-extrabold italic text-white"
      >
        line
      </span>
      <span className="text-sm font-medium text-white">by Linethemes</span>
    </span>
  )
}

function InsightPhoto({ post, fallbackImage, fallbackAlt, aspect }) {
  const src = (post.image && post.image.src) || fallbackImage
  const alt = (post.image && post.image.alt) || fallbackAlt || ''
  return (
    <span className="relative block overflow-hidden">
      <SmartImage
        src={src}
        alt={alt}
        fallback="linear-gradient(135deg, #33465c 0%, #8fa2b5 140%)"
        className={`${aspect} w-full`}
        imgClassName="grayscale"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-[#0a2a5e] opacity-25 mix-blend-multiply" />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0a2a5e]/35 via-transparent to-transparent" />
      <Byline />
    </span>
  )
}

function FeaturedCard({ post, fallbackImage, fallbackAlt }) {
  return (
    <Reveal
      as="article"
      className="flex flex-col overflow-hidden rounded-md bg-[#f2f6fa]"
    >
      <InsightPhoto post={post} fallbackImage={fallbackImage} fallbackAlt={fallbackAlt} aspect="aspect-[16/10]" />
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <p className="text-sm text-[#7b8ba0]">{formatPostDate(post.date)}</p>
        <h3 className="mt-3 text-xl font-bold leading-snug text-[#0b2c5f] md:text-2xl">
          <a href={`#/${post.slug}`} className="transition-colors hover:text-[#0693e3]">
            <span aria-hidden="true" className="mr-2 inline-block h-5 w-5 rounded-full border-2 border-[#0b2c5f] align-[-3px]">
              <span className="ml-[5px] mt-[3px] block h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-[#0b2c5f]" />
            </span>
            {post.title}
          </a>
        </h3>
        {post.excerpt ? (
          <p className="mt-4 text-[15px] leading-relaxed text-[#7b8ba0]">{post.excerpt}</p>
        ) : null}
        <a
          href={`#/${post.slug}`}
          className="mt-6 block rounded-md bg-white py-4 text-center text-base font-medium text-[#29b2fe] shadow-sm transition-colors hover:text-[#0693e3]"
        >
          Read more
        </a>
      </div>
    </Reveal>
  )
}

function MiniCard({ post, fallbackImage, fallbackAlt, delay }) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className="flex flex-col overflow-hidden rounded-md bg-[#f2f6fa]"
    >
      <InsightPhoto post={post} fallbackImage={fallbackImage} fallbackAlt={fallbackAlt} aspect="aspect-[16/9]" />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[17px] font-bold leading-snug text-[#0b2c5f]">
          <a href={`#/${post.slug}`} className="transition-colors hover:text-[#0693e3]">
            {post.title}
          </a>
        </h3>
        <p className="mt-auto pt-4 text-sm text-[#7b8ba0]">{formatPostDate(post.date)}</p>
      </div>
    </Reveal>
  )
}

export default function InsightsSection() {
  const content = useContent()
  const { sectionIds } = content
  const posts = insightPosts(content.pages).slice(0, 5)
  if (!posts.length) return null
  const [featured, ...rest] = posts
  const categoryRaw = (content.categoryImages || {}).Insights
  const fallbackImage = typeof categoryRaw === 'string' ? categoryRaw : (categoryRaw && categoryRaw.src) || ''
  const fallbackAlt = typeof categoryRaw === 'string' ? '' : ((categoryRaw && categoryRaw.alt) || '')
  return (
    <section id={sectionIds.insights} className="bg-white py-16 md:py-24">
      <div className="shell-container">
        <Reveal variant="fade" className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#5b6b7f]">
            Form our blog
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0b2c5f] md:text-4xl">
            More articles from resource library
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <FeaturedCard post={featured} fallbackImage={fallbackImage} fallbackAlt={fallbackAlt} />
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-2">
            {rest.map((post, i) => (
              <MiniCard
                key={post.slug}
                post={post}
                fallbackImage={fallbackImage}
                fallbackAlt={fallbackAlt}
                delay={i + 1}
              />
            ))}
          </div>
        </div>
        <Reveal variant="fade" className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-[15px] text-[#5b6b7f]">
            Insights to help you do what you do better, faster and more profitably.{' '}
            <a href="#/blog" className="font-medium text-[#0b2c5f] underline decoration-[#0b2c5f]/30 underline-offset-4 transition-colors hover:text-[#0693e3]">
              View all article
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
