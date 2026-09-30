import { useEffect, useState } from "react"
import { api, setCsrf, setUnauthorizedHandler } from "./api.js"
import Login from "./Login.jsx"
import ContentEditor from "./ContentEditor.jsx"
import FieldEditor from "./FieldEditor.jsx"
import MediaLibrary from "./MediaLibrary.jsx"
import Messages from "./Messages.jsx"

// Top-level keys of the content store (api/seed.json). "pages" is handled
// page-by-page by PagesPanel so a single huge key is never rendered at once.
const CONTENT_KEYS = [
  { key: "settings", label: "Site settings" },
  { key: "sectionIds", label: "Section anchors" },
  { key: "categoryAnchors", label: "Breadcrumb anchors" },
  { key: "uiLabels", label: "UI / screen-reader labels" },
  { key: "socialLinks", label: "Social channels" },
  { key: "navItems", label: "Navigation menu" },
  { key: "heroSlides", label: "Home - hero slides" },
  { key: "introBand", label: "Home - intro band" },
  { key: "introCards", label: "Home - intro cards" },
  { key: "benefits", label: "Home - benefits" },
  { key: "featuredCards", label: "Home - featured cards" },
  { key: "servicesSection", label: "Home - services heading" },
  { key: "partnerStrip", label: "Home - partner strip" },
  { key: "partners", label: "Home - partners" },
  { key: "industriesStrip", label: "Home - industries" },
  { key: "stackGroups", label: "Home - technology stack" },
  { key: "stackSection", label: "Home - stack heading" },
  { key: "successStory", label: "Home - success story" },
  { key: "promo", label: "Home - promo banner" },
  { key: "categoryImages", label: "Category images" },
  { key: "pageConnect", label: "Connect / contact block" },
  { key: "pageLabels", label: "Page labels" },
  { key: "notFound", label: "404 page" },
  { key: "cookieBanner", label: "Cookie banner" },
  { key: "contactForm", label: "Contact form" },
  { key: "footerColumns", label: "Footer columns" },
  { key: "footerLegal", label: "Footer legal links" },
]

const TABS = [
  { id: "content", label: "Content" },
  { id: "pages", label: "Pages" },
  { id: "media", label: "Media" },
  { id: "messages", label: "Messages" },
]

const BTN = "rounded-lg px-3 py-2 text-sm font-medium"
const clone = (v) => (v == null ? null : JSON.parse(JSON.stringify(v)))

function Screen({ children }) {
  return <div className="flex min-h-screen items-center justify-center bg-shell-gray-100 px-4 text-sm text-shell-gray-500">{children}</div>
}

/** Edit one entry of content.pages and write the whole map back under "pages". */
function PagesPanel({ pages, onSaved, onPickImage }) {
  const slugs = Object.keys(pages || {})
  const [slug, setSlug] = useState(slugs[0] || "")
  const [draft, setDraft] = useState(null)
  const [dirty, setDirty] = useState(false)
  const [status, setStatus] = useState("")
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    setDraft(clone(pages && pages[slug]))
    setDirty(false)
    setStatus("")
  }, [slug, pages])

  if (!slugs.length) return <p className="text-sm text-shell-gray-500">No pages in the content store yet.</p>

  async function save() {
    setBusy(true)
    setStatus("")
    try {
      const value = Object.assign({}, pages)
      value[slug] = draft
      const r = await api.post("content.php", { key: "pages", value: value })
      if (onSaved) onSaved(r.content)
      setStatus("Saved")
      setDirty(false)
    } catch (e) {
      setStatus(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <aside className="shrink-0 lg:w-64">
        <div className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto pr-1">
          {slugs.map((s) => (
            <button key={s} onClick={() => setSlug(s)} className={BTN + " text-left " + (s === slug ? "bg-shell-gray-900 text-white" : "text-shell-gray-700 hover:bg-shell-gray-300")}>
              {(pages[s] && pages[s].title) || s}
            </button>
          ))}
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-shell-gray-900">{(pages[slug] && pages[slug].title) || slug}</h2>
            <p className="text-xs text-shell-gray-500">#/{slug}{dirty ? " - unsaved changes" : ""}</p>
          </div>
          <div className="flex items-center gap-2">
            {status ? <span className="text-xs text-shell-gray-500">{status}</span> : null}
            <button onClick={() => { setDraft(clone(pages[slug])); setDirty(false); setStatus("") }} disabled={!dirty || busy} className={BTN + " bg-shell-gray-100 text-shell-gray-700 hover:bg-shell-gray-300 disabled:opacity-40"}>Reset</button>
            <button onClick={save} disabled={!dirty || busy} className={BTN + " bg-shell-red text-white hover:bg-shell-gray-900 disabled:opacity-40"}>{busy ? "Saving..." : "Save page"}</button>
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 ring-1 ring-shell-gray-300">
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

export default function AdminApp() {
  const [session, setSession] = useState(null)
  const [content, setContent] = useState(null)
  const [boot, setBoot] = useState(true)
  const [tab, setTab] = useState("content")
  const [pick, setPick] = useState(null)
  const [err, setErr] = useState("")

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
    // A lost session (idle timeout, restarted PHP server, unreadable session
    // file) must return the admin to the sign-in screen instead of leaving a
    // dead "Unauthorized" line where an editor used to be.
    setUnauthorizedHandler(() => {
      setCsrf(null)
      setSession(null)
      setContent(null)
    })
    refresh()
  }, [])

  async function logout() {
    try { await api.post("auth.php", { action: "logout" }) } catch (e) { /* already signed out */ }
    setCsrf(null)
    await refresh()
  }

  function afterLogin() {
    setBoot(true)
    refresh()
  }

  if (boot) return <Screen>Loading admin...</Screen>
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
    .map((k) => ({ key: k, label: k }))
  const keys = CONTENT_KEYS.filter((k) => Object.prototype.hasOwnProperty.call(content, k.key)).concat(extras)
  const startPick = (setter) => setPick(() => setter)
  const siteUrl = import.meta.env.BASE_URL || "/"

  return (
    <div className="min-h-screen bg-shell-gray-100">
      <header className="sticky top-0 z-20 bg-white ring-1 ring-shell-gray-300">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3">
          <span className="mr-2 text-base font-extrabold tracking-tight text-shell-gray-900">Nexsate <span className="text-shell-red">Admin</span></span>
          <nav className="flex flex-wrap gap-1">
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={BTN + " " + (t.id === tab ? "bg-shell-gray-900 text-white" : "text-shell-gray-700 hover:bg-shell-gray-100")}>{t.label}</button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <a href={siteUrl} className={BTN + " bg-shell-gray-100 text-shell-gray-700 hover:bg-shell-gray-300"}>View site</a>
            <span className="hidden text-xs text-shell-gray-500 sm:inline">{session.user}</span>
            <button onClick={logout} className={BTN + " bg-shell-red text-white hover:bg-shell-gray-900"}>Sign out</button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">
        {err ? <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p> : null}
        {tab === "content" ? <ContentEditor keys={keys} content={content} onSaved={setContent} onPickImage={startPick} /> : null}
        {tab === "pages" ? <PagesPanel pages={content.pages || {}} onSaved={setContent} onPickImage={startPick} /> : null}
        {tab === "media" ? <MediaLibrary /> : null}
        {tab === "messages" ? <Messages /> : null}
      </main>
      {pick ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setPick(null)}>
          <div className="max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-shell-gray-100 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-shell-gray-900">Choose an image</h2>
              <div className="flex gap-2">
                <button onClick={() => { pick(""); setPick(null) }} className={BTN + " bg-white text-shell-gray-700 ring-1 ring-shell-gray-300 hover:bg-shell-gray-300"}>Clear image</button>
                <button onClick={() => setPick(null)} className={BTN + " bg-shell-gray-900 text-white hover:bg-shell-red"}>Close</button>
              </div>
            </div>
            <MediaLibrary onSelect={(url) => { pick(url); setPick(null) }} />
          </div>
        </div>
      ) : null}
    </div>
  )
}