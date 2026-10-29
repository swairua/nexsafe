import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { Rich } from '../ui/SectionTag.jsx'
import { useContent } from "../../content/ContentContext.jsx"

export default function ConnectBand() {
  const { pageConnect: connect } = useContent()
  if (!connect) return null
  return (
    <section className="relative overflow-hidden bg-brand-ink dark-gradient text-white">
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-shell-green/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="shell-container relative py-20 md:py-28">
        <Reveal variant="up">
          <SectionHeading eyebrow={connect.tag} title={connect.title} light titleClassName="max-w-2xl md:text-5xl" />
          <div className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            <Rich as="p">{connect.text}</Rich>
          </div>
          <a href={connect.cta.href} className="btn-pill btn-pill--white mt-8">
            {connect.cta.label}
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
