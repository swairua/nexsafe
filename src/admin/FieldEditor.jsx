import RichTextEditor, { looksLikeHtml } from "./RichTextEditor.jsx"
import { imageDescription, imageLocations } from "../data/imageMeta.js"
import { BTN, BTN_MINI } from "./ui.js"

const IMAGE_KEYS = ["image", "img", "src", "logo", "banner", "photo", "thumbnail", "thumb", "icon", "cover", "hero", "background", "avatar", "picture"]
const IMG_EXT = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]

// Only the last path segment counts. The full name looks like "heroSlides[0].gradient",
// and matching that against IMAGE_KEYS used to treat "gradient" as an image field just
// because its parent is called "heroSlides". Tile icon keys (nav menu challenge
// tiles: "transform" | "shield" | "gear" | "gauge") are icon names, not files.
function isImageKey(name) {
  const key = String(name || "").split(".").pop().split("[")[0].toLowerCase()
  if (key === "icon") return false
  return key !== "" && IMAGE_KEYS.some((k) => key.indexOf(k) !== -1)
}

// Returns a value that is safe to put in <img src>, or "" when the field holds
// something else. CSS must never reach an <img>: "linear-gradient(90deg, rgba(..) 0%, ..)"
// has no "#", so the browser requests it as a path and the "%" in "0%," makes Vite's dev
// server throw "URI malformed" inside decodeURI().
function imageSrc(v) {
  if (typeof v !== "string") return ""
  const s = v.trim()
  if (!s) return ""
  if (/%(?![0-9A-Fa-f]{2})/.test(s)) return ""                 // invalid % escape
  if (/^(data:image\/|blob:)/i.test(s)) return s
  if (/^(linear|radial|conic)-gradient\(/i.test(s)) return ""   // CSS, not a file
  if (/^(#[0-9a-f]{3,8}|rgba?\(|hsla?\()/i.test(s)) return ""   // CSS colour
  if (/[\s()#]/.test(s)) return ""                             // not a URL
  if (/^(https?:\/\/|\/|\.\/|\.\.\/)/i.test(s)) return s
  if (IMG_EXT.some((e) => s.toLowerCase().endsWith(e))) return s
  return ""
}

function label(k) {
  const seg = String(k).split(".").pop().split("[")[0]
  return seg.charAt(0).toUpperCase() + seg.slice(1)
}

const INPUT = "w-full rounded-md border border-shell-gray-300 bg-white px-2.5 py-2 text-base text-shell-gray-900 outline-none focus:border-shell-gray-900 focus:ring-1 focus:ring-shell-gray-900 sm:text-sm"
const LABEL = "mb-1 block text-xs font-semibold uppercase tracking-wide text-shell-gray-500"
const NL = String.fromCharCode(10)

// Short human label for a collapsed array item: its title/name/heading when
// it has one, otherwise a truncated peek at the raw value.
function itemLabel(item, i) {
  if (item && typeof item === "object") {
    const t = item.title || item.label || item.name || item.heading || item.slug || item.href || item.src || item.url
    if (t) return String(t).slice(0, 60)
    return "Item " + (i + 1)
  }
  const s = String(item ?? "")
  return s ? s.slice(0, 60) : "Item " + (i + 1)
}

export default function FieldEditor({ name, value, onChange, onPickImage, depth = 0 }) {
  const key = String(name ?? "")
  if (Array.isArray(value)) {
    const update = (i, nv) => { const c = value.slice(); c[i] = nv; onChange(c) }
    const remove = (i) => { const c = value.slice(); c.splice(i, 1); onChange(c) }
    const add = () => { const tpl = value.length ? JSON.parse(JSON.stringify(value[value.length - 1])) : {}; onChange(value.concat([tpl])) }
    const move = (i, dir) => { const j = i + dir; if (j < 0 || j >= value.length) return; const c = value.slice(); const t = c[i]; c[i] = c[j]; c[j] = t; onChange(c) }
    return (
      <div className="mb-2">
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <span className="min-w-0 truncate text-xs font-semibold uppercase tracking-wide text-shell-gray-500">{label(key)} <span className="font-normal normal-case text-shell-gray-400">- {value.length} items</span></span>
          <button type="button" onClick={add} className={BTN + " shrink-0 bg-shell-gray-900 px-3 text-white hover:bg-shell-red"}>+ Add</button>
        </div>
        <div className="space-y-2">
          {value.map((item, i) => (
            <details key={i} open={i === 0} className="rounded-lg border border-shell-gray-300 bg-shell-gray-100">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center gap-1.5 p-2 [&::-webkit-details-marker]:hidden">
                <span aria-hidden="true" className="shrink-0 text-xs text-shell-gray-400">▸</span>
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-shell-gray-900" title={itemLabel(item, i)}>{itemLabel(item, i)}</span>
                <span className="flex shrink-0 gap-1">
                  <button type="button" title="Move up" aria-label={"Move item " + (i + 1) + " up"} onClick={(e) => { e.preventDefault(); move(i, -1) }} className={BTN_MINI + " bg-white text-shell-gray-700 ring-1 ring-shell-gray-300"}>↑</button>
                  <button type="button" title="Move down" aria-label={"Move item " + (i + 1) + " down"} onClick={(e) => { e.preventDefault(); move(i, 1) }} className={BTN_MINI + " bg-white text-shell-gray-700 ring-1 ring-shell-gray-300"}>↓</button>
                  <button type="button" title="Remove" aria-label={"Remove item " + (i + 1)} onClick={(e) => { e.preventDefault(); remove(i) }} className={BTN_MINI + " bg-red-100 text-red-700 hover:bg-red-200"}>✕</button>
                </span>
              </summary>
              <div className="border-t border-shell-gray-300 p-2.5">
                <FieldEditor name={key + "[" + i + "]"} value={item} onChange={(nv) => update(i, nv)} onPickImage={onPickImage} depth={depth + 1} />
              </div>
            </details>
          ))}
        </div>
      </div>
    )
  }
  if (value && typeof value === "object") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {Object.keys(value).map((k) => (
          <FieldEditor key={k} name={(name ? name + "." : "") + k} value={value[k]} onChange={(nv) => onChange({ ...value, [k]: nv })} onPickImage={onPickImage} depth={depth + 1} />
        ))}
      </div>
    )
  }
  if (typeof value === "boolean") {
    return (
      <label className="flex min-h-[44px] items-center gap-2.5 py-1 text-sm text-shell-gray-900">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="h-6 w-6 shrink-0" />
        <span>{label(key)}</span>
      </label>
    )
  }
  if (typeof value === "number") {
    return (
      <label className="block text-sm">
        <span className={LABEL}>{label(key)}</span>
        <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className={INPUT} />
      </label>
    )
  }
  const str = String(value == null ? "" : value)
  const preview = imageSrc(str)
  const leaf = String(key || "").split(".").pop().split("[")[0].toLowerCase()
  const isAltField = leaf === "alt" || leaf === "alttext" || leaf === "alt_text" || leaf === "logoalt"
  if (isImageKey(key) || preview) {
    const desc = preview ? imageDescription(preview) : ""
    const places = preview ? imageLocations(preview) : []
    return (
      <div className="block text-sm">
        <span className={LABEL}>{label(key)} <span className="font-normal normal-case text-shell-gray-400">— image · replaceable</span></span>
        <div className="flex items-center gap-2">
          <input type="text" value={str} onChange={(e) => onChange(e.target.value)} placeholder="/uploads/…" className={INPUT + " flex-1"} />
          {onPickImage ? <button type="button" onClick={() => onPickImage((url) => onChange(url || ""))} className="inline-flex min-h-[44px] shrink-0 items-center rounded-md bg-shell-gray-900 px-3 text-xs font-medium text-white hover:bg-shell-red">Pick · Replace</button> : null}
        </div>
        {preview ? (
          <div className="mt-2 flex gap-2 rounded-md border border-shell-gray-300 bg-shell-gray-100 p-2">
            <img src={preview} alt="" className="h-16 w-24 shrink-0 rounded object-cover" onError={(e) => { e.currentTarget.style.opacity = "0.25" }} />
            <div className="min-w-0 text-xs leading-relaxed text-shell-gray-600">
              {desc ? <p><span className="font-semibold text-shell-gray-900">What: </span>{desc}</p> : null}
              <p className="truncate" title={preview}><span className="font-semibold text-shell-gray-900">Location: </span><span className="font-mono">{preview}</span></p>
              {places.length ? <p><span className="font-semibold text-shell-gray-900">Used in: </span>{places.join(" · ")}</p> : null}
            </div>
          </div>
        ) : null}
        {desc || places.length ? null : <p className="mt-1 text-[11px] text-shell-gray-500">Local file under /uploads, /brand or /social — use Pick to replace it from the Media Library.</p>}
      </div>
    )
  }
  // Alt / description text next to an image: short input with guidance.
  if (isAltField) {
    return (
      <label className="block text-sm">
        <span className={LABEL}>{label(key)} <span className="font-normal normal-case text-shell-gray-400">— alt text</span></span>
        <input type="text" value={str} onChange={(e) => onChange(e.target.value)} placeholder="Describe the image for screen readers" className={INPUT} />
      </label>
    )
  }
  // CSS (gradients) stays a plain textarea — rich formatting makes no sense there.
  if (/^(linear|radial|conic)-gradient\(/i.test(str)) {
    return (
      <label className="block text-sm sm:col-span-2">
        <span className={LABEL}>{label(key)} <span className="font-normal normal-case text-shell-gray-400">— CSS</span></span>
        <textarea value={str} rows={2} onChange={(e) => onChange(e.target.value)} className={INPUT + " font-mono text-xs"} />
      </label>
    )
  }
  // Long copy (or HTML from the rich editor) gets the free WYSIWYG editor.
  if (str.length > 70 || str.split(NL).length > 1 || looksLikeHtml(str)) {
    return <RichTextEditor label={label(key)} value={str} onChange={onChange} />
  }
  return (
    <label className="block text-sm">
      <span className={LABEL}>{label(key)}</span>
      <input type="text" value={str} onChange={(e) => onChange(e.target.value)} className={INPUT} />
    </label>
  )
}

