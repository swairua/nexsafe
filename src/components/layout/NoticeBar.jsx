import { useState } from "react"
import { useContent } from "../../content/ContentContext.jsx"

export default function NoticeBar() {
  const { noticeBar } = useContent()
  const [dismissed, setDismissed] = useState(() => {
    try {
      return typeof window !== "undefined" && window.localStorage.getItem("nx-notice-dismissed") === "1"
    } catch {
      return false
    }
  })
  if (!noticeBar || noticeBar.enabled === false || dismissed || !noticeBar.text) return null
  const dismiss = () => {
    try {
      window.localStorage.setItem("nx-notice-dismissed", "1")
    } catch {

    }
    setDismissed(true)
  }
  return (
    <div className="flex items-center justify-center gap-3 bg-shell-black px-3 py-2 text-center">
      {noticeBar.href ? (
        <a href={noticeBar.href} className="truncate text-xs font-semibold text-white hover:text-shell-yellow hover:underline">
          {noticeBar.text}
        </a>
      ) : (
        <span className="truncate text-xs font-semibold text-white">{noticeBar.text}</span>
      )}
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs text-white/70 hover:bg-white/15 hover:text-white"
      >
        ✕
      </button>
    </div>
  )
}
