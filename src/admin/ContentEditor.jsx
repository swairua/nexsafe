import { useEffect, useMemo, useState } from "react"
import { api } from "./api.js"
import FieldEditor from "./FieldEditor.jsx"

// Modern responsive section browser: search + collapsible group drawer on
// mobile, sticky sidebar + sticky save bar on desktop.
export default function ContentEditor({ keys, content, onSaved, onPickImage }) {
  const [active, setActive] = useState(keys.length ? keys[0].key : "")
  const [draft, setDraft] = useState(content[active])
  const [dirty, setDirty] = useState(false)
  const [status, setStatus] = useState("")
  const [busy, setBusy] = useState(false)
  const [filter, setFilter] = useState("")
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => { setDraft(content[active]); setDirty(false); setStatus("") }, [active, content])

  async function save() {
    setBusy(true); setStatus("")
    try { const r = await api.post("content.php", { key: active, value: draft }); if (onSaved) onSaved(r.content); setStatus("Saved"); setDirty(false) }
    catch (e) { setStatus(e.message) }
    finally { setBusy(false) }
  }
  function reset() { setDraft(content[active]); setDirty(false); setStatus("") }

  const current = keys.find((k) => k.key === active)
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
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter sections…" className="mb-2 w-full rounded-lg border border-shell-gray-300 px-3 py-2 text-sm outline-none focus:border-shell-gray-900" />
      <div className="max-h-[50vh] space-y-3 overflow-y-auto pr-1 lg:max-h-[62vh]">
        {groups.map((g) => (
          <div key={g.name}>
            <p className="px-1 pb-1 text-[11px] font-bold uppercase tracking-wider text-shell-gray-400">{g.name}</p>
            <div className="flex flex-col gap-0.5">
              {g.items.map((k) => (
                <button key={k.key} onClick={() => { setActive(k.key); setNavOpen(false) }} className={(k.key === active ? "bg-shell-gray-900 text-white" : "text-shell-gray-700 hover:bg-shell-gray-200") + " truncate rounded-lg px-3 py-2 text-left text-sm font-medium"} title={k.key}>{k.label}</button>
              ))}
            </div>
          </div>
        ))}
        {visible.length === 0 ? <p className="px-1 py-2 text-xs text-shell-gray-500">No sections match.</p> : null}
      </div>
    </div>
  )

  return (
    <div className="grid gap-4 lg:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-2xl bg-white p-3 ring-1 ring-shell-gray-300">
          <button onClick={() => setNavOpen(!navOpen)} className="mb-2 w-full rounded-lg bg-shell-gray-100 px-3 py-2 text-sm font-medium text-shell-gray-700 lg:hidden">
            {navOpen ? "Hide sections" : "Choose section… (" + keys.length + ")"}
          </button>
          <div className={(navOpen ? "" : "hidden ") + "lg:block"}>{nav}</div>
        </div>
      </aside>
      <div className="min-w-0">
        <div className="sticky top-[3.6rem] z-10 mb-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white/95 p-3 ring-1 ring-shell-gray-300 backdrop-blur">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-shell-gray-900 sm:text-xl">{current ? current.label : active}</h2>
            {dirty ? <span className="text-xs font-medium text-amber-600">Unsaved changes</span> : <span className="block truncate font-mono text-[11px] text-shell-gray-400">{active}</span>}
          </div>
          <div className="flex items-center gap-2">
            {status ? <span className="max-w-[10rem] truncate text-xs text-shell-gray-500" title={status}>{status}</span> : null}
            <button onClick={reset} disabled={!dirty || busy} className="rounded-lg bg-shell-gray-100 px-3 py-2 text-sm font-medium text-shell-gray-700 hover:bg-shell-gray-300 disabled:opacity-40">Reset</button>
            <button onClick={save} disabled={!dirty || busy} className="rounded-lg bg-shell-red px-4 py-2 text-sm font-semibold text-white hover:bg-shell-gray-900 disabled:opacity-40">{busy ? "Saving…" : "Save"}</button>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-3 ring-1 ring-shell-gray-300 sm:p-4">
          {draft === undefined || draft === null ? <p className="text-sm text-shell-gray-500">No data for this section.</p> : <FieldEditor name={active} value={draft} onChange={(nv) => { setDraft(nv); setDirty(true) }} onPickImage={onPickImage} />}
        </div>
      </div>
    </div>
  )
}

