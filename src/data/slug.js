export function slugify(label) {
  return String(label)
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function pageHref(label) {
  return `#/${slugify(label)}`
}
