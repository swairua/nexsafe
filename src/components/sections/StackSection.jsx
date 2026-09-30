import SectionTag from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"

/**
 * Technology-stack band: the four platform areas and the named vendors from
 * the client-supplied Home Page document. Owns the `#capabilities` anchor.
 * Rendered on light so it reads as a reference list, not a marketing wall.
 */
export default function StackSection() {
  const { stackGroups, stackSection, sectionIds } = useContent()
  return (
    <section id={sectionIds.capabilities} className="bg-shell-gray-100 py-16 md:py-24">
      <div className="shell-container">
        <Reveal variant="fade" className="max-w-3xl">
          <SectionTag>{stackSection.tag}</SectionTag>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-shell-gray-900 sm:text-3xl md:text-4xl">
            {stackSection.title}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {stackGroups.map((group, idx) => (
            <Reveal
              key={group.id}
              variant="up"
              delay={(idx % 2) + 1}
              className="rounded-2xl border border-shell-gray-300 bg-white p-6 md:p-7"
            >
              <h3 className="text-lg font-bold leading-snug text-shell-gray-900 md:text-xl">
                {group.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-shell-gray-700 md:text-base">
                {group.text}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.vendors.map((vendor) => (
                  <li
                    key={vendor}
                    className="rounded-full bg-shell-gray-100 px-3 py-1 text-xs font-semibold text-shell-gray-700"
                  >
                    {vendor}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
