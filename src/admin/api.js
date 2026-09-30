const base = (import.meta.env.BASE_URL || "/") + "api/"
export function apiUrl(p) { return base + p }

let csrf = null
export function setCsrf(t) { csrf = t }
export function getCsrf() { return csrf }

// Notified when the server stops recognising our session, so the shell can show
// the sign-in screen again instead of leaving a bare "Unauthorized" where a form
// should be. Sessions end up lost when the idle timeout passes, when the PHP dev
// server is restarted, or when its session file is momentarily unreadable.
let onExpired = null
export function setUnauthorizedHandler(fn) { onExpired = fn }

// Re-read the session: refreshes the CSRF token and reports whether we are still
// signed in. Used to replay a request once before treating it as a real failure.
async function refreshSession() {
  const r = await fetch(apiUrl("auth.php"), { credentials: "include" }).catch(() => null)
  if (!r) return false
  const data = await r.json().catch(() => null)
  if (data && data.csrf) csrf = data.csrf
  return !!(data && data.authed)
}

async function req(path, opts, retry = false) {
  const { method = "GET", body, json = true, headers = {} } = opts || {}
  const o = { method, credentials: "include", headers: { ...headers } }
  if (json && body !== undefined) { o.headers["Content-Type"] = "application/json"; o.body = JSON.stringify(body) }
  else if (body !== undefined) { o.body = body }
  if (method !== "GET" && csrf) { o.headers["X-CSRF-Token"] = csrf }
  const r = await fetch(apiUrl(path), o)
  const data = await r.json().catch(() => ({ ok: false, error: "Invalid server response" }))
  // auth.php itself reports 401 for wrong credentials, so never treat that as an
  // expired session.
  const isAuth = path.indexOf("auth.php") === 0
  if (r.status === 401 && !retry && !isAuth && await refreshSession()) {
    return req(path, opts, true)
  }
  if (!r.ok || data.ok === false) {
    if (r.status === 401 && !isAuth) {
      if (onExpired) onExpired()
      throw new Error("Your session expired - please sign in again.")
    }
    throw new Error(data.error || ("HTTP " + r.status))
  }
  return data
}

export const api = {
  get: (p) => req(p),
  post: (p, b) => req(p, { method: "POST", body: b }),
  put: (p, b) => req(p, { method: "PUT", body: b }),
  del: (p, b) => req(p, { method: "DELETE", body: b }),
  form: (p, fd) => req(p, { method: "POST", body: fd, json: false }),
}

