import { execSync } from "node:child_process"
import fs from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { defaultContent } from "../src/data/siteContent.js"
import { CONTENT_VERSION, EDITABLE_KEYS, STRUCTURAL_KEYS } from "../src/data/contentTruth.js"

const here = dirname(fileURLToPath(import.meta.url))
const root = dirname(here)
let fail = 0
const ok = (msg) => console.log("ok - " + msg)
const bad = (msg) => { fail++; console.log("FAIL - " + msg) }

// 1. Every defaultContent key is classified exactly once
const allKeys = Object.keys(defaultContent)
for (const k of allKeys) {
  const s = STRUCTURAL_KEYS.includes(k)
  const e = EDITABLE_KEYS.includes(k)
  if (s && e) bad(`key '${k}' in BOTH lists`)
  else if (!s && !e) bad(`key '${k}' in NEITHER list (defaults to frontend-wins, add it explicitly)`)
}
if (fail === 0) ok(`all ${allKeys.length} content keys classified`)

// 2. api/truth.php mirrors the JS lists
const truth = fs.readFileSync(join(root, "api", "truth.php"), "utf8")
for (const k of STRUCTURAL_KEYS) {
  if (!truth.includes(`'${k}'`)) bad(`api/truth.php missing structural '${k}'`)
}
if (!truth.includes(`define('CONTENT_VERSION', ${CONTENT_VERSION})`)) bad("api/truth.php CONTENT_VERSION mismatch")
if (fail === 0) ok("api/truth.php mirrors contentTruth.js")

// 3. Seed is byte-identical to frontend for structural keys
const seed = JSON.parse(fs.readFileSync(join(root, "api", "seed.json"), "utf8"))
for (const k of STRUCTURAL_KEYS) {
  if (JSON.stringify(seed[k]) !== JSON.stringify(defaultContent[k])) bad(`seed.json diverges on structural '${k}'`)
}
if (fail === 0) ok("seed.json structural keys match frontend")

// 4. content.php exposes version + readonly and guards writes
const contentPhp = fs.readFileSync(join(root, "api", "content.php"), "utf8")
for (const needle of ["CONTENT_VERSION", "nx_is_structural", "managed in code", "'readonly'"]) {
  if (!contentPhp.includes(needle)) bad(`api/content.php missing '${needle}'`)
}
if (fail === 0) ok("api/content.php enforces frontend-wins")

// 5. Frontend strips structural keys from backend payload
const ctx = fs.readFileSync(join(root, "src", "content", "ContentContext.jsx"), "utf8")
for (const needle of ["stripStructural", "STRUCTURAL_KEYS", "CONTENT_VERSION"]) {
  if (!ctx.includes(needle)) bad(`ContentContext.jsx missing '${needle}'`)
}
if (fail === 0) ok("ContentContext strips structural keys")

// 6. Admin disables structural saves
const editor = fs.readFileSync(join(root, "src", "admin", "ContentEditor.jsx"), "utf8")
if (!editor.includes("STRUCTURAL_KEYS") || !editor.includes("Managed in code")) bad("ContentEditor missing readonly guard")
else ok("admin disables structural saves")

// 7. Every nav href resolves: #/slug exists in pages/posts, #anchor exists in sectionIds
// pages.js / posts.js are aggregators — follow their relative imports to the real files.
const collectSlugsDeep = (entryRel) => {
  const out = new Set()
  const seen = new Set()
  const visit = (rel) => {
    const abs = join(root, ...rel.split("/"))
    if (seen.has(abs)) return
    seen.add(abs)
    let src
    try { src = fs.readFileSync(abs, "utf8") } catch { return }
    for (const m of src.matchAll(/slug:\s*'([^']+)'/g)) out.add(m[1])
    const dir = rel.split("/").slice(0, -1).join("/")
    for (const m of src.matchAll(/from\s+["'](\.[^"']+)["']/g)) {
      visit((dir ? dir + "/" : "") + m[1] + (m[1].endsWith(".js") ? "" : ".js"))
    }
  }
  visit(entryRel)
  return out
}
const knownSlugs = new Set([...collectSlugsDeep("src/data/pages.js"), ...collectSlugsDeep("src/data/posts.js")])
const siteSrc = fs.readFileSync(join(root, "src", "data", "siteContent.js"), "utf8")
const navSrc = fs.readFileSync(join(root, "src", "data", "navItems.js"), "utf8")
const knownAnchors = new Set(
  [...siteSrc.matchAll(/^\s{4}(\w+):\s*"/gm)].map((m) => m[1]).concat(["top", "company", "it-solutions", "partners", "industries", "capabilities", "insights", "support"])
)
const hrefs = [...navSrc.matchAll(/href:\s*'([^']+)'/g)].map((m) => m[1])
let dead = 0
for (const h of new Set(hrefs)) {
  if (h.startsWith("#/")) {
    const slug = h.slice(2)
    if (!knownSlugs.has(slug)) { bad(`nav href dead: '${h}' (no such page/post slug)`); dead++ }
  } else if (h.startsWith("#")) {
    const a = h.slice(1)
    if (!knownAnchors.has(a)) { bad(`nav href dead: '${h}' (no such section anchor)`); dead++ }
  } else if (!h.startsWith("/") && !h.startsWith("http")) {
    bad(`nav href unexpected shape: '${h}'`); dead++
  }
}
if (dead === 0) ok(`all ${new Set(hrefs).size} nav hrefs resolve (slugs + anchors)`)

// 8. MobileNav + Header render all layout shapes (no silent null dropdown)
for (const [file, needles] of [
  ["src/components/layout/MobileNav.jsx", ["item.links", "item.headline", "item.partners", "item.columns"]],
  ["src/components/layout/MegaMenu.jsx", ["layout === 'simple'", "layout === 'company'", "layout === 'solutions'"]],
]) {
  const t = fs.readFileSync(join(root, ...file.split("/")), "utf8")
  const missing = needles.filter((n) => !t.includes(n))
  if (missing.length) bad(`${file} missing: ${missing.join(", ")}`)
  else ok(`${file} covers all layouts`)
}

console.log(fail === 0 ? "\nSYNC OK — frontend is single source of truth" : `\n${fail} check(s) failed`)
process.exit(fail === 0 ? 0 : 1)
