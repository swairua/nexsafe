import { useEffect, useState } from "react"
import { api } from "./api.js"
import FieldEditor from "./FieldEditor.jsx"

export default function ContentEditor({ keys, content, onSaved, onPickImage }) {
  const [active, setActive] = useState(keys.length ? keys[0].key : "")
  const [draft, setDraft] = useState(content[active])
  const [dirty, setDirty] = useState(false)
  const [status, setStatus] = useState("")
  const [busy, setBusy] = useState(false)

  useEffect(() => { setDraft(content[active]); setDirty(false); setStatus("") }, [active, content])

  async function save() {
    setBusy(true); setStatus("")
    try { const r = await api.post("content.php", { key: active, value: draft }); if (onSaved) onSaved(r.content); setStatus("Saved"); setDirty(false) }
    catch (e) { setStatus(e.message) }
    finally { setBusy(false) }
  }
  function reset() { setDraft(content[active]); setDirty(false); setStatus("") }

  const current = keys.find((k) => k.key === active)
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <aside className="shrink-0 lg:w-56">
        <div className="flex flex-wrap gap-1 lg:flex-col">
          {keys.map((k) => (
            <button key={k.key} onClick={() => setActive(k.key)} className={(k.key === active ? "bg-shell-gray-900 text-white" : "text-shell-gray-700 hover:bg-shell-gray-100") + " rounded-lg px-3 py-2 text-left text-sm font-medium"}>{k.label}</button>
          ))}
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-shell-gray-900">{current ? current.label : active}</h2>
            {dirty ? <span className="text-xs font-medium text-amber-600">Unsaved changes</span> : null}
          </div>
          <div className="flex items-center gap-2">
            {status ? <span className="text-xs text-shell-gray-500">{status}</span> : null}
            <button onClick={reset} disabled={!dirty || busy} className="rounded-lg bg-shell-gray-100 px-3 py-2 text-sm font-medium text-shell-gray-700 hover:bg-shell-gray-300 disabled:opacity-40">Reset</button>
            <button onClick={save} disabled={!dirty || busy} className="rounded-lg bg-shell-red px-4 py-2 text-sm font-semibold text-white hover:bg-shell-gray-900 disabled:opacity-40">{busy ? "Saving..." : "Save"}</button>
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 ring-1 ring-shell-gray-300">
          {draft === undefined || draft === null ? <p className="text-sm text-shell-gray-500">No data for this section.</p> : <FieldEditor name={active} value={draft} onChange={(nv) => { setDraft(nv); setDirty(true) }} onPickImage={onPickImage} />}
        </div>
      </div>
    </div>
  )
}

