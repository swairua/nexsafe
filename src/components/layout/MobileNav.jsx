import { useContent } from '../../content/ContentContext.jsx'

/** Mobile drawer with accordion sub-menus for each primary nav item. */
export default function MobileNav({ navItems, openIndex, onToggle, onNavigate }) {
  const { uiLabels } = useContent()
  return (
    <div className="menu-anim absolute inset-x-0 top-full max-h-[75vh] overflow-y-auto overscroll-contain rounded-b-2xl border-t border-shell-gray-100 bg-white shadow-xl lg:hidden">
      <nav className="shell-container py-4" aria-label={uiLabels.mobileNav}>
        {navItems.map((item, i) => (
          <div key={item.label} className="border-b border-shell-gray-100 last:border-0">
            <button
              type="button"
              onClick={() => onToggle(i)}
              aria-expanded={openIndex === i}
              className="flex w-full items-center justify-between py-4 text-left text-base font-semibold text-shell-gray-900"
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
                {item.columns.map((col) => (
                  <div key={col.heading}>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-shell-gray-500">
                      {col.heading}
                    </h4>
                    {col.tiles ? (
                      <div className="grid grid-cols-2 gap-2.5">
                        {col.tiles.map((t) => (
                          <a
                            key={t.label}
                            href={t.href}
                            onClick={onNavigate}
                            className="rounded-lg border border-shell-gray-300/70 p-3 text-sm font-medium text-shell-gray-900 hover:border-shell-red hover:text-shell-red"
                          >
                            {t.label}
                          </a>
                        ))}
                      </div>
                    ) : (
                    <ul className="space-y-2">
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <a
                            href={l.href}
                            onClick={onNavigate}
                            className="text-sm text-shell-gray-700 hover:text-shell-red"
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
                        className="mt-2 inline-block text-sm font-bold text-shell-red hover:underline"
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
      </nav>
    </div>
  )
}
