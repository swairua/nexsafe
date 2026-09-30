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
  const INPUT = "mt-1 w-full rounded-lg border border-shell-gray-300 px-3 py-2 text-sm outline-none focus:border-shell-gray-900 focus:ring-1 focus:ring-shell-gray-900"
  return (
    <div className="flex min-h-screen items-center justify-center bg-shell-gray-100 px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl ring-1 ring-shell-gray-300">
        <h1 className="text-2xl font-extrabold text-shell-gray-900">Nexsate Admin</h1>
        <p className="mt-1 text-sm text-shell-gray-500">Sign in to manage site content.</p>
        <label className="mt-6 block text-sm font-medium text-shell-gray-700">Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" className={INPUT} />
        </label>
        <label className="mt-3 block text-sm font-medium text-shell-gray-700">Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" className={INPUT} />
        </label>
        {error ? <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
        <button type="submit" disabled={busy} className="mt-6 w-full rounded-lg bg-shell-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-shell-red disabled:opacity-50">{busy ? "Signing in..." : "Sign in"}</button>
      </form>
    </div>
  )
}

