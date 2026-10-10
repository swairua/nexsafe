import { useState } from 'react'
import { useContent } from '../../content/ContentContext.jsx'
import { Rich } from '../ui/SectionTag.jsx'

const STORAGE_KEY = 'nexsate-cookie-consent'

function readConsent() {
  try {
    return !localStorage.getItem(STORAGE_KEY)
  } catch {
    return true
  }
}

export default function CookieBanner() {

  const [visible, setVisible] = useState(readConsent)
  const { cookieBanner, uiLabels } = useContent()

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted')
    } catch {

    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label={uiLabels.cookieConsent}
      className="banner-in fixed inset-x-0 bottom-0 z-[60] border-t-4 border-shell-yellow bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.15)]"
    >
      <div className="shell-container flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl text-sm text-shell-gray-700">
          <Rich>{cookieBanner.text}</Rich>{' '}
          <a href={cookieBanner.policyHref} className="font-semibold text-shell-red underline">
            {cookieBanner.policyLabel}
          </a>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <button type="button" onClick={accept} className="btn-pill btn-pill--outline w-full justify-center sm:w-auto">
            {cookieBanner.manageLabel}
          </button>
          <button type="button" onClick={accept} className="btn-pill btn-pill--primary w-full justify-center sm:w-auto">
            {cookieBanner.acceptLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
