import { BTN, BTN_PRIMARY, BTN_SOFT } from "./ui.js"

const TABS = [
  { id: "content", label: "Content" },
  { id: "pages", label: "Pages" },
  { id: "media", label: "Media" },
  { id: "messages", label: "Messages" },
]

export default function AdminShell({ tab, setTab, user, onLogout, siteUrl, menuOpen, setMenuOpen, error, children }) {
  return (
    <div className="min-h-screen bg-shell-gray-100" style={{ "--admin-bar": "3.5rem" }}>
      <header className="sticky top-0 z-20 h-14 border-b border-shell-gray-300 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-full max-w-6xl items-center gap-1.5 px-3 sm:gap-2 sm:px-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close admin menu" : "Open admin menu"}
            aria-expanded={menuOpen}
            className={BTN + " min-w-[44px] px-2 text-shell-gray-700 hover:bg-shell-gray-100 lg:hidden"}
          >
            <span aria-hidden="true" className="text-lg leading-none">{menuOpen ? "✕" : "☰"}</span>
          </button>
          <span className="truncate text-base font-extrabold tracking-tight text-shell-gray-900">
            Nexsate <span className="text-shell-red">Admin</span>
          </span>
          <nav aria-label="Admin sections" className="ml-2 hidden items-center gap-1 lg:flex">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-current={t.id === tab ? "page" : undefined}
                className={BTN + " " + (t.id === tab ? BTN_PRIMARY : BTN_SOFT)}
              >
                {t.label}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <span className="hidden max-w-[10rem] truncate text-xs text-shell-gray-500 md:inline">{user}</span>
            <a
              href={siteUrl}
              className={BTN + " hidden bg-shell-gray-100 text-shell-gray-700 hover:bg-shell-gray-300 sm:inline-flex"}
            >
              View site
            </a>
            <button onClick={onLogout} className={BTN + " bg-shell-red px-3 text-white hover:bg-shell-gray-900 sm:px-4"}>
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-4 sm:py-4">
        {menuOpen && (
          <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-sm" aria-label="Mobile menu" role="menu">
            <div className="flex items-center justify-between px-4 py-3 border-b border-shell-gray-200">
              <h2 className="text-base font-bold text-shell-gray-900">Nexsate Admin</h2>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close mobile menu"
                className={BTN + " text-shell-gray-500 hover:text-shell-gray-900"}
              >
                ✕
              </button>
            </div>
            <nav aria-label="Mobile sections" className="px-4 py-4 space-y-1" role="none">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="menuitem"
                  onClick={() => { setTab(t.id); setMenuOpen(false) }}
                  aria-current={t.id === tab ? "page" : undefined}
                  className={BTN + " w-full justify-start text-left " + (t.id === tab ? "bg-shell-gray-100 text-shell-gray-900" : "text-shell-gray-700 hover:bg-shell-gray-100")}
                >
                  {t.label}
                </button>
              ))}
            </nav>
            <div className="px-4 py-3 border-t border-shell-gray-200">
              {user ? (
                <p className="mb-2 truncate text-xs text-shell-gray-500 md:inline">Signed in as {user}</p>
              ) : null}
              <a
                href={siteUrl}
                className={BTN + " w-full bg-shell-gray-100 text-shell-gray-700 hover:bg-shell-gray-300 flex justify-center"}
              >
                View site
              </a>
              <button onClick={onLogout} className={BTN + " mt-2 w-full bg-shell-red px-3 text-white hover:bg-shell-gray-900 flex justify-center"}>
                Sign out
              </button>
            </div>
          </div>
        )}
        {error ? <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">{error}</p> : null}
        {children}
      </main>
    </div>
  )
}