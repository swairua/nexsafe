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
    <section>
      <div className="bg-shell-black py-16 md:py-24">
        <div className="shell-container">
          <Reveal variant="fade">
            <span className="mb-4 inline-block border-l-4 border-shell-yellow pl-3 text-sm font-bold uppercase tracking-[0.16em] text-white">
              Contact Us
            </span>
            <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              Partner with Us for Comprehensive IT
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              We're happy to answer any questions you may have and help you determine which of our services best fit your needs.
            </p>
            {contactForm.detailPhone && (
              <p className="mt-8 text-lg font-bold text-white">
                Call us at: {contactForm.detailPhone}
              </p>
            )}
          </Reveal>
        </div>
      </div>
      <div className="bg-[#e8eef7] py-16 md:py-24">
        <div className="shell-container grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="left" className="space-y-8">
            {(copy.benefits || []).length > 0 && (
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
            )}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-shell-gray-500">What happens next?</h3>
              <ol className="mt-6">
                {(copy.steps || []).map((s, i, steps) => (
                  <li key={i} className="relative flex gap-5 pb-8 last:pb-0">
                    {i < steps.length - 1 && (
                      <span aria-hidden="true" className="absolute left-5 top-10 bottom-0 w-px bg-shell-gray-300" />
                    )}
                    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-shell-gray-900 text-base font-semibold text-white">{i + 1}</span>
                    <p className="pt-2 text-base leading-relaxed text-shell-gray-700 md:text-lg">{s}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
          <Reveal variant="right" className="lg:pt-2">
            <div className="rounded-2xl border border-shell-gray-200 bg-white p-6 shadow-lg md:p-8">
              <h3 className="text-lg font-bold tracking-tight text-shell-gray-900">Schedule a Free Consultation</h3>
              <ContactForm simple />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
