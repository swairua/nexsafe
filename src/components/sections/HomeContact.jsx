import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"
import ContactForm from './ContactForm.jsx'

export default function HomeContact() {
  const { homeContact, contactForm } = useContent()
  const copy = homeContact || {}

  return (
    <section id="contact-form" className="relative overflow-hidden bg-[#d5deef]">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[266px] bg-shell-black" />
      <div className="shell-container relative z-10 flex min-h-[266px] flex-col justify-end pb-7 pt-10">
        <Reveal variant="fade">
          <span className="mb-4 inline-block border-l-4 border-shell-yellow pl-3 text-sm font-bold uppercase tracking-[0.16em] text-white">
            Contact Us
          </span>
          <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            Partner with Us for Comprehensive IT
          </h2>
        </Reveal>
      </div>
      <div className="shell-container relative z-10 grid gap-10 pb-16 pt-7 md:pb-24 md:grid-cols-[1.25fr_1fr] md:gap-8 lg:gap-16">
        <Reveal variant="left" className="space-y-8">
          <div>
            <p className="max-w-xl text-base leading-relaxed text-shell-gray-900 md:text-lg">
              We're happy to answer any questions you may have and help you determine which of our services best fit your needs.
            </p>
            {contactForm.detailPhone && (
              <p className="mt-8 text-lg font-bold text-shell-gray-900">
                Call us at: {contactForm.detailPhone}
              </p>
            )}
          </div>
          {(copy.benefits || []).length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-shell-gray-900">Your benefits:</h3>
              <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
                {(copy.benefits || []).map((benefit) => (
                  <span key={benefit} className="flex items-center gap-2 text-sm text-shell-gray-700">
                    <svg className="h-4 w-4 shrink-0 text-shell-red" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" clipRule="evenodd" /></svg>
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          )}
          {(copy.steps || []).length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-shell-gray-900">What happens next?</h3>
              <ol className="mt-4 grid gap-4 sm:grid-cols-3">
                {(copy.steps || []).map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="shrink-0 text-lg font-semibold text-shell-gray-900">{index + 1}</span>
                    <p className="text-sm leading-relaxed text-shell-gray-700">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </Reveal>
        <Reveal variant="right" className="md:-mt-[158px] md:w-full md:max-w-md md:justify-self-end">
          <div className="rounded-sm border border-shell-gray-200 bg-white p-6 shadow-lg md:p-7">
            <ContactForm simple />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
