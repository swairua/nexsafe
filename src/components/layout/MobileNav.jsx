import { useContent } from '../../content/ContentContext.jsx'

export default function MobileNav({ navItems, openIndex, onToggle, onNavigate }) {
  const { uiLabels, settings } = useContent()
  return (
    <div className="menu-anim absolute inset-x-0 top-full max-h-[75vh] overflow-y-auto overscroll-contain rounded-b-2xl border-t border-shell-gray-100 bg-white shadow-xl lg:hidden">
      <nav className="shell-container py-4" aria-label={uiLabels.mobileNav}>
        {navItems.map((item, i) => (
          <div key={item.label} className="border-b border-shell-gray-100 last:border-0">
            <button
              type="button"
              onClick={() => onToggle(i)}
              aria-expanded={openIndex === i}
              className="flex w-full items-center justify-between py-4 text-left text-base font-semibold text-[#1a1d21] transition-colors hover:text-[#0b1fb3]"
            >
              {item.label}
              <svg
                className={`h-3 w-3 transition-transform ${openIndex === i ? 'rotate-180 text-shell-red' : ''}`}
                viewBox="0 0 12 8"
                fill="none"
                aria-hidden="true"
              >
                <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {openIndex === i && (
              <div className="panel-anim grid grid-cols-1 gap-x-6 gap-y-4 pb-5 sm:grid-cols-2">
                {(item.links || []).length > 0 && (
                  <div>
                  <ul className="space-y-2">
                    {(item.links || []).map((l) => (
                      <li key={l.label}>
                        <a href={l.href} onClick={onNavigate} className="block py-1.5 text-sm text-[#1a1d21] transition-colors hover:text-[#0b1fb3]">
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  </div>
                )}
                {item.headline ? (
                  <div>
                  <p className="whitespace-pre-line text-lg font-bold leading-snug text-[#0a1440]">{item.headline}</p>
                  </div>
                ) : null}
                {item.partners ? (
                  <div className="rounded-xl bg-[#f3f4f6] p-4">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-shell-gray-500">{item.partners.heading}</p>
                    <ul className="space-y-2">
                      {(item.partners.items || []).map((p) => (
                        <li key={p.label}>
                          <a href={p.href} onClick={onNavigate} className="text-sm font-medium text-[#1a1d21] transition-colors hover:text-[#0b1fb3]">
                            {p.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {(item.columns || []).map((col) => (
                  <div key={col.heading}>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-shell-gray-500">
                      {col.heading}
                    </h4>
                    {col.tiles && col.tiles.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2.5">
                        {col.tiles.map((t) => (
                          <a
                            key={t.label}
                            href={t.href}
                            onClick={onNavigate}
                            className="rounded-lg border border-shell-gray-300/70 p-3 text-sm font-medium text-[#1a1d21] transition-colors hover:border-brand-ink hover:text-[#0b1fb3]"
                          >
                            {t.label}
                          </a>
                        ))}
                      </div>
                    ) : (
                    <ul className="space-y-2">
                      {(col.links || []).map((l) => (
                        <li key={l.label}>
                          <a
                            href={l.href}
                            onClick={onNavigate}
                            className="text-sm text-[#1a1d21] transition-colors hover:text-[#0b1fb3]"
                          >
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                    )}
                    {col.viewAll ? (
                      <a
                        href={col.viewAll.href}
                        onClick={onNavigate}
                        className="mt-2 inline-block text-sm font-bold text-[#1a1d21] transition-colors hover:text-[#0b1fb3] hover:underline"
                      >
                        {col.viewAll.label}
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="flex items-center justify-between gap-3 border-t border-shell-gray-100 py-4">
          <a href="tel:18255704550" className="text-sm font-semibold text-[#1a1d21] transition-colors hover:text-[#0b1fb3]">
            {settings.phone || '1-825-570-4550'}
          </a>
          <a
            href="#/contact-us"
            onClick={onNavigate}
            className="inline-flex items-center rounded-full bg-shell-red px-6 py-2.5 text-sm font-bold tracking-wide text-white transition-all duration-300 btn-lift-glow hover:bg-shell-red-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/50"
          >
            Contact Us
            <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </nav>
    </div>
  )
}
