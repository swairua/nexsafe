import { useEffect, useRef, useState } from "react"
import { RICH_TOOLBAR, RICH_TOOLBAR_BTN, RICH_EDITOR, INPUT_LABEL } from "./ui.js"

const BUTTONS = [
  { key: "bold", icon: "B", cmd: "bold", title: "Bold" },
  { key: "italic", icon: "I", cmd: "italic", title: "Italic" },
  { key: "link", icon: "🔗", cmd: "createLink", title: "Link" },
  { key: "ul", icon: "•", cmd: "insertUnorderedList", title: "Bullets" },
  { key: "ol", icon: "1.", cmd: "insertOrderedList", title: "Numbered list" },
  { key: "h2", icon: "H2", cmd: "formatBlock", arg: "<h2>", title: "Heading" },
  { key: "p", icon: "¶", cmd: "formatBlock", arg: "<p>", title: "Paragraph" }
]

export default function RichTextEditor({ value, onChange }) {
  const ref = useRef(null)
  const [html, setHtml] = useState(value || "")
  const [ignore, setIgnore] = useState(false)

  useEffect(() => {
    if (ref.current && !ignore) {
      ref.current.innerHTML = html || ""
    }
  }, [html, ignore])

  const handleInput = () => {
    if (ref.current) {
      setIgnore(true)
      setHtml(ref.current.innerHTML)
      setTimeout(() => setIgnore(false), 50)
      onChange(ref.current.innerHTML)
    }
  }

  const exec = (cmd, arg = null) => {
    ref.current.focus()
    document.execCommand(cmd, false, arg)
    handleInput()
  }

  const insertLink = () => {
    const url = window.prompt("Enter URL:")
    if (url) {
      ref.current.focus()
      document.execCommand("createLink", false, url)
      handleInput()
    }
  }

  return (
    <div className="space-y-2">
      <div className={RICH_TOOLBAR}>
        {BUTTONS.map((b) => (
          <button
            key={b.key}
            type="button"
            title={b.title}
            onClick={() => (b.key === "link" ? insertLink() : exec(b.cmd, b.arg))}
            className={RICH_TOOLBAR_BTN}
          >
            {b.icon}
          </button>
        ))}
      </div>
      <div ref={ref} className={RICH_EDITOR} onInput={handleInput} contentEditable dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
