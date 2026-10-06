import { useState } from "react"
import { api, setCsrf } from "./api.js"

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
  const INPUT = "mt-1 w-full rounded-lg border border-shell-gray-300 bg-white px-3 py-2.5 text-base text-shell-gray-900 outline-none transition focus:border-shell-gray-900 focus:ring-1 focus:ring-shell-gray-900 sm:text-sm"
  return (
    <div className="flex min-h-screen items-center justify-center bg-shell-gray-100 px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-shell-gray-300">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-shell-gray-900 text-white">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor"/>
                <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-shell-gray-900">Nexsate</h1>
              <p className="text-xs text-shell-gray-500">Admin portal</p>
            </div>
          </div>
          <p className="mt-6 text-sm text-shell-gray-600">Sign in to manage site content.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-shell-gray-700">Username
              <input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" className={INPUT} />
            </label>
            <label className="block text-sm font-medium text-shell-gray-700">Password
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" className={INPUT} />
            </label>
            {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
            <button type="submit" disabled={busy} className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-shell-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-shell-red disabled:opacity-50">{busy ? "Signing in..." : "Sign in"}</button>
          </form>
        </div>
        <p className="mt-4 text-center text-xs text-shell-gray-400">Authorized personnel only.</p>
      </div>
    </div>
  )
}

