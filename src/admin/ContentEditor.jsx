import { useEffect, useMemo, useState } from "react"
import { api } from "./api.js"
import FieldEditor from "./FieldEditor.jsx"
import { BTN, CARD, CARD_ELEVATED, INPUT, PANEL_TITLE, SAVE_BAR } from "./ui.js"
import { STRUCTURAL_KEYS } from "../data/contentTruth.js"

const CODE_FILE_HINT = {
  navItems: "src/data/navItems.js",
  pages: "src/data/pages/*.js",
  sectionIds: "src/data/siteContent.js → sectionIds",
  categoryAnchors: "src/data/siteContent.js → categoryAnchors",
  uiLabels: "src/data/siteContent.js → uiLabels"
}

export default function ContentEditor({ keys, content, onSaved, onPickImage, addToast }) {
  const [active, setActive] = useState(keys.length ? keys[0].key : "")
  const [draft, setDraft] = useState(content[active])
  const [dirty, setDirty] = useState(false)
  const [busy, setBusy] = useState(false)
  const [filter, setFilter] = useState("")
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => { setDraft(content[active]); setDirty(false) }, [active, content])

  async function save() {
    setBusy(true)
    try {
      const r = await api.post("content.php", { key: active, value: draft })
      if (onSaved) onSaved(r.content)
      setDirty(false)
      addToast("Saved " + (current ? current.label : active))
    } catch (e) {
      alert(e.message || "Save failed")
    } finally {
      setBusy(false)
    }
  }
  function reset() { setDraft(content[active]); setDirty(false) }

  const current = keys.find((k) => k.key === active)
  const readonly = STRUCTURAL_KEYS.includes(active)
  const visible = useMemo(() => {
    const q = filter.trim().toLowerCase()
    if (!q) return keys
    return keys.filter((k) => k.key.toLowerCase().includes(q) || k.label.toLowerCase().includes(q))
  }, [keys, filter])
  const groups = useMemo(() => {
    const out = []
    for (const k of visible) {
      const g = k.group || "Other"
      let bucket = out.find((b) => b.name === g)
      if (!bucket) { bucket = { name: g, items: [] }; out.push(bucket) }
      bucket.items.push(k)
    }
    return out
  }, [visible])

  const nav = (
    <div className="space-y-1">
      <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter sections…" className={INPUT + " mb-2"} />
      <div className="max-h-[52vh] overflow-y-auto pr-1">
        {groups.map((g) => (
          <div key={g.name}>
            <p className="px-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-shell-gray-400">{g.name}</p>
            <div className="flex flex-col gap-0.5">
              {g.items.map((k) => (
                <button key={k.key} onClick={() => { setActive(k.key); setNavOpen(false) }} className={(k.key === active ? "bg-shell-red text-white" : "text-shell-gray-700 hover:bg-shell-gray-100") + " truncate rounded-xl px-3 py-2 text-left text-sm font-medium transition-all"} title={k.key}>{k.label}</button>
              ))}
            </div>
          </div>
        ))}
        {visible.length === 0 ? <p className="px-2 py-2 text-xs text-shell-gray-500">No sections match.</p> : null}
      </div>
    </div>
  )

  return (
    <div className="grid gap-3 lg:grid-cols-[14rem_minmax(0,1fr)]">
      <aside>
        <div className={CARD_ELEVATED + " lg:sticky lg:top-[var(--admin-bar,3.5rem)]"}>
          <div className="p-4">
            <button onClick={() => setNavOpen(!navOpen)} aria-expanded={navOpen} className={BTN + " w-full bg-white text-shell-gray-700 hover:bg-shell-gray-50 lg:hidden ring-1 ring-shell-gray-200"}>
              {navOpen ? "Hide sections" : "Choose section… (" + keys.length + ")"}
            </button>
            <div className={(navOpen ? "" : "hidden ") + "lg:block"}>
              <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setNavOpen(false)} aria-hidden="true" />
              <div className="fixed inset-y-0 left-0 z-30 flex w-[86vw] max-w-xs flex-col bg-white p-4 shadow-[0_20px_40px_-12px_rgba(11,27,43,0.15)] lg:static lg:z-auto lg:w-auto lg:max-w-none lg:bg-transparent lg:p-0 lg:shadow-none">
                <div className="mb-3 flex items-center justify-between lg:hidden">
                  <span className="text-sm font-bold text-shell-gray-900">Sections</span>
                  <button onClick={() => setNavOpen(false)} aria-label="Close sections" className={BTN + " min-w-[44px] px-2 text-shell-gray-700"}>✕</button>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto">{nav}</div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div className="min-w-0">
        <div className={SAVE_BAR}>
          <div className="min-w-0">
            <h2 className={PANEL_TITLE}>{current ? current.label : active}</h2>
            {dirty ? <span className="text-xs font-medium text-shell-red">Unsaved changes</span> : <span className="block truncate font-mono text-[11px] text-shell-gray-500">{active}</span>}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={reset} disabled={!dirty || busy || readonly} className={BTN + " bg-white text-shell-gray-700 hover:bg-shell-gray-100 ring-1 ring-shell-gray-200 disabled:opacity-40"}>Reset</button>
            <button onClick={save} disabled={!dirty || busy || readonly} title={readonly ? "Managed in code — see " + (CODE_FILE_HINT[active] || "src/data/*") : undefined} className={BTN + " px-4 font-semibold text-white hover:bg-shell-gray-900 disabled:opacity-40 " + (readonly ? "bg-shell-gray-200 text-shell-gray-500 cursor-not-allowed" : "bg-shell-red hover:bg-shell-gray-900")}>{busy ? "Saving…" : "Save"}</button>
          </div>
        </div>
        <div className={CARD}>
          {readonly ? (
            <p className="mb-3 rounded-xl bg-shell-red/5 p-3 ring-1 ring-shell-red/20 text-xs leading-relaxed text-shell-red/70 shadow-sm">
              Managed in code (frontend source of truth) — edit <code>{CODE_FILE_HINT[active] || "src/data/*"}</code>, then run{" "}
              <code className="text-shell-red">node api/seed.mjs</code> and rebuild. Saving disabled; backend rejects writes to this key.
            </p>
          ) : null}
          {draft === undefined || draft === null ? (
            <p className="text-sm text-shell-gray-500">No data for this section.</p>
          ) : (
            <FieldEditor name={active} value={draft} onChange={(nv) => { setDraft(nv); setDirty(true) }} onPickImage={onPickImage} />
          )}
        </div>
      </div>
    </div>
  )
}
