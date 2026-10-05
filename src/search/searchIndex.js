// Client-side site search (Kyndryl-style): an index built from the content
// pages at render time — no backend. Title matches rank first, then section
// headings, then body copy. HTML is stripped before matching so rich-text
// answers search as plain words.
function stripHtml(v) {
  return String(v == null ? '' : v)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()
}

function pageText(page) {
  const parts = [page.title, page.intro]
  for (const s of page.sections || []) {
    parts.push(s.heading)
    for (const b of s.body || []) parts.push(b)
    for (const t of s.list || []) parts.push(t)
    for (const it of s.items || []) {
      parts.push(it.title, it.text)
    }
  }
  return stripHtml(parts.filter(Boolean).join('\n')).toLowerCase()
}

/** [{ slug, title, eyebrow, topic, hay }] — rebuilt whenever pages change. */
export function buildSearchIndex(pages) {
  return Object.values(pages || {})
    .filter((p) => p && p.slug && p.title)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      eyebrow: p.eyebrow || '',
      topic: p.topic || '',
      hay: pageText(p),
    }))
}

/**
 * Ranked results for a query: every term must appear somewhere (AND), title
 * hits outrank heading hits outrank body hits. Returns at most `limit`.
 */
export function searchIndex(index, query, limit = 8) {
  const terms = String(query || '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1)
  if (!terms.length) return []
  const scored = []
  for (const entry of index) {
    const title = entry.title.toLowerCase()
    let score = 0
    let ok = true
    for (const t of terms) {
      const inTitle = title.includes(t)
      const inHay = entry.hay.includes(t)
      if (!inTitle && !inHay) {
        ok = false
        break
      }
      score += inTitle ? 3 : 1
    }
    if (ok) scored.push({ ...entry, score })
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit)
}
