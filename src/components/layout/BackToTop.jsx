import { useEffect, useState } from 'react'
import { useContent } from '../../content/ContentContext.jsx'

/** Floating back-to-top button (port of the ref theme's wpb_btt):
 *  fades/scales in after scrolling down, smooth-scrolls home. */
export default function BackToTop() {
  const { uiLabels } = useContent()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      aria-label={uiLabels.backToTop}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="back-to-top fixed bottom-24 right-5 z-50 mb-[env(safe-area-inset-bottom)] mr-[env(safe-area-inset-right)] flex h-11 w-11 items-center justify-center rounded-full bg-shell-red text-white shadow-lg transition-colors hover:bg-shell-red-dark md:bottom-28 md:right-7"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 19V5M5 12l7-7 7 7"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
