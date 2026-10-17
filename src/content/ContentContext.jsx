import { createContext, useContext, useEffect, useState } from "react"
import { defaultContent } from "../data/siteContent.js"
import { CONTENT_VERSION, STRUCTURAL_KEYS } from "../data/contentTruth.js"

const ContentContext = createContext(defaultContent)

export const API_BASE = (import.meta.env.VITE_API_URL || ((import.meta.env.BASE_URL || "/") + "api/")).replace(/\/$/, "/")
export function apiUrl(path) { return API_BASE + path }

export function useContent() { return useContext(ContentContext) }

export function mergeContent(base, override) {
  if (Array.isArray(override)) return override
  if (override && typeof override === "object" && base && typeof base === "object" && !Array.isArray(base)) {
    const out = { ...base }
    for (const k of Object.keys(override)) out[k] = mergeContent(base[k], override[k])
    return out
  }
  return override === undefined ? base : override
}

// Frontend is the single source of truth: structural keys (nav, pages,
// anchors, labels) are always taken from code. Backend values for those
// keys are dropped here so a stale CMS row can never override the UI.
export function stripStructural(payload) {
  if (!payload || typeof payload !== "object") return payload
  const out = { ...payload }
  for (const k of STRUCTURAL_KEYS) {
    if (k in out) delete out[k]
  }
  return out
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent)

  useEffect(() => {
    let active = true
    fetch(apiUrl("content.php"), { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (active && j && j.ok && j.content) {
          if (j.version !== undefined && j.version !== CONTENT_VERSION) {
            console.warn(
              `[content] backend version ${j.version} != frontend ${CONTENT_VERSION} — structural keys pinned to frontend; regenerate seed (node api/seed.mjs).`
            )
          }
          if (Array.isArray(j.readonly) && j.readonly.length) {
            console.info(`[content] backend structural keys ignored: ${j.readonly.join(", ")}`)
          }
          setContent(mergeContent(defaultContent, stripStructural(j.content)))
        }
      })
      .catch(() => {})
    return () => { active = false }
  }, [])

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
}
