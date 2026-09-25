import Reveal from '../ui/Reveal.jsx'
import { promo } from '../../data/footerContent.js'

/** Full-width promo CTA banner (pricing style) with image + blue gradient. */
export default function PromoBanner() {
  return (
    <section id="support" className="relative overflow-hidden bg-shell-black">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: promo.fallback }} aria-hidden="true" />
      <img
        src={promo.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        onError={(e) => { e.currentTarget.style.display = 'none' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(100deg, rgba(14,17,20,.88) 0%, rgba(163,22,0,.5) 100%)' }}
        aria-hidden="true"
      />

      <div className="shell-container relative flex min-h-[18rem] flex-col items-start justify-center py-16 text-white md:py-24">
        <Reveal variant="fade">
          <span className="mb-4 inline-block border-l-4 border-shell-yellow pl-3 text-sm font-bold uppercase tracking-[0.16em] text-shell-yellow">
            {promo.tag}
          </span>
        </Reveal>
        <Reveal delay={2}>
          <h2 className="max-w-3xl text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
            {promo.title}
          </h2>
        </Reveal>
        <Reveal delay={3}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            {promo.text}
          </p>
        </Reveal>
        <Reveal delay={4}>
          <a href={promo.cta.href} className="btn-pill mt-8 bg-white text-shell-gray-900 hover:bg-shell-gray-100">
            {promo.cta.label}
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
