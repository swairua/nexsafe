import { copyFileSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
const srcDir = join(process.cwd(), '.docx-homepage-media')
const dstDir = join(process.cwd(), 'public', 'uploads')
mkdirSync(dstDir, { recursive: true })
console.log('SRC ' + srcDir)
console.log(readdirSync(srcDir).join('\n'))
const map = { 'image1.png': 'hero-docx-network-fiber.png', 'image2.png': 'hero-docx-principle-desk.png', 'image3.png': 'hero-docx-industry-support.png' }
for (const [s, d] of Object.entries(map)) {
  const a = join(srcDir, s)
  const b = join(dstDir, d)
  copyFileSync(a, b)
  console.log('COPIED ' + s + ' -> ' + d + ' ' + statSync(b).size)
}
console.log('UPLOADS NOW:')
console.log(readdirSync(dstDir).filter(f => f.startsWith('hero-')).join('\n'))
