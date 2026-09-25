import { useEffect, useRef, useState } from 'react'
import NexsateLogo from '../ui/NexsateLogo.jsx'
import MegaMenu from './MegaMenu.jsx'
import MobileNav from './MobileNav.jsx'
import SearchPanel from './SearchPanel.jsx'
import { navItems } from '../../data/navItems.js'

/**
 * Kyndryl-style floating header: a transparent frosted-glass bar offset from
 * the viewport edges that overlays the hero, turning solid white once scrolled
 * past it. `overlay=false` (e.g. the 404 route) keeps the classic sticky bar.
 */
export default function Header({ overlay = true }) {
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef(null)

  // Solid-bar state: stays transparent while the hero fills the screen, turns
  // solid once scrolled past it (Kyndryl behaviour). SSR-safe initial false.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > Math.max(200, window.innerHeight - 140))
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onDocClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenMenu(null)
        setSearchOpen(false)
      }
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenMenu(null)
        setSearchOpen(false)
        setMobileOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const toggleMenu = (i) => {
    setSearchOpen(false)
    setOpenMenu((cur) => (cur === i ? null : i))
  }

  // White text/icons over the hero; classic dark-on-white once solid.
  const onHero = overlay && !scrolled

  return (
    <header
      ref={headerRef}
      className={
        overlay
          ? 'fixed inset-x-3 top-3.5 z-50 md:inset-x-5 md:top-5'
          : `sticky top-0 z-50 bg-white transition-shadow duration-300 ${
              scrolled
                ? 'shadow-[0_8px_28px_-12px_rgba(11,27,43,0.28)]'
                : 'shadow-[0_1px_0_0_rgba(0,0,0,0.08)]'
            }`
      }
    >
      <div
        className={
          overlay
            ? `flex h-14 items-center justify-between rounded-2xl px-3 transition-colors duration-300 md:h-16 md:px-5 ${
                onHero
                  ? 'nav-glass ring-1 ring-white/20'
                  : 'bg-white shadow-[0_8px_28px_-12px_rgba(11,27,43,0.28)] ring-1 ring-black/5'
              }`
            : 'shell-container flex h-16 items-center justify-between md:h-[4.5rem]'
        }
      >
        <a href="#top" className="flex items-center" aria-label="nexsate.com home">
          <NexsateLogo className="h-10 w-10 md:h-11 md:w-11" />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item, i) => (
            <button
              key={item.label}
              type="button"
              onClick={() => toggleMenu(i)}
              onMouseEnter={() => { setSearchOpen(false); setOpenMenu(i) }}
              aria-expanded={openMenu === i}
              className={`flex items-center gap-1.5 rounded-md px-3.5 py-2.5 text-[0.95rem] font-semibold transition-colors ${
                onHero
                  ? openMenu === i
                    ? 'bg-white/15 text-white'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                  : openMenu === i
                    ? 'bg-shell-gray-100 text-shell-red'
                    : 'text-shell-gray-900 hover:text-shell-red'
              }`}
            >
              {item.label}
              <svg
                className={`h-3 w-3 transition-transform duration-200 ${openMenu === i ? 'rotate-180' : ''}`}
                viewBox="0 0 12 8"
                fill="none"
                aria-hidden="true"
              >
                <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => { setSearchOpen((s) => !s); setOpenMenu(null) }}
            aria-label="Search"
            aria-expanded={searchOpen}
            className={`rounded-full p-3 transition-colors ${
              onHero
                ? 'text-white hover:bg-white/15'
                : 'text-shell-gray-900 hover:bg-shell-gray-100 hover:text-shell-red'
            }`}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <a
            href="#/contact-us"
            className="btn-pill btn-pill--green mr-1 hidden px-4 py-2.5 text-sm md:inline-flex"
          >
            Talk to an expert
            <span aria-hidden="true">→</span>
          </a>

          <a
            href="#/change-country"
            aria-label="Select country or region"
            className={`hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition-colors md:flex ${
              onHero
                ? 'text-white/85 hover:bg-white/15 hover:text-white'
                : 'text-shell-gray-900 hover:bg-shell-gray-100 hover:text-shell-red'
            }`}
          >
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
              <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            nexsate.com
          </a>

          <button
            type="button"
            onClick={() => { setMobileOpen((m) => !m); setOpenMenu(null); setSearchOpen(false) }}
            aria-label="Menu"
            aria-expanded={mobileOpen}
            className={`rounded-full p-2.5 transition-colors lg:hidden ${
              onHero ? 'text-white hover:bg-white/15' : 'text-shell-gray-900 hover:bg-shell-gray-100'
            }`}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {openMenu !== null && (
        <MegaMenu item={navItems[openMenu]} onClose={() => setOpenMenu(null)} />
      )}

      {searchOpen && <SearchPanel />}

      {mobileOpen && (
        <MobileNav
          navItems={navItems}
          openIndex={openMenu}
          onToggle={toggleMenu}
          onNavigate={() => setMobileOpen(false)}
        />
      )}
    </header>
  )
}

