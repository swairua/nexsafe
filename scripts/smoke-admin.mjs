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

let failures = 0
const check = (ok, name, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'} - ${name}${!ok && detail ? ` (${detail})` : ''}`)
  if (!ok) failures++
}

try {
  const { defaultContent } = await server.ssrLoadModule('/src/data/siteContent.js')
  const { default: ContentEditor } = await server.ssrLoadModule('/src/admin/ContentEditor.jsx')
  const { default: FieldEditor } = await server.ssrLoadModule('/src/admin/FieldEditor.jsx')
  const { default: AdminApp } = await server.ssrLoadModule('/src/admin/AdminApp.jsx')

  const adminSrc = await readFile('src/admin/AdminApp.jsx', 'utf8')
  const sections = [...adminSrc.matchAll(/key:\s*"([^"]+)",\s*label:\s*"([^"]+)"/g)]
    .map((m) => ({ key: m[1], label: m[2] }))
  const content = { ...defaultContent }
  const storeKeys = Object.keys(content).filter((k) => k !== 'pages')

  check(sections.length > 0, 'admin declares editable content sections')
  const missing = sections.filter((s) => !(s.key in content))
  check(missing.length === 0, 'every admin section has a content key', missing.map((m) => m.key).join(', '))
  const unreachable = storeKeys.filter((k) => !sections.some((s) => s.key === k))
  check(unreachable.length === 0, 'every content key is reachable in the admin', unreachable.join(', '))
  console.log(`       sections: ${sections.length}, content keys: ${storeKeys.length}`)

  let sectionFails = []
  for (const s of sections) {
    try {
      const html = renderToString(React.createElement(ContentEditor, {
        keys: [s], content, onSaved: () => {}, onPickImage: () => {},
      }))
      const fields = renderToString(React.createElement(FieldEditor, { name: s.key, value: content[s.key], onChange: () => {} }))
      if (!html.includes(s.label) || !fields.trim()) sectionFails.push(s.key)
    } catch (e) {
      sectionFails.push(`${s.key}: ${e.message}`)
    }
  }
  check(sectionFails.length === 0, 'every section renders in the Content tab', sectionFails.join(', '))

  let renderFails = []
  try {
    renderToString(React.createElement(ContentEditor, { keys: sections, content, onSaved: () => {}, onPickImage: () => {} }))
  } catch (e) { renderFails.push('content tab: ' + e.message) }
  try {
    renderToString(React.createElement(AdminApp))
  } catch (e) { renderFails.push('app shell: ' + e.message) }
  try {
    renderToString(React.createElement(FieldEditor, { name: 'page', value: content.pages[Object.keys(content.pages)[0]], onChange: () => {} }))
  } catch (e) { renderFails.push('pages tab: ' + e.message) }
  check(renderFails.length === 0, 'content tab, pages tab and app shell render', renderFails.join(', '))

  const remote = []
  JSON.stringify(content).replace(/https?:\/\/[^"\\]+/g, (m) => {
    if (/\.(jpe?g|png|webp|gif|svg)(\?|$)/.test(m)) remote.push(m)
    return m
  })
  check(remote.length === 0, 'no remote image URLs in the content store', remote.join(', '))

  const gradFails = []
  for (const key of ['heroSlides', 'introCards', 'featuredCards', 'promo', 'successStory']) {
    if (!(key in content)) continue
    let html = ''
    try {
      html = renderToString(React.createElement(FieldEditor, { name: key, value: content[key], onChange: () => {} }))
    } catch (e) { gradFails.push(`${key}: ${e.message}`); continue }
    if (/src="linear-gradient/i.test(html)) gradFails.push(`${key} renders a gradient as an image`)
    if (!html.includes('linear-gradient')) gradFails.push(`${key} lost its gradient field`)
  }
  check(gradFails.length === 0, 'gradients stay editable text and never become <img src>', gradFails.join(', '))

  const preview = renderToString(React.createElement(FieldEditor, {
    name: 'heroSlides[0].image', value: '/uploads/boardroom-meeting.jpg', onChange: () => {},
  }))
  check(preview.includes('src="/uploads/boardroom-meeting.jpg"'), 'upload paths still render an image preview')
} catch (err) {
  console.error('ADMIN SMOKE: RENDER CRASHED')
  console.error(err)
  failures++
} finally {
  await server.close()
}

console.log(failures ? `ADMIN SMOKE: ${failures} FAILURE(S)` : 'ADMIN SMOKE: ALL PASSED')
process.exitCode = failures ? 1 : 0
