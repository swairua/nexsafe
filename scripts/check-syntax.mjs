import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const pairs = { ')': '(', ']': '[', '}': '{' }
const openers = new Set(['(', '[', '{'])

function check(file) {
  const src = readFileSync(file, 'utf8')
  const stack = []
  let line = 1
  let mode = null
  let prevSig = undefined
  for (let i = 0; i < src.length; i++) {
    const c = src[i]
    const next = src[i + 1]
    if (c === '\n') {
      line++
      if (mode === 'lc') mode = null
      continue
    }
    if (mode === null && !/\s/.test(c) && c !== '/') prevSig = c
    if (mode === 'lc') continue
    if (mode === 'bc') {
      if (c === '*' && next === '/') {
        mode = null
        i++
      }
      continue
    }
    if (mode === 'rx') {
      if (c === '\\') {
        i++
        continue
      }
      if (c === '[') {
        mode = 'rxc'
        continue
      }
      if (c === '/') mode = null
      continue
    }
    if (mode === 'rxc') {
      if (c === '\\') {
        i++
        continue
      }
      if (c === ']') mode = 'rx'
      continue
    }
    if (mode === 's' || mode === 'd' || mode === 't') {
      if (c === '\\') {
        i++
        continue
      }
      if ((mode === 's' && c === "'") || (mode === 'd' && c === '"') || (mode === 't' && c === '`')) {
        mode = null
      }
      continue
    }
    if (c === '/' && next === '/') {
      mode = 'lc'
      continue
    }
    if (c === '/' && next === '*') {
      mode = 'bc'
      i++
      continue
    }
    if (c === '/' && (prevSig === undefined || '([={,:;!&|?'.includes(prevSig))) {
      mode = 'rx'
      continue
    }
    if (c === "'") {
      mode = 's'
      continue
    }
    if (c === '"') {
      mode = 'd'
      continue
    }
    if (c === '`') {
      mode = 't'
      continue
    }
    if (openers.has(c)) {
      stack.push({ ch: c, line })
      continue
    }
    if (c === ')' || c === ']' || c === '}') {
      const top = stack.pop()
      if (!top || top.ch !== pairs[c]) {
        return `line ${line}: unexpected '${c}'${top ? ` (unclosed '${top.ch}' from line ${top.line})` : ' (stack empty)'}`
      }
    }
  }
  if (stack.length) {
    const top = stack[stack.length - 1]
    return `unclosed '${top.ch}' opened at line ${top.line}`
  }
  return null
}

const dataDir = join(process.cwd(), 'src', 'data')
const pagesDir = join(dataDir, 'pages')
const files = [
  ...readdirSync(pagesDir).filter((f) => f.endsWith('.js')).map((f) => join(pagesDir, f)),
  ...readdirSync(dataDir).filter((f) => f.endsWith('.js')).map((f) => join(dataDir, f)),
]
let bad = 0
for (const f of files) {
  const err = check(f)
  if (err) {
    console.log(`FAIL - ${f}: ${err}`)
    bad++
  } else {
    console.log(`OK   - ${f}`)
  }
}
console.log(bad ? `SYNTAX CHECK: ${bad} file(s) failed` : 'SYNTAX CHECK: ALL PASSED')
process.exitCode = bad ? 1 : 0
