import { useEffect, useMemo, useState, useCallback } from "react"
import { api, setCsrf, setUnauthorizedHandler } from "./api.js"
import Login from "./Login.jsx"
import AdminShell from "./AdminShell.jsx"
import { BTN, BTN_PRIMARY, BTN_SOFT, CARD, CARD_ELEVATED, INPUT, PANEL_TITLE, SAVE_BAR, EYEBROW, PILL_BADGE, GLASS, GRADIENT_TEXT, TRANSITION_ALL } from "./ui.js"
import ContentEditor from "./ContentEditor.jsx"
import FieldEditor from "./FieldEditor.jsx"
import MediaLibrary from "./MediaLibrary.jsx"
import Messages from "./Messages.jsx"

const CONTENT_KEYS = [
  { key: "settings", label: "Site settings", group: "Site" },
  { key: "sectionIds", label: "Section anchors", group: "Site" },
  { key: "categoryAnchors", label: "Breadcrumb anchors", group: "Site" },
  { key: "uiLabels", label: "UI labels", group: "Site" },
  { key: "socialLinks", label: "Social channels", group: "Site" },
  { key: "navItems", label: "Navigation menu", group: "Site" },
  { key: "heroSlides", label: "Hero slides", group: "Home" },
  { key: "introBand", label: "Intro band", group: "Home" },
  { key: "statement", label: "Intro statement", group: "Home" },
  { key: "introCards", label: "Intro cards", group: "Home" },
  { key: "benefits", label: "Benefits", group: "Home" },
  { key: "pillars", label: "Intro pillars", group: "Home" },
  { key: "featuredCards", label: "Featured cards", group: "Home" },
  { key: "servicesSection", label: "Services heading", group: "Home" },
  { key: "partnerStrip", label: "Partner strip", group: "Home" },
  { key: "partners", label: "Partners", group: "Home" },
  { key: "industriesStrip", label: "Industries", group: "Home" },
  { key: "industryClosing", label: "Industry closing block", group: "Home" },
  { key: "caseCards", label: "Case cards", group: "Home" },
  { key: "stackGroups", label: "Technology stack", group: "Home" },
  { key: "stackSection", label: "Stack heading", group: "Home" },
  { key: "successStory", label: "Success story", group: "Home" },
  { key: "blogRow", label: "Blog row", group: "Home" },
  { key: "blogIndex", label: "Blog page", group: "Home" },
  { key: "homeContact", label: "Homepage contact", group: "Home" },
  { key: "testimonials", label: "Testimonials", group: "Home" },
  { key: "statsBand", label: "Stats band", group: "Home" },
  { key: "certStrip", label: "Certifications", group: "Home" },
  { key: "searchSuggestions", label: "Search suggestions", group: "Site" },
  { key: "faqTeaser", label: "FAQ teaser", group: "Home" },
  { key: "awardsBand", label: "Awards band", group: "Home" },
  { key: "noticeBar", label: "Notice bar", group: "Site" },
  { key: "deptSplit", label: "Service routes", group: "Home" },
  { key: "valuesStrip", label: "Values strip", group: "Home" },
  { key: "promo", label: "Promo banner", group: "Home" },
  { key: "categoryImages", label: "Category images", group: "Pages" },
  { key: "pageConnect", label: "Connect block", group: "Pages" },
  { key: "pageLabels", label: "Page labels", group: "Pages" },
  { key: "notFound", label: "404 page", group: "Pages" },
  { key: "cookieBanner", label: "Cookie banner", group: "Pages" },
  { key: "contactForm", label: "Contact form", group: "Pages" },
  { key: "footerColumns", label: "Footer columns", group: "Footer" },
  { key: "footerLegal", label: "Footer legal links", group: "Footer" }
]

const clone = (v) => (v == null ? null : JSON.parse(JSON.stringify(v)))

function Screen({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-shell-black px-4 text-white">
      <div className="rounded-2xl bg-shell-gray-900 p-8 shadow-xl ring-1 ring-shell-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-shell-red text-white">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              <rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor"/>
              <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white group">
            <span className={GRADIENT_TEXT}>Nexsate</span> <span className="text-shell-red">Admin</span>
          </span>
        </div>
        <p className="text-sm text-shell-gray-400">{children}</p>
      </div>
    </div>
  )
}

function PagesPanel({ pages, onSaved, onPickImage }) {
  const slugs = Object.keys(pages || {})
  const [slug, setSlug] = useState(slugs[0] || "")
  const [draft, setDraft] = useState(null)
  const [dirty, setDirty] = useState(false)
  const [busy, setBusy] = useState(false)
  const [filter, setFilter] = useState("")
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    setDraft(clone(pages && pages[slug]))
    setDirty(false)
  }, [slug, pages])

  const visible = useMemo(() => {
    const q = filter.trim().toLowerCase()
    if (!q) return slugs
    return slugs.filter((s) => s.toLowerCase().includes(q) || String((pages[s] && pages[s].title) || "").toLowerCase().includes(q))
  }, [slugs, pages, filter])

  if (!slugs.length) {
    return (
      <div className={CARD_ELEVATED + " p-6 text-center"}>
        <p className="text-sm text-shell-gray-500">No pages in the content store yet.</p>
      </div>
    )
  }

  async function save() {
    setBusy(true)
    try {
      const value = Object.assign({}, pages)
      value[slug] = draft
      const r = await api.post("content.php", { key: "pages", value: value })
      if (onSaved) onSaved(r.content)
      setDirty(false)
    } catch (e) {
      alert(e.message || "Save failed")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid gap-3 lg:grid-cols-[14rem_minmax(0,1fr)]">
      <aside>
        <div className={CARD_ELEVATED + " lg:sticky lg:top-[var(--admin-bar,3.5rem)]"}>
          <div className="p-4">
            <button onClick={() => setNavOpen(!navOpen)} aria-expanded={navOpen} className={BTN + " w-full bg-shell-gray-100 text-shell-gray-700 lg:hidden"}>
              {navOpen ? "Hide pages" : "Choose page (" + slugs.length + ")"}
            </button>
            <div className={(navOpen ? "" : "hidden ") + "lg:block"}>
              <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setNavOpen(false)} aria-hidden="true" />
              <div className="fixed inset-y-0 left-0 z-30 flex w-[86vw] max-w-xs flex-col bg-white p-3 shadow-[0_20px_40px_-12px_rgba(11,27,43,0.15)] lg:static lg:z-auto lg:w-auto lg:max-w-none lg:bg-transparent lg:p-0 lg:shadow-none">
                <div className="mb-2 flex items-center justify-between lg:hidden">
                  <span className="text-sm font-bold text-shell-gray-900">Pages</span>
                  <button onClick={() => setNavOpen(false)} aria-label="Close page list" className={BTN + " min-w-[44px] px-2 text-shell-gray-700"}>✕</button>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto">
                  <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter pages…" className={INPUT + " mb-2"} />
                  <div className="flex flex-col gap-1 pr-1">
                    {visible.map((s) => (
                      <button key={s} onClick={() => { setSlug(s); setNavOpen(false) }} title={s} className={(s === slug ? BTN_PRIMARY : BTN_SOFT) + " justify-start truncate " + (s === slug ? "text-white" : "text-shell-gray-700 hover:bg-shell-gray-100")}>
                        {(pages[s] && pages[s].title) || s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div className="min-w-0">
        <div className={SAVE_BAR}>
          <div className="min-w-0">
            <h2 className={PANEL_TITLE}>{(pages[slug] && pages[slug].title) || slug}</h2>
            <p className="truncate text-xs text-shell-gray-500">#/{slug}{dirty ? " · unsaved" : ""}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { setDraft(clone(pages[slug])); setDirty(false) }} disabled={!dirty || busy} className={BTN + " bg-white text-shell-gray-700 hover:bg-shell-gray-100 ring-1 ring-shell-gray-200 disabled:opacity-40"}>Reset</button>
            <button onClick={save} disabled={!dirty || busy} className={BTN_PRIMARY + " disabled:opacity-40"}>busy ? "Saving…" : "Save page"</button>
          </div>
        </div>
        <div className={CARD}>
          {draft ? (
            <FieldEditor name="page" value={draft} onChange={(v) => { setDraft(v); setDirty(true) }} onPickImage={onPickImage} />
          ) : (
            <p className="text-sm text-shell-gray-500">Nothing to edit for this page.</p>
          )}
        </div>
      </div>
    </div>
  )
}

function ImagePickModal({ pick, setPick, onSelect }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center" onClick={() => setPick(null)}>
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-shell-gray-900">Choose an image</h2>
          <button type="button" onClick={() => setPick(null)} className={BTN + " text-shell-gray-500 hover:text-shell-gray-900"}>
            ✕
          </button>
        </div>
        <MediaLibrary onSelect={(url) => { pick(url); setPick(null) }} />
      </div>
    </div>
  )
}

export default function AdminApp() {
  const [session, setSession] = useState(null)
  const [content, setContent] = useState(null)
  const [boot, setBoot] = useState(true)
  const [tab, setTab] = useState("content")
  const [pick, setPick] = useState(null)
  const [err, setErr] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const [toasts, setToasts] = useState([])

  const dismissToast = useCallback((id) => setToasts((ts) => ts.filter((t) => t.id !== id)), [])

  const addToast = useCallback((msg) => {
    const id = Date.now() + Math.random()
    setToasts((ts) => [...ts, { id, msg }])
    setTimeout(() => setToasts((ts) => ts.filter((t) => t.id !== id)), 3000)
  }, [])

  async function refresh() {
    setErr("")
    try {
      const me = await api.get("auth.php")
      if (me.csrf) setCsrf(me.csrf)
      if (!me.authed) {
        setSession(null)
        setContent(null)
        return
      }
      setSession({ user: me.username || "admin" })
      const c = await api.get("content.php")
      setContent(c.content || {})
    } catch (e) {
      setSession(null)
      setContent(null)
      setErr(e.message)
    } finally {
      setBoot(false)
    }
  }

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setCsrf(null)
      setSession(null)
      setContent(null)
    })
    refresh()
  }, [])

  async function logout() {
    try { await api.post("auth.php", { action: "logout" }) } catch (e) {  }
    setCsrf(null)
    await refresh()
  }

  function afterLogin() {
    setBoot(true)
    refresh()
  }

  if (boot) return <Screen>Loading admin…</Screen>
  if (!session) return <Login onAuthed={afterLogin} />
  if (!content) {
    return (
      <Screen>
        Could not load content{err ? ": " + err : ""}. <button onClick={logout} className="ml-2 font-semibold text-shell-red underline">Sign out</button>
      </Screen>
    )
  }

  const extras = Object.keys(content)
    .filter((k) => k !== "pages" && !CONTENT_KEYS.some((c) => c.key === k))
    .map((k) => ({ key: k, label: k, group: "Other" }))
  const keys = CONTENT_KEYS.filter((k) => Object.prototype.hasOwnProperty.call(content, k.key)).concat(extras)
  const startPicker = (setter) => setPick(() => setter)
  const siteUrl = import.meta.env.BASE_URL || "/"

  return (
    <AdminShell
      tab={tab}
      setTab={setTab}
      user={session.user}
      onLogout={logout}
      siteUrl={siteUrl}
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      error={err}
      toasts={toasts}
      dismissToast={dismissToast}
    >
      {tab === "content" ? <ContentEditor keys={keys} content={content} onSaved={setContent} onPickImage={startPicker} addToast={addToast} /> : null}
      {tab === "pages" ? <PagesPanel pages={content.pages || {}} onSaved={setContent} onPickImage={startPicker} addToast={addToast} /> : null}
      {tab === "media" ? <MediaLibrary /> : null}
      {tab === "messages" ? <Messages /> : null}
      {pick ? (
        <ImagePickModal pick={pick} setPick={setPick} onSelect={startPicker} />
      ) : null}
    </AdminShell>
  )
}
