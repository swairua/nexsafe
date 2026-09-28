import Reveal from '../ui/Reveal.jsx'
import { footerColumns, footerLegal } from '../../data/footerContent.js'

// Social channels in the brand's chosen order: Facebook, LinkedIn, X.
const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/nexsate',
    icon: (
      <path d="M13.5 20v-7h2.4l.4-2.8h-2.8V8.4c0-.8.2-1.4 1.4-1.4h1.5V4.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8v2.8h2.5V20h3Z" />
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/nexsate',
    icon: (
      <path d="M6.94 8.5H4V19h2.94V8.5ZM5.47 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM19 12.9c0-2.8-1.5-4.1-3.5-4.1-1.6 0-2.3.9-2.7 1.5V8.5H9.9V19h2.9v-5.6c0-1.3.7-2.1 1.8-2.1s1.7.8 1.7 2.1V19H19v-6.1Z" />
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/nexsate',
    icon: (
      <path d="M17.2 4h2.6l-5.7 6.5L21 20h-5.3l-4.1-5.4L6.8 20H4.2l6.1-7L4 4h5.4l3.7 4.9L17.2 4Zm-.9 14.4h1.4L8.1 5.5H6.5l9.8 12.9Z" />
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-shell-gray-100 text-shell-gray-900">
      <div className="shell-container py-12 md:py-16">
        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 md:grid-cols-3 lg:grid-cols-5">
          {footerColumns.map((col, i) => (
            <Reveal key={col.heading} delay={(i % 5) + 1} variant="up">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-shell-gray-700">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-shell-gray-700 underline-offset-2 hover:text-shell-red hover:underline"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Social + logo row */}
        <Reveal className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-shell-gray-300 pt-8 md:flex-row md:items-center" delay={2}>
          <a href="#top" className="flex items-center gap-3" aria-label="Nexsate home">
            {/* Client-supplied wordmark on a white chip so the JPG's own
                background blends with the light footer surface. */}
            <span className="inline-flex items-center rounded-lg bg-white px-3 py-2 ring-1 ring-shell-gray-300">
              <img
                src="/brand/nexsate-wordmark.jpg"
                alt="Nexsate"
                className="h-6 w-auto md:h-7"
                loading="lazy"
              />
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-shell-gray-500">
              Enabling, transforming and empowering your business
            </span>
          </a>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-shell-gray-900 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-shell-red active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Legal bar */}
      <div className="border-t border-shell-gray-300">
        <div className="shell-container flex flex-col gap-4 py-6 text-xs text-shell-gray-500 md:flex-row md:items-center md:justify-between">
          <p>© nexsate.com 2026 — front-end demo site.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLegal.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-shell-red hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
