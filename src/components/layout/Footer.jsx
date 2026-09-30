import NexsateLogo from "../ui/NexsateLogo.jsx"
import Reveal from "../ui/Reveal.jsx"
import { useContent } from "../../content/ContentContext.jsx"

// Built-in glyphs for the networks we ship by default. A social entry can
// override this by pointing `icon` at an uploaded image instead.
const socialIcons = {
  facebook: (<path d="M13.5 20v-7h2.4l.4-2.8h-2.8V8.4c0-.8.2-1.4 1.4-1.4h1.5V4.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8v2.8h2.5V20h3Z" />),
  linkedin: (<path d="M6.94 8.5H4V19h2.94V8.5ZM5.47 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM19 12.9c0-2.8-1.5-4.1-3.5-4.1-1.6 0-2.3.9-2.7 1.5V8.5H9.9V19h2.9v-5.6c0-1.3.7-2.1 1.8-2.1s1.7.8 1.7 2.1V19H19v-6.1Z" />),
  x: (<path d="M17.2 4h2.6l-5.7 6.5L21 20h-5.3l-4.1-5.4L6.8 20H4.2l6.1-7L4 4h5.4l3.7 4.9L17.2 4Zm-.9 14.4h1.4L8.1 5.5H6.5l9.8 12.9Z" />),
}

/**
 * The channels list is content: `socialLinks` is an editable array, so a
 * channel can be added, removed or reordered without touching code. Legacy
 * installs that still carry `settings.social` (an object) keep working.
 */
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
  return (
    <footer className="bg-shell-gray-100 text-shell-gray-900">
      <div className="shell-container py-12 md:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 md:grid-cols-3 lg:grid-cols-5">
          {footerColumns.map((col, i) => (
            <Reveal key={col.heading} delay={(i % 5) + 1} variant="up">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-shell-gray-700">{col.heading}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-shell-gray-700 underline-offset-2 hover:text-shell-red hover:underline">{l.label}</a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-shell-gray-300 pt-8 md:flex-row md:items-center" delay={2}>
          <a href="#top" className="flex items-center gap-3" aria-label={settings.brandName + " home"}>
            <NexsateLogo className="h-6 md:h-7" plateClassName="px-3 py-2 ring-shell-gray-300" src={settings.logo} alt={settings.brandName} />
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-shell-gray-500">{settings.footerNote}</span>
          </a>
          <div className="flex items-center gap-3">
            {channels.map((c) => (
              <a key={c.network + c.href} href={c.href} aria-label={c.label} className="flex h-10 w-10 items-center justify-center rounded-full bg-shell-gray-900 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-shell-red active:scale-95">
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
        </Reveal>
      </div>
      <div className="border-t border-shell-gray-300">
        <div className="shell-container flex flex-col gap-4 py-6 text-xs text-shell-gray-500 md:flex-row md:items-center md:justify-between">
          <p>{settings.copyright}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLegal.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-shell-red hover:underline">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

