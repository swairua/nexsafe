/**
 * Rules-of-Hooks lint: a hook must never be declared after an early `return`
 * inside the same function body.
 *
 * This bit us in src/admin/AdminApp.jsx: `useState` for the mobile menu sat
 * below `if (boot) return ... / if (!session) return ...`, so the hook only
 * existed on the signed-in branch. React then hit "Rendered more hooks than
 * during the previous render" the moment the session resolved. The smoke
 * tests could not catch it — renderToString(<AdminApp />) only ever exercises
 * the boot branch — so it is checked statically here instead.
 *
 * Run: node scripts/check-hooks.mjs
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const HOOKS = [
  'useState', 'useEffect', 'useLayoutEffect', 'useMemo', 'useCallback',
  'useReducer', 'useRef', 'useContext', 'useId', 'useSyncExternalStore',
  'useTransition', 'useDeferredValue', 'useImperativeHandle',
]

/** Blank out comments and string/template literals, preserving offsets/lines. */
function stripLiterals(src) {
  const out = src.split('')
  const n = src.length
  let i = 0
  while (i < n) {
    const c = src[i]
    const d = src[i + 1]
    if (c === '/' && d === '/') {
      while (i < n && src[i] !== '\n') { out[i] = ' '; i++ }
      continue
    }
    if (c === '/' && d === '*') {
      out[i] = ' '; out[i + 1] = ' '; i += 2
      while (i < n && !(src[i] === '*' && src[i + 1] === '/')) {
        if (src[i] !== '\n') out[i] = ' '
        i++
      }
      out[i] = ' '; out[i + 1] = ' '; i += 2
      continue
    }
    if (c === '"' || c === "'" || c === '`') {
      const quote = c
      out[i] = ' '; i++
      while (i < n) {
        if (src[i] === '\\') { out[i] = ' '; if (src[i + 1] !== '\n') out[i + 1] = ' '; i += 2; continue }
        if (src[i] === quote) { out[i] = ' '; i++; break }
        if (src[i] !== '\n') out[i] = ' '
        i++
      }
      continue
    }
    i++
  }
  return out.join('')
}

/** `return` counts as a statement when preceded by start-of-line, { ; } ) or >. */
function isReturnStatement(src, index) {
  let i = index - 1
  while (i >= 0 && /\s/.test(src[i])) i--
  if (i < 0) return true
  return '{;})>'.includes(src[i])
}

function checkFile(file) {
  const raw = readFileSync(file, 'utf8')
  const src = stripLiterals(raw)
  const lineAt = (index) => raw.slice(0, index).split('\n').length

  // Brace map -> innermost body containing any offset.
  const stack = []
  const bodies = []
  for (let i = 0; i < src.length; i++) {
    if (src[i] === '{') stack.push(i)
    else if (src[i] === '}') {
      const start = stack.pop()
      if (start !== undefined) bodies.push({ start, end: i })
    }
  }
  const innermost = (index) => {
    let best = null
    for (const b of bodies) if (b.start < index && index < b.end) {
      if (!best || b.start > best.start) best = b
    }
    return best
  }

  // First early `return` per body, at that body's own depth.
  const firstReturn = new Map()
  for (const b of bodies) {
    let depth = 0
    for (let i = b.start + 1; i < b.end; i++) {
      const c = src[i]
      if (c === '{') { depth++; continue }
      if (c === '}') { depth--; continue }
      if (depth !== 0) continue
      if (src.startsWith('return', i) && !/[A-Za-z0-9_$]/.test(src[i - 1] || '') && !/[A-Za-z0-9_$]/.test(src[i + 6] || '')) {
        if (isReturnStatement(src, i)) { firstReturn.set(b.start, i); break }
      }
    }
  }

  const problems = []
  const hookRe = new RegExp(`\\b(${HOOKS.join('|')})\\s*\\(`, 'g')
  for (const m of src.matchAll(hookRe)) {
    const body = innermost(m.index)
    if (!body) continue // module scope / top level
    const ret = firstReturn.get(body.start)
    if (ret === undefined || m.index <= ret) continue
    // `return useContext(Ctx)` is idiomatic hook code, not an early exit.
    if (lineAt(m.index) === lineAt(ret)) continue
    problems.push(`line ${lineAt(m.index)}: ${m[1]}() is declared after an early return on line ${lineAt(ret)}`)
  }
  return problems
}

const dirs = ['src', 'src/admin', 'src/components', 'src/content', 'src/data']
const files = []
for (const dir of dirs) {
  for (const f of readdirSync(join(process.cwd(), dir))) {
    if (f.endsWith('.jsx') || f.endsWith('.js')) files.push(join(dir, f))
  }
}

let bad = 0
for (const file of files) {
  const problems = checkFile(file)
  if (problems.length) {
    bad++
    console.log(`FAIL - ${file}`)
    for (const p of problems) console.log(`       ${p}`)
  }
}
console.log(bad
  ? `HOOKS CHECK: ${bad} file(s) call a hook after an early return`
  : `HOOKS CHECK: ALL PASSED (${files.length} files)`)
process.exitCode = bad ? 1 : 0