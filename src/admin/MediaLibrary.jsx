import { useState, useEffect } from "react"
import { api } from "./api.js"
import { BTN, BTN_PRIMARY, INPUT } from "./ui.js"

export default function MediaLibrary({ show = false, onSelect, onClose }) {
  const [media, setMedia] = useState([])
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [filter, setFilter] = useState("")

  useEffect(() => {
    if (show) loadMedia()
  }, [show])

  async function loadMedia() {
    try {
      const r = await api.get("media.php")
      setMedia(r.media || [])
    } catch (e) {
      setMedia([])
    }
  }

  async function handleUpload(e) {
    e.preventDefault()
    const form = e.target
    const file = form.elements.file && form.elements.file.files ? form.elements.file.files[0] : null
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append("file", file)
    const alt = form.elements.alt && form.elements.alt.value ? form.elements.alt.value : ""
    const desc = form.elements.description && form.elements.description.value ? form.elements.description.value : ""
    if (alt) fd.append("alt", alt)
    if (desc) fd.append("description", desc)
    try {
      const r = await api.form("media.php", fd)
      await loadMedia()
      form.reset()
      if (onSelect) onSelect(r.url, r)
    } catch (e) {
      alert(e.message || "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const filtered = media.filter((m) => {
    const q = filter.toLowerCase()
    return (!q || (m.filename || "").toLowerCase().includes(q) || (m.url || "").toLowerCase().includes(q))
  })

  const inner = (
    <div className="max-w-4xl">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-base font-bold text-shell-gray-900">Media Library</h2>
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search media…"
          className={INPUT}
        />
      </div>
      <form onSubmit={handleUpload} className="mb-6 space-y-3 rounded-xl bg-white p-4 ring-1 ring-shell-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-end gap-3">
          <input type="file" accept="image/*,image/svg+xml" name="file" className={INPUT} required />
          <input name="alt" placeholder="Alt text" className={INPUT + " w-full sm:w-auto"} />
          <button type="submit" disabled={uploading} className={BTN_PRIMARY + " px-4"}>
            {uploading ? "Uploading…" : "Upload"}
          </button>
        </div>
      </form>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filtered.length === 0 ? (
          <p className="col-span-full text-center text-xs text-shell-gray-500">No media.</p>
        ) : (
          filtered.map((m) => (
            <div
              key={m.id}
              className="group relative rounded-xl border border-shell-gray-200 bg-white p-2 shadow-sm cursor-pointer hover:border-brand-ink"
              onClick={() => {
                if (onSelect) {
                  onSelect(m.url, m)
                  if (onClose) onClose()
                }
              }}
            >
              <img
                src={m.url}
                alt={m.filename || ""}
                className="w-full h-24 object-cover rounded-lg"
                onError={(e) => {
                  e.target.style.display = "none"
                }}
              />
              <div className="mt-1 truncate text-xs text-shell-gray-600">{m.filename}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  if (!show) return <div>{inner}</div>

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-shell-gray-900">Select image</h2>
          <button onClick={onClose} className={BTN + " text-shell-gray-500 hover:text-shell-gray-900"}>
            ✕
          </button>
        </div>
        {inner}
      </div>
    </div>
  )
}
