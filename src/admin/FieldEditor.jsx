const IMAGE_KEYS = ["image", "img", "src", "logo", "banner", "photo", "thumbnail", "thumb", "icon", "cover", "hero", "background", "avatar", "picture"]
const IMG_EXT = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]

// Only the last path segment counts. The full name looks like "heroSlides[0].gradient",
// and matching that against IMAGE_KEYS used to treat "gradient" as an image field just
// because its parent is called "heroSlides".
function isImageKey(name) {
  const key = String(name || "").split(".").pop().split("[")[0].toLowerCase()
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

const INPUT = "w-full rounded-md border border-shell-gray-300 bg-white px-2.5 py-1.5 text-sm text-shell-gray-900 outline-none focus:border-shell-gray-900 focus:ring-1 focus:ring-shell-gray-900"
const LABEL = "mb-1 block text-xs font-semibold uppercase tracking-wide text-shell-gray-500"
const NL = String.fromCharCode(10)

export default function FieldEditor({ name, value, onChange, onPickImage, depth = 0 }) {
  const key = String(name ?? "")
  if (Array.isArray(value)) {
    const update = (i, nv) => { const c = value.slice(); c[i] = nv; onChange(c) }
    const remove = (i) => { const c = value.slice(); c.splice(i, 1); onChange(c) }
    const add = () => { const tpl = value.length ? JSON.parse(JSON.stringify(value[value.length - 1])) : {}; onChange(value.concat([tpl])) }
    const move = (i, dir) => { const j = i + dir; if (j < 0 || j >= value.length) return; const c = value.slice(); const t = c[i]; c[i] = c[j]; c[j] = t; onChange(c) }
    return (
      <div className="mb-2">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-shell-gray-500">{label(key)} <span className="font-normal normal-case text-shell-gray-400">- {value.length} items</span></span>
          <button type="button" onClick={add} className="rounded-md bg-shell-gray-900 px-2.5 py-1 text-xs font-medium text-white hover:bg-shell-red">+ Add</button>
        </div>
        <div className="space-y-2">
          {value.map((item, i) => (
            <div key={i} className="rounded-lg border border-shell-gray-300 bg-shell-gray-100 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-bold text-shell-gray-400">#{i + 1}</span>
                <div className="flex gap-1">
                  <button type="button" onClick={() => move(i, -1)} className="rounded px-1.5 py-0.5 text-xs bg-white ring-1 ring-shell-gray-300 hover:bg-shell-gray-300">Up</button>
                  <button type="button" onClick={() => move(i, 1)} className="rounded px-1.5 py-0.5 text-xs bg-white ring-1 ring-shell-gray-300 hover:bg-shell-gray-300">Down</button>
                  <button type="button" onClick={() => remove(i)} className="rounded px-1.5 py-0.5 text-xs bg-red-100 text-red-700 hover:bg-red-200">Remove</button>
                </div>
              </div>
              <FieldEditor name={key + "[" + i + "]"} value={item} onChange={(nv) => update(i, nv)} onPickImage={onPickImage} depth={depth + 1} />
            </div>
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
      <label className="flex items-center gap-2 py-1 text-sm text-shell-gray-900">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4" />
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
  const str = String(value)
  const preview = imageSrc(str)
  if (isImageKey(key) || preview) {
    return (
      <label className="block text-sm">
        <span className={LABEL}>{label(key)}</span>
        <div className="flex items-center gap-2">
          <input type="text" value={str} onChange={(e) => onChange(e.target.value)} className={INPUT + " flex-1"} />
          {onPickImage ? <button type="button" onClick={() => onPickImage((url) => onChange(url || ""))} className="shrink-0 rounded-md bg-shell-gray-900 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-shell-red">Pick</button> : null}
        </div>
        {preview ? <img src={preview} alt="" className="mt-2 max-h-20 w-auto rounded border border-shell-gray-300 object-cover" onError={(e) => { e.currentTarget.style.opacity = "0.25" }} /> : null}
      </label>
    )
  }
  if (str.length > 70 || str.split(NL).length > 1) {
    return (
      <label className="block text-sm sm:col-span-2">
        <span className={LABEL}>{label(key)}</span>
        <textarea value={str} rows={3} onChange={(e) => onChange(e.target.value)} className={INPUT} />
      </label>
    )
  }
  return (
    <label className="block text-sm">
      <span className={LABEL}>{label(key)}</span>
      <input type="text" value={str} onChange={(e) => onChange(e.target.value)} className={INPUT} />
    </label>
  )
}

