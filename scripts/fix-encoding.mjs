// One-off repair: rewrite CP1252-mojibake sequences back to real UTF-8.
// Cause: scripts/repair-pages.ps1 used PS5 Get-Content/Set-Content (ANSI default),
// which re-encoded UTF-8 bytes of — ’ ₂ as â€” â€™ â‚‚.
// Targeted replacements only — legitimate chars elsewhere are untouched.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const fixes = [
  // mojibake (E2 80 94) → em dash
  [String.fromCharCode(0xe2, 0x20ac, 0x201d), '\u2014'],
  // mojibake (E2 80 99) → right single quotation mark
  [String.fromCharCode(0xe2, 0x20ac, 0x2122), '\u2019'],
  // mojibake (E2 82 82) → subscript two
  [String.fromCharCode(0xe2, 0x201a, 0x201a), '\u2082'],
]

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) yield* walk(p)
    else if (/\.(js|jsx|mjs)$/.test(name)) yield p
  }
}

let total = 0
for (const file of walk(join(process.cwd(), 'src'))) {
  const text = readFileSync(file, 'utf8')
  let out = text
  let count = 0
  for (const [bad, good] of fixes) {
    let i
    while ((i = out.indexOf(bad)) !== -1) {
      out = out.slice(0, i) + good + out.slice(i + bad.length)
      count++
    }
  }
  if (count > 0) {
    writeFileSync(file, out, 'utf8')
    total += count
    console.log(`fixed ${count} sequence(s) in ${file}`)
  }
}
console.log(total > 0 ? `MOJIBAKE REPAIR: ${total} sequence(s) fixed` : 'MOJIBAKE REPAIR: nothing to fix')
