import SectionTag, { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"
import ContactForm from './ContactForm.jsx'
import { useContactDetails } from './contactDetails.js'

/**
 * Homepage contact section: the consultation form properly embedded on the
 * landing page, beside the same contact-detail rows the contact page shows.
 * Copy is content (`homeContact`); submissions land in the admin Messages inbox.
 */
export default function HomeContact() {
  const { homeContact, contactForm } = useContent()
  const copy = homeContact || {}
  const details = useContactDetails()
  return (
    <section className="bg-white">
      <div className="shell-container py-16 md:py-24">
        <Reveal variant="fade" className="max-w-3xl">
          <SectionTag>{copy.tag}</SectionTag>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-shell-gray-900 sm:text-3xl md:text-4xl">
            {copy.title}
          </h2>
          <div className="mt-4 max-w-2xl text-base leading-relaxed text-shell-gray-700 md:text-lg"><Rich as="p">{copy.text}</Rich></div>
        </Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal variant="up">
            <ContactForm />
          </Reveal>
          {details.length ? (
            <Reveal delay={2} className="lg:pt-2">
              <h3 className="text-lg font-bold tracking-tight text-shell-gray-900">{contactForm.detailsHeading}</h3>
              <ul className="mt-4 space-y-3">
                {details.map((d) => (
                  <li key={d.label} className="rounded-xl border border-shell-gray-300 p-4">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-shell-gray-500">{d.label}</span>
                    {d.href ? (
                      <a href={d.href} className="mt-1 block text-sm font-medium text-shell-gray-900 underline-offset-2 hover:text-shell-red hover:underline">{d.value}</a>
                    ) : (
                      <span className="mt-1 block text-sm font-medium text-shell-gray-900">{d.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  )
}
