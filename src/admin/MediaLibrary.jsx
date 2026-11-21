import { useState } from "react"
import { api } from "./api.js"
import { BTN, BTN_PRIMARY, INPUT } from "./ui.js"

export default function MediaLibrary() {
  const [openMenu, setOpenMenu] = useState(false)
  const [busy, setBusy] = useState(false)
  const [filter, setFilter] = useState("")
  const [navOpen, setNavOpen] = useState(false)

  async function upload(e) {
    e.preventDefault()
    setBusy(true)
    // ... upload logic
    setBusy(false)
  }

  return (
    <div>
      <h2 className="text-base font-bold text-shell-gray-900">Media Library</h2>
      {/* Upload form using new tokens */}
      <form onSubmit={upload} className={CARD}>
        <div className="mb-3">
          <input type="file" className={INPUT} />
        </div>
        <button type="submit" disabled={busy} className={BTN_PRIMARY + " mt-3 bg-shell-red text-white hover:bg-shell-gray-900 disabled:opacity-50"}>
          {busy ? "Uploading…" : "Upload"}
        </button>
      </form>
    </div>
  )
}