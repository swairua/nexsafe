import { useEffect, useRef, useState } from 'react'
import { stats } from '../../data/content.js'
import Reveal from '../ui/Reveal.jsx'

const NUMERIC = /^(\d+(?:\.\d+)?)(.*)$/

/** One stat: value renders immediately (SSR-safe text), then counts up
 *  once when scrolled into view (port of the ref's `.counter` countTo). */
function Stat({ value, label, delay }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const match = NUMERIC.exec(value)
    if (!match) return undefined

    const target = parseFloat(match[1])
    const suffix = match[2]
    const decimals = (match[1].split('.')[1] || '').length
    let frame = 0
    let started = false

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started) return
        started = true
        observer.disconnect()
        const t0 = performance.now()
        const dur = 1300
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / dur)
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplay((target * eased).toFixed(decimals) + suffix)
          if (p < 1) frame = requestAnimationFrame(tick)
          else setDisplay(value)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <div ref={ref} className="glass-card glass-card--dark glass-card--static rounded-2xl px-6 py-8 text-center">
      <Reveal delay={delay}>
        <p className="text-4xl font-extrabold tracking-tight text-shell-yellow md:text-5xl">
          {display}
        </p>
        <p className="mt-3 text-sm font-medium uppercase tracking-wider text-white/75">
          {label}
        </p>
      </Reveal>
    </div>
  )
}

/** Dark stats strip with big light-blue numbers + count-up on scroll. */
export default function StatsStrip() {
  return (
    <section id="it-solutions" className="relative overflow-hidden bg-shell-gray-900 py-16 md:py-24">
      {/* Soft colour pools — give the glass tiles' backdrop-blur something to mirror */}
      <div className="pointer-events-none absolute -left-24 -top-16 h-72 w-72 rounded-full bg-shell-red/25 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-shell-yellow/15 blur-3xl" aria-hidden="true" />
      <div className="shell-container relative">
        <div className="grid gap-6 sm:grid-cols-2 md:gap-7 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Stat key={s.label} value={s.value} label={s.label} delay={(i % 4) + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
