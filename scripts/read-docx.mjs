// One-off reader: extract readable text from the client's logoandcontent/*.docx
// files. No dependencies — a .docx is a ZIP, so we read the central directory,
// inflate word/document.xml with node:zlib, and flatten the WordprocessingML.
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { inflateRawSync } from 'node:zlib'

const DIR = join(process.cwd(), 'logoandcontent')

/** Locate the End Of Central Directory record and return the central directory offset. */
function findEocd(buf) {
  const min = Math.max(0, buf.length - 66000)
  for (let i = buf.length - 22; i >= min; i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) return i
  }
  throw new Error('EOCD not found — not a zip')
}

/** Return a map of entry name → raw compressed bytes from the central directory. */
function readZipEntries(buf) {
  const eocd = findEocd(buf)
  const count = buf.readUInt16LE(eocd + 10)
  let off = buf.readUInt32LE(eocd + 16)
  const entries = new Map()
  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(off) !== 0x02014b50) break
    const method = buf.readUInt16LE(off + 10)
    const compSize = buf.readUInt32LE(off + 20)
    const nameLen = buf.readUInt16LE(off + 28)
    const extraLen = buf.readUInt16LE(off + 30)
    const commentLen = buf.readUInt16LE(off + 32)
    const localOff = buf.readUInt32LE(off + 42)
    const name = buf.toString('utf8', off + 46, off + 46 + nameLen)

    // Re-read sizes from the local header: some writers put 0 in the central dir.
    const lhNameLen = buf.readUInt16LE(localOff + 26)
    const lhExtraLen = buf.readUInt16LE(localOff + 28)
    const dataStart = localOff + 30 + lhNameLen + lhExtraLen
    const data = buf.subarray(dataStart, dataStart + compSize)

    entries.set(name, method === 0 ? data : inflateRawSync(data))
    off += 46 + nameLen + extraLen + commentLen
  }
  return entries
}

const decodeEntities = (s) =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&amp;/g, '&')

/** document.xml → plain text, one line per paragraph, list items marked with "• ". */
function documentToText(xml) {
  return decodeEntities(xml)
    .replace(/<w:tab\/>/g, '\t')
    .replace(/<w:br\/>/g, '\n')
    .replace(/<\/w:p>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/** Mark list paragraphs so bullets survive the flattening. */
function markListItems(xml) {
  return xml.replace(/<w:p\b[^>]*>([\s\S]*?)<\/w:p>/g, (full, inner) =>
    /<w:numPr>/.test(inner) ? full.replace('<w:p', '<w:p data-bullet="1"') : full,
  )
}

const outDir = join(process.cwd(), '.docx-text')
mkdirSync(outDir, { recursive: true })

for (const file of readdirSync(DIR).filter((f) => f.toLowerCase().endsWith('.docx'))) {
  const entries = readZipEntries(readFileSync(join(DIR, file)))
  const doc = entries.get('word/document.xml')
  if (!doc) {
    console.log(`SKIP ${file} (no word/document.xml)`)
    continue
  }
  const xml = doc.toString('utf8')

  // Bullets: tag paragraphs in a numbered list, then render them with a marker.
  const withBullets = markListItems(xml)
  let text = documentToText(withBullets)

  const outName = file.replace(/\.docx$/i, '.txt')
  writeFileSync(join(outDir, outName), text, 'utf8')
  console.log(`${file} -> .docx-text/${outName} (${text.length} chars)`)
}
