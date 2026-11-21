import { useState, useEffect, useCallback } from "react"
import { api } from "./api.js"
import { BTN, BTN_MINI, BTN_SM, INPUT } from "./ui.js"
import MediaLibrary from "./MediaLibrary.jsx"
import RichTextEditor from "./RichTextEditor.jsx"

const IMAGE_KEYS = new Set(["src", "image", "logo", "fallback", "icon"])
const LONG_KEYS = new Set(["text", "quote", "note", "columnText", "description", "alt", "kicker", "tag", "label"])
const BOOL_KEYS = new Set(["enabled"])
const LINK_KEYS = new Set(["label", "href", "target", "ctaLabel", "ctaHref"])

function humanize(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .replace(/_/g, " ")
}

function setIn(obj, key, next) {
  if (Array.isArray(obj)) {
    const copy = [...obj]
    copy[key] = next
    return copy
  }
  return { ...obj, [key]: next }
}

function setInDeep(obj, path, next) {
  if (path.length === 0) return next
  const [head, ...rest] = path
  return setIn(obj, head, rest.length === 0 ? next : setInDeep(obj[head], rest, next))
}

function isPlainObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v)
}

function isLinkObject(v) {
  if (!isPlainObject(v)) return false
  const keys = Object.keys(v)
  return keys.length > 0 && keys.every((k) => LINK_KEYS.has(k)) && ("label" in v || "href" in v)
}

function TextInput({ value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      value={value == null ? "" : value}
      onChange={(e) => onChange(e.target.value)}
      className={INPUT}
      spellCheck="false"
    />
  )
}

function StringInput({ value, onChange }) {
  return (
    <textarea
      value={value == null ? "" : value}
      onChange={(e) => onChange(e.target.value)}
      className={INPUT + " block w-full min-h-[96px] resize-y"}
      rows={3}
      spellCheck="false"
    />
  )
}

function BoolInput({ value, onChange }) {
  return (
    <input
      type="checkbox"
      checked={!!value}
      onChange={(e) => onChange(e.target.checked)}
      className="rounded border-shell-gray-300 text-shell-red focus:ring-shell-red"
    />
  )
}

function ImageInput({ value, onChange, onPickImage }) {
  const isUrl = typeof value === "string" && value.length > 0
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="/uploads/image.jpg"
          value={isUrl ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className={INPUT + " flex-1"}
          spellCheck="false"
        />
        <button type="button" onClick={onPickImage} disabled={!onPickImage} className={BTN + " px-3 text-xs"}>
          Pick image
        </button>
      </div>
      {isUrl && (
        <div className="relative group">
          <img
            src={value}
            alt="preview"
            className="w-32 h-24 object-cover rounded-xl border border-shell-gray-200 bg-shell-gray-100"
            onError={(e) => {
              e.target.style.display = "none"
            }}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1 right-1 bg-black/60 text-white text-xs rounded px-2 py-0.5 hover:bg-black/80"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

function LinkInput({ value, onChange }) {
  const base = isPlainObject(value) ? value : {}
  return (
    <div className="grid grid-cols-2 gap-3">
      <TextInput value={base.label || ""} onChange={(v) => onChange(setIn(base, "label", v))} />
      <TextInput value={base.href || ""} onChange={(v) => onChange(setIn(base, "href", v))} />
    </div>
  )
}

function ArrayEditor({ value, onChange, absPath, onPickImage }) {
  const addItem = () => {
    const empty = value.length > 0 && isPlainObject(value[0]) ? {} : ""
    onChange([...value, empty])
  }
  const removeItem = (i) => {
    onChange(value.filter((_, ix) => ix !== i))
  }
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-shell-gray-500">Items</span>
        <button type="button" onClick={addItem} className={BTN_SM + " px-2 py-1 text-xs"}>
          + Add item
        </button>
      </div>
      {value.map((item, i) => {
        const setItem = (next) => onChange(setIn(value, i, next))
        return (
          <div key={i} className="rounded-xl border border-shell-gray-200 bg-white p-3 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider text-shell-gray-500">Item {i + 1}</span>
              <button type="button" onClick={() => removeItem(i)} className="text-xs text-shell-red hover:underline">
                Remove
              </button>
            </div>
            {typeof item === "object" && item !== null ? (
              <ObjectEditor value={item} onChange={setItem} absPath={[...absPath, i]} onPickImage={onPickImage} />
            ) : (
              <TextInput value={item == null ? "" : item} onChange={setItem} />
            )}
          </div>
        )
      })}
      {value.length === 0 && <p className="text-xs text-shell-gray-500">No items.</p>}
    </div>
  )
}

function ObjectEditor({ value, onChange, absPath, onPickImage }) {
  return (
    <div className="space-y-5">
      {Object.entries(value).map(([key, val]) => {
        const childAbsPath = [...absPath, key]
        const setField = (newVal) => onChange(setIn(value, key, newVal))
        return (
          <div key={key} className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-shell-gray-500">
              {humanize(key)}
            </label>
            {renderField(key, val, childAbsPath, setField, onPickImage)}
          </div>
        )
      })}
    </div>
  )
}

function renderField(key, val, absPath, onChange, onPickImage) {
  if (Array.isArray(val)) {
    return <ArrayEditor value={val} onChange={onChange} absPath={absPath} onPickImage={onPickImage} />
  }
  if (isPlainObject(val)) {
    if (isLinkObject(val)) {
      return <LinkInput value={val} onChange={onChange} />
    }
    return <ObjectEditor value={val} onChange={onChange} absPath={absPath} onPickImage={onPickImage} />
  }
  if (typeof val === "boolean") {
    return <BoolInput value={val} onChange={onChange} />
  }
  if (IMAGE_KEYS.has(key)) {
    return (
      <ImageInput value={val} onChange={onChange} onPickImage={() => onPickImage(absPath)} />
    )
  }
  const multiline = LONG_KEYS.has(key)
  if (multiline) {
    return <RichTextEditor value={val} onChange={onChange} />
  }
  return <TextInput value={val} onChange={onChange} />
}

export default function FieldEditor({ name, value, onChange, onPickImage }) {
  const [data, setData] = useState(value)
  const [busy, setBusy] = useState(false)
  const [pickPath, setPickPath] = useState(null)

  useEffect(() => {
    setData(value)
  }, [name])

  const setValue = (next) => {
    setData(next)
    onChange(next)
  }

  const handlePickImage = useCallback((path) => {
    setPickPath(path)
  }, [])

  const handleImageSelected = useCallback(
    (url) => {
      if (pickPath) {
        setValue(setInDeep(data, pickPath, url))
      }
      setPickPath(null)
    },
    [data, pickPath]
  )

  return (
    <div className="space-y-6">
      {pickPath && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center" onClick={() => setPickPath(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-shell-gray-900">Select image</h2>
              <button type="button" onClick={() => setPickPath(null)} className={BTN + " text-shell-gray-500 hover:text-shell-gray-900"}>
                ✕
              </button>
            </div>
            <MediaLibrary show onSelect={handleImageSelected} onClose={() => setPickPath(null)} />
          </div>
        </div>
      )}
      {typeof data === "object" && data !== null && !Array.isArray(data) ? (
        <ObjectEditor value={data} onChange={setValue} absPath={[]} onPickImage={handlePickImage} />
      ) : Array.isArray(data) ? (
        <ArrayEditor value={data} onChange={setValue} absPath={[]} onPickImage={handlePickImage} />
      ) : (
        <TextInput value={data == null ? "" : data} onChange={setValue} />
      )}
    </div>
  )
}
