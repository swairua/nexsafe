import { useEffect, useRef, useState } from 'react'
import NexsateLogo from '../ui/NexsateLogo.jsx'
import MegaMenu from './MegaMenu.jsx'
import MobileNav from './MobileNav.jsx'
import NoticeBar from './NoticeBar.jsx'
import SearchPanel from './SearchPanel.jsx'
import { useContent } from "../../content/ContentContext.jsx"

export default function Header({ overlay = false }) {
  const { navItems, settings, uiLabels, sectionIds } = useContent()
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef(null)

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

  const openedByHover = useRef(false)

  const onNavClick = (i) => {
    if (openedByHover.current) {
      openedByHover.current = false
      setSearchOpen(false)
      setOpenMenu(i)
      return
    }
    toggleMenu(i)
  }

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 border-b border-shell-gray-100 transition-[background-color,box-shadow] duration-300 ${
        scrolled
          ? 'glass-header shadow-[0_4px_20px_-8px_rgba(11,27,43,0.15)]'
          : 'bg-white shadow-none'
      }`}
    >
      <NoticeBar />
      <div className="shell-container flex h-16 items-center justify-between md:h-[4.5rem]">
        <a href={'#' + sectionIds.top} className="flex shrink-0 items-center" aria-label={settings.brandName + ' home'}>
          <NexsateLogo className="h-5 md:h-6" src={settings.logo} alt={settings.logoAlt || settings.brandName} />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={uiLabels.primaryNav}>
          {navItems.map((item, i) => (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavClick(i)}
              onMouseEnter={() => {
                openedByHover.current = true
                setSearchOpen(false)
                setOpenMenu(i)
              }}
              aria-expanded={openMenu === i}
              className={`relative flex items-center gap-1 rounded px-3 py-2 text-[0.95rem] font-medium normal-case tracking-normal transition-colors ${
                openMenu === i
                  ? 'text-[#0b1fb3]'
                  : 'text-[#1a1d21] hover:text-[#0b1fb3]'
              }`}
            >
              {item.label}
              <svg
                className={`h-2 w-2 transition-transform duration-200 ${openMenu === i ? 'rotate-180' : ''}`}
                viewBox="0 0 12 8"
                fill="none"
                aria-hidden="true"
              >
                <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => { setSearchOpen((s) => !s); setOpenMenu(null) }}
            aria-label={uiLabels.search}
            aria-expanded={searchOpen}
            className="hidden rounded-full p-2.5 text-shell-gray-900 transition-colors hover:bg-shell-gray-100 hover:text-brand-ink sm:block"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <div className="hidden flex-col items-end leading-tight md:flex">
            <a
              href="#/client-support"
              className="rounded bg-[#f3f4f6] px-2.5 py-0.5 text-xs font-medium text-[#1a1d21] transition-colors hover:text-[#0b1fb3]"
            >
              Client Support →
            </a>
            <a href="tel:18255704550" className="mt-1 text-[0.95rem] font-medium text-[#1a1d21] hover:text-[#0b1fb3]">
              {settings.phone || '1-825-570-4550'}
            </a>
          </div>

          <a
            href="#/contact-us"
            className="inline-flex items-center rounded-full bg-shell-red px-6 py-2.5 text-sm font-bold tracking-wide text-white transition-all duration-300 btn-lift-glow hover:bg-shell-red-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/50"
          >
            Contact Us
            <span className="arrow" aria-hidden="true">→</span>
          </a>

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
