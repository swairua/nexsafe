// Runtime smoke test: renders <App /> and every content page with
// react-dom/server via Vite's module loader. Catches undefined imports, bad
// hook usage, and render-time crashes.
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'
import { readFile } from 'node:fs/promises'

const server = await createServer({
  root: process.cwd(),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const { default: PageView } = await server.ssrLoadModule('/src/components/pages/PageView.jsx')
  const { pages, allPages } = await server.ssrLoadModule('/src/data/pages.js')
  const { defaultContent } = await server.ssrLoadModule('/src/data/siteContent.js')
  const { navItems } = await server.ssrLoadModule('/src/data/navItems.js')
  const { footerColumns, footerLegal } = await server.ssrLoadModule('/src/data/footerContent.js')
  const { partners } = await server.ssrLoadModule('/src/data/partners.js')
  const { stackGroups } = await server.ssrLoadModule('/src/data/stack.js')
  const css = await readFile('src/index.css', 'utf8')

  const html = renderToString(React.createElement(App))
  // Visible text: strip tags and decode the entities React emits, so copy
  // containing "&" is compared in its displayed form.
  const visibleText = (markup) =>
    markup.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'")
  const plain = visibleText(html)

  // Every page must render without throwing and must surface its own title.
  // The real slug is passed so slug-specific branches (the contact page) run.
  const pageResults = allPages.map((page) => {
    const rendered = renderToString(React.createElement(PageView, { page, slug: page.slug }))
    const text = visibleText(rendered)
    return {
      slug: page.slug,
      ok:
        text.includes(page.title) &&
        rendered.includes('aria-label="Breadcrumb"') &&
        rendered.includes('Explore more'),
    }
  })
  const failedPages = pageResults.filter((p) => !p.ok).map((p) => p.slug)

  // Contact details on the contact page come from Site settings.
  const contactHtml = renderToString(
    React.createElement(PageView, { page: pages['contact-us'], slug: 'contact-us' }),
  )

  const notFoundHtml = renderToString(React.createElement(PageView, { page: undefined }))

  // Every page with an "items" block must render each item's title — this is
  // what proves the new `items` schema works.
  const withItems = allPages.filter((p) => p.sections.some((s) => s.items?.length))
  const itemsRendered = withItems.every((p) => {
    const text = visibleText(renderToString(React.createElement(PageView, { page: p })))
    return p.sections.every((s) => (s.items || []).every((i) => text.includes(i.title)))
  })

  const leafHrefs = navItems.flatMap((i) => i.columns.flatMap((c) => c.links.map((l) => l.href)))
  const deepHrefs = [
    ...footerColumns.flatMap((c) => c.links.map((l) => l.href)),
    ...footerLegal.map((l) => l.href),
  ]

  const checks = {
    'homepage renders the client hero line': plain.includes(
      'We take care of your IT, so you can take care of your customers.',
    ),
    'homepage renders the principle kicker': plain.includes('EnableIT. Transform. Empower.'),
    'homepage renders the four benefits': [
      'Cost-effectiveness',
      'Innovative technology',
      'Industry expertise',
      'Scalability',
    ].every((t) => plain.includes(t)),
    'homepage renders the six service cards': [
      'Managed IT Services',
      'Cloud Services',
      'Software Development',
      'Network Management',
      'Cybersecurity',
      'Backup & Disaster Recovery',
    ].every((t) => plain.includes(t)),
    'homepage renders the industry chips': [
      'Industrial & Manufacturing',
      'Transportation & Logistics',
      'Healthcare',
      'Financial Services',
    ].every((t) => plain.includes(t)),
    'homepage renders the technology stack': stackGroups.every((g) => plain.includes(g.title)),
    'homepage renders the success story': plain.includes(
      'The goal was not just to fix IT problems',
    ),
    'homepage renders every stack vendor': partners.every((p) => html.includes(p.name)),
    'homepage owns the section anchors the nav targets': navItems.every((i) =>
      html.includes(`id="${i.href.slice(1)}"`),
    ),
    'homepage serves local images (no image CDN at runtime)':
      html.includes('/uploads/') && !html.includes('images.unsplash.com'),
    'all pages render with breadcrumb + related': failedPages.length === 0,
    'contact page renders the editable contact details':
      contactHtml.includes(defaultContent.settings.email),
    'item blocks render their titles': itemsRendered,
    'unknown slug renders 404': notFoundHtml.includes('Page not found'),
    'every nav leaf href is a resolvable #/ route': leafHrefs.every(
      (h) => h.startsWith('#/') && pages[h.slice(2)],
    ),
    'every footer/legal href is a resolvable #/ route': deepHrefs.every(
      (h) => h.startsWith('#/') && pages[h.slice(2)],
    ),
    'registry has no duplicate slugs': Object.keys(pages).length === allPages.length,
    'theme: brand colour tokens in place':
      css.includes('--color-shell-red: #0693e3') &&
      css.includes('--color-shell-red-dark: #010ed0'),
  }

  let pass = true
  for (const [name, ok] of Object.entries(checks)) {
    console.log(`${ok ? 'PASS' : 'FAIL'} - ${name}`)
    if (!ok) pass = false
  }
  if (failedPages.length) console.log(`  pages failing to render: ${failedPages.join(', ')}`)
  console.log(`\nHomepage render length: ${html.length} chars`)
  console.log(`Pages rendered: ${allPages.length}`)
  console.log(pass ? 'SMOKE TEST: ALL PASSED' : 'SMOKE TEST: FAILURES DETECTED')
  process.exitCode = pass ? 0 : 1
} catch (err) {
  console.error('SMOKE TEST: RENDER CRASHED')
  console.error(err)
  process.exitCode = 1
} finally {
  await server.close()
}
