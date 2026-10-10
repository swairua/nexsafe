import Reveal from '../ui/Reveal.jsx'
import { Rich } from '../ui/SectionTag.jsx'
import { useContent } from "../../content/ContentContext.jsx"

export default function ConnectBand() {
  const { pageConnect: connect } = useContent()
  if (!connect) return null
  return (
    <section className="relative overflow-hidden bg-shell-black dark-gradient text-white">
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-shell-green/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="shell-container relative py-20 md:py-28">
        <Reveal variant="fade">
          <p className="text-xs font-bold uppercase tracking-wider text-shell-red">
            {connect.tag}
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
            {connect.title}
          </h2>
          <div className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            <Rich as="p">{connect.text}</Rich>
          </div>
          <a href={connect.cta.href} className="btn-pill btn-pill--green mt-8">
            {connect.cta.label}
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
