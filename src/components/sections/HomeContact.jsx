import SectionTag, { Rich } from '../ui/SectionTag.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"
import ContactForm from './ContactForm.jsx'
import { useContactDetails } from './contactDetails.js'

export default function HomeContact() {
  const { homeContact, contactForm } = useContent()
  const copy = homeContact || {}
  const details = useContactDetails()
  return (
    <section className="bg-shell-gray-100">
      <div className="shell-container py-16 md:py-24">
        <Reveal variant="fade">
          <SectionTag>{copy.tag}</SectionTag>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-shell-gray-900 sm:text-3xl md:text-4xl">
            {copy.title}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="up" className="space-y-8">
            <p className="text-base leading-relaxed text-shell-gray-700 md:text-lg"><Rich as="p">{copy.text}</Rich></p>
            <a href={"tel:" + String(contactForm.detailPhone || "").replace(/\s+/g, "")} className="inline-flex items-center rounded-lg bg-shell-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-shell-red">
              {copy.phoneLabel} {contactForm.detailPhone}
            </a>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-shell-gray-500">Your benefits:</h3>
              <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                {(copy.benefits || []).map((b) => (
                  <span key={b} className="flex items-center gap-2 text-sm text-shell-gray-700">
                    <svg className="h-4 w-4 shrink-0 text-shell-red" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" clipRule="evenodd" /></svg>
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-shell-gray-500">What happens next?</h3>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {(copy.steps || []).map((s, i) => (
                  <div key={i} className="text-center">
                    <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-shell-gray-900 text-sm font-semibold text-white">{i + 1}</span>
                    <p className="mt-2 text-xs leading-snug text-shell-gray-600">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal variant="up" className="lg:pt-2">
            <div className="rounded-2xl border border-shell-gray-200 bg-white/80 p-6 shadow-lg backdrop-blur-sm md:p-8">
              <h3 className="text-lg font-bold tracking-tight text-shell-gray-900">Schedule a Free Consultation</h3>
              <ContactForm simple />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
