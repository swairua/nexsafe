import { writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { defaultContent } from "../src/data/siteContent.js"

const here = dirname(fileURLToPath(import.meta.url))
const out = join(here, "seed.json")
writeFileSync(out, JSON.stringify(defaultContent, null, 2), "utf8")
const keys = Object.keys(defaultContent)
console.log("Wrote " + out + " (" + keys.length + " keys): " + keys.join(", "))

