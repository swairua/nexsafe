import { useEffect, useState } from "react"
import { api } from "./api.js"

export default function MediaLibrary({ onSelect }) {
  const [items, setItems] = useState(null) // null = still loading
  const [file, setFile] = useState(null)
  const [alt, setAlt] = useState("")
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState("")

  async function load() {
    try {
      const r = await api.get("media.php")
      setItems(r.media || [])
      // Files that were copied into /uploads without an upload (localizer, FTP,
      // git) are registered by the server on this call.
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
      const r = await api.form("media.php", fd)
      setMsg("Uploaded " + (r.filename || ""))
      setFile(null); setAlt(""); load()
    } catch (err) { setMsg(err.message) }
    finally { setBusy(false) }
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

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-bold text-shell-gray-900">Media Library</h2>
        <p className="text-sm text-shell-gray-500">{items === null ? "Loading..." : items.length + (items.length === 1 ? " image" : " images")}</p>
      </div>
      <form onSubmit={upload} className="mt-4 rounded-xl bg-white p-4 ring-1 ring-shell-gray-300">
        <h3 className="text-sm font-bold text-shell-gray-900">Upload an image</h3>
        <p className="mt-1 text-xs text-shell-gray-500">JPG, PNG, WebP, GIF or SVG up to 8 MB. Files are stored in public/uploads and served from /uploads; anything already in that folder is listed here too.</p>
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <label className="text-sm font-medium text-shell-gray-700">File
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="mt-1 block text-sm" />
          </label>
          <label className="min-w-[10rem] flex-1 text-sm font-medium text-shell-gray-700">Alt text
            <input value={alt} onChange={(e) => setAlt(e.target.value)} className="mt-1 w-full rounded-lg border border-shell-gray-300 px-3 py-2 text-sm" />
          </label>
          <button type="submit" disabled={busy} className="rounded-lg bg-shell-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-shell-red disabled:opacity-50">{busy ? "Uploading..." : "Upload"}</button>
        </div>
      </form>
      {msg ? <p className="mt-3 rounded-lg bg-white px-3 py-2 text-sm text-shell-gray-700 ring-1 ring-shell-gray-300">{msg}</p> : null}
      {items === null ? (
        <p className="mt-6 text-sm text-shell-gray-500">Loading images...</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((m) => (
            <div key={m.id} className="overflow-hidden rounded-xl bg-white ring-1 ring-shell-gray-300">
              <img src={m.url} alt={m.alt || ""} className="aspect-video w-full object-cover" />
              <div className="p-2">
                <p className="truncate text-xs text-shell-gray-500" title={m.filename}>{m.filename}</p>
                <p className="mt-1 text-[11px] text-shell-gray-400">
                  {[m.width && m.height ? m.width + "×" + m.height : null, m.size ? Math.round(m.size / 1024) + " KB" : null, m.used ? "in use ×" + m.used : null].filter(Boolean).join(" · ")}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {onSelect ? <button onClick={() => onSelect(m.url)} className="rounded bg-shell-gray-900 px-2 py-1 text-xs text-white hover:bg-shell-red">Use</button> : null}
                  <button onClick={() => navigator.clipboard.writeText(m.url)} className="rounded bg-shell-gray-100 px-2 py-1 text-xs hover:bg-shell-gray-300">Copy URL</button>
                  <button onClick={() => remove(m)} className="rounded bg-red-100 px-2 py-1 text-xs text-red-700 hover:bg-red-200">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {items && items.length === 0 ? (
        <p className="mt-6 text-sm text-shell-gray-500">No images yet. Upload one above, or copy files into public/uploads — they are added to the library automatically.</p>
      ) : null}
    </div>
  )
}

