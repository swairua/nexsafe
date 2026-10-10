import { useEffect, useRef, useState } from 'react'

let sharedObserver = null

function getObserver() {
  if (typeof IntersectionObserver === 'undefined') return null
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            sharedObserver.unobserve(entry.target)
          }
        }
      },

      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    )
  }
  return sharedObserver
}

function motionAllowed() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)
  const [armed, setArmed] = useState(() => typeof window !== 'undefined' && motionAllowed())

  useEffect(() => {
    if (!armed) return undefined
    const el = ref.current
    const observer = getObserver()
    if (!el || !observer) {
      setArmed(false)
      return undefined
    }
    observer.observe(el)
    return () => observer.unobserve(el)
  }, [armed])

  const handleAnimationEnd = (e) => {
    if (e.target === e.currentTarget) setArmed(false)
  }

  const classes = [
    'reveal',
    armed ? `reveal--${variant}` : '',
    armed && delay ? `reveal-delay-${delay}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag ref={ref} className={classes} onAnimationEnd={handleAnimationEnd} {...rest}>
      {children}
    </Tag>
  )
}
