import { useState } from 'react'

const STORAGE_KEY = 'nexsate-cookie-consent'

function readConsent() {
  try {
    return !localStorage.getItem(STORAGE_KEY)
  } catch {
    return true
  }
}

/** Cookie consent bar shown on first visit, following the common consent-banner pattern. */
export default function CookieBanner() {
  // Lazy initializer reads consent once at mount — no flash for returning visitors.
  const [visible, setVisible] = useState(readConsent)

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted')
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="banner-in fixed inset-x-0 bottom-0 z-[60] border-t-4 border-shell-yellow bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.15)]"
    >
      <div className="shell-container flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-3xl text-sm text-shell-gray-700">
          We use cookies (similar technologies) to collect and analyse information on our website's
          performance and functionality, to enhance and personalise your experience, and for
          marketing. By continuing to browse, you agree to our use of cookies.{' '}
          <a href="#/cookie-policy" className="font-semibold text-shell-red underline">
            Cookie policy
          </a>
        </p>
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <button type="button" onClick={accept} className="btn-pill btn-pill--outline w-full justify-center sm:w-auto">
            Manage settings
          </button>
          <button type="button" onClick={accept} className="btn-pill btn-pill--primary w-full justify-center sm:w-auto">
            Accept all cookies
          </button>
        </div>
      </div>
    </div>
  )
}
