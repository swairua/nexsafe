import { useContent } from '../../content/ContentContext.jsx'

/** Desktop mega-menu panel rendered below the header for the open nav item. */
export default function MegaMenu({ item, onClose }) {
  const { uiLabels } = useContent()
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
