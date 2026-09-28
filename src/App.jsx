import { useEffect, useState } from 'react'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import CookieBanner from './components/layout/CookieBanner.jsx'
import BackToTop from './components/layout/BackToTop.jsx'
import HeroCarousel from './components/sections/HeroCarousel.jsx'
import IntroBand from './components/sections/IntroBand.jsx'
import CardGrid from './components/sections/CardGrid.jsx'
import PicturesRow from './components/sections/PicturesRow.jsx'
import IndustriesStrip from './components/sections/IndustriesStrip.jsx'
import ImageTextSplit from './components/sections/ImageTextSplit.jsx'
import StatsStrip from './components/sections/StatsStrip.jsx'
import NewsRow from './components/sections/NewsRow.jsx'
import PromoBanner from './components/sections/PromoBanner.jsx'
import PageView from './components/pages/PageView.jsx'
import { pages } from './data/pages.js'

/**
 * Hash router (SSR-safe): '#/<slug>' renders the PageView for that page;
 * anything else renders the homepage and scrolls to the section anchor
 * (e.g. '#who-we-are') when present. Unknown slugs get the 404 view.
 */
function parseHash(hash = '') {
  if (hash.startsWith('#/')) return { kind: 'page', slug: hash.slice(2) }
  return { kind: 'home', anchor: hash.length > 1 ? hash.slice(1) : '' }
}

/**
 * nexsate.com homepage — doc-driven section order:
 * 1. Cookie banner   2. Header + mega menus   3. Hero carousel
 * 4. Intro band      5. Services grid        6. Pictures row (right after services)
 * 7. Industries      8. Image/text splits    9. Stats strip
 * 10. Blog row       11. Promo banner        12. Footer      13. Legal bar
 * Inner routes ('#/<slug>') replace main with PageView.
 */
export default function App() {
  const [route, setRoute] = useState(() =>
    typeof window === 'undefined' ? { kind: 'home', anchor: '' } : parseHash(window.location.hash),
  )

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (route.kind === 'page') {
      const page = pages[route.slug]
      document.title = page ? `${page.title} | nexsate.com` : 'Page not found | nexsate.com'
      window.scrollTo(0, 0)
      return
    }
    document.title = 'Nexsate — technology that works as one'
    if (route.anchor) {
      const el = document.getElementById(route.anchor)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      else window.scrollTo(0, 0)
    }
  }, [route])

  return (
    <div className="min-h-screen bg-white">
      <Header overlay={route.kind === 'home' || Boolean(pages[route.slug])} />
      {route.kind === 'page' ? (
        <main>
          <PageView page={pages[route.slug]} />
        </main>
      ) : (
        <main>
          <HeroCarousel />
          <IntroBand />
          <CardGrid />
          <PicturesRow />
          <IndustriesStrip />
          <ImageTextSplit />
          <StatsStrip />
          <NewsRow />
          <PromoBanner />
        </main>
      )}
      <Footer />
      <BackToTop />
      <CookieBanner />
    </div>
  )
}
