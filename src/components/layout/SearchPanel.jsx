import { useMemo, useRef, useState } from "react"
import { useContent } from '../../content/ContentContext.jsx'
import { buildSearchIndex, searchIndex } from '../../search/searchIndex.js'

/**
 * Functional search overlay (Kyndryl-style): live ranked results grouped into
 * Pages / Insights as you type, suggested searches when empty, full keyboard
 * support (arrows + Enter to open the top hit, Esc to close).
 */
export default function SearchPanel({ autoFocus = true, onClose = () => {} }) {
  const { settings, pages } = useContent()
  const content = useContent()
  const suggestions = content.searchSuggestions || {}
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)

  const index = useMemo(() => buildSearchIndex(pages), [pages])
  const results = useMemo(() => searchIndex(index, query), [index, query])
  const insightHits = results.filter((r) => r.eyebrow === "Insights")
  const pageHits = results.filter((r) => r.eyebrow !== "Insights")
  const flat = [...pageHits, ...insightHits]

  const go = (slug) => {
    if (!slug) return
    onClose()
    window.location.hash = `#/${slug}`
  }

  const onKey = (e) => {
    if (e.key === "Escape") { onClose(); return }
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, flat.length - 1)); return }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); return }
    if (e.key === "Enter" && flat[active]) { go(flat[active].slug) }
  }

  const ResultRow = ({ hit, index: i }) => (
    <a
      href={`#/${hit.slug}`}
      onClick={(e) => { e.preventDefault(); go(hit.slug) }}
      onMouseEnter={() => setActive(i)}
      className={`flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-left text-sm transition-colors ${
        i === active ? "bg-shell-gray-100" : ""
      }`}
    >
      <span className="min-w-0">
        <span className="block truncate font-semibold text-shell-gray-900">{hit.title}</span>
        <span className="block truncate text-xs text-shell-gray-500">
          {[hit.topic || hit.eyebrow, "Page"].filter(Boolean).join(" · ")}
        </span>
      </span>
      <span aria-hidden="true" className="shrink-0 text-shell-gray-400">→</span>
    </a>
  )

  return (
    <div className="menu-anim absolute inset-x-0 top-full rounded-b-2xl border-t border-shell-gray-100 bg-white shadow-xl">
      <div className="shell-container py-5 md:py-6">
        <div className="flex items-center gap-3 rounded-full bg-shell-gray-100 px-5 py-3.5">
          <svg className="h-5 w-5 shrink-0 text-shell-gray-500" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            autoFocus={autoFocus}
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0) }}
            onKeyDown={onKey}
            placeholder={settings.searchPlaceholder}
            aria-label={settings.searchPlaceholder}
            className="w-full bg-transparent text-base outline-none placeholder:text-shell-gray-500"
          />
          {query ? (
            <button
              type="button"
              onClick={() => { setQuery(""); setActive(0); inputRef.current && inputRef.current.focus() }}
              aria-label="Clear search"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-shell-gray-500 hover:bg-shell-gray-300"
            >
              ✕
            </button>
          ) : null}
        </div>

        {query.trim() === "" ? (
          <div className="mt-4">
            <p className="px-1 text-xs font-bold uppercase tracking-wider text-shell-gray-500">{suggestions.title}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(suggestions.items || []).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => { setQuery(s); setActive(0); inputRef.current && inputRef.current.focus() }}
                  className="rounded-full border border-shell-gray-300 px-4 py-2 text-sm font-medium text-shell-gray-700 transition-colors hover:border-shell-red hover:text-shell-red"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : results.length ? (
          <div className="mt-3 max-h-[50vh] overflow-y-auto">
            {pageHits.length ? (
              <div className="mt-1">
                <p className="px-4 pb-1 text-xs font-bold uppercase tracking-wider text-shell-gray-400">Pages</p>
                {pageHits.map((hit) => (
                  <ResultRow key={hit.slug} hit={hit} index={flat.indexOf(hit)} />
                ))}
              </div>
            ) : null}
            {insightHits.length ? (
              <div className="mt-2">
                <p className="px-4 pb-1 text-xs font-bold uppercase tracking-wider text-shell-gray-400">Insights</p>
                {insightHits.map((hit) => (
                  <ResultRow key={hit.slug} hit={hit} index={flat.indexOf(hit)} />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <p className="mt-4 px-1 text-sm text-shell-gray-500">
            No matches for “{query.trim()}”. Try “cloud”, “security”, or “support”.
          </p>
        )}
      </div>
    </div>
  )
}
