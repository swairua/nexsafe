import { useEffect, useRef, useState } from 'react'
import NexsateLogo from '../ui/NexsateLogo.jsx'
import MegaMenu from './MegaMenu.jsx'
import MobileNav from './MobileNav.jsx'
import NoticeBar from './NoticeBar.jsx'
import SearchPanel from './SearchPanel.jsx'
import { useContent } from "../../content/ContentContext.jsx"

/**
 * Enboarder-style header: a clean, full-width sticky white bar with a subtle
 * bottom border. Logo on the left, uppercase nav items in the centre (active
 * item in brand colour), and a solid CTA pill + search on the right.
 */
export default function Header({ overlay = false }) {
  const { navItems, settings, uiLabels, sectionIds } = useContent()
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef(null)

  // Shadow appears once scrolled past the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
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

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 bg-white border-b border-shell-gray-100 transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_4px_20px_-8px_rgba(11,27,43,0.15)]' : 'shadow-none'
      }`}
    >
      <NoticeBar />
      <div className="shell-container flex h-16 items-center justify-between md:h-[4.5rem]">
        <a href={'#' + sectionIds.top} className="flex shrink-0 items-center" aria-label={settings.brandName + ' home'}>
          <NexsateLogo className="h-5 md:h-6" src={settings.logo} alt={settings.logoAlt || settings.brandName} />
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label={uiLabels.primaryNav}>
          {navItems.map((item, i) => (
            <button
              key={item.label}
              type="button"
              onClick={() => toggleMenu(i)}
              onMouseEnter={() => { setSearchOpen(false); setOpenMenu(i) }}
              aria-expanded={openMenu === i}
              className={`relative flex items-center gap-1.5 rounded-md px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                openMenu === i
                  ? 'text-shell-red'
                  : 'text-shell-gray-900 hover:text-shell-red'
              }`}
            >
              {item.label}
              <svg
                className={`h-2.5 w-2.5 transition-transform duration-200 ${openMenu === i ? 'rotate-180' : ''}`}
                viewBox="0 0 12 8"
                fill="none"
                aria-hidden="true"
              >
                <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {openMenu === i && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-shell-red" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setSearchOpen((s) => !s); setOpenMenu(null) }}
            aria-label={uiLabels.search}
            aria-expanded={searchOpen}
            className="rounded-full p-2.5 text-shell-gray-900 transition-colors hover:bg-shell-gray-100 hover:text-shell-red"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Solid brand CTA pill */}
          <a
            href={settings.menuCta.href}
            className="hidden rounded-full bg-shell-red px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-shell-red/90 md:inline-flex"
          >
            {settings.menuCta.label}
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => { setMobileOpen((m) => !m); setOpenMenu(null); setSearchOpen(false) }}
            aria-label={uiLabels.openMenu}
            aria-expanded={mobileOpen}
            className="rounded-full p-2.5 text-shell-gray-900 transition-colors hover:bg-shell-gray-100 lg:hidden"
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

      {searchOpen && <SearchPanel onClose={() => setSearchOpen(false)} />}

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

