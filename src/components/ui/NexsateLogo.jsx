/**
 * nexsate.com brand mark — rounded-square gradient tile with ascending
 * signal bars, in the corporate navy/blue palette. Keeps the same h-10/w-10
 * footprint in header and footer.
 */
export default function NexsateLogo({ className = 'h-9 w-9', showWordmark = false }) {
  const mark = (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="nexsate-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3aa0ff" />
          <stop offset="0.55" stopColor="#0a7ffa" />
          <stop offset="1" stopColor="#0b45f5" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="88" height="88" rx="24" fill="url(#nexsate-mark)" />
      <rect x="27" y="56" width="13" height="20" rx="4" fill="#ffffff" opacity="0.85" />
      <rect x="43.5" y="42" width="13" height="34" rx="4" fill="#ffffff" />
      <rect x="60" y="28" width="13" height="48" rx="4" fill="#ffffff" opacity="0.85" />
    </svg>
  )

  if (!showWordmark) return mark
  return (
    <span className="inline-flex items-center gap-2">
      {mark}
      <span className="text-lg font-bold leading-none tracking-tight text-shell-gray-900">
        nexsate<span className="text-shell-red">.com</span>
      </span>
    </span>
  )
}