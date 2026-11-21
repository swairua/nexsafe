import { useState } from "react"
import { api, setCsrf } from "./api.js"
import { BTN, BTN_PRIMARY, INPUT, EYEBROW, GLASS, GRADIENT_TEXT, TRANSITION_ALL } from "./ui.js"

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
      <div className={GLASS + " rounded-[2rem] p-8 w-full max-w-md shadow-[0_0_48px_16px_rgba(1,116,164,0.25)]"}>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-shell-red text-white shadow-[0_0_16px_4px_rgba(6,147,227,0.4)]">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
              <rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor"/>
              <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className={TRANSITION_ALL + " text-xl font-extrabold tracking-tight text-white group"}>
            <span className={GRADIENT_TEXT}>Nexsate</span> <span className="text-shell-red">Admin</span>
          </span>
        </div>
        <span className={EYEBROW}>Sign in</span>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-shell-gray-400">Username
            <input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" className={INPUT} />
          </label>
          <label className="block text-sm font-medium text-shell-gray-400">Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" className={INPUT} />
          </label>
          {error ? <p className="mt-2 rounded-xl bg-red-500 px-3 py-2 text-sm text-red-200 shadow-sm">{error}</p> : null}
          <button type="submit" disabled={busy} className={BTN_PRIMARY}>{busy ? "Signing in…" : "Sign in"}</button>
        </form>
        <p className="mt-5 text-center text-[10px] text-shell-gray-600 uppercase tracking-wider">Authorized personnel only.</p>
      </div>
    </div>
  )
}
