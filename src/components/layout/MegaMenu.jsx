import { useContent } from '../../content/ContentContext.jsx'

/** Line-stroke tile icons for the Business Challenges column (inline SVG,
 *  currentColor — no emoji, no image assets). */
function ChallengeIcon({ icon }) {
  const common = {
    className: 'h-9 w-9 text-shell-red',
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
        <div className="shell-container grid grid-cols-12 gap-8 py-10">
          {/* Left — plain service links, navy heading */}
          <div className="menu-col col-span-3">
            <h3 className="mb-5 text-xl font-bold tracking-tight text-shell-gray-900">
              {services.heading}
            </h3>
            <ul className="space-y-4">
              {services.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={onClose}
                    className="text-[0.95rem] font-medium text-shell-gray-900 hover:text-shell-red hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Centre — Business Challenges 2x2 tile cards with icons */}
          <div className="menu-col col-span-6">
            <h3 className="mb-5 text-xl font-bold tracking-tight text-shell-gray-900">
              {challenges.heading}
            </h3>
            <div className="grid grid-cols-2 gap-5">
              {(challenges.tiles || []).map((t) => (
                <a
                  key={t.label}
                  href={t.href}
                  onClick={onClose}
                  className="group flex min-h-[7.5rem] flex-col justify-between rounded-lg border border-shell-gray-300/70 bg-white p-5 transition-colors hover:border-shell-red"
                >
                  <ChallengeIcon icon={t.icon} />
                  <span className="mt-4 text-[0.95rem] font-medium text-shell-gray-900 group-hover:text-shell-red">
                    {t.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
          {/* Right — industry links on a soft grey rail with View all */}
          <div className="menu-col col-span-3 rounded-r-2xl bg-shell-gray-100/70 px-7 py-2">
            <h3 className="mb-5 text-xl font-bold tracking-tight text-shell-gray-900">
              {industries.heading}
            </h3>
            <ul className="space-y-4">
              {industries.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={onClose}
                    className="text-[0.95rem] font-medium text-shell-gray-900 hover:text-shell-red hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            {industries.viewAll ? (
              <a
                href={industries.viewAll.href}
                onClick={onClose}
                className="mt-5 inline-block text-sm font-bold text-shell-red hover:underline"
              >
                {industries.viewAll.label}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div
      className="menu-anim absolute inset-x-0 top-full hidden rounded-b-2xl border-t border-shell-gray-100 bg-white shadow-xl lg:block"
      onMouseLeave={onClose}
    >
      <div className="shell-container grid grid-cols-2 gap-x-6 gap-y-8 py-8 xl:grid-cols-4 xl:gap-8">
        {item.columns.map((col) => (
          <div key={col.heading} className="menu-col">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-shell-gray-500">
              {col.heading}
            </h3>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={onClose}
                    className="text-[0.95rem] font-medium text-shell-gray-900 hover:text-shell-red hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="menu-col col-span-2 border-t border-shell-gray-100 pt-5 xl:col-span-4">
          <a href={item.href} onClick={onClose} className="arrow-link text-base">
            {uiLabels.explore} {item.label} <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}
