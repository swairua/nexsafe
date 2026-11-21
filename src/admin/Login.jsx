import { useState } from "react"
import { api, setCsrf } from "./api.js"
import { BTN, BTN_PRIMARY, INPUT, EYEBROW, PILL_BADGE } from "./ui.js"

export default function Login({ onAuthed }) {
  const [username, setUsername] = useState("admin")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)
  async function submit(e) {
    e.preventDefault()
    setBusy(true); setError("")
    try {
      const r = await api.post("auth.php", { action: "login", username, password })
      if (r.csrf) setCsrf(r.csrf)
      onAuthed(r.username)
    } catch (err) { setError(err.message) }
    finally { setBusy(false) }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-shell-black px-4 text-white">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl bg-shell-gray-900 p-8 shadow-xl ring-1 ring-shell-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-shell-red text-white">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor"/>
                <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Nexsate</h1>
              <p className="text-xs text-shell-gray-400">Admin portal</p>
            </div>
          </div>
          <span className={EYEBROW}>Sign in</span>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-shell-gray-300">Username
              <input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" className={INPUT} />
            </label>
            <label className="block text-sm font-medium text-shell-gray-300">Password
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" className={INPUT} />
            </label>
            {error ? <p className="mt-2 rounded-lg bg-red-500 px-3 py-2 text-sm text-red-200">{error}</p> : null}
            <button type="submit" disabled={busy} className={BTN_PRIMARY}>{busy ? "Signing in..." : "Sign in"}</button>
          </form>
          <p className="mt-4 text-center text-xs text-shell-gray-500">Authorized personnel only.</p>
        </div>
      </div>
    </div>
  )
}
