import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import { join, basename } from 'node:path'
import { inflateRawSync } from 'node:zlib'

const src = join(process.cwd(), 'homepage.docx')
const buf = readFileSync(src)

function findEocd(b) {
  for (let i = b.length - 22; i >= Math.max(0, b.length - 66000); i--) {
    if (b.readUInt32LE(i) === 0x06054b50) return i
  }
  throw new Error('no eocd')
}
const eocd = findEocd(buf)
const count = buf.readUInt16LE(eocd + 10)
let off = buf.readUInt32LE(eocd + 16)
const entries = new Map()
for (let k = 0; k < count; k++) {
  if (buf.readUInt32LE(off) !== 0x02014b50) break
  const method = buf.readUInt16LE(off + 10)
  const comp = buf.readUInt32LE(off + 20)
  const nl = buf.readUInt16LE(off + 28)
  const el = buf.readUInt16LE(off + 30)
  const cl = buf.readUInt16LE(off + 32)
  const lo = buf.readUInt32LE(off + 42)
  const nm = buf.toString('utf8', off + 46, off + 46 + nl)
  const lnl = buf.readUInt16LE(lo + 26)
  const lel = buf.readUInt16LE(lo + 28)
  const ds = lo + 30 + lnl + lel
  const dd = buf.subarray(ds, ds + comp)
  const raw = method === 0 ? dd : inflateRawSync(dd)
  entries.set(nm, raw)
  off += 46 + nl + el + cl
}
console.log('TOTAL ENTRIES ' + entries.size)
for (const n of entries.keys()) console.log('ENTRY ' + n + ' len=' + entries.get(n).length)

const docXml = (entries.get('word/document.xml') || Buffer.alloc(0)).toString('utf8')
console.log('DOCXML len ' + docXml.length)
writeFileSync(join(process.cwd(), '.docx-homepage-document.xml'), docXml, 'utf8')

function clean(xml) {
  return xml.replace(/<\/w:p>/g, '\n').replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/\n{3,}/g, '\n\n').trim()
}
// paragraphs in order with page-break markers
const paras = docXml.split('</w:p>')
const texts = paras.map((p, idx) => {
  const hasBreak = p.includes('w:br w:type="page"') || p.includes('w:type="page"')
  const t = clean(p + '</w:p>')
  return { idx, pageBreakAfter: hasBreak, text: t.slice(0, 600) }
}).filter(x => x.text.trim().length > 0)
console.log('PARAS ' + texts.length)
texts.slice(0, 120).forEach(p => {
  console.log('P' + p.idx + (p.pageBreakAfter ? ' [PAGE-BREAK-AFTER]' : '') + ': ' + p.text.slice(0, 400).replace(/\n/g, ' | '))
})

// colors
const fills = new Set()
for (const m of docXml.matchAll(/w:fill="([0-9A-Za-z]+)"/g)) fills.add(m[1])
console.log('FILLS ' + [...fills].join(','))
const fcols = new Set()
for (const m of docXml.matchAll(/w:color[^>]*w:val="([0-9A-Fa-f]{6})"/g)) fcols.add(m[1])
console.log('FONTCOLORS ' + [...fcols].join(','))
const shd = new Set()
for (const m of docXml.matchAll(/w:shd[^>]*w:fill="([0-9A-Za-z]+)"/g)) shd.add(m[1])
console.log('SHADING ' + [...shd].join(','))
// highlight
const hi = new Set()
for (const m of docXml.matchAll(/w:highlight[^>]*w:val="([A-Za-z]+)"/g)) hi.add(m[1])
console.log('HIGHLIGHT ' + [...hi].join(','))
// drawings / images
const blips = [...docXml.matchAll(/a:blip[^>]*r:embed="(rId\d+)"/g)].map(m => m[1])
console.log('BLIPS ' + blips.join(','))
const relsXml = (entries.get('word/_rels/document.xml.rels') || Buffer.alloc(0)).toString('utf8')
for (const b of blips) {
  const mm = relsXml.match(new RegExp('Id="' + b + '"[^>]*Target="([^"]+)"'))
  console.log(b + ' -> ' + (mm ? mm[1] : 'NOTFOUND'))
}
// extract media
const outDir = join(process.cwd(), '.docx-homepage-media')
mkdirSync(outDir, { recursive: true })
for (const [name, data] of entries) {
  if (name.startsWith('word/media/')) {
    const out = join(outDir, basename(name))
    writeFileSync(out, data)
    console.log('MEDIA ' + name + ' -> ' + out + ' ' + data.length)
  }
}
