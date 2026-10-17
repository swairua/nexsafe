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

console.log(fail === 0 ? "\nSYNC OK — frontend is single source of truth" : `\n${fail} check(s) failed`)
process.exit(fail === 0 ? 0 : 1)
