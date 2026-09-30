// Image localizer: downloads every remote (Unsplash) image the content refers
// to into public/uploads/ and rewrites the data files + api/seed.json to the
// local path, so the site has no runtime dependency on an image CDN.
//
//   node scripts/localize-images.mjs           # download + rewrite
//   node scripts/localize-images.mjs --check   # report remote references only
//
// Re-runnable: already-downloaded files are skipped unless --force is passed.
// Writes api/data/image-map.json so scripts/apply-image-map.php can migrate an
// existing SQLite database onto the same local paths.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const UPLOAD_DIR = join(root, 'public', 'uploads')
const MAP_FILE = join(root, 'api', 'data', 'image-map.json')
const CDN = 'https://images.unsplash.com/'

// Unsplash photo id -> [local filename, download width]. Every reference to an
// id collapses onto one file; the width is the largest the layouts request.
const IMAGES = {
  'photo-1558494949-ef010cbdcc31': ['hero-network-servers.jpg', 2000],
  'photo-1454165804606-c3d57bc86b40': ['hero-team-planning.jpg', 2000],
  'photo-1522071820081-009f0129c71c': ['team-collaboration.jpg', 2000],
  'photo-1516321318423-f06f85e504b3': ['service-managed-it.jpg', 1200],
  'photo-1451187580459-43490279c0fa': ['data-centre.jpg', 2000],
  'photo-1518770660439-4636190af475': ['circuit-board.jpg', 2000],
  'photo-1563986768609-322da13575f3': ['cybersecurity.jpg', 1200],
  'photo-1600880292203-757bb62b4baf': ['business-meeting.jpg', 2000],
  'photo-1517502884422-41eaead166d4': ['boardroom-meeting.jpg', 1200],
  'photo-1573497019940-1c28c88b4f3e': ['client-smiling.jpg', 1200],
  'photo-1552664730-d307ca884978': ['team-handshake.jpg', 2000],
  'photo-1519389950473-47ba0277781c': ['industry-team.jpg', 2000],
  'photo-1497366216548-37526070297c': ['office-space.jpg', 2000],
}

// Data files whose image references should be rewritten to local paths.
const TARGETS = [
  'src/data/content.js',
  'src/data/footerContent.js',
  'src/data/siteContent.js',
  'api/seed.json',
]

// https://images.unsplash.com/<id>?auto=format&fit=crop&w=2000&q=80
const REMOTE_RE = new RegExp(CDN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(photo-[a-z0-9-]+)\\?[^"\'`\\s)]*', 'g')
// helper calls: img('photo-x', 1200) / img("photo-x") / catImg('photo-x')
const CALL_RE = /\b(?:img|catImg)\(\s*['"](photo-[a-z0-9-]+)['"]\s*(?:,\s*\d+\s*)?\)/g

const localPath = (id) => `/uploads/${IMAGES[id] ? IMAGES[id][0] : id + '.jpg'}`

const checkOnly = process.argv.includes('--check')
const force = process.argv.includes('--force')

/** Download every mapped image that is not already on disk. */
async function download() {
  await mkdir(UPLOAD_DIR, { recursive: true })
  let fetched = 0
  let skipped = 0
  let failed = 0
  for (const [id, [file, w]] of Object.entries(IMAGES)) {
    const dest = join(UPLOAD_DIR, file)
    if (existsSync(dest) && !force) {
      skipped++
      continue
    }
    const url = `${CDN}${id}?auto=format&fit=crop&w=${w}&q=80`
    try {
      const r = await fetch(url)
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      const buf = Buffer.from(await r.arrayBuffer())
      await writeFile(dest, buf)
      console.log(`  saved  public/uploads/${file}  ${(buf.length / 1024).toFixed(0)} KB`)
      fetched++
    } catch (e) {
      console.error(`  FAILED ${file}: ${e.message}`)
      failed++
    }
  }
  console.log(`Images: ${fetched} downloaded, ${skipped} already present, ${failed} failed`)
  return failed
}

/** Point the data files (+ seed) at the local copies. */
async function rewrite() {
  let changed = 0
  for (const rel of TARGETS) {
    const path = join(root, rel)
    const before = await readFile(path, 'utf8')
    const after = before
      .replace(REMOTE_RE, (_m, id) => localPath(id))
      .replace(CALL_RE, (_m, id) => `'${localPath(id)}'`)
    if (after !== before) {
      await writeFile(path, after, 'utf8')
      console.log(`  rewrote ${rel}`)
      changed++
    }
  }
  console.log(`Files rewritten: ${changed}`)
}

/** Report any remaining remote image reference in the data layer. */
async function report() {
  const found = new Set()
  for (const rel of TARGETS) {
    const src = await readFile(join(root, rel), 'utf8')
    for (const m of src.matchAll(/https?:\/\/[^"'\s`)]+/g)) found.add(`${rel}: ${m[0]}`)
  }
  if (found.size === 0) {
    console.log('No remote asset references left in the data layer.')
  } else {
    for (const f of found) console.log(`  remote: ${f}`)
  }
  return found.size
}

if (checkOnly) {
  const n = await report()
  process.exitCode = n ? 1 : 0
} else {
  const failed = await download()
  await rewrite()
  await mkdir(dirname(MAP_FILE), { recursive: true })
  await writeFile(MAP_FILE, JSON.stringify(
    Object.fromEntries(Object.entries(IMAGES).map(([id, [file]]) => [id, `/uploads/${file}`])), null, 2,
  ) + '\n', 'utf8')
  console.log(`Map written: api/data/image-map.json (for scripts/apply-image-map.php)`)
  await report()
  process.exitCode = failed ? 1 : 0
}
