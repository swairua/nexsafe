import Reveal from '../ui/Reveal.jsx'
import { useContent } from "../../content/ContentContext.jsx"
import ContactForm from './ContactForm.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function HomeContact() {
  const { homeContact, contactForm } = useContent()
  const copy = homeContact || {}

  return (
    <section id="contact-form" className="relative overflow-hidden bg-[#d5deef]">
      <div className="bg-shell-black">
        <div className="shell-container relative z-10 flex flex-col justify-end pb-7 pt-10">
          <Reveal variant="fade">
            <SectionHeading eyebrow="Contact Us" title="Partner with Us for Comprehensive IT" light size="compact" titleClassName="max-w-2xl md:max-w-[44%]" />
          </Reveal>
        </div>
      </div>
      <div className="shell-container relative z-10 grid gap-10 bg-[#d5deef] pb-16 pt-7 md:pb-24 md:grid-cols-[1fr_1.2fr] md:gap-8 lg:gap-16">
        <Reveal variant="left" className="space-y-8">
          <div>
            <p className="max-w-xl text-base leading-relaxed text-shell-gray-900 md:text-lg">
              We're happy to answer any questions you may have and help you determine which of our services best fit your needs.
            </p>
            {contactForm.detailPhone && (
              <a href={`tel:${String(contactForm.detailPhone).replace(/[^+\d]/g, '')}`} className="group mt-8 inline-flex max-w-full flex-wrap items-center gap-3 break-words text-base font-bold text-shell-gray-900 transition-transform duration-300 hover:translate-x-0.5 sm:text-lg">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-brand-ink/30 shadow-[0_0_12px_2px_rgba(1,116,164,0.35),0_2px_8px_-2px_rgba(1,116,164,0.4)] transition-shadow duration-300 group-hover:shadow-[0_0_18px_4px_rgba(1,116,164,0.5),0_2px_10px_-2px_rgba(1,116,164,0.5)]">
                  <svg className="h-4 w-4 text-brand-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.25a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.9z" /></svg>
                </span>
                <span>Call us at: <span className="text-brand-ink transition-colors group-hover:text-shell-gray-900">{contactForm.detailPhone}</span></span>
              </a>
            )}
          </div>
          {(copy.benefits || []).length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-ink">Your benefits:</h3>
              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {(copy.benefits || []).map((benefit) => (
                  <span key={benefit} className="group flex items-center gap-3 text-sm font-medium text-shell-gray-900 transition-transform duration-300 hover:translate-x-0.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-brand-ink/30 shadow-[0_0_12px_2px_rgba(1,116,164,0.35),0_2px_8px_-2px_rgba(1,116,164,0.4)] transition-shadow duration-300 group-hover:shadow-[0_0_18px_4px_rgba(1,116,164,0.5),0_2px_10px_-2px_rgba(1,116,164,0.5)]">
                      <svg className="h-3.5 w-3.5 text-brand-ink" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 5" /></svg>
                    </span>
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          )}
          {(copy.steps || []).length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-ink">What happens next?</h3>
              <ol className="mt-5 grid gap-6 sm:grid-cols-3">
                {(copy.steps || []).map((step, index) => (
                  <li key={step} className="relative flex items-start gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#070e40] text-sm font-extrabold text-white ring-2 ring-brand-ink/50 shadow-[0_0_18px_3px_rgba(1,116,164,0.45),inset_0_1px_0_rgba(255,255,255,0.25)]">
                      {index + 1}
                    </span>
                    <p className="pt-1.5 text-sm leading-relaxed text-shell-gray-700">{step}</p>
                    {index < (copy.steps || []).length - 1 ? (
                      <span aria-hidden="true" className="absolute bottom-0 left-[18px] top-10 hidden w-px bg-gradient-to-b from-brand-ink/50 to-transparent sm:block" />
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </Reveal>
        <Reveal variant="right" className="md:-mt-[158px] md:w-full md:max-w-2xl md:-mr-6 md:justify-self-end">
          <ContactForm simple />
        </Reveal>
      </div>
    </section>
  )
}
