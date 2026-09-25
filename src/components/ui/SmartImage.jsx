/**
 * Responsive image with brand gradient fallback.
 * If the remote image fails to load (offline), the branded gradient shows instead.
 */
import { useState } from 'react'

export default function SmartImage({ src, alt = '', fallback = '#1a1a1a', className = '', imgClassName = '' }) {
  const [failed, setFailed] = useState(!src)

  return (
    <div
      className={`relative overflow-hidden bg-shell-gray-300 ${className}`}
      style={failed ? { background: fallback } : undefined}
      role={failed ? 'img' : undefined}
      aria-label={failed ? alt : undefined}
    >
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  )
}
