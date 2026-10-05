import { useEffect, useState } from 'react'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import CookieBanner from './components/layout/CookieBanner.jsx'
import BackToTop from './components/layout/BackToTop.jsx'
import HeroCarousel from './components/sections/HeroCarousel.jsx'
import IntroBand from './components/sections/IntroBand.jsx'
import CardGrid from './components/sections/CardGrid.jsx'
import PartnerStrip from './components/sections/PartnerStrip.jsx'
import TrustStrip from './components/sections/TrustStrip.jsx'
import AwardsBand from './components/sections/AwardsBand.jsx'
import IndustriesStrip from './components/sections/IndustriesStrip.jsx'
import StackSection from './components/sections/StackSection.jsx'
import SuccessStorySection from './components/sections/SuccessStorySection.jsx'
import ValuesStrip from './components/sections/ValuesStrip.jsx'
import BlogRow from './components/sections/BlogRow.jsx'
import Testimonials from './components/sections/Testimonials.jsx'
import FaqTeaser from './components/sections/FaqTeaser.jsx'
import DeptSplit from './components/sections/DeptSplit.jsx'
import HomeContact from './components/sections/HomeContact.jsx'
import ConnectBand from './components/sections/ConnectBand.jsx'
import PromoBanner from './components/sections/PromoBanner.jsx'
import PageView from './components/pages/PageView.jsx'
import { useContent } from './content/ContentContext.jsx'

/**
 * Hash router (SSR-safe): '#/<slug>' renders the PageView for that page;
 * anything else renders the homepage and scrolls to the section anchor
 * (e.g. '#who-we-are') when present. Unknown slugs get the 404 view.
 */
function parseHash(hash = '') {
  if (hash.startsWith('#/')) {
    const [path, query] = hash.slice(2).split('?')
    return { kind: 'page', slug: path, params: new URLSearchParams(query || '') }
  }
  return { kind: 'home', anchor: hash.length > 1 ? hash.slice(1) : '' }
}

/**
 * nexsate.com homepage — doc-driven section order:
 * 1. Cookie banner   2. Header + mega menus   3. Hero carousel
 * 4. Intro band      5. Services grid        6. Pictures row (right after services)
 * 7. Industries      8. Partners (vendor wall, just below industries)
 * 9. Image/text splits    10. Stats strip
 * 11. Blog row       12. Promo banner        13. Footer      14. Legal bar
 * Inner routes ('#/<slug>') replace main with PageView.
 */
export default function App() {
  const content = useContent()
  const pages = content.pages
  // Tab titles are content-driven (admin > Site settings), with the shipped
  // defaults kept as a safety net if a key is ever removed.
  const settings = content.settings || {}
  const homeTitle = settings.homeTitle || 'Nexsate — technology that works as one'
  const domain = settings.domain || 'nexsate.com'
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
      document.title = page ? `${page.title} | ${domain}` : `${(content.notFound || {}).title || 'Page not found'} | ${domain}`
      window.scrollTo(0, 0)
      return
    }
    document.title = homeTitle
    if (route.anchor) {
      const el = document.getElementById(route.anchor)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      else window.scrollTo(0, 0)
    }
  }, [route, homeTitle, domain, content.notFound, pages])

  return (
    <div className="min-h-screen bg-white">
      <Header overlay={route.kind === 'home' || Boolean(pages[route.slug])} />
      {route.kind === 'page' ? (
        <main>
          <PageView page={pages[route.slug]} slug={route.slug} params={route.params} />
        </main>
      ) : (
        <main>
          <HeroCarousel />
          <IntroBand />
          <CardGrid />
          <IndustriesStrip />
          <PartnerStrip />
          <TrustStrip />
          <AwardsBand />
          <StackSection />
          <SuccessStorySection />
          <ValuesStrip />
          <BlogRow />
          <Testimonials />
          <PromoBanner />
          <FaqTeaser />
          <DeptSplit />
          <HomeContact />
          <ConnectBand />
        </main>
      )}
      <Footer />
      <BackToTop />
      <CookieBanner />
    </div>
  )
}
