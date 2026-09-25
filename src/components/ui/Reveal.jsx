import { useEffect, useRef, useState } from 'react'

/**
 * Scroll-reveal wrapper (port of the NanoSoft theme's vc_waypoints +
 * animate.css reveals: fadeInUp/Left/Right/In, slideInUp, bounceIn).
 * Renders children untouched on the server (smoke/SEO text checks keep
 * working); on the client it arms a hidden state and plays the matching
 * entrance animation once via IntersectionObserver. Honours
 * prefers-reduced-motion — then content simply stays visible.
 */
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
      // Fire as soon as the element enters (slightly inset from the bottom)
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

/**
 * Variants: up (default) | left | right | fade | zoom | bounce.
 * delay: 1-5 -> stagger steps of 90ms (ref's delay-1..delay-5).
 * The reveal classes are dropped after the animation finishes so normal
 * CSS (hover transforms etc.) is not permanently overridden by fill-mode.
 */
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
