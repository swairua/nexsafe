import http from 'node:http'
import { statSync, existsSync } from 'node:fs'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const UPLOADS = path.join(ROOT, 'public', 'uploads')
const BASE = process.env.NX_API_BASE || 'http://localhost:8000/api/'
const IMAGE_EXT = /\.(jpe?g|png|webp|gif|svg)$/i

let failures = 0
const check = (ok, name, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'} - ${name}${!ok && detail ? ` (${detail})` : ''}`)
  if (!ok) failures++
}

function send(pathname, { method = 'GET', headers = {}, body } = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE + pathname)

    const h = { ...headers }
    const hasLength = Object.keys(h).some((k) => k.toLowerCase() === 'content-length')
    if (body !== undefined && body !== null && !hasLength) {
      h['content-length'] = String(Buffer.byteLength(body))
    }
    const req = http.request(
      { hostname: url.hostname, port: url.port, path: url.pathname + url.search, method, headers: h },
      (res) => {
        const chunks = []
        res.on('data', (c) => chunks.push(c))
        res.on('end', () => {
          const text = Buffer.concat(chunks).toString('utf8')
          let json = null
          try { json = JSON.parse(text) } catch {  }
          resolve({ status: res.statusCode, setCookie: res.headers['set-cookie'] || [], json, text })
        })
      }
    )
    req.on('error', reject)
    if (body) req.write(body)
    req.end()
  })
}

let cookie = ''
let csrf = ''
function api(pathname, opts = {}) {
  const headers = { ...(opts.headers || {}) }
  if (cookie) headers.cookie = cookie
  if (csrf && opts.csrf !== false) headers['x-csrf-token'] = csrf
  return send(pathname, { ...opts, headers }).then((r) => {
    for (const c of r.setCookie) {
      const pair = c.split(';')[0]
      if (pair.startsWith('NEXSATE_ADMIN=')) cookie = pair
    }
    return r
  })
}

function multipart(fields, file) {
  const boundary = 'nexsatesmoke' + Math.random().toString(36).slice(2)
  let head = ''
  for (const [k, v] of Object.entries(fields)) {
    head += `--${boundary}\r\nContent-Disposition: form-data; name="${k}"\r\n\r\n${v}\r\n`
  }
  head += `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${file.name}"\r\nContent-Type: ${file.type}\r\n\r\n`
  const body = Buffer.concat([Buffer.from(head, 'binary'), file.data, Buffer.from(`\r\n--${boundary}--\r\n`, 'binary')])
  return {
    headers: { 'content-type': `multipart/form-data; boundary=${boundary}`, 'content-length': String(body.length) },
    body,
  }
}

async function sampleImage() {
  try {
    const names = (await readdir(UPLOADS)).filter((n) => IMAGE_EXT.test(n) && !/^(smoke|evil)/i.test(n))
    const sized = names.map((n) => ({ n, size: statSync(path.join(UPLOADS, n)).size }))
    sized.sort((a, b) => a.size - b.size)
    if (sized.length) return { name: sized[0].n, data: await readFile(path.join(UPLOADS, sized[0].n)) }
  } catch {  }
  return {
    name: 'smoke.png',
    data: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFAAH/q842iQAAAABJRU5ErkJggg==', 'base64'),
  }
}

const onDisk = (name) => existsSync(path.join(UPLOADS, name))
const loginCandidates = [process.env.NX_ADMIN_PASSWORD, 'Pass123', 'nexsate-admin'].filter(Boolean)

try {
  const ping = await send('auth.php')
  if (!ping.json) throw new Error(`API at ${BASE} did not answer with JSON`)

  let authed = false
  for (const password of loginCandidates) {
    const r = await api('auth.php', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action: 'login', username: 'admin', password }),
    })
    if (r.json?.authed) { authed = true; csrf = r.json.csrf || ''; break }
  }

  if (!authed) {
    console.log('SKIP - media smoke: could not sign in as admin (set NX_ADMIN_PASSWORD)')
  } else {
    console.log(`MEDIA SMOKE (${BASE}, signed in as admin)`)

    const first = await api('media.php')
    const rows = first.json?.media || []
    const disk = (await readdir(UPLOADS)).filter((n) => IMAGE_EXT.test(n))
    const untracked = disk.filter((n) => !rows.some((m) => m.filename === n))
    check(rows.length > 0, 'media library returns rows', `rows=${rows.length}`)
    check(untracked.length === 0, 'every image in /uploads is listed in the library', untracked.slice(0, 5).join(', '))
    check(rows.every((m) => typeof m.used === 'number'), 'each row carries an in-use reference count')
    console.log(`       ${rows.length} rows, ${disk.length} images on disk`)

    const noCsrf = await api('media.php', { method: 'POST', csrf: false, ...multipart({ alt: 'x' }, await sampleImage()) })
    check(noCsrf.status === 403, 'upload without a CSRF token is refused', `status=${noCsrf.status}`)

    const up = await api('media.php', { method: 'POST', ...multipart({ alt: 'smoke test' }, await sampleImage()) })
    const made = up.json || {}
    check(up.status === 200 && !!made.filename, 'image upload accepted', (up.text || '').slice(0, 120))
    check(!!made.filename && !made.filename.includes('/') && !made.filename.includes('\\'), 'stored name is a plain basename')
    check(!!made.filename && onDisk(made.filename), 'uploaded file written to /uploads')
    const listed = await api('media.php')
    check((listed.json?.media || []).some((m) => m.id === made.id), 'upload appears in the library list')

    const del = await api('media.php', { method: 'DELETE', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: made.id }) })
    check(del.status === 200 && !onDisk(made.filename), 'unused upload removed from database and disk', `status=${del.status}`)

    const inUse = (listed.json?.media || []).find((m) => m.used > 0)
    if (inUse) {
      const blocked = await api('media.php', { method: 'DELETE', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: inUse.id }) })
      check(blocked.status === 409, `delete of an in-use image refused (${inUse.filename}, used x${inUse.used})`, `status=${blocked.status}`)
      check(onDisk(inUse.filename), 'in-use image still on disk after the refusal')
    } else {
      console.log('       note: no content-referenced image found, so 409 protection was not exercised')
    }

    const located = rows.filter((m) => Array.isArray(m.locations))
    check(located.length === rows.length, 'each row carries usage locations', `${located.length}/${rows.length}`)
    check(rows.every((m) => typeof m.description === 'string'), 'each row carries a description field')
    const used = located.find((m) => m.locations.length > 0)
    check(!!used, 'a referenced image reports the content fields using it', used ? `${used.filename} -> ${used.locations[0]}` : 'none found')

    if (used) {
      const original = { alt: used.alt, description: used.description }
      const put = await api('media.php', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: used.id, alt: 'smoke alt', description: 'smoke description' }),
      })
      check(put.status === 200, 'media metadata update accepted', `status=${put.status} ${put.text || ''}`)
      const afterPut = (await api('media.php')).json?.media?.find((m) => m.id === used.id)
      check(afterPut?.alt === 'smoke alt' && afterPut?.description === 'smoke description', 'alt and description persist')

      await api('media.php', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: used.id, alt: original.alt || '', description: original.description || '' }),
      })

      const bytes = await readFile(path.join(UPLOADS, used.filename))
      const rep = multipart({ replace_id: String(used.id) }, { name: 'replacement' + path.extname(used.filename), type: used.mime || 'image/jpeg', data: bytes })
      const repRes = await api('media.php', { method: 'POST', ...rep })
      check(repRes.status === 200 && repRes.json?.filename === used.filename, 'replace keeps the same filename', `status=${repRes.status} ${repRes.text || ''}`)
      const afterRep = (await api('media.php')).json?.media?.find((m) => m.id === used.id)
      check(afterRep?.url === used.url, 'replace keeps the same URL (content needs no edit)')
      check(afterRep?.alt === (used.alt || '') && afterRep?.description === (used.description || ''), 'replace keeps alt/description')
      check(onDisk(used.filename), 'replaced file still on disk')
    } else {
      console.log('       note: no located image found, so metadata/replace checks were skipped')
    }

    const evil = await api('media.php', {
      method: 'POST',
      ...multipart({ alt: 'evil' }, { name: 'evil.php', type: 'image/png', data: Buffer.from('<?php echo "pwned";', 'binary') }),
    })
    check(evil.status === 400, 'non-image upload refused', `status=${evil.status} ${evil.json?.error || ''}`)

    const leftovers = (await readdir(UPLOADS)).filter((n) => /^(smoke|evil|probe)/i.test(n))
    check(leftovers.length === 0, 'smoke run left no files behind', leftovers.join(', '))
  }
} catch (err) {
  if (['ECONNREFUSED', 'ECONNRESET', 'ENOTFOUND'].includes(err.code)) {
    console.log(`SKIP - no PHP API on ${BASE} (start it with "php -S localhost:8000 -t .")`)
  } else {
    console.error('MEDIA SMOKE: FAILED')
    console.error(err)
    failures++
  }
}

console.log(failures ? `MEDIA SMOKE: ${failures} FAILURE(S)` : 'MEDIA SMOKE: ALL PASSED')
if (failures) process.exitCode = 1
