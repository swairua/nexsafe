import { BTN, BTN_PRIMARY, BTN_SOFT, GLASS, GRADIENT_TEXT, TRANSITION_ALL } from "./ui.js"

const TABS = [
  { id: "content", label: "Content" },
  { id: "pages", label: "Pages" },
  { id: "media", label: "Media" },
  { id: "messages", label: "Messages" }
]

export default function AdminShell({ tab, setTab, user, onLogout, siteUrl, menuOpen, setMenuOpen, error, children, toasts = [], dismissToast }) {
  return (
    <div className="min-h-screen bg-shell-gray-100" style={{ "--admin-bar": "3.5rem" }}>
      <header className="sticky top-0 z-20 h-16 border-b border-white/60 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-6xl items-center gap-1.5 px-3 sm:gap-2 sm:px-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close admin menu" : "Open admin menu"}
            aria-expanded={menuOpen}
            className={BTN + " min-w-[44px] px-2 text-shell-gray-700 hover:bg-white/80 lg:hidden"}
          >
            <span aria-hidden="true" className="text-lg leading-none">{menuOpen ? "✕" : "☰"}</span>
          </button>
          <span className={TRANSITION_ALL + " truncate text-base font-extrabold tracking-tight text-shell-gray-900 group"}>
            <span className={GRADIENT_TEXT}>Nexsate</span> <span className="text-shell-red">Admin</span>
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
              className={BTN + " hidden bg-white/80 text-shell-gray-700 hover:bg-shell-gray-100 sm:inline-flex"}
            >
              View site
            </a>
            <button onClick={onLogout} className={BTN + " bg-shell-red px-3 text-white hover:bg-shell-gray-900 sm:px-4"}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" aria-hidden="true" onClick={() => setMenuOpen(false)} />
      )}
      <main className="mx-auto max-w-6xl px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-4 sm:py-6">
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-white/98 backdrop-blur-md" aria-label="Mobile menu" role="menu">
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/60">
              <h2 className={TRANSITION_ALL + " text-base font-extrabold tracking-tight text-shell-gray-900 group"}>
                <span className={GRADIENT_TEXT}>Nexsate</span> <span className="text-shell-red">Admin</span>
              </h2>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close mobile menu"
                className={BTN + " text-shell-gray-500 hover:text-shell-gray-900"}
              >
                ✕
              </button>
            </div>
            <nav aria-label="Mobile sections" className="px-4 py-4 space-y-0.5" role="none">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="menuitem"
                  onClick={() => { setTab(t.id); setMenuOpen(false) }}
                  aria-current={t.id === tab ? "page" : undefined}
                  className={BTN + " w-full justify-start text-left " + (t.id === tab ? "bg-shell-red text-white" : "text-shell-gray-700 hover:bg-shell-gray-100")}
                >
                  {t.label}
                </button>
              ))}
            </nav>
            <div className="px-4 py-4 border-t border-white/60">
              {user ? (
                <p className="mb-3 truncate text-xs text-shell-gray-500 md:inline">Signed in as {user}</p>
              ) : null}
              <a
                href={siteUrl}
                className={BTN + " w-full bg-white/80 text-shell-gray-700 hover:bg-shell-gray-100 flex justify-center"}
              >
                View site
              </a>
              <button onClick={onLogout} className={BTN + " mt-2 w-full bg-shell-red px-3 text-white hover:bg-shell-gray-900 flex justify-center"}>
                Sign out
              </button>
            </div>
          </div>
        )}
        {toasts.length > 0 && (
          <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
            {toasts.map((t) => (
              <div
                key={t.id}
                className="pointer-events-auto rounded-2xl bg-white/90 backdrop-blur-md p-4 ring-1 ring-white/60 shadow-[0_0_32px_8px_rgba(11,27,43,0.12)] animate-[fadeInUp_0.3s_ease-out]"
                style={{ animationDelay: t.index * 0.08 + "s" }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-shell-red text-white text-xs font-bold shrink-0">
                    ✓
                  </div>
                  <p className="text-sm text-shell-gray-900 leading-relaxed">{t.msg}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {error ? (
          <div className="mb-3 rounded-2xl bg-red-50 px-4 py-3 ring-1 ring-red-100 text-sm text-red-700 shadow-sm">{error}</div>
        ) : null}
        {children}
      </main>
    </div>
  )
}
