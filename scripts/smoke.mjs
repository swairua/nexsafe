// Runtime smoke test: renders <App /> with react-dom/server via Vite's module loader.
// Catches undefined imports, bad hooks usage, and render-time crashes.
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'

const server = await createServer({
  root: process.cwd(),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const html = renderToString(React.createElement(App))
  const { navItems } = await server.ssrLoadModule('/src/data/navItems.js')
  const { pages, allPages } = await server.ssrLoadModule('/src/data/pages.js')
  const { footerColumns, footerLegal, newsItems } = await server.ssrLoadModule('/src/data/footerContent.js')
  const { default: PageView } = await server.ssrLoadModule('/src/components/pages/PageView.jsx')
  const strategyHtml = renderToString(React.createElement(PageView, { page: pages['managed-it-services'] }))
  const notFoundHtml = renderToString(React.createElement(PageView, { page: undefined }))
  const leafHrefs = navItems.flatMap((i) => i.columns.flatMap((c) => c.links.map((l) => l.href)))
  const deepHrefs = [
    ...footerColumns.flatMap((c) => c.links.map((l) => l.href)),
    ...footerLegal.map((l) => l.href),
    ...newsItems.map((n) => n.href),
  ]
  const navLabels = navItems.map((i) => i.label)
  const menuLinks = navItems.flatMap((i) => i.columns.flatMap((c) => c.links.map((l) => l.label)))
  // Tag-stripped text: for components that split strings into markup
  // (hero word-stagger), assert against visible text, not raw HTML.
  const plain = html.replace(/<[^>]+>/g, '')
  const checks = {
    'has header nav': html.includes('Company') && html.includes('Industries'),
    'has hero heading': plain.includes('Technology that works as one.'),
    'has intro band': html.includes('Simply enabling IT for a complex world') && html.includes('technology that works as one'),
    'has card grid': html.includes('Seven services that work as one') && html.includes('Data protection &amp; disaster recovery'),
    'has pictures row': html.includes('The people and platforms behind the services') && html.includes('id="pictures"'),
    'has industries strip': html.includes('Six sectors, one accountable IT partner') && html.includes('btn-sweep'),
    'has split section': html.includes('Managed IT services customized for your industry') && html.includes('The stack behind technology that works as one.'),
    'has stats': html.includes('24/7') && html.includes('99.9%'),
    'has news': html.includes('More articles from resource library'),
    'has promo': html.includes('WIN with managed IT services.'),
    'has footer columns': html.includes('Phishing and scam alerts'),
    'has cookie banner': html.includes('Accept all cookies'),
    'has nav anchor targets': [
      'id="about"',
      'id="company"',
      'id="it-solutions"',
      'id="industries"',
      'id="insights"',
      'id="support"',
    ].every((id) => html.includes(id)),
    'intro band constrained width': html.includes('shell-container max-w-4xl'),
    'menu map: top-level items match nexsate header order':
      JSON.stringify(navLabels) ===
      JSON.stringify(['Our Company', 'What We Do', 'Who We Serve', 'Insights', 'Support']),
    'menu map: every menu has 3-4 columns with links': navItems.every(
      (i) => i.columns.length >= 3 && i.columns.length <= 4 && i.columns.every((c) => c.heading && c.links.length > 0),
    ),
    'menu map: nav hrefs target real section ids': navItems.every((i) => html.includes(`id="${i.href.slice(1)}"`)),
    'menu map: sitemap-derived links present': [
      'About nexsate',
      'Leadership team',
      'Our Story',
      'Managed IT services',
      'Cloud Services',
      'Cybersecurity',
      'Banking',
      'Healthcare',
      'Cloud migration saves money for health insurer',
      'Pricing and plans',
    ].every((label) => menuLinks.includes(label)),
    'pages: registry is complete (>=80 pages, no dupes)':
      Object.keys(pages).length === allPages.length && allPages.length >= 80,
    'pages: every nav leaf href is a resolvable #/ route':
      leafHrefs.length > 0 && leafHrefs.every((h) => h.startsWith('#/') && pages[h.slice(2)]),
    'pages: footer, legal and news hrefs all resolve':
      deepHrefs.length > 0 && deepHrefs.every((h) => h.startsWith('#/') && pages[h.slice(2)]),
    'pages: homepage deep-links into inner pages': [
      'href="#/about-nexsate"',
      'href="#/managed-it-services"',
      'href="#/cookie-policy"',
      'href="#/it-blog"',
    ].every((s) => html.includes(s)),
    'pages: inner page renders with breadcrumb + related':
      strategyHtml.includes('Managed IT services') &&
      strategyHtml.includes('aria-label="Breadcrumb"') &&
      strategyHtml.includes('Explore more') &&
      strategyHtml.includes('Back to top'),
    'pages: unknown slug renders 404': notFoundHtml.includes('Page not found'),
  }
  let pass = true
  for (const [name, ok] of Object.entries(checks)) {
    console.log(`${ok ? 'PASS' : 'FAIL'} - ${name}`)
    if (!ok) pass = false
  }
  console.log(`\nRender length: ${html.length} chars`)
  console.log(pass ? 'SMOKE TEST: ALL PASSED' : 'SMOKE TEST: FAILURES DETECTED')
  process.exitCode = pass ? 0 : 1
} catch (err) {
  console.error('SMOKE TEST: RENDER CRASHED')
  console.error(err)
  process.exitCode = 1
} finally {
  await server.close()
}
