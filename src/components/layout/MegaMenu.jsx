import { useContent } from '../../content/ContentContext.jsx'

/** Line-stroke tile icons for the Business Challenges column (inline SVG,
 *  currentColor — no emoji, no image assets). */
function ChallengeIcon({ icon }) {
  const common = {
    className: 'h-8 w-8 text-shell-red',
    viewBox: '0 0 40 40',
    fill: 'none',
    'aria-hidden': 'true',
  }
  if (icon === 'shield') {
    return (
      <svg {...common}>
        <path d="M20 4 33 9v10c0 8.5-5.4 14.3-13 17C12.4 33.3 7 27.5 7 19V9l13-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 15.5v-2.2M14 13.3l-3.6-2M20 15.5v-3.5m0 0L16.5 10m3.5 2 3.5-2m-3.5 5.5V19m6 0v-2.2m0 0 3.6-2M14 22l2.5-2.5L20 22l3.5-2.5L26 22m-12 5 2.5-2.5 3.5 2.5 3.5-2.5 2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (icon === 'gear') {
    return (
      <svg {...common}>
        <circle cx="15" cy="22" r="7" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="15" cy="22" r="2.4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M15 12.5v3M8.7 15.7l2.1 2.1M22.3 15.7l-2.1 2.1M6 22h3.2M20.8 22H24M8.7 28.3l2.1-2.1M22.3 28.3l-2.1-2.1M15 28.5v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M24 10a12 12 0 0 1 9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="26.5" cy="21" r="3.4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="26.5" cy="21" r="1.1" fill="currentColor" />
        <path d="M34 19.5 36 21l-2 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (icon === 'gauge') {
    return (
      <svg {...common}>
        <path d="M6 28a14 14 0 0 1 28 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M11 28a9 9 0 0 1 18 0" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
        <path d="M20 28 27 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="20" cy="28" r="2.2" fill="currentColor" />
        <path d="M10.5 20.5l1.7 1.7M29.5 20.5l-1.7 1.7M20 10v2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    )
  }
  // transform — migration documents with an upward pen (Digital Transformation)
  return (
    <svg {...common}>
      <path d="M5 8h14v6H5zM5 14h14M7 17.5h7V30H7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 22.5h4M10 25.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M16 24l11-11m0 0h-4m4 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="31" cy="9" r="1.4" fill="currentColor" />
    </svg>
  )
}

/** Promo panel on the right side of the mega menu (Enboarder-style). */
function PromoPanel({ onClose }) {
  const { pageConnect } = useContent()
  if (!pageConnect) return null
  return (
    <div className="col-span-3">
      <a
        href={pageConnect.cta?.href || '#/contact-us'}
        onClick={onClose}
        className="group flex h-full flex-col justify-between rounded-2xl p-7 text-white transition-transform hover:scale-[1.01]"
        style={{ background: 'linear-gradient(135deg, #070e40 0%, #010ed0 100%)' }}
      >
        <div>
          {pageConnect.tag && (
            <span className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              {pageConnect.tag}
            </span>
          )}
          <h3 className="mb-2 text-2xl font-bold leading-tight">{pageConnect.title}</h3>
          <p className="text-sm leading-relaxed text-white/80">{pageConnect.text}</p>
        </div>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
          {pageConnect.cta?.label || 'Learn more'}
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </a>
    </div>
  )
}

/** Desktop mega-menu panel rendered below the header for the open nav item. */
export default function MegaMenu({ item, onClose }) {
  const { uiLabels } = useContent()
  if (item.layout === 'solutions') {
    const [services, challenges, industries] = item.columns
    return (
      <div
        className="menu-anim absolute inset-x-0 top-full hidden rounded-b-2xl border-t border-shell-gray-100 bg-white shadow-xl lg:block"
        onMouseLeave={onClose}
      >
        <div className="shell-container grid grid-cols-12 gap-6 py-10">
          {/* Left — service links */}
          <div className="menu-col col-span-3">
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-shell-gray-500">
              {services.heading}
            </h3>
            <ul className="space-y-3.5">
              {services.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={onClose}
                    className="text-[0.9rem] font-medium text-shell-gray-900 hover:text-shell-red hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Centre — Business Challenges with icon + title + blurb */}
          <div className="menu-col col-span-6">
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-shell-gray-500">
              {challenges.heading}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {(challenges.tiles || []).map((t) => (
                <a
                  key={t.label}
                  href={t.href}
                  onClick={onClose}
                  className="group flex items-start gap-4 rounded-lg border border-shell-gray-200 bg-white p-4 transition-colors hover:border-shell-red"
                >
                  <ChallengeIcon icon={t.icon} />
                  <div>
                    <span className="block text-sm font-bold text-shell-gray-900 group-hover:text-shell-red">
                      {t.label}
                    </span>
                    {t.blurb && (
                      <span className="mt-1 block text-xs text-shell-gray-500">
                        {t.blurb}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
          {/* Right — promo panel */}
          <PromoPanel onClose={onClose} />
        </div>
      </div>
    )
  }
  // Default layout: columns + promo panel
  return (
    <div
      className="menu-anim absolute inset-x-0 top-full rounded-b-2xl border-t border-shell-gray-100 bg-white shadow-xl hidden lg:block"
      onMouseLeave={onClose}
    >
      <div className="shell-container grid grid-cols-12 gap-6 py-10">
        {item.columns.slice(0, 2).map((col) => (
          <div key={col.heading} className="menu-col col-span-3">
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-shell-gray-500">
              {col.heading}
            </h3>
            <ul className="space-y-3.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={onClose}
                    className="text-[0.9rem] font-medium text-shell-gray-900 hover:text-shell-red hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {item.columns.length > 2 && (
          <div className="menu-col col-span-3">
            {item.columns.slice(2).map((col) => (
              <div key={col.heading} className="mb-6 last:mb-0">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-shell-gray-500">
                  {col.heading}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        onClick={onClose}
                        className="text-[0.9rem] font-medium text-shell-gray-900 hover:text-shell-red hover:underline"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <PromoPanel onClose={onClose} />
      </div>
    </div>
  )
}
