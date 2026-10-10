import { BTN } from "./ui.js"

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
                className={BTN + " " + (t.id === tab ? "bg-shell-gray-900 text-white" : "text-shell-gray-700 hover:bg-shell-gray-100")}
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
        {menuOpen ? (
          <nav aria-label="Admin sections" className="border-t border-shell-gray-300 bg-white px-3 py-2 shadow-lg lg:hidden">
            <div className="grid grid-cols-2 gap-1.5">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setTab(t.id); setMenuOpen(false) }}
                  aria-current={t.id === tab ? "page" : undefined}
                  className={BTN + " justify-start " + (t.id === tab ? "bg-shell-gray-900 text-white" : "bg-shell-gray-100 text-shell-gray-700")}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <a
              href={siteUrl}
              className={BTN + " mt-1.5 w-full bg-shell-gray-100 text-shell-gray-700 sm:hidden"}
            >
              View site →
            </a>
            {user ? <p className="mt-1.5 truncate px-1 text-xs text-shell-gray-500 md:hidden">Signed in as {user}</p> : null}
          </nav>
        ) : null}
      </header>
      <main className="mx-auto max-w-6xl px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-4 sm:py-4">
        {error ? <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
        {children}
      </main>
    </div>
  )
}
