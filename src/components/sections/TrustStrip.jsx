import SectionTag from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"

/**
 * Trust strip: the stats band (20 years, 98% satisfaction, 3-min response,
 * from the live homepage and client-support page) plus verifiable
 * certification names from nexsate.com/partnerships.
 */
export default function TrustStrip() {
  const { statsBand, certStrip } = useContent()
  const stats = (statsBand && statsBand.items) || []
  const certs = (certStrip && certStrip.items) || []
  if (!stats.length && !certs.length) return null
  return (
    <section className="border-y border-shell-gray-300 bg-shell-gray-100">
      <div className="shell-container py-10 md:py-14">
        {stats.length ? (
          <dl className="grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label + i} variant="fade" delay={i + 1}>
                <dt className="order-2 mt-1 block text-xs font-semibold uppercase tracking-wider text-shell-gray-500">{s.label}</dt>
                <dd className="order-1 text-3xl font-extrabold tracking-tight text-shell-gray-900 md:text-4xl">{s.value}</dd>
              </Reveal>
            ))}
          </dl>
        ) : null}
        {certs.length ? (
          <div className="mt-8 border-t border-shell-gray-300 pt-8">
            <Reveal variant="fade" className="text-center">
              <SectionTag>{certStrip.tag}</SectionTag>
            </Reveal>
            <ul className="mt-5 flex flex-wrap items-stretch justify-center gap-3">
              {certs.map((c, i) => (
                <Reveal
                  key={c.name + i}
                  as="li"
                  delay={i + 1}
                  className="flex min-w-[12rem] flex-1 flex-col items-center rounded-xl bg-shell-gray-100 px-5 py-4 text-center sm:flex-none sm:basis-56"
                >
                  <span className="text-base font-extrabold tracking-tight text-shell-gray-900">{c.name}</span>
                  <span className="mt-1 text-xs text-shell-gray-500">{c.note}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  )
}
