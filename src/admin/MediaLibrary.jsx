import { useEffect, useState } from "react"
import { api } from "./api.js"
import { imageDescription, imageLocations } from "../data/imageMeta.js"
import { BTN } from "./ui.js"

const ACT = "inline-flex min-h-[40px] items-center justify-center rounded px-2.5 py-1 text-xs font-medium"

export default function MediaLibrary({ onSelect }) {
  const [items, setItems] = useState(null)
  const [file, setFile] = useState(null)
  const [alt, setAlt] = useState("")
  const [description, setDescription] = useState("")
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState("")
  const [filter, setFilter] = useState("")
  const [editing, setEditing] = useState(null)
  const [editAlt, setEditAlt] = useState("")
  const [editDesc, setEditDesc] = useState("")
  const [replacing, setReplacing] = useState(null)

  async function load() {
    try {
      const r = await api.get("media.php")
      setItems(r.media || [])

      if (r.synced) setMsg(`Added ${r.synced} image${r.synced === 1 ? "" : "s"} found in /uploads to the library.`)
    } catch (e) {
      setItems([])
      setMsg("Could not load the library: " + e.message)
    }
  }
  useEffect(() => { load() }, [])

  async function upload(e) {
    e.preventDefault()
    if (!file) { setMsg("Choose a file first"); return }
    setBusy(true); setMsg("")
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("alt", alt)
      fd.append("description", description)
      const r = await api.form("media.php", fd)
      setMsg("Uploaded " + (r.filename || ""))
      setFile(null); setAlt(""); setDescription(""); load()
    } catch (err) { setMsg(err.message) }
    finally { setBusy(false) }
  }

  async function saveMeta(m) {
    try {
      await api.put("media.php", { id: m.id, alt: editAlt, description: editDesc })
      setEditing(null)
      setMsg("Saved details for " + m.filename)
      load()
    } catch (e) { setMsg(e.message) }
  }

  async function replaceFile(m, f) {
    if (!f) return
    setReplacing(m.id)
    try {
      const fd = new FormData()
      fd.append("file", f)
      fd.append("replace_id", String(m.id))
      const r = await api.form("media.php", fd)
      setMsg("Replaced " + (r.filename || m.filename) + " — all pages using it update automatically.")
      load()
    } catch (e) { setMsg(e.message) }
    finally { setReplacing(null) }
  }

  async function remove(m) {
    const used = m.used || 0
    const warning = used ? ` It is used by ${used} content field${used === 1 ? "" : "s"} right now.` : ""
    if (!window.confirm(`Delete ${m.filename}?${warning} The file is removed from the server.`)) return
    try {
      await api.del("media.php", { id: m.id })
      load()
    } catch (e) {
      if (!/used by/i.test(e.message)) { setMsg(e.message); return }
      if (!window.confirm(e.message + "\n\nDelete it anyway? Those fields will show a broken image.")) return
      try { await api.del("media.php", { id: m.id, force: true }); load() } catch (e2) { setMsg(e2.message) }
    }
  }

  const shown = (items || []).filter((m) => {
    const q = filter.trim().toLowerCase()
    if (!q) return true
    const d = String(m.description || "").toLowerCase()
    return m.filename.toLowerCase().includes(q) || d.includes(q) || String(m.alt || "").toLowerCase().includes(q)
  })

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-bold text-shell-gray-900">Media Library</h2>
        <p className="text-sm text-shell-gray-500">{items === null ? "Loading…" : items.length + (items.length === 1 ? " image" : " images") + " · stored locally"}</p>
      </div>
      <form onSubmit={upload} className="mt-3 rounded-xl bg-white p-3 ring-1 ring-shell-gray-300 sm:p-4">
        <h3 className="text-sm font-bold text-shell-gray-900">Upload an image</h3>
        <p className="mt-1 text-xs text-shell-gray-500">JPG, PNG, WebP, GIF or SVG up to 8 MB. Stored in public/uploads, served from /uploads.</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium text-shell-gray-700">File
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="mt-1 block w-full text-sm" />
          </label>
          <label className="text-sm font-medium text-shell-gray-700">Alt text
            <input value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Describe the image" className="mt-1 w-full rounded-lg border border-shell-gray-300 px-3 py-2 text-base outline-none focus:border-shell-gray-900 sm:text-sm" />
          </label>
        </div>
        <label className="mt-3 block text-sm font-medium text-shell-gray-700">Description (what / where it is used)
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Homepage hero background" className="mt-1 w-full rounded-lg border border-shell-gray-300 px-3 py-2 text-base outline-none focus:border-shell-gray-900 sm:text-sm" />
        </label>
        <button type="submit" disabled={busy} className={BTN + " mt-3 bg-shell-gray-900 text-white hover:bg-shell-red disabled:opacity-50"}>{busy ? "Uploading…" : "Upload"}</button>
      </form>
      {msg ? <p className="mt-3 rounded-lg bg-white px-3 py-2 text-sm text-shell-gray-700 ring-1 ring-shell-gray-300">{msg}</p> : null}
      <div className="sticky top-[var(--admin-bar,3.5rem)] z-10 -mx-1 bg-shell-gray-100 px-1 py-2">
        <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search by name, description or alt…" className="w-full rounded-lg border border-shell-gray-300 bg-white px-3 py-2 text-base outline-none focus:border-shell-gray-900 sm:text-sm" />
      </div>
      {items === null ? (
        <p className="mt-6 text-sm text-shell-gray-500">Loading images…</p>
      ) : (
        <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-3">
          {shown.map((m) => {
            const desc = m.description || imageDescription(m.url) || ""
            const places = (m.locations && m.locations.length ? m.locations : imageLocations(m.url)) || []
            const isEditing = editing === m.id
            return (
            <div key={m.id} className="overflow-hidden rounded-xl bg-white ring-1 ring-shell-gray-300">
              <img src={m.url} alt={m.alt || ""} className="aspect-video w-full object-cover" loading="lazy" />
              <div className="p-2.5">
                <p className="truncate font-mono text-[11px] font-semibold text-shell-gray-900" title={m.url}>{m.url}</p>
                <p className="truncate text-[11px] text-shell-gray-500" title={m.filename}>{m.filename} · {[m.width && m.height ? m.width + "×" + m.height : null, m.size ? Math.round(m.size / 1024) + " KB" : null].filter(Boolean).join(" · ")}</p>
                {desc && !isEditing ? <p className="mt-1 hidden text-xs leading-relaxed text-shell-gray-700 sm:block"><span className="font-semibold">What: </span>{desc}</p> : null}
                {m.alt && !isEditing ? <p className="mt-1 hidden text-xs leading-relaxed text-shell-gray-600 sm:block"><span className="font-semibold">Alt: </span>{m.alt}</p> : null}
                <p className="mt-1 truncate text-[11px] leading-relaxed text-shell-gray-600" title={(places.length ? places.join(" · ") : "")}>
                  <span className="font-semibold">Used in: </span>
                  {places.length ? places.slice(0, 2).join(" · ") + (places.length > 2 ? " · +" + (places.length - 2) : "") : (m.used > 0 ? `content field(s) ×${m.used}` : "nowhere yet")}
                </p>
                {isEditing ? (
                  <div className="mt-2 space-y-2">
                    <label className="block text-xs font-medium text-shell-gray-700">Alt text
                      <input value={editAlt} onChange={(e) => setEditAlt(e.target.value)} className="mt-1 w-full rounded-lg border border-shell-gray-300 px-2.5 py-2 text-base sm:text-sm" />
                    </label>
                    <label className="block text-xs font-medium text-shell-gray-700">Description
                      <input value={editDesc} onChange={(e) => setEditDesc(e.target.value)} className="mt-1 w-full rounded-lg border border-shell-gray-300 px-2.5 py-2 text-base sm:text-sm" />
                    </label>
                    <div className="flex gap-1.5">
                      <button onClick={() => saveMeta(m)} className={ACT + " bg-shell-gray-900 text-white hover:bg-shell-red"}>Save</button>
                      <button onClick={() => setEditing(null)} className={ACT + " bg-shell-gray-100 hover:bg-shell-gray-300"}>Cancel</button>
                    </div>
                  </div>
                ) : null}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {onSelect ? <button onClick={() => onSelect(m.url)} className={ACT + " bg-shell-gray-900 font-medium text-white hover:bg-shell-red"}>Use</button> : null}
                  <button onClick={() => { setEditing(m.id); setEditAlt(m.alt || ""); setEditDesc(m.description || desc) }} className={ACT + " bg-shell-gray-100 hover:bg-shell-gray-300"}>Edit</button>
                  <label className={ACT + " cursor-pointer bg-blue-100 font-medium text-blue-800 hover:bg-blue-200"}>
                    {replacing === m.id ? "Replacing…" : "Replace"}
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => replaceFile(m, e.target.files[0])} />
                  </label>
                  <button onClick={() => navigator.clipboard.writeText(m.url)} className={ACT + " hidden bg-shell-gray-100 hover:bg-shell-gray-300 sm:inline-flex"}>Copy URL</button>
                  <button onClick={() => remove(m)} className={ACT + " bg-red-100 text-red-700 hover:bg-red-200"}>Delete</button>
                </div>
              </div>
            </div>
            )
          })}
        </div>
      )}
      {items && shown.length === 0 && items.length > 0 ? (
        <p className="mt-6 text-sm text-shell-gray-500">No images match “{filter}”.</p>
      ) : null}
      {items && items.length === 0 ? (
        <p className="mt-6 text-sm text-shell-gray-500">No images yet. Upload one above, or copy files into public/uploads — they are added to the library automatically.</p>
      ) : null}
    </div>
  )
}
