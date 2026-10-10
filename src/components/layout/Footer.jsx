import NexsateLogo from "../ui/NexsateLogo.jsx"
import Reveal from "../ui/Reveal.jsx"
import { useContent } from "../../content/ContentContext.jsx"
import { useContactDetails } from "../sections/contactDetails.js"

const socialIcons = {
  facebook: (<path d="M13.5 20v-7h2.4l.4-2.8h-2.8V8.4c0-.8.2-1.4 1.4-1.4h1.5V4.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8v2.8h2.5V20h3Z" />),
  linkedin: (<path d="M6.94 8.5H4V19h2.94V8.5ZM5.47 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM19 12.9c0-2.8-1.5-4.1-3.5-4.1-1.6 0-2.3.9-2.7 1.5V8.5H9.9V19h2.9v-5.6c0-1.3.7-2.1 1.8-2.1s1.7.8 1.7 2.1V19H19v-6.1Z" />),
  x: (<path d="M17.2 4h2.6l-5.7 6.5L21 20h-5.3l-4.1-5.4L6.8 20H4.2l6.1-7L4 4h5.4l3.7 4.9L17.2 4Zm-.9 14.4h1.4L8.1 5.5H6.5l9.8 12.9Z" />),
  github: (<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />),
  youtube: (<path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />),
}

function readChannels(settings, socialLinks) {
  if (Array.isArray(socialLinks) && socialLinks.length) {
    return socialLinks.filter((c) => c && c.href)
  }
  const legacy = (settings && settings.social) || {}
  return Object.keys(legacy)
    .filter((k) => legacy[k])
    .map((k) => ({ network: k, label: k.charAt(0).toUpperCase() + k.slice(1), href: legacy[k], icon: "" }))
}

export default function Footer() {
  const { footerColumns, footerLegal, settings, socialLinks } = useContent()
  const channels = readChannels(settings, socialLinks)
  const details = useContactDetails()
  return (
    <footer className="bg-shell-black text-white">
      <div className="shell-container py-12 md:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 md:grid-cols-3 lg:grid-cols-6">
          <Reveal variant="up" className="col-span-2 md:col-span-3 lg:col-span-1">
            <a href="#top" className="inline-flex items-center gap-3" aria-label={settings.brandName + " home"}>
              <NexsateLogo className="h-6 md:h-7" plateClassName="px-3 py-2" src={settings.logo} alt={settings.logoAlt || settings.brandName} />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{settings.footerNote}</p>
            {details.length ? (
              <ul className="mt-5 space-y-2.5">
                {details.map((d) => (
                  <li key={d.label} className="text-sm">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-white/50">{d.label}</span>
                    {d.href ? (
                      <a href={d.href} className="mt-0.5 block font-medium text-white underline-offset-2 hover:text-shell-yellow hover:underline">{d.value}</a>
                    ) : (
                      <span className="mt-0.5 block font-medium text-white">{d.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
            {channels.length ? (
              <div className="mt-5 flex items-center gap-3">
                {channels.map((c) => (
                  <a key={c.network + c.href} href={c.href} aria-label={c.label} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-shell-red active:scale-95">
                    {c.icon ? (
                      <img src={c.icon} alt="" className="h-5 w-5 object-contain" />
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                        {socialIcons[c.network] || <circle cx="12" cy="12" r="5" />}
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            ) : null}
          </Reveal>
          {footerColumns.map((col, i) => (
            <Reveal key={col.heading} delay={(i % 5) + 1} variant="up">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">{col.heading}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-white/70 underline-offset-2 hover:text-shell-yellow hover:underline">{l.label}</a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell-container flex flex-col gap-4 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>{settings.copyright}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLegal.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-shell-yellow hover:underline">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
