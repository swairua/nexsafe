function ChallengeIcon({ icon }) {
  const common = {
    className: 'h-8 w-8 text-[#0b1fb3]',
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

  return (
    <svg {...common}>
      <path d="M5 8h14v6H5zM5 14h14M7 17.5h7V30H7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 22.5h4M10 25.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M16 24l11-11m0 0h-4m4 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="31" cy="9" r="1.4" fill="currentColor" />
    </svg>
  )
}

function TargetMark() {
  return (
    <svg className="h-16 w-16 text-shell-gray-900" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="30" cy="34" r="24" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="30" cy="34" r="15" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <circle cx="30" cy="34" r="9" fill="#0b1fb3" />
      <circle cx="30" cy="34" r="9" fill="#0b1fb3" fillOpacity="0.25" />
      <path d="M30 34 52 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M46 6h8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const headingCls = 'mb-5 text-[1.35rem] font-bold normal-case tracking-normal text-[#0a1440]'
const plainLinkCls = 'block rounded px-1 py-2 text-[0.95rem] font-normal text-[#1a1d21] transition-colors hover:text-[#0b1fb3]'

export default function MegaMenu({ item, onClose }) {
  if (!item) return null

  if (item.layout === 'simple') {
    const links = item.links || []
    const offset = item.label === 'Home' ? '22%' : '52%'
    return (
      <div className="menu-anim absolute inset-x-0 top-full hidden lg:block" onMouseLeave={onClose}>
        <div className="shell-container flex py-2">
          <div style={{ marginLeft: offset }}>
            <div className="min-w-[15rem] rounded-b-md border border-t-0 border-shell-gray-300/60 bg-white px-6 py-4 shadow-[0_12px_28px_-12px_rgba(11,27,43,0.25)]">
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={onClose}
                      className={`block py-1 text-[0.95rem] font-normal transition-colors hover:text-[#0b1fb3] ${item.label === 'Home' ? 'text-center text-[#0b1fb3]' : 'text-left text-[#1a1d21]'}`}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (item.layout === 'company') {
    const partners = item.partners || { items: [] }
    return (
      <div className="menu-anim absolute inset-x-0 top-full hidden border-t border-shell-gray-300/50 bg-white shadow-[0_24px_48px_-24px_rgba(11,27,43,0.25)] lg:block" onMouseLeave={onClose}>
        <div className="shell-container grid grid-cols-12 gap-6">
          <div className="col-span-5 py-12">
            <p className="whitespace-pre-line text-[2rem] font-bold leading-[1.2] tracking-tight text-[#0a1440]">
              {item.headline}
            </p>
          </div>
          <div className="col-span-3 py-12">
            <ul className="space-y-4 pt-1">
              {(item.links || []).map((l) => (
                <li key={l.label}>
                  <a href={l.href} onClick={onClose} className={plainLinkCls}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-4 bg-[#f3f4f6] px-10 py-12">
            <a href={partners.href || '#/partners-certifications'} onClick={onClose} className="mb-6 block text-[1rem] font-medium text-[#0a1440] hover:text-[#0b1fb3]">
              {partners.heading}
            </a>
            <ul className="space-y-4">
              {(partners.items || []).map((p) => (
                <li key={p.label}>
                  <a href={p.href} onClick={onClose} className="group flex items-center gap-2.5">
                    {p.logo ? <img src={p.logo} alt="" aria-hidden="true" className="h-5 w-7 object-contain" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none' }} /> : null}
                    <span className="text-[0.95rem] font-medium text-[#1a1d21] group-hover:text-[#0b1fb3]">{p.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  if (item.layout === 'solutions') {
    const [services = { links: [] }, challenges = { tiles: [] }, industries = { links: [] }] = item.columns || []
    return (
      <div className="menu-anim absolute inset-x-0 top-full hidden border-t border-shell-gray-300/50 bg-white shadow-[0_24px_48px_-24px_rgba(11,27,43,0.25)] lg:block" onMouseLeave={onClose}>
        <div className="shell-container relative grid grid-cols-12 gap-6">
          <div className="pointer-events-none absolute right-[30%] top-6 hidden xl:block">
            <TargetMark />
          </div>
          <div className="menu-col col-span-3 py-10">
            <h3 className={headingCls}>{services.heading}</h3>
            <ul className="space-y-1.5">
              {(services.links || []).map((l) => (
                <li key={l.label}>
                  <a href={l.href} onClick={onClose} className={plainLinkCls}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="menu-col col-span-5 py-10">
            <h3 className={headingCls}>{challenges.heading}</h3>
            <div className="grid grid-cols-2 gap-4">
              {(challenges.tiles || []).map((t) => (
                <a key={t.label} href={t.href} onClick={onClose} className="group flex min-h-[7.5rem] flex-col justify-between rounded-lg border border-shell-gray-300/70 bg-white p-4 transition-colors hover:border-[#0b1fb3]">
                  <ChallengeIcon icon={t.icon} />
                  <span className="mt-3 block text-[0.95rem] font-medium text-[#1a1d21] group-hover:text-[#0b1fb3]">{t.label}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-4 bg-[#f3f4f6] px-10 py-10">
            <h3 className={headingCls}>{industries.heading}</h3>
            <ul className="space-y-1.5">
              {(industries.links || []).map((l) => (
                <li key={l.label}>
                  <a href={l.href} onClick={onClose} className={plainLinkCls}>{l.label}</a>
                </li>
              ))}
            </ul>
            {(industries.more || []).length > 0 ? (
              <p className="mt-3 text-[0.85rem] leading-relaxed text-shell-gray-500">
                More:&nbsp;
                {(industries.more || []).map((m, i) => (
                  <span key={m.label}>
                    {i > 0 ? ' · ' : null}
                    <a href={m.href} onClick={onClose} className="text-[#0b1fb3] hover:underline">{m.label}</a>
                  </span>
                ))}
              </p>
            ) : null}
            {industries.viewAll ? (
              <a href={industries.viewAll.href} onClick={onClose} className="mt-4 inline-block text-[0.9rem] font-medium text-[#0b1fb3] underline decoration-[#0b1fb3]/40 underline-offset-4 hover:decoration-[#0b1fb3]">
                {industries.viewAll.label}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    )
  }

  return null
}
