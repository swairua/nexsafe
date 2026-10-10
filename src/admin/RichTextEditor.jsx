import { useEffect, useRef, useState } from "react"

const LABEL = "mb-1 block text-xs font-semibold uppercase tracking-wide text-shell-gray-500"

const ALLOWED = new Set(["P", "BR", "STRONG", "B", "EM", "I", "U", "UL", "OL", "LI", "A", "H3", "H4", "BLOCKQUOTE"])

export function sanitizeHtml(dirty) {
  if (typeof document === "undefined") return String(dirty || "")
  const tpl = document.createElement("template")
  tpl.innerHTML = String(dirty || "")
  const walk = (node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === 3) continue
      if (child.nodeType !== 1) { child.remove(); continue }
      const tag = child.tagName.toUpperCase()
      if (!ALLOWED.has(tag)) {
        walk(child)
        while (child.firstChild) node.insertBefore(child.firstChild, child)
        child.remove()
        continue
      }
      for (const attr of Array.from(child.attributes)) {
        const nm = attr.name.toLowerCase()
        if (!(tag === "A" && (nm === "href" || nm === "title"))) child.removeAttribute(attr.name)
      }
      if (tag === "A") {
        const href = child.getAttribute("href") || ""
        if (!/^(#|\/|mailto:|tel:|https?:\/\/)/i.test(href)) child.removeAttribute("href")
      }
      walk(child)
    }
  }
  walk(tpl.content)
  return tpl.innerHTML
}

export function plainToHtml(text) {
  return String(text || "")
    .split(/\n{2,}/)
    .map((para) => "<p>" + para.split("\n").map((ln) => ln.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")).join("<br>") + "</p>")
    .join("")
}

export function htmlToPlain(html) {
  if (typeof document === "undefined") return String(html || "")
  const tpl = document.createElement("template")
  tpl.innerHTML = String(html || "")
  const parts = []
  const walk = (node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === 3) { parts.push(child.textContent); continue }
      if (child.nodeType !== 1) continue
      const tag = child.tagName.toUpperCase()
      if (tag === "BR") { parts.push("\n"); continue }
      if (tag === "LI") { parts.push("\n- "); walk(child); continue }
      if (tag === "P" || tag === "H3" || tag === "H4" || tag === "UL" || tag === "OL" || tag === "BLOCKQUOTE") {
        if (parts.length && !parts[parts.length - 1].endsWith("\n")) parts.push("\n\n")
        walk(child)
        parts.push("\n\n")
        continue
      }
      walk(child)
    }
  }
  walk(tpl.content)
  return parts.join("").replace(/\n{3,}/g, "\n\n").trim()
}

export function looksLikeHtml(v) {
  return /<\s*(p|br|strong|em|ul|ol|li|a|h3|h4|blockquote)[\s/>]/i.test(String(v || ""))
}

export default function RichTextEditor({ label, value, onChange }) {
  const viewRef = useRef(null)
  const [mode, setMode] = useState("visual")
  const [htmlDraft, setHtmlDraft] = useState("")
  const lastEmitted = useRef("")
  const html = looksLikeHtml(value) ? String(value || "") : plainToHtml(value)

  useEffect(() => {
    lastEmitted.current = html
    if (viewRef.current && document.activeElement !== viewRef.current) {
      viewRef.current.innerHTML = sanitizeHtml(html)
    }

  }, [label, value])

  function emit(raw) {
    const clean = sanitizeHtml(raw)
    if (clean === lastEmitted.current) return
    lastEmitted.current = clean
    const plain = htmlToPlain(clean)

    const hasFormatting = /<(strong|b|em|i|u|a|ul|ol|li|blockquote|h3|h4)(\s|>)/i.test(clean)
    onChange(hasFormatting ? clean : plain)
  }

  function cmd(command, arg) {
    const el = viewRef.current
    if (!el) return
    el.focus()
    try { document.execCommand(command, false, arg) } catch (e) {  }
    emit(el.innerHTML)
  }

  function addLink() {
    const href = window.prompt("Link address (e.g. #/contact-us or https://…):", "#/contact-us")
    if (href === null) return
    cmd("createLink", href || "#/contact-us")
  }

  const tool = "inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded px-2 py-1 text-sm font-semibold text-shell-gray-700 hover:bg-shell-gray-100"
  return (
    <div className="block text-sm sm:col-span-2">
      <span className={LABEL}>{label} <span className="font-normal normal-case text-shell-gray-400">— rich text</span></span>
      <div className="overflow-hidden rounded-md border border-shell-gray-300 bg-white focus-within:border-shell-gray-900 focus-within:ring-1 focus-within:ring-shell-gray-900">
        <div className="flex items-center gap-1 overflow-x-auto border-b border-shell-gray-300 bg-shell-gray-100 px-1.5 py-1">
          <button type="button" title="Bold" onClick={() => cmd("bold")} className={tool + " font-bold"}>B</button>
          <button type="button" title="Italic" onClick={() => cmd("italic")} className={tool + " italic"}>I</button>
          <button type="button" title="Underline" onClick={() => cmd("underline")} className={tool + " underline"}>U</button>
          <button type="button" title="Bullet list" onClick={() => cmd("insertUnorderedList")} className={tool}>• List</button>
          <button type="button" title="Numbered list" onClick={() => cmd("insertOrderedList")} className={tool}>1. List</button>
          <button type="button" title="Quote" onClick={() => cmd("formatBlock", "BLOCKQUOTE")} className={tool}>“”</button>
          <button type="button" title="Add link" onClick={addLink} className={tool}>Link</button>
          <button type="button" title="Clear formatting" onClick={() => cmd("removeFormat")} className={tool}>Clear</button>
          <span className="ml-auto shrink-0 pl-1">
            <button type="button" onClick={() => { setHtmlDraft(lastEmitted.current || html); setMode(mode === "visual" ? "html" : "visual") }} className={tool + " ring-1 ring-shell-gray-300"}>{mode === "visual" ? "HTML" : "Visual"}</button>
          </span>
        </div>
        {mode === "visual" ? (
          <div
            ref={viewRef}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => emit(e.currentTarget.innerHTML)}
            onBlur={(e) => emit(e.currentTarget.innerHTML)}
            className="min-h-[5.5rem] px-2.5 py-1.5 text-sm leading-relaxed text-shell-gray-900 outline-none [&_a]:text-shell-red [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-shell-gray-300 [&_blockquote]:pl-3 [&_blockquote]:italic [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-1 [&_ul]:list-disc [&_ul]:pl-5"
          />
        ) : (
          <textarea value={htmlDraft} rows={5} spellCheck={false} onChange={(e) => { setHtmlDraft(e.target.value); emit(e.target.value) }} className="w-full px-2.5 py-1.5 font-mono text-xs leading-relaxed text-shell-gray-900 outline-none" />
        )}
      </div>
    </div>
  )
}
