import { createContext, useContext, useEffect, useState } from "react"
import { defaultContent } from "../data/siteContent.js"

const ContentContext = createContext(defaultContent)

// API base honors Vite base so it works both behind the dev proxy (base "/")
// and a production build served from a subfolder (base "/nexsate/").
export const API_BASE = (import.meta.env.BASE_URL || "/") + "api/"
export function apiUrl(path) { return API_BASE + path }

export function useContent() { return useContext(ContentContext) }

/**
 * Merge the stored content over the shipped defaults. Plain objects merge
 * field-by-field so a nested default added later (e.g. a new key inside
 * `settings` or `contactForm`) still reaches a database seeded before it
 * existed; arrays and primitives replace outright, so a card an editor
 * deleted never comes back.
 */
export function mergeContent(base, override) {
  if (Array.isArray(override)) return override
  if (override && typeof override === "object" && base && typeof base === "object" && !Array.isArray(base)) {
    const out = { ...base }
    for (const k of Object.keys(override)) out[k] = mergeContent(base[k], override[k])
    return out
  }
  return override === undefined ? base : override
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent)

  useEffect(() => {
    let active = true
    fetch(apiUrl("content.php"), { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (active && j && j.ok && j.content) {
          setContent(mergeContent(defaultContent, j.content))
        }
      })
      .catch(() => {})
    return () => { active = false }
  }, [])

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
}

