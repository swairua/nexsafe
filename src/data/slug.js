// Slug + href helpers shared by nav/footer data and the page registry.
// A page's route is always '#/' + slugify(title), so menu labels and page
// titles stay in lockstep: label "Hydrogen" → #/hydrogen → pages['hydrogen'].
export function slugify(label) {
  return String(label)
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Route href for a content page identified by its menu label / page title. */
export function pageHref(label) {
  return `#/${slugify(label)}`
}
